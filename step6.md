We will be customising the example at https://developers.arcgis.com/javascript/latest/sample-code/views-switch-2d-3d/ to allow switching between a 2d and 3d view of our map
1. Add a button to allow switching between the views:
(this code goes below the div for you map)
```
    <div id="infoDiv">
        <input class="esri-component esri-widget--button esri-widget esri-interactive" type="button" id="switch-btn"
            value="3D" />
    </div>
```
(these styles go inside your style tag)
```
    #infoDiv {
        position: absolute;
        top: 15px;
        left: 60px;
    }

    #infoDiv input {
        border: none;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px;
    }
```
2. Import the SceneView to display a 3d view:
```
...
"esri/views/SceneView",
...
SceneView
```
3. create a second map for the 3d view: 
    a. copy the code for the first map
    b. rename the first map variable to map2d and the second map variable to map3d
4. You will need to define layers for both the 2d and 3d maps. 
    a. duplicate the code defining both the huts and trail layers 
    b. rename the first set to hutsLayer2d/trailsLayer2d and the second to hutsLayer3d/trailsLayer3d
    c. remove the custom renderer from the 3d trails layer (CIM Symbols for lines and polygons aren't currently supported in 3d views)
    d. do the same for the elevation layer
    e. update the 3d map to point to the 3d layers (and change the variables of the 2d map to reflect your new 2d variable names)
5. create a basemap for the 3d map
    a. add a new tile layer pointing to the TileLayer portal item id **d284729222d04a3cb548cfe27716ea43** (NZ - Imagery - latest (Eagle))
    b. create a new basemap (basemap3d) including just this new imagery layer
    c. update the 3d map to use this basemap
6. add an object variable to store the state of your map app (add this to the top of your javascript under where you define your api key):
```
var appConfig = {
    mapView: null,
    sceneView: null,
    activeView: null,
    container: "viewDiv" // use same container for views
};
```
7. Create a second object variable to store the initial state of your map app (add this code underneath the appConfig variable):
```
var initialViewParams = {
    center: new Point({ x: 1795999, y: 5457405, spatialReference: { wkid: 2193 } }),
    zoom: 12,
    container: appConfig.container
};
```
8. update widgets to point to app config 
    a. duplicate widget code - 2d and 3d variants
    b. update the view references for the 2d variant to appConfig.mapView and for the 3d variant to appConfig.sceneView
9. add code to create view (function) - end of file
```
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
```
10. add code to initialise view using the create view function (after creating your map objects and before adding widgets to the view)
```
// create 2D view and and set active
// initialViewParams.map = map2d;
appConfig.mapView = createView(initialViewParams, "2d");
appConfig.mapView.map = map2d;
appConfig.activeView = appConfig.mapView;

// create 3D view, won't initialize until container is set
initialViewParams.container = null;
initialViewParams.map = map3d;
appConfig.sceneView = createView(initialViewParams, "3d");
```
11. add switching code (just above the createView function)
```
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
```