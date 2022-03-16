require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/Basemap",
  "esri/layers/VectorTileLayer",
  "esri/layers/TileLayer",
  "esri/geometry/Point",
  "esri/layers/FeatureLayer",
], function (
  esriConfig,
  Map,
  MapView,
  Basemap,
  VectorTileLayer,
  TileLayer,
  Point,
  FeatureLayer
) {
  esriConfig.apiKey =
    "AAPKf707d78f72a64902ab2948fb92f097c5GF9NsiP5Mhdw5Dxsl7ZqbKhVIP1Rwn6GKS7G2eeSOSg12DCvCSYYLTG6hvtEDjxU";

  const topoLayer = new VectorTileLayer({
    portalItem: {
      id: "734c12e9904b4a8086d2dff8582a93a1", // Forest and Parks Canvas
    },
  });

  const hillshadeLayer = new TileLayer({
    portalItem: {
      id: "38c860f8dbd24820b2a59ccc9a3dabdb ", // World Hillshade
    },
  });

  const tracks = new FeatureLayer({
    url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Tracks/FeatureServer",
    renderer: trailsRenderer,
  });

  const popupHuts = {
    content:
      "<img src={introductionThumbnail} /><br />" +
      "<h1>{name}</h1><i>{place}, {region}</i><br /><br />" +
      "<b>Facilities:</b> {facilities}<br />" +
      "<b>Status:</b> {status}<br />" +
      "<b>Bookable:</b> {bookable}<br />" +
      "<a href='{staticLink}'>More Info</a>",
  };

  const labelHuts = {
    // autocasts as new LabelClass()
    symbol: {
      type: "text", // autocasts as new TextSymbol()
      color: [43, 43, 43, 255],
      font: {
        // autocast as new Font()
        weight: "bold",
      },
      haloSize: 1,
      haloColor: "white",
    },
    labelPlacement: "below-center",
    labelExpressionInfo: {
      expression: "$feature.name",
    },
  };

  const huts = new FeatureLayer({
    url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Huts/FeatureServer",
    popupTemplate: popupHuts,
    labelingInfo: [labelHuts],
    renderer: hutsRenderer,
  });

  const basemap = new Basemap({
    baseLayers: [hillshadeLayer, topoLayer],
  });

  const map = new Map({
    basemap: basemap, // Basemap layer service
    layers: [tracks, huts],
  });

  const view = new MapView({
    map: map,
    center: new Point({
      x: 1795999,
      y: 5457405,
      spatialReference: { wkid: 2193 },
    }),
    zoom: 10, // Zoom level
    container: "viewDiv", // Div element
  });

  view.popup.defaultPopupTemplateEnabled = true;
});
