// ================================================== //
// Global variables
// ================================================== //

// Parameters
var parameter = 'scs_exports'; // Set initial display parameter
var year = 2016 // Set initial year
var ratData = [400, 900, 300, 600];
var newData = [800, 200, 400, 500, 100];
var barWidth = 20;
var barSpacing = 10;
var sidebarPadding = 10;
var marginLeft = 90;

// Global variables
var circles;
var circlesObj;
var svgChart;

var map = L.map('sm-map').setView([35.707445, 8.979712], 2); // Whole Earth view
// var map = L.map('sm-map').setView([18.4438, 110.8517], 4); // SCS view

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

var topEconomies = [
    "United States",
    "China",
    "Japan",
    "Germany",
    "United Kingdom",
    "France",
    "India",
    "Italy",
    "Brazil",
    "Canada"
];

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

$.getJSON('data/world.geo.json' ,function(data){
    L.geoJson(data, {
        clickable: false,
        style: myCustomStyle
    }).addTo(map);

    map.scrollWheelZoom.disable()

    // Import trade data
    d3.csv('data/scs-trade.csv', function(data) {

        // Convert percentage strings into float numbers
        data.forEach(function(datum) {
            datum['scs_trade_percent_total_trade'] = parseFloat(datum['scs_trade_percent_total_trade']);
        });

        // menu.selectAll("option") // Add options to menu
        //     .data(ages)
        //     .enter().append("option")
        //     .text(function(d) { return d; });

        // menu.property("value", "18 to 24 Years"); // Set current option

        initEventHandlers(data);

        // // Draw map circles and charts
        circles = addCircles(map, data, parameter); // Map circles
        initChart(map, data); // Sidebar chart
        redrawChart(data, parameter); // Call redraw
    });
});


// ================================================== //
// Chart constructors
// ================================================== //

// Intra-regional trade map ============================= //

function addCircles(map, data, parameter) {
    var c = {};
    var circleArray = [];
    // NOTE: Change this to d3 range
    var multiplier;
    var popupMarkup;
    var format = function(t) {
        if (parameter == 'scs_trade_percent_total_trade') {
            var p;
            var x = parseFloat(t);
            if (x > 100) {
                p = '~100%';
            } else {
                p = Math.round(x) + '%';
            }
            return p;
        } else {
            var p;
            var t = Math.round(t/1000000000);
            if (t < 1) {
                p = 'Less than $1 billion';
            } else {
                p = '$' + t + ' billion';
            }
            return p;
        }
    }

    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var latitude = d.latitude;
        var longitude = d.longitude;
        var multiplier = (parameter == 'scs_trade_percent_total_trade') ? 70000 : 2;
        var radius = Math.sqrt(parseFloat(d[parameter])/Math.PI)*multiplier;

        popupMarkup = '<p>'+format(d[parameter])+'</p><p>'+d.country+'</p>';
        
        if (Math.round(parseFloat(d[parameter])) !== 0) {
            var circle = new L.circle([latitude, longitude], {
                radius: radius,
                className: 'overlay-circle'
            });

            circle.data = d; // Attach data to circles
            $(circle._path).attr('id', d.id); // Add unique country id to each circle

            circle.bindPopup(popupMarkup);
            circle.on('mouseover', function (e) {
                triggerCircleMouseover(this.data['iso_code']);
                this.openPopup();
                $(this._path).addClass('active');
            });
            circle.on('mouseout', function (e) {
                triggerCircleMouseout(this.data['iso_code']);
                this.closePopup();
                $(this._path).removeClass('active');
            });

            circleArray.push(circle);

            c[d.country] = circle;
        }
    };
    circlesObj = c;
    c = L.layerGroup(circleArray).addTo(map);
    return c;
}


// Intra-regional trade chart ============================= //

function initChart(map, data) {
    // Sort the data in descending order
    // data.sort(function(a, b){
    //     return b[parameter] - a[parameter];
    // });

    // sidebarWidth = $('#sm-chart').width();

    // var x = d3.scaleLinear()
    //     .domain([0, data[0][parameter] ])
    //     .range([0, sidebarWidth - sidebarPadding - 80]);

    svgChart = d3.select('#sm-chart')
        .append('svg')
            .attr('width', 400)
            .attr('height', 300);
}


// ================================================== //
// Event handlers
// ================================================== //

function initEventHandlers(data) {
    // var menu = d3.select("#menu select")
    //     .on("change", change);

    $('#nav-tab-1 a').click(function(e) {
        e.preventDefault();
        parameter = 'scs_exports';
        $('.sm-nav-tabs a').removeClass('active');
        $(this).addClass('active');
        // $('#sm-chart').fadeIn();
        $('#sm-chart-title').html('Exports Through the SCS (billions)');
        $('#sm-chart-subtitle').html('Top ten exporters');
        redrawChart(data, parameter);
        circles.clearLayers();
        circles = addCircles(map, data, parameter);
    });

    $('#nav-tab-2 a').click(function(e) {
        e.preventDefault();
        parameter = 'scs_imports';
        $('.sm-nav-tabs a').removeClass('active');
        $(this).addClass('active');
        // $('#sm-chart').fadeIn();
        $('#sm-chart-title').html('Imports Through the SCS (billions)');
        $('#sm-chart-subtitle').html('Top ten importers');
        redrawChart(data, parameter);
        circles.clearLayers();
        circles = addCircles(map, data, parameter);
    });

    $('#nav-tab-3 a').click(function(e) {
        e.preventDefault();
        parameter = 'scs_trade_percent_total_trade';
        $('.sm-nav-tabs a').removeClass('active');
        $(this).addClass('active');
        $('#sm-chart').fadeIn();
        $('#sm-chart-title').html('SCS trade as % of All Trade');
        $('#sm-chart-subtitle').html('Top ten economies');
        redrawChart(data, parameter);
        circles.clearLayers();
        circles = addCircles(map, data, parameter);
    });
}

function update() {
    //
}

function redrawChart(data, parameter) {
    // Sort the data in descending order and get top 10
    var top = [];
    if (parameter == 'scs_trade_percent_total_trade') {
        var t = data.sort(function(a, b) { return b[parameter] - a[parameter]; });
        for (var i = 0; i < t.length; i++) {
            if (_.contains(topEconomies, t[i]['country']))
            top.push(t[i]);
        };
    } else {
        top = data.sort(function(a, b) { return b[parameter] - a[parameter]; }).slice(0, 10);
    }
    var sidebarWidth = $('#sm-chart').width();
    var format = function(t) {
        if (parameter == 'scs_trade_percent_total_trade') {
            var p;
            var x = parseFloat(t);
            if (x > 100) {
                p = '~100%';
            } else {
                p = Math.round(x) + '%';
            }
            return p;
        } else {
            return '$' + Math.round(t/1000000000);
        }
    }

    // Define the domain
    var x = d3.scaleLinear()
        .domain([0, top[0][parameter] ])
        .range([0, sidebarWidth - sidebarPadding - marginLeft]);
    
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
            return x(parseFloat(d[parameter])); // length of each bar
        })
        .attr('id', function(d) { // NOTE: Better way to activate bars from map circles?
            return d['iso_code'] // Attach a country id to each bar to access via map
        });
    bar.select(".label")
        .text(function(d) { return d['country']; });
    bar.select(".value")
        .text(function(d) { return format(parseFloat(d[parameter])); });

    // ENTER new elements present in new data
    var barEnter = bar.enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d, i) {
            return "translate("+marginLeft+"," + i * barWidth + ")"; // NOTE: Improve how we y position?
        })
        .on("mouseover", triggerBarMouseover)
        .on("mouseout", triggerBarMouseout);
    
    barEnter.append("rect")
        .attr("width", function(d) {
            return x(parseFloat(d[parameter])); // length of each bar
        })
        .attr("height", barWidth - 1)
        .attr('id', function(d) { // NOTE: Better way to activate bars from map circles?
            return d['iso_code'] // Attach a country id to each bar to access via map
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
        .text(function(d) { return format(parseFloat(d[parameter])); });
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





