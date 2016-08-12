
// Add the map, basemap, and attirbution
var map = L.map('map', {
    center: [7.480006, -9.947990],
    zoom: 9,
});

var basemap0 = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 6,
  maxZoom: 15,
  ext: 'png'
}).addTo(map);


// var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
// attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// subdomains: 'abcd',
// minZoom: 7,
// maxZoom: 15,
// ext: 'png'
// });

// map.options.maxZoom = 13;
// map.options.minZoom = 7;

//default zoom
var defaultViewFunc = function(){
    map.setView([7.480006, -9.947990],9);
};

//This creates the button on the side that allows you to go back to the default View
//
L.easyButton('<img src="css/images/globe.png" class=globe >', function(btn, map){
  defaultViewFunc();
}).addTo(map);


function getColor(d) {
    return d == "15.51 - 17.44"   ? '#4475B5' :
           d == "17.45 - 19.37"   ? '#7393BA' :
           d == "19.38 - 21.3"    ? '#A2B3BC':
           d == "21.31 - 23.23"   ? '#CFD8BE':
           d == "23.24 - 25.16"   ? '#FFFFBF':
           d == "25.17 - 27.09"   ? '#FCCA92':
           d == "27.1 - 29.01"    ? '#F49769':
           d == "29.02 - 30.94"   ? '#E86645':
           d == "30.95 - 32.87"   ? '#D62F26':
                                    '#FFEDA0';
}

//This is the same but its to style the borders differently than the fill of the polygon
function getColor_border(d) {
    return d == "15.51 - 17.44"   ? '#124689' :
           d == "17.45 - 19.37"   ? '#315784' :
           d == "19.38 - 21.3"    ? '#4F7183':
           d == "21.31 - 23.23"   ? '#899A68':
           d == "23.24 - 25.16"   ? '#B3B34F':
           d == "25.17 - 27.09"   ? '#AF7432':
           d == "27.1 - 29.01"    ? '#B15221':
           d == "29.02 - 30.94"   ? '#A42C0C':
           d == "30.95 - 32.87"   ? '#840700':
                                    '#FFEDA0';
}

//This is an example of you would call the getColor function inside of a style function
function getStyle(feature) {
  return {
    radius: '3.0',
    fillColor: getColor(feature.properties.Category),
    color: getColor_border(feature.properties.Category),
    weight: 1.5,
    opacity: 0.5,
    dashArray: '',
    fillOpacity: '0.6'
  };
}

//Style Function for a leaflet layer
 function boundaryStyle(feature) {
     return {
         weight: 4,
         color: '#000000',
         opacity: 1.0,
         fillColor: 'none'
     };
 }

 function pointStyle(feature) {
     return {
         radius: '4.0',
         weight: 1.5,
         color: '#FFFFFF',
         fillColor: '#000000',
         dashArray: '',
         lineCap: 'square',
         lineJoin: 'bevel',
         opacity: 1.0,
         fillOpacity: 1.0
     };
 }

 function townStyle(feature) {
       return {
           size: 2
       }
 }

   function adminStyle(feature) {
       return {
           weight: 4,
           color: '#000000',
           fillColor: 'none'
       };
   }

   function roadStyle(feature) {
       return {
           weight: 2,
           color: '#000000'
       };
   }

 //The legends should be worked on after we know what data is going in and what attributes are getting styled, leave it for now

 var legend = L.control({position: 'bottomright'});

 legend.onAdd = function (map) {

     var div = L.DomUtil.create('div', 'info legend title'),
         grades = ["15.51 - 17.44", "17.45 - 19.37", "19.38 - 21.3", "21.31 - 23.23", "23.24 - 25.16", "25.17 - 27.09",
                   "27.1 - 29.01", "29.02 - 30.94", "30.95 - 32.87"];

     div.innerHTML += '<b>Overall Vulnerability</b><br>';  // don't forget the break tag

     // loop through our density intervals and generate a label with a colored square for each interval
     for (var i = 0; i < grades.length; i++) {
         div.innerHTML +=
             '<i class="circle" style="background:' + getColor(grades[i]) + '"></i> ' +
            (grades[i] ? grades[i] + '<br>' : '+');
     }

     return div;
 };

 legend.addTo(map);

//**********************************************************************************************************************


var admin = new L.geoJson(boundaries, {
     style: adminStyle
}).addTo(map);

var countries = new L.geoJson (countries, {
     style: boundaryStyle
}).addTo(map);

var large_towns = new L.geoJson (large_towns, {
     onEachFeature: eachTown,
     style: townStyle
}).addTo(map);

var roads = new L.geoJson (roads, {
     style: roadStyle
}).addTo(map);

var vulnerability = new L.geoJson (vuln, {
      onEachFeature: eachPoly,
      style: getStyle
}).addTo(map);

var water_vuln = new L.geoJson(water_vuln, {
      style: getStyle
}).addTo(map);

var buffer = new L.geoJson(buffer_outline, {
      style: boundaryStyle
}).addTo(map);

var points = new L.geoJson(communities, {
     onEachFeature: eachPoint,
     pointToLayer: function (feature, latlng) {
         return L.circleMarker(latlng, pointStyle(feature));
     }
 }).addTo(map);

//This is what happens whenever you mouse over a point
function eachPoint(feature, layer) {
  layer.bindPopup("<strong>Village Name:</strong>" + " " + feature.properties.namevill + "<br>" + "<strong>County:</strong>" + " " + feature.properties.region +
"<br>" + "<strong>Overall Vulnerability Score:</strong>" + " " + feature.properties.finalindex + "<br>" + "<strong>Number of Total Disasters:</strong> " + " " + feature.properties.totdist +
"<br>" + "<strong>Household Vulnerability:</strong> " + " " + feature.properties.hhindex + "<br>" + "<strong>Water Vulnerability:</strong> " + " " + feature.properties.water_inde +
"<br>" + "<strong>Sanitation:</strong> " + " " + feature.properties.sanitation);
  layer.on({
    mouseover: function(e){
      layer.setStyle({
        radius: '6.0',
        fillOpacity: 1
      });
    },
    mouseout: function(e) {
      layer.setStyle(pointStyle(feature));
    },
  });
}

//This is what happens whenever you mouseover a polygon
function eachPoly(feature, layer) {
  layer.bindPopup("<strong>Average Vulnerability Score:</strong> " + "<br>" + feature.properties.Category);
  layer.on({
    mouseover: function(e){
      layer.setStyle({
        fillOpacity: 1.0
      });
        // info.update(layer.feature.properties);
    },
    mouseout: function(e) {
      layer.setStyle(getStyle(feature));
      //  info.update();
    },
    click: function (e){
      var bounds = this.getBounds();
      // map.fitBounds(bounds);
    },
  });
}

function eachTown(feature, layer) {
    layer.bindPopup("<strong>Town:</strong> " + "<br>" + feature.properties.name);
    layer.on({
      click: function (e) {
        var bounds = this.getBounds();
      },
    });
}


    //***************************************This Section Controls The Order of Your Layers in Your Layer Selector********************************
    var feature_group = new L.featureGroup([]);
    var bounds_group = new L.featureGroup([]);
    var raster_group = new L.LayerGroup([]);
    var initialOrder = [];
    var layerOrder = [];
    function stackLayers() {
        for (index = 0; index < initialOrder.length; index++) {
            map.removeLayer(initialOrder[index]);
            map.addLayer(initialOrder[index]);
        }
    }
    function restackLayers() {
        for (index = 0; index < layerOrder.length; index++) {
            layerOrder[index].bringToFront();
        }
    }

    layerOrder[layerOrder.length] = admin;
    bounds_group.addLayer(admin);
    initialOrder[initialOrder.length] = admin;
    feature_group.addLayer(admin);

    layerOrder[layerOrder.length] = vulnerability;
    bounds_group.addLayer(vulnerability);
    initialOrder[initialOrder.length] = vulnerability;
    feature_group.addLayer(vulnerability);

    layerOrder[layerOrder.length] = buffer;
    bounds_group.addLayer(buffer);
    initialOrder[initialOrder.length] = buffer;
    feature_group.addLayer(buffer);

    layerOrder[layerOrder.length] = points;
    bounds_group.addLayer(points);
    initialOrder[initialOrder.length] = points;
    feature_group.addLayer(points);


    raster_group.addTo(map);
    feature_group.addTo(map);

//***************************************This Section Controls Your Layer Selector********************************
var baseMap = {
    "Grayscale": basemap0,
    // "stamen": Stamen_TonerLite
    // "Streets": streets
};

var overlayMaps = {
    "Villages": points,
    "Overall Vulnerability": vulnerability,
    "Water Vulnerability": water_vuln,
    "3 Mile Buffer": buffer,
    "Large Towns": large_towns
};

    // Removes legend if vulnerability is removed
    map.on('overlayremove', function (eventLayer) {

      if (eventLayer.name == "Overall Vulnerability"){
        map.removeControl(legend);
      }
      });

      // Adds the legend if vulnerability is added

      map.on('overlayadd', function (eventLayer) {

        if (eventLayer.name == "Overall Vulnerability"){
          map.addControl(legend);

        }
        });

      //Calls the restackLayers function to make sure they are in the right order
      map.on('overlayadd', restackLayers);

L.control.layers(baseMap, overlayMaps).addTo(map);
//*********************************************************************************************************************

//This is the scale bar
L.control.scale({options: {position: 'bottomleft', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);
