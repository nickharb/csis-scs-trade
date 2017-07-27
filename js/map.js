// ================================================== //
// Global variables
// ================================================== //

// Data path
var myGeoJSONPath = 'data/world.geo.json';

// Parameters
var ratData = [400, 900, 300, 600];
var newData = [800, 200, 400, 500, 100];
var barWidth = 20;
var barSpacing = 10;
var sidebarPadding = 10;

// Global variables
var circles;
var circlesObj;
var svgChart;
var sidebarWidth;

// var map = L.map('sm-map').setView([39.0742, 21.8243], 3); // Whole Earth view
var map = L.map('sm-map').setView([12.4438, 132.8517], 3); // SCS view

mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

// L.tileLayer(
// 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// attribution: '&copy; ' + mapLink + ' Contributors',
// maxZoom: 18,
// }).addTo(map);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1Ijoibmlja2hhcmIiLCJhIjoiY2o1YTB6a3hlMDJydjJxbzdzZXEyZjZnYyJ9.JrmS5tR6qL91DEWh0q5RAQ'
// }).addTo(map);

var myCustomStyle = {
    stroke: true
}

var tradeData = {"features":[{"id":"united-states","country":"United States","latitude":37.0902,"longitude":-95.7129,"percent_of_world_gdp":24.54880057,"trade_value_high":564.445,"trade_value_low":208.4236506,"percent_of_trade_high":15.49448549,"percent_of_trade_low":5.721402848,"percent_of_gdp_high":3.039700362,"percent_of_gdp_low":1.12242193},
{"id":"china","country":"China","latitude":35.8617,"longitude":104.1954,"percent_of_world_gdp":14.80554152,"trade_value_high":2164.31892,"trade_value_low":1471.57093,"percent_of_trade_high":58.08606989,"percent_of_trade_low":39.49407413,"percent_of_gdp_high":19.32575111,"percent_of_gdp_low":13.14002908},
{"id":"japan","country":"Japan","latitude":36.2048,"longitude":138.2529,"percent_of_world_gdp":6.529985327,"trade_value_high":387.4834341,"trade_value_low":239.5373546,"percent_of_trade_high":30.9540199,"percent_of_trade_low":19.13538332,"percent_of_gdp_high":7.84477257,"percent_of_gdp_low":4.849539113},
{"id":"south-korea","country":"South Korea","latitude":35.9078,"longitude":127.7669,"percent_of_world_gdp":1.865700898,"trade_value_high":537.0795578,"trade_value_low":423.2086169,"percent_of_trade_high":59.55050973,"percent_of_trade_low":46.92468461,"percent_of_gdp_high":38.05712922,"percent_of_gdp_low":29.98830394},
{"id":"australia","country":"Australia","latitude":-25.2744,"longitude":133.7751,"percent_of_world_gdp":1.59253215,"trade_value_high":166.1975872,"trade_value_low":111.817106,"percent_of_trade_high":42.29788457,"percent_of_trade_low":28.45785624,"percent_of_gdp_high":13.79672248,"percent_of_gdp_low":9.282382536},
{"id":"indonesia","country":"Indonesia","latitude":-0.7893,"longitude":113.9213,"percent_of_world_gdp":1.232469244,"trade_value_high":273.3914676,"trade_value_low":238.9027074,"percent_of_trade_high":97.75938339,"percent_of_trade_low":85.42688466,"percent_of_gdp_high":29.32569334,"percent_of_gdp_low":25.62621137},
{"id":"thailand","country":"Thailand","latitude":15.87,"longitude":100.9925,"percent_of_world_gdp":0.537851923,"trade_value_high":341.9632918,"trade_value_low":303.9235134,"percent_of_trade_high":83.48854279,"percent_of_trade_low":74.20133056,"percent_of_gdp_high":84.05357421,"percent_of_gdp_low":74.70350825},
{"id":"hong-kong","country":"Hong Kong","latitude":22.3964,"longitude":114.1095,"percent_of_world_gdp":0.424253759,"trade_value_high":369.6053012,"trade_value_low":0,"percent_of_trade_high":37.73791545,"percent_of_trade_low":0,"percent_of_gdp_high":115.1733279,"percent_of_gdp_low":0},
{"id":"phillippines","country":"Philippines","latitude":12.8797,"longitude":121.774,"percent_of_world_gdp":0.403092343,"trade_value_high":133.5442144,"trade_value_low":106.7614854,"percent_of_trade_high":90.22076334,"percent_of_trade_low":72.12669416,"percent_of_gdp_high":43.79857207,"percent_of_gdp_low":35.01462519},
{"id":"singapore","country":"Singapore","latitude":1.3521,"longitude":103.8198,"percent_of_world_gdp":0.392595874,"trade_value_high":401.7533655,"trade_value_low":0,"percent_of_trade_high":65.61983384,"percent_of_trade_low":0,"percent_of_gdp_high":135.2861118,"percent_of_gdp_low":0},
{"id":"malaysia","country":"Malaysia","latitude":4.2105,"longitude":101.9758,"percent_of_world_gdp":0.391793943,"trade_value_high":250.4699781,"trade_value_low":212.702462,"percent_of_trade_high":68.5271163,"percent_of_trade_low":58.19414552,"percent_of_gdp_high":84.5156981,"percent_of_gdp_low":71.77186345}]}


// ================================================== //
// Initialization
// ================================================== //

$.getJSON(myGeoJSONPath,function(data){
    var displayParameter = 'trade_value_high';

    L.geoJson(data, {
        clickable: false,
        style: myCustomStyle
    }).addTo(map);

    circles = addCircles(map, tradeData.features, displayParameter);
    initChart(map, tradeData.features, displayParameter);

    $('#nav-tab-1 a').click(function(e) {
        e.preventDefault();
        $('#sm-chart-title').html('Total trade value through the South China Sea');
        updateChart(map, tradeData.features, 'trade_value_high');
        circles.clearLayers();
        circles = addCircles(map, tradeData.features, 'trade_value_high');
    });

    $('#nav-tab-2 a').click(function(e) {
        e.preventDefault();
        $('#sm-chart-title').html('South China Sea Trade as a percentage of all trade');
        updateChart(map, tradeData.features, 'percent_of_trade_high');
        circles.clearLayers();
        circles = addCircles(map, tradeData.features, 'percent_of_trade_high');
    });

    $('#nav-tab-3 a').click(function(e) {
        e.preventDefault();
        $('#sm-chart-title').html('South China Sea Trade as a percentage of GDP');
        updateChart(map, tradeData.features, 'percent_of_gdp_high');
        circles.clearLayers();
        circles = addCircles(map, tradeData.features, 'percent_of_gdp_high');
    });
});


// ================================================== //
// Chart constructors
// ================================================== //

function addCircles(map, data, displayParameter) {
    var c = {};
    var circleArray = [];
    // NOTE: Change this to d3 range
    var multiplier;

    switch (displayParameter) {
        case 'trade_value_high':
            multiplier = 1000;
            break;
        case 'percent_of_trade_high':
            multiplier = 10000;
            break;
        case 'percent_of_gdp_high':
            multiplier = 10000;
            break;
        default:
            console.log('Error');
    }

    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var popupMarkup = '<p>'+d.country+'</p><p>'+Math.round(d[displayParameter])+'</p>';
        
        var circle = new L.circle([d.latitude, d.longitude], {
            radius: d[displayParameter] * multiplier,
            className: 'overlay-circle'
        });

        circle.data = d; // Attach data to circles
        $(circle._path).attr('id', d.id); // Add unique country id to each circle

        circle.bindPopup(popupMarkup);
        circle.on('mouseover', function (e) {
            // console.log()
            triggerCircleMouseover(this.data.id);
            this.openPopup();
            $(this._path).addClass('active');
        });
        circle.on('mouseout', function (e) {
            triggerCircleMouseout(this.data.id);
            this.closePopup();
            $(this._path).removeClass('active');
        });

        circleArray.push(circle);

        c[d.country] = circle;
    };
    circlesObj = c;
    c = L.layerGroup(circleArray).addTo(map);
    return c;
}

function initChart(map, data, displayParameter) {
    // Sort the data in descending order
    data.sort(function(a, b){
        return b[displayParameter] - a[displayParameter];
    });

    sidebarWidth = $('#sm-chart').width();

    var x = d3.scaleLinear()
        .domain([0, data[0][displayParameter] ])
        .range([0, sidebarWidth - sidebarPadding - 80]);

    svgChart = d3.select('#sm-chart')
        .append('svg')
            .attr('width', 400)
            .attr('height', 300);

    var bar = svgChart.selectAll("g")
        .data(tradeData.features)
        .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(0," + i * barWidth + ")";
        });

    bar.append("text")
        .attr("x", 0)
        .attr("y", barWidth / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d['country']; });

    bar.append("rect")
        .attr("width", function(d) {
            return x(d[displayParameter]); // length of each bar
        })
        .attr("height", barWidth - 1)
        .attr('fill', '#3E77B9')
        .attr("transform", function(d, i) {
            return "translate(" + 80 + ",0)";
        })
        .attr('id', function(d) {
            return d['id'] // Attach a country id to each bar to access via map
        })
        .on("mouseover", triggerBarMouseover)
        .on("mouseout", triggerBarMouseout);

    bar.append("text")
        .attr("x", 5)
        .attr("y", barWidth / 2)
        .attr("dy", ".35em")
        .attr('class', 'bar-label')
        .text(function(d) { return Math.round(d[displayParameter]); })
        .attr("transform", function(d, i) {
            return "translate(" + 80 + ",0)";
        });
}

// ================================================== //
// Event handlers
// ================================================== //

// DROPDOWN MENU HANDLER
// function initEventHandlers() {
//     var menu = d3.select("#menu select")
//         .on("change", change);
// }

// D3 CSV DATA IMPORT FUNCTION
// d3.csv("states-age.csv", function(data) {
//   states = data;

//   var ages = d3.keys(states[0]).filter(function(key) {
//     return key != "State" && key != "Total";
//   });

//   states.forEach(function(state) {
//     ages.forEach(function(age) {
//       state[age] = state[age] / state.Total;
//     });
//   });

//   menu.selectAll("option") // DYNAMICALLY ADD OPTIONS TO DROPDOWN MENU
//       .data(ages)
//     .enter().append("option")
//       .text(function(d) { return d; });

//   menu.property("value", "18 to 24 Years"); // SET CURRENT DROPDOWN PROPERTY

//   redraw(); // CREATE REDRAW FUNCTION TO UPDATE CHART
// });

function updateChart(map, data, displayParameter) {
    // Sort the data in descending order
    data.sort(function(a, b){
        return b[displayParameter] - a[displayParameter];
    });

    sidebarWidth = $('#sm-chart').width();

    var x = d3.scaleLinear()
        .domain([0, data[0][displayParameter] ])
        .range([0, sidebarWidth - sidebarPadding - 80]);

    var bar = svgChart.selectAll("g")
        .attr("transform", function(d, i) {
            return "translate(0," + i * barWidth + ")";
        });

    bar.selectAll('rect')
        .transition()
        .duration(500)
        .attr("width", function(d) {
            return x(d[displayParameter]); // length of each bar
        });

    bar.selectAll('.bar-label')
        .text(function(d) { return Math.round(d[displayParameter]); });

    // Update map
    // $.each(circles, function(index, country) {
    //     console.log( country );
    //     // country.radius = data[displayParameter] * 1000;
    //     country.setStyle({fill: "#EA3B33"});
    // });
}

function triggerCircleMouseover(id) {
    d3.select('#'+id)
        .attr("fill", "#EA3B33");
}

function triggerCircleMouseout(id) {
    d3.select('#'+id)
        .attr("fill", '#3E77B9');
}

function triggerBarMouseover(d, i) {
    var c = circlesObj[d.country];
    c.openPopup();
    $(c._path).addClass('active');
    d3.select(this)
        .attr("fill", "#EA3B33");
}

function triggerBarMouseout(d, i) {
    var c = circlesObj[d.country];
    c.closePopup();
    $(c._path).removeClass('active');
    d3.select(this)
        .attr("fill", '#3E77B9');
}





