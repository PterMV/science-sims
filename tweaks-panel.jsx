<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Science Interactive Simulation</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Phetsarath:wght@400;700&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="styles.css" />
  <link rel="stylesheet" href="overrides.css" />

  <!-- Sim HTML files (loaded into iframe via JS-string path; lifted for the bundler) -->
  <meta name="ext-resource-dependency" content="sims/uniform-motion.html" data-resource-id="sims/uniform-motion.html" />
  <meta name="ext-resource-dependency" content="sims/accelerated-motion.html" data-resource-id="sims/accelerated-motion.html" />
  <meta name="ext-resource-dependency" content="sims/projectile-motion.html" data-resource-id="sims/projectile-motion.html" />
  <meta name="ext-resource-dependency" content="sims/force-vectors.html" data-resource-id="sims/force-vectors.html" />
  <meta name="ext-resource-dependency" content="sims/newtons-second-law.html" data-resource-id="sims/newtons-second-law.html" />
</head>
<body data-theme="light" data-density="comfortable" data-accent="strong">
  <template id="__bundler_thumbnail" data-bg-color="#fafafa">
    <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="800" fill="#fafafa"/>
      <g transform="translate(600 400)">
        <circle r="160" fill="#F97316"/>
        <g stroke="#0a0a0a" stroke-width="14" stroke-linecap="round" fill="none">
          <path d="M-90 40 L90 40"/>
          <path d="M70 20 L100 40 L70 60"/>
          <path d="M-20 -30 L-20 -90"/>
          <path d="M-40 -70 L-20 -100 L0 -70"/>
        </g>
        <text x="0" y="170" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="42" font-weight="600" fill="#0a0a0a">Science Sims</text>
      </g>
    </svg>
  </template>
  <div id="root"></div>

  <!-- React + Babel -->
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

  <!-- Data & helpers -->
  <script src="data.js"></script>
  <script src="physics-data.js"></script>
  <script type="text/babel" src="tweaks-panel.jsx"></script>
  <script type="text/babel" src="physics-view.jsx"></script>
  <script type="text/babel" src="app.jsx"></script>
</body>
</html>
