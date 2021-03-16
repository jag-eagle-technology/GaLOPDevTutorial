We are going to use CIM (Cartographic Information Model) Symbols to apply some advanced styling to our huts and trails. CIM symbols, among other things, allow us to create multi-layered symbols and vector icons. 

# Creating a CIMSymbol from a SVG (Our Hut Renderer is blelow)
1. Open ArcGIS Pro and select start without a template
2. In the catalog pane project tab, right click styles and select new style
3. name the style
4. in the top ribbon seelct styes and then new item -> point symbol
5. Select the point symbol in the center catalog pane and then select properties 
6. Go to the symbol layers and then under form browse for your svg file
7. Adjust the size and color of your symbol, then apply
8. From the styles ribbon select share as web style then share your style with everyone
9. Go to your shared style and copy the item id
10. Go to the CIM builder at https://developers.arcgis.com/javascript/latest/cim-builder/, add a new layer, click the plus sign to the right of "Custom", and then paste in your web style the url https://[your argis org].maps.arcgis.com/sharing/rest/content/items/[item id]
11. Ok, apply to symbol layer, get symbol json, copy json

    https://eaglelabs.maps.arcgis.com/sharing/rest/content/items/791e71b941e2417ab7e377ad042d7fc6

    {
12. Create a renderer for your symbol to apply to your feature layer:
const hutsRenderer = {
    type: "simple",
    symbol: {
        type: "cim",
        data: {
            type: "CIMSymbolReference",
            symbol: ... paste the json you copied from the builder here
        },
    },
}

# Creating CIMSymbols for Lines and Polygons
Some introductory information is at https://developers.arcgis.com/javascript/latest/sample-code/cim-lines-and-polygons/. Our renderer for the trails is below.
1. We use a renderer of type unique-value with an array of uniqueValueInfos to display custom symbols for open and closed traisl
2. We use a CIMLineSymbol with multiple CIMSOlidStroke layers to create solid and dashed cased lines
3. We include a CIMVectorMarker symbol to display closed icons along closed trails

# Using a seperate javascript file to store these symbols
You can reference a seperate javascript file to store these (lengthy) symbols and make your main code easier to read
1. create a file named renderers.js in the same directory as your index.html
2. copy in the renderers included below (or your own customised versions)
3. reference this javascript file in your index.html:
```
    <script src="https://js.arcgis.com/4.18/"></script>
    <script src="renderers.js"></script>
    <script>
```
4. add the renderers to your feature layers:
```
            const hutsLayer = new FeatureLayer({
                url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Huts/FeatureServer",
                popupTemplate: popupHuts,
                labelingInfo: [labelHuts],
                renderer: hutsRenderer,
            });
            const trailsLayer = new FeatureLayer({
                url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Tracks/FeatureServer",
                renderer: trailsRenderer
            });
```

# Our Renderers

```
const trailsRenderer = {
    "type": "unique-value",
    field: "STATUS",
    uniqueValueInfos: [{
        value: "OPEN",
        symbol: {
            "type": "cim",
            data: {
                type: "CIMSymbolReference",
                symbol: {
                    type: "CIMLineSymbol",
                    symbolLayers: [{
                        type: "CIMSolidStroke",
                        enable: true,
                        capStype: "Round",
                        joinStyle: "Round",
                        width: 2.5,
                        color: [214, 45, 65, 255]
                    },
                    {
                        type: "CIMSolidStroke",
                        enable: true,
                        capStype: "Round",
                        joinStyle: "Round",
                        width: 6,
                        color: [255, 255, 255, 255]
                    }
                    ]
                }
            }
        }
    },
    {
        value: "CLSD",
        symbol: {
            "type": "cim",
            data: {
                type: "CIMSymbolReference",
                symbol: {
                    type: "CIMLineSymbol",
                    symbolLayers: [{
                        type: "CIMSolidStroke",
                        effects: [{
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [10, 4, 10, 4],
                            lineDashEnding: "NoConstraint",
                            controlPointEnding: "NoConstraint"
                        }],
                        enable: true,
                        capStype: "Round",
                        joinStyle: "Round",
                        width: 1.8,
                        color: [214, 45, 65, 255]
                    },
                    {
                        type: "CIMSolidStroke",
                        effects: [{
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [10, 4, 10, 4],
                            lineDashEnding: "NoConstraint",
                            controlPointEnding: "NoConstraint"
                        }],
                        enable: true,
                        capStype: "Round",
                        joinStyle: "Round",
                        width: 4,
                        color: [255, 255, 255, 255]
                    },
                    {
                        "type": "CIMVectorMarker",
                        "enable": true,
                        "anchorPointUnits": "Relative",
                        "dominantSizeAxis3D": "Y",
                        "size": 15,
                        "billboardMode3D": "FaceNearPlane",
                        "frame": {
                            "xmin": 0,
                            "ymin": 0,
                            "xmax": 510,
                            "ymax": 510
                        },
                        markerPlacement: {
                            type: "CIMMarkerPlacementAlongLineSameSize",
                            endings: "Custom", // "WithMarkers",
                            placementTemplate: [100], // determines space between each marker
                            angleToLine: false
                        },
                        "markerGraphics": [
                            {
                                "type": "CIMMarkerGraphic",
                                "geometry": {
                                    "rings": [
                                        [
                                            [
                                                128,
                                                280
                                            ],
                                            [
                                                382,
                                                280
                                            ],
                                            [
                                                382,
                                                230
                                            ],
                                            [
                                                128,
                                                230
                                            ],
                                            [
                                                128,
                                                280
                                            ]
                                        ],
                                        [
                                            [
                                                255,
                                                0
                                            ],
                                            [
                                                305,
                                                5
                                            ],
                                            [
                                                352,
                                                19
                                            ],
                                            [
                                                396,
                                                43
                                            ],
                                            [
                                                435,
                                                75
                                            ],
                                            [
                                                467,
                                                114
                                            ],
                                            [
                                                491,
                                                158
                                            ],
                                            [
                                                505,
                                                205
                                            ],
                                            [
                                                510,
                                                255
                                            ],
                                            [
                                                505,
                                                305
                                            ],
                                            [
                                                491,
                                                352
                                            ],
                                            [
                                                467,
                                                396
                                            ],
                                            [
                                                435,
                                                435
                                            ],
                                            [
                                                396,
                                                467
                                            ],
                                            [
                                                352,
                                                491
                                            ],
                                            [
                                                305,
                                                505
                                            ],
                                            [
                                                255,
                                                510
                                            ],
                                            [
                                                205,
                                                505
                                            ],
                                            [
                                                158,
                                                491
                                            ],
                                            [
                                                114,
                                                467
                                            ],
                                            [
                                                75,
                                                435
                                            ],
                                            [
                                                43,
                                                396
                                            ],
                                            [
                                                19,
                                                352
                                            ],
                                            [
                                                5,
                                                305
                                            ],
                                            [
                                                0,
                                                255
                                            ],
                                            [
                                                5,
                                                205
                                            ],
                                            [
                                                19,
                                                158
                                            ],
                                            [
                                                43,
                                                114
                                            ],
                                            [
                                                75,
                                                75
                                            ],
                                            [
                                                114,
                                                43
                                            ],
                                            [
                                                158,
                                                19
                                            ],
                                            [
                                                205,
                                                5
                                            ],
                                            [
                                                255,
                                                0
                                            ]
                                        ]
                                    ]
                                },
                                "symbol": {
                                    "type": "CIMPolygonSymbol",
                                    "symbolLayers": [
                                        {
                                            "type": "CIMSolidFill",
                                            "enable": true,
                                            "color": [
                                                214, 45, 65, 255
                                            ]
                                        }
                                    ]
                                }
                            }
                        ],
                        "scaleSymbolsProportionally": true,
                        "respectFrame": true,
                        "clippingPath": {
                            "type": "CIMClippingPath",
                            "clippingType": "Intersect",
                            "path": {
                                "rings": [
                                    [
                                        [
                                            0,
                                            0
                                        ],
                                        [
                                            510,
                                            0
                                        ],
                                        [
                                            510,
                                            510
                                        ],
                                        [
                                            0,
                                            510
                                        ],
                                        [
                                            0,
                                            0
                                        ]
                                    ]
                                ]
                            }
                        }
                    }
                    ]
                }
            }
        }
    }]
}
```

Here is our rendererer for the huts:
```
const hutsRenderer = {
    type: "simple",
    symbol: {
        type: "cim",
        data: {
            type: "CIMSymbolReference",
            symbol: {
                "type": "CIMPointSymbol",
                "symbolLayers": [
                    {
                        "type": "CIMVectorMarker",
                        "enable": true,
                        "anchorPointUnits": "Relative",
                        "dominantSizeAxis3D": "Y",
                        "size": 35,
                        "billboardMode3D": "FaceNearPlane",
                        "offsetY": 17.5,
                        "frame": {
                            "xmin": 0,
                            "ymin": 0,
                            "xmax": 62.3,
                            "ymax": 90.9
                        },
                        "markerGraphics": [
                            {
                                "type": "CIMMarkerGraphic",
                                "geometry": {
                                    "rings": [
                                        [
                                            [
                                                31.1,
                                                0
                                            ],
                                            [
                                                32,
                                                7.3
                                            ],
                                            [
                                                34.6,
                                                14.5
                                            ],
                                            [
                                                39.3,
                                                22.2
                                            ],
                                            [
                                                51.4,
                                                37.2
                                            ],
                                            [
                                                55.9,
                                                44
                                            ],
                                            [
                                                59.3,
                                                51.9
                                            ],
                                            [
                                                60.4,
                                                59.8
                                            ],
                                            [
                                                59.8,
                                                65.5
                                            ],
                                            [
                                                58.2,
                                                71
                                            ],
                                            [
                                                55.5,
                                                76
                                            ],
                                            [
                                                51.8,
                                                80.4
                                            ],
                                            [
                                                47.4,
                                                84.1
                                            ],
                                            [
                                                42.3,
                                                86.8
                                            ],
                                            [
                                                36.8,
                                                88.4
                                            ],
                                            [
                                                31.1,
                                                89
                                            ],
                                            [
                                                25.2,
                                                88.5
                                            ],
                                            [
                                                19.6,
                                                86.8
                                            ],
                                            [
                                                14.5,
                                                84.2
                                            ],
                                            [
                                                10.1,
                                                80.7
                                            ],
                                            [
                                                6.6,
                                                76.3
                                            ],
                                            [
                                                4,
                                                71.3
                                            ],
                                            [
                                                2.4,
                                                65.8
                                            ],
                                            [
                                                1.9,
                                                59.8
                                            ],
                                            [
                                                3,
                                                51.7
                                            ],
                                            [
                                                6.4,
                                                43.7
                                            ],
                                            [
                                                11,
                                                36.9
                                            ],
                                            [
                                                23.1,
                                                21.9
                                            ],
                                            [
                                                27.7,
                                                14.3
                                            ],
                                            [
                                                30.3,
                                                7.2
                                            ],
                                            [
                                                31.1,
                                                0
                                            ]
                                        ]
                                    ]
                                },
                                "symbol": {
                                    "type": "CIMPolygonSymbol",
                                    "symbolLayers": [
                                        {
                                            "type": "CIMSolidFill",
                                            "enable": true,
                                            "color": [
                                                65,
                                                137,
                                                213,
                                                255
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                "type": "CIMMarkerGraphic",
                                "geometry": {
                                    "rings": [
                                        [
                                            [
                                                31.1,
                                                89
                                            ],
                                            [
                                                25.2,
                                                88.5
                                            ],
                                            [
                                                19.6,
                                                86.8
                                            ],
                                            [
                                                14.5,
                                                84.2
                                            ],
                                            [
                                                10.1,
                                                80.7
                                            ],
                                            [
                                                6.6,
                                                76.3
                                            ],
                                            [
                                                4,
                                                71.3
                                            ],
                                            [
                                                2.4,
                                                65.8
                                            ],
                                            [
                                                1.9,
                                                59.8
                                            ],
                                            [
                                                3,
                                                51.7
                                            ],
                                            [
                                                6.4,
                                                43.7
                                            ],
                                            [
                                                11,
                                                36.9
                                            ],
                                            [
                                                23.1,
                                                21.9
                                            ],
                                            [
                                                27.7,
                                                14.3
                                            ],
                                            [
                                                30.3,
                                                7.2
                                            ],
                                            [
                                                31.1,
                                                0
                                            ],
                                            [
                                                32,
                                                7.3
                                            ],
                                            [
                                                34.6,
                                                14.5
                                            ],
                                            [
                                                39.3,
                                                22.2
                                            ],
                                            [
                                                51.4,
                                                37.2
                                            ],
                                            [
                                                55.9,
                                                44
                                            ],
                                            [
                                                59.3,
                                                51.9
                                            ],
                                            [
                                                60.4,
                                                59.8
                                            ],
                                            [
                                                59.8,
                                                65.5
                                            ],
                                            [
                                                58.2,
                                                71
                                            ],
                                            [
                                                55.5,
                                                76
                                            ],
                                            [
                                                51.8,
                                                80.4
                                            ],
                                            [
                                                47.4,
                                                84.1
                                            ],
                                            [
                                                42.3,
                                                86.8
                                            ],
                                            [
                                                36.8,
                                                88.4
                                            ],
                                            [
                                                31.1,
                                                89
                                            ]
                                        ]
                                    ]
                                },
                                "symbol": {
                                    "type": "CIMPolygonSymbol",
                                    "symbolLayers": [
                                        {
                                            "type": "CIMSolidStroke",
                                            "enable": true,
                                            "capStyle": "Butt",
                                            "joinStyle": "Miter",
                                            "lineStyle3D": "Strip",
                                            "miterLimit": 4,
                                            "width": 3.7795297432027732,
                                            "color": [
                                                255,
                                                255,
                                                255,
                                                255
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                "type": "CIMMarkerGraphic",
                                "geometry": {
                                    "rings": [
                                        [
                                            [
                                                20.61,
                                                65.19
                                            ],
                                            [
                                                42.17,
                                                65.19
                                            ],
                                            [
                                                42.17,
                                                46.14
                                            ],
                                            [
                                                20.61,
                                                46.14
                                            ],
                                            [
                                                20.61,
                                                65.19
                                            ]
                                        ],
                                        [
                                            [
                                                43.66,
                                                43.08
                                            ],
                                            [
                                                44.26,
                                                43.2
                                            ],
                                            [
                                                44.77,
                                                43.54
                                            ],
                                            [
                                                45.11,
                                                44.05
                                            ],
                                            [
                                                45.23,
                                                44.65
                                            ],
                                            [
                                                45.23,
                                                66.76
                                            ],
                                            [
                                                45.11,
                                                67.35
                                            ],
                                            [
                                                44.77,
                                                67.86
                                            ],
                                            [
                                                44.26,
                                                68.2
                                            ],
                                            [
                                                43.66,
                                                68.32
                                            ],
                                            [
                                                19.04,
                                                68.32
                                            ],
                                            [
                                                18.44,
                                                68.2
                                            ],
                                            [
                                                17.93,
                                                67.86
                                            ],
                                            [
                                                17.59,
                                                67.35
                                            ],
                                            [
                                                17.47,
                                                66.76
                                            ],
                                            [
                                                17.47,
                                                44.65
                                            ],
                                            [
                                                17.59,
                                                44.05
                                            ],
                                            [
                                                17.93,
                                                43.54
                                            ],
                                            [
                                                18.44,
                                                43.2
                                            ],
                                            [
                                                19.04,
                                                43.08
                                            ],
                                            [
                                                43.66,
                                                43.08
                                            ]
                                        ]
                                    ]
                                },
                                "symbol": {
                                    "type": "CIMPolygonSymbol",
                                    "symbolLayers": [
                                        {
                                            "type": "CIMSolidFill",
                                            "enable": true,
                                            "color": [
                                                249,
                                                249,
                                                249,
                                                255
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                "type": "CIMMarkerGraphic",
                                "geometry": {
                                    "rings": [
                                        [
                                            [
                                                13.2,
                                                65.7
                                            ],
                                            [
                                                14.2,
                                                65.1
                                            ],
                                            [
                                                15.4,
                                                65.3
                                            ],
                                            [
                                                31.3,
                                                76.6
                                            ],
                                            [
                                                47.3,
                                                65.4
                                            ],
                                            [
                                                48.2,
                                                65.1
                                            ],
                                            [
                                                49.5,
                                                65.7
                                            ],
                                            [
                                                49.7,
                                                66.9
                                            ],
                                            [
                                                49.1,
                                                67.9
                                            ],
                                            [
                                                32.2,
                                                79.6
                                            ],
                                            [
                                                31.4,
                                                79.9
                                            ],
                                            [
                                                30.5,
                                                79.6
                                            ],
                                            [
                                                13.6,
                                                67.9
                                            ],
                                            [
                                                13,
                                                66.9
                                            ],
                                            [
                                                13.2,
                                                65.7
                                            ]
                                        ]
                                    ]
                                },
                                "symbol": {
                                    "type": "CIMPolygonSymbol",
                                    "symbolLayers": [
                                        {
                                            "type": "CIMSolidFill",
                                            "enable": true,
                                            "color": [
                                                249,
                                                249,
                                                249,
                                                255
                                            ]
                                        }
                                    ]
                                }
                            }
                        ],
                        "scaleSymbolsProportionally": true,
                        "respectFrame": true,
                        "clippingPath": {
                            "type": "CIMClippingPath",
                            "clippingType": "Intersect",
                            "path": {
                                "rings": [
                                    [
                                        [
                                            0,
                                            0
                                        ],
                                        [
                                            62.3,
                                            0
                                        ],
                                        [
                                            62.3,
                                            90.9
                                        ],
                                        [
                                            0,
                                            90.9
                                        ],
                                        [
                                            0,
                                            0
                                        ]
                                    ]
                                ]
                            }
                        }
                    }
                ]
            }
        }
    }
}
```