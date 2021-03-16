1. Follow the instructions at https://developers.arcgis.com/javascript/latest/display-a-pop-up/ to display popups for the huts and trails. You could use something like the following to include images of the huts:

```
const popupHuts = {
    "content": "<img src={introductionThumbnail} /><br />" +
        "<h1>{name}</h1><i>{place}, {region}</i><br /><br />" +
        "<b>Facilities:</b> {facilities}<br />" +
        "<b>Status:</b> {status}<br />" +
        "<b>Bookable:</b> {bookable}<br />" +
        "<a href='{staticLink}'>More Info</a>"
}
```

2. Follow the instructions at ... to display labels for the huts and trails. We used the following to label the huts:
```
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

```