1. Follow the instructions at https://developers.arcgis.com/javascript/latest/display-a-custom-basemap-style/ to update your map to use a custom basemap. Start at the "Add Modules" section.
2. Modify the basemap to display the nz topographic vector basemap item id **734c12e9904b4a8086d2dff8582a93a1** (name the layer variable topoLayer) and the NZ hillshade layer **38c860f8dbd24820b2a59ccc9a3dabdb** (name the variable hillshadeLayer). Remove the line of code setting the opacity of the layer.
3. Update the center property of your map to the Tararuas (NZTM Coordinates)

    a. update your require function to import the point class
    ```
        require([
            "esri/config",
            "esri/Map",
            "esri/views/MapView",
            "esri/Basemap",
            "esri/layers/VectorTileLayer",
            "esri/layers/TileLayer",
            "esri/geometry/Point"
        ], function (
            esriConfig,
            Map,
            MapView,
            Basemap,
            VectorTileLayer,
            TileLayer,
            Point
        ) {
    ```
    b. update the center property of your map to a new point with the NZTM coordinates you wish to center your map on:
    ```
        const view = new MapView({
          map: map,
          center: new Point({ x: 1795999, y: 5457405, spatialReference: { wkid: 2193 } }), // nztm coordinates
          zoom: 3, // Zoom level
          container: "viewDiv", // Div element
        });
    
    ```
    c. update the zoom property of your map to a higher level, e.g. 10

4. Follow the instructions at https://developers.arcgis.com/javascript/latest/add-a-feature-layer/ to add a feature layer. Adapt the instructions to display the following layers:

| Description | URL             |
| ----------- | --------------- |
| Doc Tracks  | https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Tracks/FeatureServer |
| Doc Huts    | https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Huts/FeatureServer   |


5. Replace the calls to map.add with the map layers array. You need to move the layer defenitions to before where you create the map, and then include them in the map layer array like this:

    ```
    const map = new Map({
        basemap: basemap2d,
        layers: [trailsLayer, hutsLayer]
    });
    ```