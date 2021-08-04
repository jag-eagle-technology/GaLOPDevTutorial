1. Follow the instructions at https://developers.arcgis.com/javascript/latest/display-your-location/ (find your geolocation) to display your current location on the map (adding the javascript into your map.js file)
2. Add the elevation profile widget to your map (see https://developers.arcgis.com/javascript/latest/sample-code/widgets-elevation-profile/ for sample code):
    a. in your map.js file, import the widget and the ElevationLayer class: 
    ```
    require([
        "esri/config",
        "esri/Map",
        ...
        "esri/layers/ElevationLayer",
        "esri/widgets/ElevationProfile",
    ], function (
        esriConfig,
        Map,
        ...
        ElevationLayer,
        ElevationProfile,
    ) {
    ```
    b. create a new elevation layer from Eagle's Alpha NZ Elevation Layer (before you create your map): 
    ```
    const elevationLayer = new ElevationLayer({
        portalItem: {
            id: "2ce4fe7d77024e719f8a04d2155b3fd2"
        }
    });
    ```
    c. add this to your map as a ground property. The elevation profile can use the ground property of your map as an elevation source:
    ```
    const elevationLayer = new ElevationLayer({
        portalItem: {
            id: "2ce4fe7d77024e719f8a04d2155b3fd2"
        }
    });
    const map = new Map({
        basemap: basemap2d,
        layers: [trailsLayer, hutsLayer],
        ground: {
            layers: [elevationLayer]
        }
    });
    ```
    d. add the elevation profile widget to your map using the map ground property as it's source:
    ```
        const elevationProfile = new ElevationProfile({ 
            view: view, 
            profiles: [{ type: "ground" }] 
        });
        view.when(function () {
            view.ui.add(elevationProfile);
        });
    ```
    e. position the elevation profile widget by adding the following to the end of your styles file:
    ```
        .esri-elevation-profile.esri-component.esri-widget--panel {
            margin-left: auto;
            margin-right: auto;
            position: absolute !important;
            bottom: 20;
            left: 0;
            right: 0;
            width: 90% !important;
            padding-left: 20 !important;
            padding-right: 20 !important;
        }
    ```
3. Add a basemap switcher to your map (see https://developers.arcgis.com/javascript/latest/change-the-basemap-layer/)
    a. in your map.js file, import the widget: 
    ```
    require([
        "esri/config",
        "esri/Map",
        ...
        "esri/widgets/BasemapGallery",
    ], function (
        esriConfig,
        Map,
        ...
        BasemapGallery,
    ) {

    b. update the name of your existing basemap and add in a couple of additional basemaps
    ```
   ...
   esriConfig.apiKey = "AAPKdc9129c5be29469083dae3516545eeebvHghXVGFueZmm1AJKr4FRJ8Gkpkg2ZrHNiheHk6cGH6qvdp8RMVdW7rPzIgLG4cK";
    const topoLayer = new VectorTileLayer({
        portalItem: {
            id: "734c12e9904b4a8086d2dff8582a93a1" // NZ Topo Relief (Eagle)
        }
    });
    const hillshadeLayer = new TileLayer({
        portalItem: {
            id: "38c860f8dbd24820b2a59ccc9a3dabdb" // NZ Alpha Hillshade (Eagle)
        }
    });
    const topoBasemap = new Basemap({
        baseLayers: [
            hillshadeLayer,
            topoLayer
        ],
        title: "Vector Topographic",
        id: "vectortopographicbasemap"
    });
    const linzTopoLayer = new TileLayer({
        portalItem: {
            id: "85027f060e2b47249a508ada6f44403d" // NZ LINZ Topographic
        },
    });
    const linzBasemap = new Basemap({
        baseLayers: [
            linzTopoLayer
        ],
        title: "LINZ Topographic",
        id: "linzbasemap"
    });
    const imageryLayer = new TileLayer({
        portalItem: {
            id: "d284729222d04a3cb548cfe27716ea43" // NZ imagery
        }
    });
    const imageryBasemap = new Basemap({
        baseLayers: [
            imageryLayer
        ],
        title: "Imagery",
        id: "imagerybasemap"
    });
    ...
        const map = new Map({
        basemap: topoBasemap,
        layers: [trailsLayer, hutsLayer],
        ground: {
            layers: [elevationLayer]
        }
    });
    ...
    ```
    c. add the basemap gallery widget to your map (at the end of the file, before the closing curly brace)
    ```
    const basemapGallery = new BasemapGallery({
        view: view,
        source: [topoBasemap, linzBasemap, imageryBasemap]
    });
    view.ui.add(basemapGallery, "top-right");
    ```