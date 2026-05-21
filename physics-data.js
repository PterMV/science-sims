/* Tweak-driven overrides: theme, density, accent */

/* Dark theme */
body[data-theme="dark"] {
  --bg: #0a0a0b;
  --surface: #131316;
  --surface-2: #1c1c20;
  --border: #25252a;
  --border-strong: #34343a;
  --ink: #f5f5f6;
  --ink-2: #c1c1c6;
  --ink-3: #86868c;
  --ink-4: #5a5a60;

  --physics-soft: oklch(0.22 0.06 262);
  --physics-ink: oklch(0.78 0.13 262);
  --chemistry-soft: oklch(0.22 0.06 60);
  --chemistry-ink: oklch(0.80 0.13 70);
  --biology-soft: oklch(0.22 0.05 152);
  --biology-ink: oklch(0.78 0.12 152);
}
body[data-theme="dark"] .topbar {
  background: rgba(10, 10, 11, 0.85);
}
body[data-theme="dark"] .brand-mark { background: var(--ink); color: var(--bg); }
body[data-theme="dark"] .btn { background: var(--ink); color: var(--bg); }
body[data-theme="dark"] .lang-toggle button.active { background: var(--ink); color: var(--bg); }
body[data-theme="dark"] .year-tab.active { background: var(--ink); color: var(--bg); }

/* Compact density */
body[data-density="compact"] .content { padding: 28px 32px; }
body[data-density="compact"] .sim-grid { gap: 10px; }
body[data-density="compact"] .sim-body { padding: 12px 14px 14px; }
body[data-density="compact"] .chapter { margin-bottom: 28px; }
body[data-density="compact"] .home-intro h1 { font-size: 36px; }

/* Subtle accent: desaturate tinted backgrounds */
body[data-accent="subtle"] {
  --physics-soft: #f5f5f7;
  --chemistry-soft: #f5f5f7;
  --biology-soft: #f5f5f7;
}
body[data-theme="dark"][data-accent="subtle"] {
  --physics-soft: var(--surface-2);
  --chemistry-soft: var(--surface-2);
  --biology-soft: var(--surface-2);
}
