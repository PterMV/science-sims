<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Physics Curriculum Designs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    html, body { margin: 0; padding: 0; background: #f4f4f5; font-family: "Geist", system-ui, sans-serif; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

  <script src="physics-data.js"></script>
  <script type="text/babel" src="design-canvas.jsx"></script>
  <script type="text/babel" src="physics-designs.jsx"></script>

  <script type="text/babel">
    const { DesignCanvas, DCSection, DCArtboard,
            HomepageDesign, M5Discovery, TabsV1, TabsV2, TabsV3, TabsV4 } = window;

    function App() {
      return (
        <DesignCanvas>
          <DCSection
            id="homepage"
            title="A · Physics curriculum homepage"
            subtitle="Unit cards with colour, chapter count, simulation availability"
          >
            <DCArtboard id="home-main" label="Year 11 view · 4-col unit grid" width={1280} height={1080}>
              <HomepageDesign />
            </DCArtboard>
          </DCSection>

          <DCSection
            id="m5-discovery"
            title="B · M5 simulation discovery"
            subtitle="All 20 Year-11 sims, priority-first, filterable by unit"
          >
            <DCArtboard id="m5-discovery-main" label="Discovery page · ★ priority + grouped grid" width={1280} height={1320}>
              <M5Discovery />
            </DCArtboard>
          </DCSection>

          <DCSection
            id="year-tabs"
            title="C · Year 11/12/13 tab navigation"
            subtitle="Four takes using the full unit-colour palette as identity"
          >
            <DCArtboard id="tabs-v1" label="V1 · Segmented w/ colour rail" width={1280} height={260}>
              <TabsV1 active={0} />
            </DCArtboard>
            <DCArtboard id="tabs-v2" label="V2 · Year picker w/ unit swatches" width={1280} height={260}>
              <TabsV2 active={1} />
            </DCArtboard>
            <DCArtboard id="tabs-v3" label="V3 · Pill nav + active legend" width={1280} height={260}>
              <TabsV3 active={2} />
            </DCArtboard>
            <DCArtboard id="tabs-v4" label="V4 · Dark editorial masthead" width={1280} height={300}>
              <TabsV4 active={0} />
            </DCArtboard>
          </DCSection>
        </DesignCanvas>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  </script>
</body>
</html>
