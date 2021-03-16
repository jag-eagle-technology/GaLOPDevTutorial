1. Follow the instructions at https://developers.arcgis.com/javascript/latest/display-your-location/ (find your geolocation) to display your current location on the map
2. Add the elevation profile widget to your map (see https://developers.arcgis.com/javascript/latest/sample-code/widgets-elevation-profile/ for sample code):
    a. import the widget and the ElevationLayer class: 
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
    d. add the elevation profile widget to your map using the map ground property as it's source (include this code after where you create your map):
    ```
        const elevationProfile = new ElevationProfile({ 
            view: view, 
            profiles: [{ type: "ground" }] 
        });
        view.when(function () {
            view.ui.add(elevationProfile);
        });
    ```
    e. position the elevation profile widget by adding the following within your styles tag (styles after the ... and before the end tag):
    ```
    <style>
        ...
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
    </style>
    
    ```