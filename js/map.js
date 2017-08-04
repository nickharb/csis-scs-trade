// ================================================== //
// Global variables
// ================================================== //

// Parameters
var parameter = 'scs_exports'; // Set initial display parameter
var year = 2016; // Set initial year
var ratData = [400, 900, 300, 600];
var newData = [800, 200, 400, 500, 100];
var barWidth = 25;
var barSpacing = 5;
var sidebarPadding = 10;
var marginLeft = 90;

// Global variables
var menu;
var tradeData;
var topTenData;
var circles;
var circlesObj;
var svgChart;

var map = L.map('sm-map').setView([18.960952, 66.514002], 3); // Eurasia view
// var map = L.map('sm-map').setView([35.707445, 8.979712], 2); // Whole Earth view
// var map = L.map('sm-map').setView([18.4438, 110.8517], 4); // SCS view

// mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

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
    weight: 1.5
};

var globalTrade = [
    {"year": "2016", "trade": 3.37},
    {"year": "2015", "trade": 3.26},
    {"year": "2014", "trade": 3.70},
    {"year": "2013", "trade": 3.60},
    {"year": "2012", "trade": 3.51},
    {"year": "2011", "trade": 3.38},
    {"year": "2010", "trade": 2.80},
    {"year": "2009", "trade": 2.11},
    {"year": "2008", "trade": 2.61}
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
    var corner1 = L.latLng(90, -180);
    var corner2 = L.latLng(-65, 180);
    var bounds = L.latLngBounds(corner1, corner2);
    
    // Create geoJson layer
    L.geoJson(data, {
        clickable: false,
        style: myCustomStyle
    }).addTo(map);

    // Set map bounds and disable scroll zoom
    map.setMaxBounds(bounds);
    map.scrollWheelZoom.disable();
    map.setMinZoom(2)
    map.setMaxZoom(4)

    // Import trade data
    d3.csv('data/scs-trade.csv', function(data) {
        d3.csv('data/top-ten.csv', function(dataTop) {

            // Convert percentage strings into float numbers
            data.forEach(function(datum) {
                datum['scs_trade_percent_total_trade'] = parseFloat(datum['scs_trade_percent_total_trade']);
            });

            topTenData = dataTop;
            tradeData = data;

            // menu.selectAll("option") // Add options to menu
            //     .data(ages)
            //     .enter().append("option")
            //     .text(function(d) { return d; });

            // menu.property("value", "18 to 24 Years"); // Set current option

            initEventHandlers(data);
            initChart(); // Sidebar chart
            
            // First map/chart draw
            var parsed = _.filter(tradeData, function(item){ return item['year'] == year; });
            // Draw map circles and charts
            circles = addCircles(map, parsed, parameter); // Map circles
            redrawChart(parsed, parameter); // Call redraw
        });
    });
});


// ================================================== //
// Chart constructors
// ================================================== //

function update() {
    year = menu.property("value"); // Update current year
    var data = _.filter(tradeData, function(item){ return item['year'] == year; });
    var global = _.filter(globalTrade, function(item){ return item['year'] == year; });
    // var bilateral = _.filter(bilateralTrade, function(item){ return item['year'] == year; });
    // Update global trade figure
    $('#sm-display-number').html(Math.round10(global[0]['trade'], -2));
    // Update table
    // redrawTable(bilateral);
    // Draw map circles and charts
    circles.clearLayers();
    circles = addCircles(map, data, parameter); // Map circles
    redrawChart(data, parameter); // Call redraw
}

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
    var circleCheck = function(d) {
        var result;
        if (parameter == 'scs_trade_percent_total_trade') {
            if (Math.round(parseFloat(d)) > 0) { result = true; }
        } else {
            if (Math.round(d/1000000000) >= 1) { result = true; }
        }
        return result;
    };

    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var latitude = d.latitude;
        var longitude = d.longitude;
        if (d['country'] == 'European Union') {
            latitude = 52.818188;
            longitude = 12.227512;
        }
        var multiplier = (parameter == 'scs_trade_percent_total_trade') ? 70000 : 2;
        var radius = Math.sqrt(parseFloat(d[parameter])/Math.PI)*multiplier;

        popupMarkup = '<p>'+format(d[parameter])+'</p><p>'+d.country+'</p>';
        
        // Check if datum is a number that isn't zero
        if (!isNaN(d[parameter]) && circleCheck(d[parameter])) {
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

// function redrawTable(data) {
//     var tableRow = $('#sm-table tr');
//     for (var i = data.length - 1; i >= 0; i--) {
//         data[i][]
//     };
// }

function initChart() {
    var sidebarWidth = $('#sm-chart').width();
    svgChart = d3.select('#sm-chart')
        .append('svg')
            .attr('width', sidebarWidth)
            .attr('height', 300);
}

function redrawChart(data, parameter) {
    // Sort the data in descending order and get top 10
    var top = [];
    if (parameter == 'scs_trade_percent_total_trade') {
        var topCountries = [];
        var topEconomies = _.filter(topTenData, function(item){ return item['year'] == year; });
        for (var i = 0; i < topEconomies.length; i++) {
            topCountries.push(topEconomies[i]['country']);
        };
        var t = data.sort(function(a, b) { return b[parameter] - a[parameter]; });
        for (var i = 0; i < t.length; i++) {
            if (_.contains(topCountries, t[i]['country']))
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
            return "translate("+marginLeft+"," + i * (barWidth+barSpacing) + ")"; // NOTE: Improve how we y position?
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


// ================================================== //
// Event handlers
// ================================================== //

function initEventHandlers(data) {
    menu = d3.select("#sm-year-menu select")
        .on("change", update);

    $('#nav-tab-1 a').click(function(e) {
        e.preventDefault();
        parameter = 'scs_exports';
        $('.sm-nav-tabs a').removeClass('active');
        $(this).addClass('active');
        // $('#sm-chart').fadeIn();
        $('#sm-chart-title').html('Exports Through the SCS (billions)');
        $('#sm-chart-subtitle').html('Top ten exporters');
        // redrawChart(data, parameter);
        // circles.clearLayers();
        // circles = addCircles(map, data, parameter);
        update();
    });

    $('#nav-tab-2 a').click(function(e) {
        e.preventDefault();
        parameter = 'scs_imports';
        $('.sm-nav-tabs a').removeClass('active');
        $(this).addClass('active');
        // $('#sm-chart').fadeIn();
        $('#sm-chart-title').html('Imports Through the SCS (billions)');
        $('#sm-chart-subtitle').html('Top ten importers');
        // redrawChart(data, parameter);
        // circles.clearLayers();
        // circles = addCircles(map, data, parameter);
        update();
    });

    $('#nav-tab-3 a').click(function(e) {
        e.preventDefault();
        parameter = 'scs_trade_percent_total_trade';
        $('.sm-nav-tabs a').removeClass('active');
        $(this).addClass('active');
        $('#sm-chart').fadeIn();
        $('#sm-chart-title').html('SCS trade as % of All Trade');
        $('#sm-chart-subtitle').html('Top ten SCS trade economies');
        // redrawChart(data, parameter);
        // circles.clearLayers();
        // circles = addCircles(map, data, parameter);
        update();
    });
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


// ================================================== //
// Helper functions
// ================================================== //

function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
    }
    // If the value is negative...
    if (value < 0) {
    return -decimalAdjust(type, -value, exp);
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// Decimal round
if (!Math.round10) {
    Math.round10 = function(value, exp) {
        return decimalAdjust('round', value, exp);
    };
}





