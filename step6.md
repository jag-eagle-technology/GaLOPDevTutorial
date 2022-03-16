We'll adapt the sample code at https://developers.arcgis.com/javascript/latest/sample-code/layers-imagery-afrenderer/ to display an AnimatedFlowRenderer layer of wind forecast data. Right now, this layer type is only available through using JavaScript API!

1. In your map.js file, import the ImageryTileLayer layer type:

   ```
   require([
       "esri/config",
       "esri/Map",
       ...
       "esri/layers/ImageryTileLayer"
   ], function (
       esriConfig,
       Map,
       ...
       ImageryTileLayer,
   ) {
   ```

2. Create an imagery tile layer pointing to the url https://tiledimageservices.arcgis.com/hLRlshaEMEYQG5A8/arcgis/rest/services/vector_field_layer/ImageServer and add it to your map layers

```
    const windForecast = new ImageryTileLayer({url: "https://tiledimageservices.arcgis.com/hLRlshaEMEYQG5A8/arcgis/rest/services/vector_field_layer/ImageServer", title: "Wind"});
    ...
    const map = new Map({
        basemap: topoBasemap, // Basemap layer service
        layers: [tracks, huts, windForecast],
        ground: {
        layers: [elevationLayer],
        },
    });

```

3. update the imagery tile layer renderer to use the animated flow renderer:

```
  const windForecast = new ImageryTileLayer({
    url: "https://tiledimageservices.arcgis.com/hLRlshaEMEYQG5A8/arcgis/rest/services/vector_field_layer/ImageServer",
    title: "Wind",
    renderer: {
        type: "animated-flow", // autocasts to new AnimatedFlowRenderer
        lineWidth: "2px",
        lineColor: [50, 120, 240],
        density: 1
    }
  });

```

4. add a bloom effect to the layer to make the lines stand out a bit more. Have a play around with the renderer properties and layer order to try and make things look nice!

```
  const windForecast = new ImageryTileLayer({
    url: "https://tiledimageservices.arcgis.com/hLRlshaEMEYQG5A8/arcgis/rest/services/vector_field_layer/ImageServer",
    title: "Wind",
    renderer: {
      type: "animated-flow", // autocasts to new AnimatedFlowRenderer
      lineWidth: "1px",
      lineColor: [50, 120, 240, 0.3],
      density: 0.5,
    },
    effect: "bloom(2, 0.25px, 0)",
  });

```
