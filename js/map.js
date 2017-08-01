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

// var map = L.map('sm-map').setView([39.0742, 21.8243], 3); // Whole Earth view
var map = L.map('sm-map').setView([18.4438, 110.8517], 4); // SCS view

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
    stroke: true,
    color: '#f0f0f0',
    weight: 2
}

var tradeData = [{"id":"united-states","country":"United States","latlong":"37.0902,-95.7129","percent_of_world_gdp":24.55,"trade_value_high":564.4,"trade_value_low":208.4,"percent_of_trade_high":15.5,"percent_of_trade_low":5.7,"percent_of_gdp_high":3,"percent_of_gdp_low":1.1},
{"id":"china","country":"China","latlong":"35.8617,104.1954","percent_of_world_gdp":14.81,"trade_value_high":2164.3,"trade_value_low":1471.6,"percent_of_trade_high":58.1,"percent_of_trade_low":39.5,"percent_of_gdp_high":19.3,"percent_of_gdp_low":13.1},
{"id":"japan","country":"Japan","latlong":"36.2048,138.2529","percent_of_world_gdp":6.53,"trade_value_high":387.5,"trade_value_low":239.5,"percent_of_trade_high":31,"percent_of_trade_low":19.1,"percent_of_gdp_high":7.8,"percent_of_gdp_low":4.8},
{"id":"india","country":"India","latlong":"23.937761,78.367233","percent_of_world_gdp":2.99,"trade_value_high":214.4,"trade_value_low":189.1,"percent_of_trade_high":34.7,"percent_of_trade_low":30.6,"percent_of_gdp_high":9.5,"percent_of_gdp_low":8.4},
{"id":"south-korea","country":"South Korea","latlong":"35.9078,127.7669","percent_of_world_gdp":1.87,"trade_value_high":537.1,"trade_value_low":423.2,"percent_of_trade_high":59.6,"percent_of_trade_low":46.9,"percent_of_gdp_high":38.1,"percent_of_gdp_low":30},
{"id":"australia","country":"Australia","latlong":"-25.2744,133.7751","percent_of_world_gdp":1.59,"trade_value_high":166.2,"trade_value_low":111.8,"percent_of_trade_high":42.3,"percent_of_trade_low":28.5,"percent_of_gdp_high":13.8,"percent_of_gdp_low":9.3},
{"id":"indonesia","country":"Indonesia","latlong":"-0.7893,113.9213","percent_of_world_gdp":1.23,"trade_value_high":273.4,"trade_value_low":238.9,"percent_of_trade_high":97.8,"percent_of_trade_low":85.4,"percent_of_gdp_high":29.3,"percent_of_gdp_low":25.6},
{"id":"thailand","country":"Thailand","latlong":"15.87,100.9925","percent_of_world_gdp":0.54,"trade_value_high":342,"trade_value_low":303.9,"percent_of_trade_high":83.5,"percent_of_trade_low":74.2,"percent_of_gdp_high":84.1,"percent_of_gdp_low":74.7},
{"id":"hong-kong","country":"Hong Kong","latlong":"22.3964,114.1095","percent_of_world_gdp":0.42,"trade_value_high":369.6,"trade_value_low":369.6,"percent_of_trade_high":37.7,"percent_of_trade_low":37.7,"percent_of_gdp_high":115.2,"percent_of_gdp_low":115.2},
{"id":"phillippines","country":"Philippines","latlong":"12.8797,121.774","percent_of_world_gdp":0.4,"trade_value_high":133.5,"trade_value_low":106.8,"percent_of_trade_high":90.2,"percent_of_trade_low":72.1,"percent_of_gdp_high":43.8,"percent_of_gdp_low":35},
{"id":"singapore","country":"Singapore","latlong":"1.3521,103.8198","percent_of_world_gdp":0.39,"trade_value_high":401.8,"trade_value_low":401.8,"percent_of_trade_high":65.6,"percent_of_trade_low":65.6,"percent_of_gdp_high":135.3,"percent_of_gdp_low":135.3},
{"id":"malaysia","country":"Malaysia","latlong":"4.2105,101.9758","percent_of_world_gdp":0.39,"trade_value_high":250.5,"trade_value_low":212.7,"percent_of_trade_high":68.5,"percent_of_trade_low":58.2,"percent_of_gdp_high":84.5,"percent_of_gdp_low":71.8},
{"id":"sri-lanka","country":"Sri Lanka","latlong":"7.500123,80.781994","percent_of_world_gdp":0.11,"trade_value_high":11.6,"trade_value_low":10.6,"percent_of_trade_high":41.7,"percent_of_trade_low":37.9,"percent_of_gdp_high":14.3,"percent_of_gdp_low":13},
{"id":"bangladesh","country":"Bangladesh","latlong":"24.051156,90.132755","percent_of_world_gdp":0.29,"trade_value_high":35,"trade_value_low":34.7,"percent_of_trade_high":49,"percent_of_trade_low":48.6,"percent_of_gdp_high":15.8,"percent_of_gdp_low":15.7},
{"id":"myanmar","country":"Myanmar","latlong":"20.635777,96.558789","percent_of_world_gdp":0.09,"trade_value_high":21.7,"trade_value_low":20.4,"percent_of_trade_high":78.6,"percent_of_trade_low":73.9,"percent_of_gdp_high":32.2,"percent_of_gdp_low":30.3},
{"id":"vietnam","country":"Vietnam","latlong":"13.240637,108.385145","percent_of_world_gdp":0.27,"trade_value_high":318.4,"trade_value_low":318.4,"percent_of_trade_high":85.6,"percent_of_trade_low":85.6,"percent_of_gdp_high":157.1,"percent_of_gdp_low":157.1},
{"id":"cambodia","country":"Cambodia","latlong":"12.615995,104.863330","percent_of_world_gdp":0.03,"trade_value_high":26.8,"trade_value_low":26.8,"percent_of_trade_high":116.7,"percent_of_trade_low":116.7,"percent_of_gdp_high":134.1,"percent_of_gdp_low":134.1},
{"id":"brunei","country":"Brunei","latlong":"4.463794,114.628811","percent_of_world_gdp":0.02,"trade_value_high":5.8,"trade_value_low":5.8,"percent_of_trade_high":76,"percent_of_trade_low":76,"percent_of_gdp_high":50.9,"percent_of_gdp_low":50.9},
{"id":"taiwan","country":"Taiwan","latlong":"23.714973,120.937792","percent_of_world_gdp":0.7,"trade_value_high":249.1,"trade_value_low":204.8,"percent_of_trade_high":48.8,"percent_of_trade_low":40.1,"percent_of_gdp_high":47,"percent_of_gdp_low":38.7},
{"id":"timor-leste","country":"Timor-Leste","latlong":"-8.807921,125.933983","percent_of_world_gdp":0,"trade_value_high":0.5,"trade_value_low":0.1,"percent_of_trade_high":81.9,"percent_of_trade_low":23.8,"percent_of_gdp_high":0,"percent_of_gdp_low":0},
{"id":"new-zealand","country":"New Zealand","latlong":"-42.936100,172.024610","percent_of_world_gdp":0.24,"trade_value_high":20.9,"trade_value_low":12.8,"percent_of_trade_high":29.9,"percent_of_trade_low":18.3,"percent_of_gdp_high":11.3,"percent_of_gdp_low":6.9}]

var bilateralData = [{"origin":"East Asia","destination":"North America","origin-latlong":"33.053667, 107.933937","destination-latlong":"37.639343, -95.796531","high-end":472575638003,"low-end":128946764105},
{"origin":"East Asia","destination":"South America","origin-latlong":"33.053667, 107.933938","destination-latlong":"-6.229760, -59.765475","high-end":99600436072,"low-end":54471783041},
{"origin":"East Asia","destination":"Middle East","origin-latlong":"33.053667, 107.933939","destination-latlong":"30.294737, 51.732090","high-end":194622825587,"low-end":194622825587},
{"origin":"East Asia","destination":"Africa","origin-latlong":"33.053667, 107.933940","destination-latlong":"3.599309, 24.785304","high-end":132048901733,"low-end":132048901733},
{"origin":"East Asia","destination":"Europe","origin-latlong":"33.053667, 107.933941","destination-latlong":"49.202424, 16.527689","high-end":564964812611,"low-end":564964812611},
{"origin":"East Asia","destination":"South Asia","origin-latlong":"33.053667, 107.933942","destination-latlong":"20.539049, 79.281594","high-end":189972574612,"low-end":189754640039},
{"origin":"North America","destination":"East Asia","origin-latlong":"37.639343, -95.796531","destination-latlong":"33.053667, 107.933937","high-end":141414002999,"low-end":94450593149},
{"origin":"South America","destination":"East Asia","origin-latlong":"-6.229760, -59.765475","destination-latlong":"33.053667, 107.933938","high-end":114125954136,"low-end":94794495361},
{"origin":"Middle East","destination":"East Asia","origin-latlong":"30.294737, 51.732090","destination-latlong":"33.053667, 107.933939","high-end":219288990244,"low-end":219288990244},
{"origin":"Africa","destination":"East Asia","origin-latlong":"3.599309, 24.785304","destination-latlong":"33.053667, 107.933940","high-end":64244133876,"low-end":64244133876},
{"origin":"Europe","destination":"East Asia","origin-latlong":"49.202424, 16.527689","destination-latlong":"33.053667, 107.933941","high-end":407111081409,"low-end":407111081409},
{"origin":"South Asia","destination":"East Asia","origin-latlong":"20.539049, 79.281594","destination-latlong":"33.053667, 107.933942","high-end":78230912673,"low-end":65088113515}];


// ================================================== //
// Initialization
// ================================================== //

$.getJSON(myGeoJSONPath,function(data){
    var displayParameter = 'trade_value_low';

    L.geoJson(data, {
        clickable: false,
        style: myCustomStyle
    }).addTo(map);

    // Map circles
    circles = addCircles(map, tradeData, displayParameter);

    // Sidebar chart
    initChart(map, tradeData);
    redrawChart(displayParameter);

    $('#nav-tab-1 a').click(function(e) {
        e.preventDefault();
        $('.sm-nav-tabs a').removeClass('active');
        $(this).addClass('active');
        $('#sm-chart').fadeIn();
        $('#sm-chart-title').html('Total SCS trade value (billions)');
        redrawChart('trade_value_low');
        circles.clearLayers();
        circles = addCircles(map, tradeData, 'trade_value_low');
    });

    $('#nav-tab-2 a').click(function(e) {
        e.preventDefault();
        $('.sm-nav-tabs a').removeClass('active');
        $(this).addClass('active');
        $('#sm-chart').fadeIn();
        $('#sm-chart-title').html('SCS trade as % of all trade in goods');
        redrawChart('percent_of_trade_low');
        circles.clearLayers();
        circles = addCircles(map, tradeData, 'percent_of_trade_low');
    });

    $('#nav-tab-3 a').click(function(e) {
        e.preventDefault();
        $('.sm-nav-tabs a').removeClass('active');
        $(this).addClass('active');
        $('#sm-chart').fadeIn();
        $('#sm-chart-title').html('SCS trade as % of GDP');
        redrawChart('percent_of_gdp_low');
        circles.clearLayers();
        circles = addCircles(map, tradeData, 'percent_of_gdp_low');
    });
});


// ================================================== //
// Chart constructors
// ================================================== //

// Intra-regional trade map ============================= //

function addCircles(map, data, displayParameter) {
    var c = {};
    var circleArray = [];
    // NOTE: Change this to d3 range
    var multiplier;
    var popupMarkup;

    switch (displayParameter) {
        case 'trade_value_low':
            multiplier = 700;
            break;
        case 'percent_of_trade_low':
            multiplier = 5000;
            break;
        case 'percent_of_gdp_low':
            multiplier = 4000;
            break;
        default:
            console.log('Error');
    }

    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var latitude = d.latlong.split(',')[0];
        var longitude = d.latlong.split(',')[1];
        
        if (displayParameter == 'trade_value_low') {
            popupMarkup = '<p>$'+Math.round(d[displayParameter])+' billion</p><p>'+d.country+'</p>';
        } else {
            popupMarkup = '<p>'+Math.round(d[displayParameter])+'%</p><p>'+d.country+'</p>';
        }
        
        var circle = new L.circle([latitude, longitude], {
            radius: d[displayParameter] * multiplier,
            className: 'overlay-circle'
        });

        circle.data = d; // Attach data to circles
        $(circle._path).attr('id', d.id); // Add unique country id to each circle

        circle.bindPopup(popupMarkup);
        circle.on('mouseover', function (e) {
            console.log(this.data.id)
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


// Intra-regional trade chart ============================= //

function initChart(map, data) {
    // Sort the data in descending order
    // data.sort(function(a, b){
    //     return b[displayParameter] - a[displayParameter];
    // });

    // sidebarWidth = $('#sm-chart').width();

    // var x = d3.scaleLinear()
    //     .domain([0, data[0][displayParameter] ])
    //     .range([0, sidebarWidth - sidebarPadding - 80]);

    svgChart = d3.select('#sm-chart')
        .append('svg')
            .attr('width', 400)
            .attr('height', 300);
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

function redrawChart(parameter) {
    // Sort the data in descending order and get top 10
    var top = tradeData.sort(function(a, b) { return b[parameter] - a[parameter]; }).slice(0, 10);
    var sidebarWidth = $('#sm-chart').width();
    var format = function(t) {
        if (parameter == 'trade_value_low') {
            return '$' + Math.round(t);
        } else {
            return Math.round(t) + '%';
        }
    }

    // Define the domain
    var x = d3.scaleLinear()
        .domain([0, top[0][parameter] ])
        .range([0, sidebarWidth - sidebarPadding - 80]);
    
    var t = d3.transition()
        .duration(750);

    // BIND bar elements to data
    var bar = svgChart.selectAll(".bar")
        .data(top);

    // EXIT old elements not present in new data
    bar.exit()
        // .transition(t)
        // .style("opacity", 0)
        .remove();

    // UPDATE old elements present in new data
    bar.select("rect")
        .transition(t)
        .attr("width", function(d) {
            return x(d[parameter]); // length of each bar
        })
        .attr('id', function(d) { // NOTE: Better way to activate bars from map circles?
            return d['id'] // Attach a country id to each bar to access via map
        });
    bar.select(".label")
        .text(function(d) { return d['country']; });
    bar.select(".value")
        .text(function(d) { return format(d[parameter]); });

    // ENTER new elements present in new data
    var barEnter = bar.enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d, i) {
            return "translate(80," + i * barWidth + ")"; // NOTE: Improve how we y position?
        })
        .on("mouseover", triggerBarMouseover)
        .on("mouseout", triggerBarMouseout);
    
    barEnter.append("rect")
        .attr("width", function(d) {
            return x(d[parameter]); // length of each bar
        })
        .attr("height", barWidth - 1)
        .attr('id', function(d) { // NOTE: Better way to activate bars from map circles?
            return d['id'] // Attach a country id to each bar to access via map
        });

    barEnter.append("text")
        .attr("class", "label")
        .attr("x", -5)
        .attr("y", barWidth / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(function(d) { return d['country']; });

    barEnter.append("text")
        .attr("class", "value")
        .attr("x", 5)
        .attr("y", barWidth / 2)
        .attr("dy", ".35em")
        .text(function(d) { return format(d[parameter]); });
}

function triggerCircleMouseover(id) {
    $('#'+id).addClass('active');
}

function triggerCircleMouseout(id) {
    $('#'+id).removeClass('active');
}

function triggerBarMouseover(d, i) {
    var c = circlesObj[d.country];
    c.openPopup();
    $(c._path).addClass('active');
}

function triggerBarMouseout(d, i) {
    var c = circlesObj[d.country];
    c.closePopup();
    $(c._path).removeClass('active');
}










// Bilateral trade map ============================= //

// function initBilateralLayer(map, data, latlong) {
//     var c;
//     var circleArray = [];
//     var multiplier = 0.5;
//     var formatPopup = function(t) {
//         return '$' + Math.round(t/1000000000) + ' billion';
//     };
//     var formatCircle = function(c) {
//         return c/500000;
//     }

//     var circleOrigin = new L.circle([33.053667, 107.933937], {
//         radius: 100000,
//         className: 'overlay-circle'
//     });
//     circleArray.push(circleOrigin);

//     for (var i = 0; i < data.length; i++) {
//         var d = data[i];
//         var latitude = d[latlong].split(',')[0];
//         var longitude = d[latlong].split(',')[1];

//         var popupMarkup = '<p>'+formatPopup(d['low-end'])+'</p><p>Origin: '+d.origin+'</p><p>Destination: '+d.destination+'</p>';
        
//         // Draw a circle
//         var circle = new L.circle([latitude, longitude], {
//             radius: formatCircle(d['low-end']),
//             className: 'overlay-circle'
//         });

//         // Draw a line from origin to destination
//         var latlngs = [
//             [d['origin-latlong'].split(',')[0], d['origin-latlong'].split(',')[1]],
//             [d['destination-latlong'].split(',')[0], d['destination-latlong'].split(',')[1]]
//         ];
//         var polyline = L.polyline.antPath(latlngs, {
//             lineCap: 'round',
//             className: 'map-line',
//             dashArray: '5, 7',
//             delay: 1500,
//             opacity: 1,
//             weight: 2,
//             pulseColor: '#3E77B9'
//         });

//         circle.bindPopup(popupMarkup);
//         circle.on('mouseover', function (e) {
//             // triggerBilateralMouseover(this.data.id);
//             this.openPopup();
//             $(this._path).addClass('active');
//         });
//         circle.on('mouseout', function (e) {
//             // triggerBilateralMouseout(this.data.id);
//             this.closePopup();
//             $(this._path).removeClass('active');
//         });

//         circleArray.push(circle, polyline);
//     };
    
//     c = L.layerGroup(circleArray).addTo(map);
//     // zoom the map to the polyline
//     // map.fitBounds(c.getBounds());
//     return c;
// }





