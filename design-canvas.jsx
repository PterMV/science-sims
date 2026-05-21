// Science Interactive Simulation — main app
// React 18 + JSX via Babel standalone

const { useState, useEffect, useMemo, useCallback } = React;

const DATA = window.SIM_DATA;
const I18N = window.SIM_I18N;

// Subject name in current language (falls back to English).
function subjectName(s, lang) {
  return lang === "lo" && s.name_lo ? s.name_lo : s.name;
}

// Subject tagline in current language
function subjectTagline(s, lang) {
  return lang === "lo" && s.tagline_lo ? s.tagline_lo : s.tagline;
}

// Year label (Year 11 / ມ.5) — lang-aware
function yearLabel(yk, lang) {
  const t = I18N[lang];
  return t["year" + yk.slice(1)] || yk;
}

/* ---------- Tweaks defaults ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "density": "comfortable",
  "accent": "strong"
} /*EDITMODE-END*/;

/* ---------- Thumb placeholder ---------- */
function ThumbFig({ subject, kind }) {
  // Simple subject-tinted abstract placeholder
  const colorMap = {
    physics: "var(--physics)",
    chemistry: "var(--chemistry)",
    biology: "var(--biology)"
  };
  const soft = {
    physics: "var(--physics-soft)",
    chemistry: "var(--chemistry-soft)",
    biology: "var(--biology-soft)"
  };
  return (
    <div className="thumb-fig" style={{ background: soft[subject] }}>
      <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet">
        {kind === "physics" &&
        <g stroke={colorMap.physics} fill="none" strokeWidth="1.2">
            <path d="M5 50 Q 35 5 95 50" />
            <circle cx="5" cy="50" r="2.5" fill={colorMap.physics} />
            <circle cx="95" cy="50" r="2.5" fill={colorMap.physics} />
            <line x1="5" y1="50" x2="20" y2="35" strokeDasharray="2 2" />
          </g>
        }
        {kind === "chemistry" &&
        <g stroke={colorMap.chemistry} fill="none" strokeWidth="1.2">
            <circle cx="30" cy="30" r="6" fill={colorMap.chemistry} fillOpacity="0.15" />
            <circle cx="55" cy="22" r="6" fill={colorMap.chemistry} fillOpacity="0.15" />
            <circle cx="55" cy="40" r="6" fill={colorMap.chemistry} fillOpacity="0.15" />
            <circle cx="78" cy="30" r="6" fill={colorMap.chemistry} fillOpacity="0.15" />
            <line x1="36" y1="30" x2="49" y2="22" />
            <line x1="36" y1="30" x2="49" y2="40" />
            <line x1="61" y1="22" x2="72" y2="30" />
            <line x1="61" y1="40" x2="72" y2="30" />
          </g>
        }
        {kind === "biology" &&
        <g stroke={colorMap.biology} fill="none" strokeWidth="1.2">
            <path d="M25 10 Q 50 30 25 50" />
            <path d="M75 10 Q 50 30 75 50" />
            {[0.15, 0.35, 0.55, 0.75].map((t, i) => {
            const y = 10 + t * 40;
            const x1 = 25 + Math.sin(t * Math.PI) * 12.5;
            const x2 = 75 - Math.sin(t * Math.PI) * 12.5;
            return <line key={i} x1={x1} y1={y} x2={x2} y2={y} />;
          })}
          </g>
        }
      </svg>
    </div>);

}

/* ---------- Sidebar ---------- */
function Sidebar({ route, lang, onNavigate, expanded, setExpanded }) {
  const t = I18N[lang];
  const subjectCounts = useMemo(() => {
    const counts = {};
    for (const s of DATA.subjects) {
      let c = 0;
      for (const yk of ["y11", "y12", "y13"]) {
        for (const ch of s.years[yk].chapters) c += ch.sims.length;
      }
      counts[s.id] = c;
    }
    return counts;
  }, []);

  return (
    <aside className="sidebar">
      <div className="brand" onClick={() => onNavigate({ type: "home" })}>
        <div className="brand-mark">S</div>
        <div className="brand-text">
          <div className="brand-name">Science Interactive Simulation</div>
          <div className="brand-sub">SIS / v0.1</div>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-section-label">{t.nav_subjects}</div>
        {DATA.subjects.map((s) => {
          const isExpanded = expanded === s.id;
          const isActive = route.type === "subject" && route.subject === s.id;
          return (
            <div key={s.id}>
              <div
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => {
                  setExpanded(isExpanded ? null : s.id);
                  onNavigate({ type: "subject", subject: s.id, year: "y11" });
                }}>
                
                <span className="nav-dot" style={{ background: `var(--${s.id})` }}></span>
                <span>{subjectName(s, lang)}</span>
                <span className="nav-count">{subjectCounts[s.id]}</span>
              </div>
              {isExpanded &&
              <div className="nav-sub">
                  {["y11", "y12", "y13"].map((yk) =>
                <div
                  key={yk}
                  className={`nav-subitem ${isActive && route.year === yk ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate({ type: "subject", subject: s.id, year: yk });
                  }}>
                  
                      <span>{yearLabel(yk, lang)}</span>
                      <span className="nav-count">{s.years[yk].chapters.reduce((a, c) => a + c.sims.length, 0)}</span>
                    </div>
                )}
                </div>
              }
            </div>);

        })}
      </div>

      <div className="nav-section">
        <div className="nav-section-label">{t.nav_other}</div>
        <div
          className={`nav-item ${route.type === "about" ? "active" : ""}`}
          onClick={() => onNavigate({ type: "about" })}>
          
          <span className="nav-dot" style={{ background: "var(--ink-4)" }}></span>
          <span>{t.nav_about}</span>
        </div>
      </div>

      <div className="sidebar-footer">By T. Pter · 2026

      </div>
    </aside>);

}

/* ---------- Top bar ---------- */
function TopBar({ route, lang, setLang, onNavigate, onMenu, theme, setTheme }) {
  const t = I18N[lang];
  const crumbs = useMemo(() => {
    const out = [{ label: t.home, route: { type: "home" } }];
    if (route.type === "subject") {
      const s = DATA.subjects.find((x) => x.id === route.subject);
      out.push({ label: subjectName(s, lang), route: { type: "subject", subject: s.id, year: "y11" } });
      if (route.unit && s.id === "physics") {
        out.push({ label: yearLabel(route.year, lang), route: { type: "subject", subject: s.id, year: route.year } });
        // Look up unit name from PHYSICS_DATA
        const yearIdx = { y11: 0, y12: 1, y13: 2 }[route.year] ?? 0;
        const unit = window.PHYSICS_DATA?.years?.[yearIdx]?.units?.find((u) => u.id === route.unit);
        out.push({ label: unit ? unit.name : route.unit, current: true });
      } else {
        out.push({ label: yearLabel(route.year, lang), current: true });
      }
    } else if (route.type === "about") {
      out.push({ label: t.nav_about, current: true });
    } else if (route.type === "sim") {
      const s = DATA.subjects.find((x) => x.id === route.subject);
      out.push({ label: subjectName(s, lang), route: { type: "subject", subject: s.id, year: route.year } });
      out.push({ label: yearLabel(route.year, lang), route: { type: "subject", subject: s.id, year: route.year } });
      out.push({ label: route.simTitle, current: true });
    }
    return out;
  }, [route, lang]);

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={onMenu} aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
        </button>
        <div className="crumbs">
        {crumbs.map((c, i) =>
          <React.Fragment key={i}>
            {i > 0 && <span className="sep">/</span>}
            {c.current ?
            <span className="current">{c.label}</span> :

            <span className="crumb-link" onClick={() => onNavigate(c.route)}>{c.label}</span>
            }
          </React.Fragment>
          )}
      </div>
      </div>
      <div className="topbar-right">
        <button
          className="theme-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme === "dark" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
        <div className="lang-toggle">
          <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
          <button className={lang === "lo" ? "active" : ""} onClick={() => setLang("lo")}>LO</button>
        </div>
      </div>
    </div>);

}

/* ---------- Home ---------- */
function HomeView({ lang, onNavigate }) {
  const t = I18N[lang];

  const totals = useMemo(() => {
    let chapters = 0,sims = 0,ready = 0;
    for (const s of DATA.subjects) {
      for (const yk of ["y11", "y12", "y13"]) {
        chapters += s.years[yk].chapters.length;
        for (const ch of s.years[yk].chapters) {
          sims += ch.sims.length;
          ready += ch.sims.filter((x) => x.ready).length;
        }
      }
    }
    return { chapters, sims, ready };
  }, []);

  // Featured: Projectile Motion (ready sample)
  const featured = useMemo(() => {
    for (const s of DATA.subjects) {
      for (const yk of ["y11", "y12", "y13"]) {
        for (const ch of s.years[yk].chapters) {
          for (const sim of ch.sims) {
            if (sim.ready) return { subject: s, year: yk, chapter: ch, sim };
          }
        }
      }
      // ignore
    }
    return null;
  }, []);

  return (
    <div className="content">
      <div className="home-grid">
        <div className="home-intro">
          <h1>
            {t.home_title} <em>{t.home_title_em}</em>
          </h1>
          <p>{t.home_desc}</p>

          <div className="subject-tiles">
            {DATA.subjects.map((s) =>
            <div
              key={s.id}
              className="subject-tile"
              onClick={() => onNavigate({ type: "subject", subject: s.id, year: "y11" })}>
              
                <div className={`subject-glyph ${s.id}`}>{s.glyph}</div>
                <div className="subject-tile-meta">
                  <div className="subject-tile-name">{subjectName(s, lang)}</div>
                  <div className="subject-tile-sub">{subjectTagline(s, lang)}</div>
                </div>
                <div className="subject-tile-arrow">→</div>
              </div>
            )}
          </div>
        </div>

        {featured &&
        <div className="featured">
            <div className="featured-label">
              <span>{t.featured}</span>
              <span className="badge ready">{t.sim_ready}</span>
            </div>
            <div className="featured-thumb">
              <ThumbFig subject={featured.subject.id} kind={featured.subject.id} />
            </div>
            <div className="featured-body">
              <div className="featured-tag">
                <span className="dot" style={{ background: `var(--${featured.subject.id})` }}></span>
                {subjectName(featured.subject, lang)} · {yearLabel(featured.year, lang)} · {featured.chapter.title}
              </div>
              <h2 className="featured-title">{featured.sim.title}</h2>
              <p className="featured-desc">{featured.sim.desc}</p>
              <button
              className="btn"
              onClick={() => onNavigate({
                type: "sim",
                subject: featured.subject.id,
                year: featured.year,
                simId: featured.sim.id,
                simTitle: featured.sim.title,
                file: featured.sim.file
              })}>
              
                {t.open_sim} →
              </button>
            </div>
          </div>
        }
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-num">3</div>
          <div className="stat-label">{t.stat_subjects}</div>
        </div>
        <div className="stat">
          <div className="stat-num">9</div>
          <div className="stat-label">{t.stat_years}</div>
        </div>
        <div className="stat">
          <div className="stat-num">{totals.chapters}</div>
          <div className="stat-label">{t.stat_chapters}</div>
        </div>
        <div className="stat">
          <div className="stat-num">{totals.sims}</div>
          <div className="stat-label">{t.stat_sims}</div>
        </div>
      </div>
    </div>);

}

/* ---------- Subject + Year view ---------- */
function SubjectView({ route, lang, onNavigate }) {
  const t = I18N[lang];
  const s = DATA.subjects.find((x) => x.id === route.subject);
  const year = s.years[route.year];

  return (
    <div className="content">
      <div className="subject-header">
        <div className="subject-title-wrap">
          <div className={`subject-title-glyph ${s.id}`}>{s.glyph}</div>
          <div>
            <h1 className="subject-title">{subjectName(s, lang)}</h1>
            <div className="subject-meta">{year.subtitle}</div>
          </div>
        </div>
        <div className="year-tabs">
          {["y11", "y12", "y13"].map((yk) =>
          <button
            key={yk}
            className={`year-tab ${route.year === yk ? "active" : ""}`}
            onClick={() => onNavigate({ type: "subject", subject: s.id, year: yk })}>
            
              {yearLabel(yk, lang)}
            </button>
          )}
        </div>
      </div>

      {year.chapters.map((ch) =>
      <div className="chapter" key={ch.num}>
          <div className="chapter-head">
            <span className="chapter-num">Ch. {ch.num}</span>
            <h3 className="chapter-title">{ch.title}</h3>
            <span className="chapter-meta">{ch.sims.length} {t.sims_count}</span>
          </div>
          <div className="sim-grid">
            {ch.sims.map((sim) =>
          <div
            key={sim.id}
            className={`sim-card ${sim.ready ? "ready" : ""}`}
            onClick={() => onNavigate({
              type: "sim",
              subject: s.id,
              year: route.year,
              simId: sim.id,
              simTitle: sim.title,
              file: sim.file
            })}>
            
                {sim.ready ?
            <div className="sim-thumb">
                    <ThumbFig subject={s.id} kind={s.id} />
                  </div> :

            <div className="sim-thumb locked">In production</div>
            }
                <div className="sim-body">
                  <div className="sim-tag">
                    <span className="dot" style={{ background: `var(--${s.id})` }}></span>
                    {ch.title}
                  </div>
                  <h4 className="sim-title">{sim.title}</h4>
                  <p className="sim-desc">{sim.desc}</p>
                  <div className={`sim-status ${sim.ready ? "ready" : ""}`}>
                    <span>{sim.ready ? t.sim_ready : t.sim_draft}</span>
                    <span>{sim.ready ? "→" : ""}</span>
                  </div>
                </div>
              </div>
          )}
          </div>
        </div>
      )}
    </div>);

}

/* ---------- Sim viewer ---------- */
function SimViewer({ route, lang, onNavigate, onMenu }) {
  const t = I18N[lang];
  const s = DATA.subjects.find((x) => x.id === route.subject);

  return (
    <div className="viewer">
      <div className="viewer-bar">
        <div className="viewer-bar-left">
          <button className="menu-btn" onClick={onMenu} aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
          </button>
          <button className="btn ghost" onClick={() => onNavigate({ type: "subject", subject: route.subject, year: route.year })}>
            ← {t.back}
          </button>
            <div className="viewer-titles">
              <div className="viewer-title">{route.simTitle}</div>
              <div className="subject-meta" style={{ marginTop: 2 }}>
                {subjectName(s, lang)} · {yearLabel(route.year, lang)}
              </div>
            </div>
        </div>
        <div className="lang-toggle">
          <span className="badge ready">{t.sim_ready}</span>
        </div>
      </div>
      {route.file ?
      <iframe className="viewer-frame" ref={(el) => {
        // Resolve the file: in a bundled-standalone build, window.__resources
        // maps file paths to blob URLs. Fall back to the raw path otherwise.
        const url = (window.__resources && window.__resources[route.file]) || route.file;
        if (el && el.dataset.loadedFile !== url) {
          try {
            el.contentWindow.location.replace(url);
          } catch (e) {
            el.src = url;
          }
          el.dataset.loadedFile = url;
        }
      }} title={route.simTitle}></iframe> :

      <div className="content">
          <div className="empty">
            This simulation is in production. Check back soon.
          </div>
        </div>
      }
    </div>);

}

/* ---------- About view ---------- */
function AboutView({ lang, onNavigate }) {
  const t = I18N[lang];
  const totals = useMemo(() => {
    let chapters = 0,sims = 0,ready = 0;
    for (const s of DATA.subjects) {
      for (const yk of ["y11", "y12", "y13"]) {
        chapters += s.years[yk].chapters.length;
        for (const ch of s.years[yk].chapters) {
          sims += ch.sims.length;
          ready += ch.sims.filter((x) => x.ready).length;
        }
      }
    }
    return { chapters, sims, ready };
  }, []);

  return (
    <div className="content about">
      <div className="about-head">
        <div className="about-eyebrow">About</div>
        <h1 className="about-title">A simulation library built around the Year 11–13 science curriculum.</h1>
        <p className="about-lede">
          Science Interactive Simulation (SIS) is a free, browser-based library of parametric simulations
          mapped chapter-by-chapter to the physics, chemistry and biology textbooks used in upper-secondary
          schools. Designed for teachers, students and self-learners.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <div className="about-num">{DATA.subjects.length}</div>
          <div className="about-card-label">Subjects</div>
          <div className="about-card-desc">Physics, Chemistry, Biology — colour-coded for fast navigation.</div>
        </div>
        <div className="about-card">
          <div className="about-num">{totals.chapters}</div>
          <div className="about-card-label">Chapters</div>
          <div className="about-card-desc">Each chapter tracks the standard upper-secondary syllabus.</div>
        </div>
        <div className="about-card">
          <div className="about-num">{totals.sims}</div>
          <div className="about-card-label">Simulations</div>
          <div className="about-card-desc">{totals.ready} live, {totals.sims - totals.ready} in production.</div>
        </div>
        <div className="about-card">
          <div className="about-num">2</div>
          <div className="about-card-label">Languages</div>
          <div className="about-card-desc">English and Lao — toggle from the top-right of any page.</div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-section-label">How it works</div>
        <div className="about-cols">
          <div>
            <h3>1. Pick a subject</h3>
            <p>Open Physics, Chemistry or Biology from the sidebar. Each subject has its own visual identity so you always know where you are in the library.</p>
          </div>
          <div>
            <h3>2. Choose a year level</h3>
            <p>Year 11, 12 or 13. Year tabs sit at the top of every subject page so you can jump between cohorts instantly.</p>
          </div>
          <div>
            <h3>3. Browse by chapter</h3>
            <p>Simulations are grouped under the chapter titles from your textbook table of contents. Click a card to open the live simulation.</p>
          </div>
          <div>
            <h3>4. Tweak parameters</h3>
            <p>Each simulation exposes the variables that matter — masses, angles, concentrations, gene frequencies — and updates the result in real time.</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-section-label">Who it's for</div>
        <div className="about-cols">
          <div>
            <h3>Teachers</h3>
            <p>Project a simulation at the front of class, sweep a parameter live, and let students predict before you change it. Every sim runs in any modern browser, no install required.</p>
          </div>
          <div>
            <h3>Students</h3>
            <p>Use simulations as a study tool alongside the textbook. The chapter mapping makes it easy to find the right sim for the problem you're working on.</p>
          </div>
          <div>
            <h3>Self-learners</h3>
            <p>Work through a subject end-to-end at your own pace. The library is free to use and free of accounts.</p>
          </div>
          <div>
            <h3>Curriculum authors</h3>
            <p>Drop new sims into the library by adding an HTML file and a one-line entry to the chapter data — see the project README for details.</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-section-label">Principles</div>
        <ul className="principles">
          <li><strong>Curriculum-aligned.</strong> Every simulation maps to a chapter in the standard Year 11–13 textbooks.</li>
          <li><strong>Live and parametric.</strong> Sliders and toggles over plots and animations — never canned videos.</li>
          <li><strong>Browser-first.</strong> Plain HTML, no installs, no plugins. Works on classroom projectors and student laptops alike.</li>
          <li><strong>Bilingual.</strong> Full English and Lao language support across the interface.</li>
          <li><strong>Open content.</strong> Free for schools and individual learners to use, no account required.</li>
        </ul>
      </div>

      <div className="about-footer">
        <div>
          <div className="about-section-label">Contact</div>
          <div className="about-contact">peternalongsak@gmail.com · SVK · 2026</div>
        </div>
        <button className="btn" onClick={() => onNavigate({ type: "home" })}>Back to home →</button>
      </div>
    </div>);

}

/* ---------- App ---------- */
function App() {
  const [route, setRouteState] = useState(() => {
    // Restore from history.state on first mount (e.g. page refresh after navigation)
    if (window.history.state && window.history.state.__appRoute) {
      return window.history.state.__appRoute;
    }
    return { type: "home" };
  });
  const [lang, setLang] = useState("en");
  const [expanded, setExpanded] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [t, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  // Apply tweaks (theme, density, accent) via body classes + html lang attr
  useEffect(() => {
    document.body.dataset.theme = t.theme;
    document.body.dataset.density = t.density;
    document.body.dataset.accent = t.accent;
  }, [t.theme, t.density, t.accent]);

  // Reflect language on <html> so CSS can swap to Phetsarath OT for Lao
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Seed the initial history entry with our current route so popstate has
  // something to restore back to.
  useEffect(() => {
    if (!window.history.state || !window.history.state.__appRoute) {
      window.history.replaceState({ __appRoute: route }, "");
    }
    const onPop = (e) => {
      const r = e.state && e.state.__appRoute;
      // If browser back lands on a state without our marker, fall back to home.
      setRouteState(r || { type: "home" });
      setNavOpen(false);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigate = useCallback((r) => {
    setRouteState(r);
    setNavOpen(false);
    if (r.type === "subject") setExpanded(r.subject);
    // Push a new history entry so the browser Back button steps back exactly
    // one app-level. Avoid pushing duplicates (e.g. clicking the same crumb).
    const prev = window.history.state && window.history.state.__appRoute;
    if (!prev || JSON.stringify(prev) !== JSON.stringify(r)) {
      window.history.pushState({ __appRoute: r }, "");
    }
    window.scrollTo(0, 0);
  }, []);

  const isViewer = route.type === "sim";

  return (
    <div className={`app ${navOpen ? "nav-open" : ""}`} data-screen-label={route.type}>
      <Sidebar route={route} lang={lang} onNavigate={handleNavigate} expanded={expanded} setExpanded={setExpanded} />
      <div className="nav-scrim" onClick={() => setNavOpen(false)}></div>
      <div className="main">
        {!isViewer && <TopBar route={route} lang={lang} setLang={setLang} onNavigate={handleNavigate} onMenu={() => setNavOpen((v) => !v)} theme={t.theme} setTheme={(v) => setTweak("theme", v)} />}
        {route.type === "home" && <HomeView lang={lang} onNavigate={handleNavigate} />}
        {route.type === "subject" && route.subject === "physics" && <window.PhysicsCurriculumView route={route} lang={lang} onNavigate={handleNavigate} />}
        {route.type === "subject" && route.subject !== "physics" && <SubjectView route={route} lang={lang} onNavigate={handleNavigate} />}
        {route.type === "sim" && <SimViewer route={route} lang={lang} onNavigate={handleNavigate} onMenu={() => setNavOpen((v) => !v)} />}
        {route.type === "about" && <AboutView lang={lang} onNavigate={handleNavigate} />}
      </div>

      {window.TweaksPanel &&
      <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Appearance">
            <window.TweakRadio label="Theme" value={t.theme} options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} onChange={(v) => setTweak("theme", v)} />
            <window.TweakRadio label="Density" value={t.density} options={[{ value: "compact", label: "Compact" }, { value: "comfortable", label: "Cozy" }]} onChange={(v) => setTweak("density", v)} />
            <window.TweakRadio label="Accent" value={t.accent} options={[{ value: "subtle", label: "Subtle" }, { value: "strong", label: "Strong" }]} onChange={(v) => setTweak("accent", v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      }
    </div>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);