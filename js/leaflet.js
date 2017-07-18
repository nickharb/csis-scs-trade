// var mymap = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1Ijoibmlja2hhcmIiLCJhIjoiY2o1YTB6a3hlMDJydjJxbzdzZXEyZjZnYyJ9.JrmS5tR6qL91DEWh0q5RAQ'
// }).addTo(mymap);

// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: 'red',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(mymap);


var map = L.map('map').setView([-41.2858, 174.7868], 13);
    mapLink = 
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
        }).addTo(map);
            
/* Initialize the SVG layer */
var svgLayer = L.svg();
svgLayer.addTo(map);

// var svg = d3.select("#map").select("svg");
// var g = d3.select("#map").select("svg").select('g');
// g.attr("class", "leaflet-zoom-hide");

/* We simply pick up the SVG from the map object */
var svg = d3.select("#map").select("svg"),
g = svg.append("g");

d3.json("data/circles.json", function(collection) {
    /* Add a LatLng object to each item in the dataset */
    collection.objects.forEach(function(d) {
        d.LatLng = new L.LatLng(d.circle.coordinates[0],
                                d.circle.coordinates[1])
    })
    
    var feature = g.selectAll("circle")
        .data(collection.objects)
        .enter().append("circle")
        .style("stroke", "black")  
        .style("opacity", .6) 
        .style("fill", "red")
        .attr("r", 20);  
    
    map.on("viewreset", update);
    update();

    function update() {
        feature.attr("transform", 
        function(d) { 
            return "translate("+ 
                map.latLngToLayerPoint(d.LatLng).x +","+ 
                map.latLngToLayerPoint(d.LatLng).y +")";
            }
        )
    }
});