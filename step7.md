In this step we are going to use the esri calcite component library to wrap our map with a UI Interface.

1. Lets start by adapting the instructions at https://developers.arcgis.com/calcite-design-system/tutorials/create-a-mapping-app/.

   a. add references to the calcite components in the head element of your index.html:

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

   b. create the layout using calcite-shell. You'll need to wrap your existing map div in the index.html as below and add the content-behind attribute so that the calcite-shell can display content on top of your map:

   ```
   ...
    <body class="calcite">
        <calcite-shell content-behind>
            <div id="viewDiv"></div>
        </calcite-shell>
    </body>
   ...

   ```

   c. add a title to your app, using the "header" slot.

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

   d. add a shell panel and an action bar to your app:

   ```
   ...
     <h2 id="header-title" slot="header">NZ Tramping Trails</h2>
     <calcite-shell-panel slot="primary-panel" detached>
       <calcite-action-bar slot="action-bar"></calcite-action-bar
     ></calcite-shell-panel>
     <div id="viewDiv"></div>
   ...
   ```
