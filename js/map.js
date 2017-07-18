var mapDiv = document.getElementById('map');
var svg = d3.select(mapDiv).append('svg');

// Extract the width and height that was computed by CSS
var width = mapDiv.clientWidth;
var height = mapDiv.clientHeight;

// Use the extracted size to set the size of an SVG element
svg
  .attr('width', width)
  .attr('height', height);

var neighborhoods = svg.append('g');
var circles = svg.append('g');

var albersProjection = d3.geoAlbers()
  .scale(190000)
  .rotate([71.057, 0])
  .center([0, 42.313])
  .translate([width/2, height/2]);

var geoPath = d3.geoPath()
    .projection(albersProjection);

neighborhoods.selectAll('path')
  .data(neighborhoods_json.features)
  .enter()
  .append('path')
  .attr('d', geoPath);

circles.selectAll('circle')
    .data(ratcount_json.features)
    .enter()
    .append('circle')
    .attr('r', function(d) { return d.properties.ratcount * 0.5; })
    .attr("transform", function(d) {
        return "translate(" + albersProjection([
        d.geometry.coordinates[0],
        d.geometry.coordinates[1]
    ]) + ")" });
    













// // Choropleth
// neighborhoods.selectAll('path')
//   .data(neighborhoods_json.features)
//   .enter()
//   .append('path')
//   .attr('fill', function(d) {
//     // Convert density scale to rgb scale
//     var linearScale = d3.scaleLinear()
//         .domain([0,150.94])
//         .range([0,255]);
//     var r = linearScale(d.properties.density);
//     return d3.rgb(r, 0, 0);
//   })
//   .attr('d', geoPath);


