var ratData = [400, 900, 300, 600];
var newData = [800, 200, 400, 500, 100];
var barWidth = 30;
var barSpacing = 10;

// Global variables
var svg;

$(function() {
    initializeChart();
    attachEventListeners();
});

function initializeChart() {
    svg = d3.select('body')
            .append('svg')
              .attr('width', 500)
              .attr('height', 500);

    svg.selectAll('rect')
      .data(ratData)
      .enter()
      .append('rect')
        .attr('x', function(d, i){
          return i * (barWidth + barSpacing);
        })
        .attr('width', barWidth)
        .attr('fill', 'lightblue')
        .attr('height', function(d){
          return d/10 * 3;
        })
        .attr('y', function(d){
          return svg.attr('height') - d/10 * 3;
        });
}

function updateData() {
    var selection = svg.selectAll('rect')
                  .data(newData);

    selection.enter()
      .append('rect')
      .attr('x', function(d, i){
        return i * (barWidth + barSpacing);
      })
      .attr('width', barWidth)
      .attr('fill', '#d1c9b8')
      .merge(selection)  // ENTER + UPDATE selections
      // everything below now happens to all five bars
      .transition()
      .duration(1000)
      .attr('height', function(d){
        return d/10 * 3;
      })
      .attr('y', function(d){
        return svg.attr('height') - d/10 * 3;
      });
}

function attachEventListeners() {
    $('#update-button').click(function() {
        updateData();
    });
}




// var ratData = [400, 900, 300, 600];

// var svg = d3.select('body')
//             .append('svg')
//               .attr('width', 500)
//               .attr('height', 150);

// function drawChart(dataArray){
//     // create a selection and bind data
//     var selection = svg.selectAll('rect')
//                        .data(dataArray);

//     // create new elements wherever needed                   
//     selection.enter()
//       .append('rect')
//       .attr('x', function(d, i){
//         return i * 25;
//       })
//       .attr('width', 15)
//       .attr('fill', '#d1c9b8')
//       .merge(selection) // merge new elements with existing ones, so everything below applies to all
//       .transition()
//       .duration(1000)
//       .attr('height', function(d){
//         return d/10 * 1.5;
//       })
//       .attr('y', function(d){
//         return 150 - d/10 * 1.5;
//       });
    
//     // remove any unused bars
//     selection.exit()
//       .remove();
// }

// drawChart(ratData);

// // Now try opening up the console and calling drawChart() with different data arrays.
// // The chart will update with the correct number and size of bars.
// // drawChart([200, 300, 400, 500, 600, 700])
// // drawChart([800, 700, 600])
// // and so on



