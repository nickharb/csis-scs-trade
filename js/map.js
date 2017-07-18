var myGeoJSONPath = 'data/world.geo.json';

var myCustomStyle = {
    stroke: true
}

var circleData = {"objects":[
    {"circle":{"coordinates":[37.8, -96.9]}},
    {"circle":{"coordinates":[39.8, -96.9]}},
    {"circle":{"coordinates":[37.8, -94.9]}},
    {"circle":{"coordinates":[36.8, -97.9]}},
    {"circle":{"coordinates":[37.8, -92.9]}}
]}

$.getJSON(myGeoJSONPath,function(data){
    var map = L.map('map').setView([37.8, -96.9], 4);

    L.geoJson(data, {
        clickable: false,
        style: myCustomStyle
    }).addTo(map);

    var circle = L.circle([37.8, -96.9], {
        radius: 500000,
        className: 'overlay-circle'
    }).addTo(map);

});

