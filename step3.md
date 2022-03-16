1. Enable default popups by adding the following code after you define your view: 
``` 
view.popup.defaultPopupTemplateEnabled = true; 
```
2. Adapt the instructions at https://developers.arcgis.com/javascript/latest/display-a-pop-up/#display-attributes to customise the popup for huts. You'll need to start at the "Display Attributes" section. You could use something like the following to include images of the huts:

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

3. Adapt the instructions on labelling at https://developers.arcgis.com/javascript/latest/style-a-feature-layer/ to display labels for huts. We used the following to label the huts:
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