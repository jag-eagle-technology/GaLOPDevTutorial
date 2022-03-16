In this step we are going to use the esri calcite component library to wrap our map with a UI Interface. Lets start by adapting the instructions at https://developers.arcgis.com/calcite-design-system/tutorials/create-a-mapping-app/.

1. add references to the calcite components in the head element of your index.html:

```
...
<title>ArcGIS API for JavaScript Tutorials: Display a map</title>
<script
  src="https://js.arcgis.com/calcite-components/1.0.0-beta.77/calcite.esm.js"
  type="module"
></script>
<link
  rel="stylesheet"
  href="https://js.arcgis.com/calcite-components/1.0.0-beta.77/calcite.css"
/>
<link
  rel="stylesheet"
  href="https://js.arcgis.com/4.22/esri/themes/light/main.css"
/>
<link rel="stylesheet" href="styles.css" />
...
```

2. create the layout using calcite-shell. You'll need to wrap your existing map div in the index.html as below and add the content-behind attribute so that the calcite-shell can display content on top of your map:

```
...
<body class="calcite">
    <calcite-shell content-behind>
        <div id="viewDiv"></div>
    </calcite-shell>
</body>
...

```

3. add a title to your app, using the "header" slot.

```
...
<calcite-shell content-behind>
  <h2 id="header-title" slot="header">
    NZ Tramping Trails
  </h2>
  <div id="viewDiv"></div>
</calcite-shell>
...

```

4. add a shell panel and an action bar to your app (in the index.html file):

```
...
  <h2 id="header-title" slot="header">NZ Tramping Trails</h2>
  <calcite-shell-panel slot="primary-panel" detached>
    <calcite-action-bar slot="action-bar"></calcite-action-bar
  ></calcite-shell-panel>
  <div id="viewDiv"></div>
...
```

5. you'll need to update your map with padding for the action bar (in the map.js file):

```
const view = new MapView({
  map: map,
  center: new Point({
    x: 1795999,
    y: 5457405,
    spatialReference: { wkid: 2193 },
  }),
  zoom: 10, // Zoom level
  container: "viewDiv", // Div element
  padding: {
    left: 49,
  },
});
```

6. add a button to toggle the elevation profile widget to your action bar (in the index.html file):

```
...
<calcite-shell-panel slot="primary-panel" detached>
<calcite-action-bar slot="action-bar">
<calcite-action
        data-action-id="profile"
        icon="altitude"
        text="Profile"
      ></calcite-action>
</calcite-action-bar>
</calcite-shell-panel>
...
```

7. add a panel and container for the elevation profile widget

```
...
  </calcite-action-bar>
  <calcite-panel heading="Elevation Profile" height-scale="1" data-panel-id="profile" hidden>
    <div id="profile"></div>
  </calcite-panel>
</calcite-shell-panel>
...
```

8. update the elevation profile widget so that it renders in this panel, and delete the line that reads view.ui.add(elevationProfile); :

```
const elevationProfile = new ElevationProfile({
view: view,
profiles: [{ type: "ground" }],
container: "profile",
});
```

9. at the end of map.js, there is a line of code starting with view.when. Update everything in this block to match the below. This code handles opening and closing widgets when you click buttons in the app panel:

```
view.when(() => {
  const layerList = new LayerList({
    view: view,
  });

  // Add widget to the top right corner of the view
  view.ui.add(layerList, "top-right");

  let activeWidget;

  // here we define the code which should run when our action bar is clicked
  const handleActionBarClick = ({ target }) => {
    // make sure we are clicking on a calcite action button
    if (target.tagName !== "CALCITE-ACTION") {
      return;
    }

    // check if there is an active widget and if so hide it
    if (activeWidget) {
      document.querySelector(
        `[data-action-id=${activeWidget}]`
      ).active = false;
      document.querySelector(`[data-panel-id=${activeWidget}]`).hidden = true;
    }

    // determine which widget button was clicked. If it's the button for the currently active widget
    // then we just set the active widget to null (as we already hid it), else we hide the current widget and show the next
    const nextWidget = target.dataset.actionId;
    if (nextWidget !== activeWidget) {
      document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
      document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
      activeWidget = nextWidget;
    } else {
      activeWidget = null;
    }
  };
  // here we actually add the code to the action bar
  document.querySelector("calcite-action-bar").addEventListener("click", handleActionBarClick);
});
```
