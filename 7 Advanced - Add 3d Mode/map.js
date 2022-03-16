require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Basemap",
    "esri/layers/VectorTileLayer",
    "esri/layers/TileLayer",
    "esri/geometry/Point",
    "esri/layers/FeatureLayer",
    "esri/widgets/Locate",
    "esri/layers/ElevationLayer",
    "esri/widgets/ElevationProfile",
    "esri/widgets/BasemapGallery",
    "esri/views/SceneView",
], function (
    esriConfig,
    Map,
    MapView,
    Basemap,
    VectorTileLayer,
    TileLayer,
    Point,
    FeatureLayer,
    Locate,
    ElevationLayer,
    ElevationProfile,
    BasemapGallery,
    SceneView
) {
    esriConfig.apiKey = "AAPKdc9129c5be29469083dae3516545eeebvHghXVGFueZmm1AJKr4FRJ8Gkpkg2ZrHNiheHk6cGH6qvdp8RMVdW7rPzIgLG4cK";
    var appConfig = {
        mapView: null,
        sceneView: null,
        activeView: null,
        container: "viewDiv"
    };
    var initialViewParams = {
        center: new Point({ x: 1795999, y: 5457405, spatialReference: { wkid: 2193 } }),
        zoom: 12,
        container: appConfig.container,
        popup: {
            defaultPopupTemplateEnabled: true
        }
    };
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
    const popupHuts = {
        "content": "<img src={introductionThumbnail} /><br />" +
            "<h1>{name}</h1><i>{place}, {region}</i><br /><br />" +
            "<b>Facilities:</b> {facilities}<br />" +
            "<b>Status:</b> {status}<br />" +
            "<b>Bookable:</b> {bookable}<br />" +
            "<a href='{staticLink}'>More Info</a>"
    }
    const labelHuts = {
        // autocasts as new LabelClass()
        symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: [43, 43, 43, 255],
            font: {
                // autocast as new Font()
                weight: "bold"
            },
            haloSize: 1,
            haloColor: "white"
        },
        labelPlacement: "below-center",
        labelExpressionInfo: {
            expression: "$feature.name"
        }
    };
    const hutsLayer2d = new FeatureLayer({
        url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Huts/FeatureServer",
        popupTemplate: popupHuts,
        labelingInfo: [labelHuts],
        renderer: hutsRenderer,
    });
    const trailsLayer2d = new FeatureLayer({
        url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Tracks/FeatureServer",
        renderer: trailsRenderer
    });
    const hutsLayer3d = new FeatureLayer({
        url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Huts/FeatureServer",
        popupTemplate: popupHuts,
        labelingInfo: [labelHuts],
        renderer: hutsRenderer,
    });
    const trailsLayer3d = new FeatureLayer({
        url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Tracks/FeatureServer",
    });
    const elevationLayer2d = new ElevationLayer({
        portalItem: {
            id: "2ce4fe7d77024e719f8a04d2155b3fd2"
        }
    });
    const elevationLayer3d = new ElevationLayer({
        portalItem: {
            id: "2ce4fe7d77024e719f8a04d2155b3fd2"
        }
    });
    const map2d = new Map({
        basemap: topoBasemap,
        layers: [trailsLayer2d, hutsLayer2d],
        ground: {
            layers: [elevationLayer2d]
        }
    });
    const map3d = new Map({
        basemap: imageryBasemap,
        layers: [trailsLayer3d, hutsLayer3d],
        ground: {
            layers: [elevationLayer3d]
        }
    });
    // create 2D view and and set active
    // initialViewParams.map = map2d;
    appConfig.mapView = createView(initialViewParams, "2d");
    appConfig.mapView.map = map2d;
    appConfig.activeView = appConfig.mapView;

    // create 3D view, won't initialize until container is set
    initialViewParams.container = null;
    initialViewParams.map = map3d;
    appConfig.sceneView = createView(initialViewParams, "3d");
    const locate2d = new Locate({
        view: appConfig.mapView,
        useHeadingEnabled: false,
        goToOverride: function (view, options) {
            options.target.scale = 1500;
            return view.goTo(options.target);
        }
    });
    appConfig.mapView.ui.add(locate2d, "top-left");
    const basemapGallery = new BasemapGallery({
        view: appConfig.mapView,
        source: [topoBasemap, linzBasemap, imageryBasemap]
    });
    appConfig.mapView.ui.add(basemapGallery, "top-right");
    const elevationProfile2d = new ElevationProfile({
        view: appConfig.mapView,
        profiles: [{ type: "ground" }]
    });
    appConfig.mapView.when(function () {
        appConfig.mapView.ui.add(elevationProfile2d);
    });
    const locate3d = new Locate({
        view: appConfig.sceneView,
        useHeadingEnabled: false,
        goToOverride: function (view, options) {
            options.target.scale = 1500;
            return view.goTo(options.target);
        }
    });
    appConfig.sceneView.ui.add(locate3d, "top-left");
    const elevationProfile3d = new ElevationProfile({
        view: appConfig.sceneView,
        profiles: [{ type: "ground" }]
    });
    appConfig.sceneView.when(function () {
        appConfig.sceneView.ui.add(elevationProfile3d);
    });
    // switch the view between 2D and 3D each time the button is clicked
    var switchButton = document.getElementById("switch-btn");
    switchButton.addEventListener("click", function () {
        switchView();
    });

    // Switches the view from 2D to 3D and vice versa
    function switchView() {
        var is3D = appConfig.activeView.type === "3d";
        var activeViewpoint = appConfig.activeView.viewpoint.clone();

        // remove the reference to the container for the previous view
        appConfig.activeView.container = null;

        if (is3D) {
            // if the input view is a SceneView, set the viewpoint on the
            // mapView instance. Set the container on the mapView and flag
            // it as the active view
            appConfig.mapView.viewpoint = activeViewpoint;
            appConfig.mapView.container = appConfig.container;
            appConfig.activeView = appConfig.mapView;
            switchButton.value = "3D";
        } else {
            appConfig.sceneView.viewpoint = activeViewpoint;
            appConfig.sceneView.container = appConfig.container;
            appConfig.activeView = appConfig.sceneView;
            switchButton.value = "2D";
        }
    }
    // convenience function for creating a 2D or 3D view
    function createView(params, type) {
        var view;
        var is2D = type === "2d";
        if (is2D) {
            view = new MapView(params);
            return view;
        } else {
            view = new SceneView(params);
        }
        return view;
    }
});