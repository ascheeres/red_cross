// Define style functions for layers

 function getColor(d) {
     return d == "Medium"       ? '#4475B5' :
            d == "High"         ? '#BFCCBD' :
            d == "Very High"    ? '#F9B984':
            d == "Highest"      ? '#D62F26':
                                  '#FFEDA0';

 }

 //This is the same but its to style the borders differently than the fill of the polygon
 function getColor_border(d) {
     return d == "Medium"     ? '#4475B5' :
            d == "High"       ? '#96AE94' :
            d == "Very High"  ? '#D38C52':
            d == "Highest"    ? '#AB1A12':
                                '#FFEDA0';
 }

 function w_getColor(d) {
     return d == "Medium"     ? '#D3E4E8' :
            d == "High"       ? '#97B3C6' :
            d == "Very High"  ? '#053B64':
            d == "Highest"    ? '#001B2F':
                                '#FFEDA0';
 }

 function w_getColor_border(d) {
     return d == "Medium"     ? '#124689' :
            d == "High"       ? '#4475B5' :
            d == "Very High"  ? '#295FA4':
            d == "Highest"    ? '#001B2F':
                                '#FFEDA0';
 }

 function s_getColor(d) {
     return d == "Medium"     ? '#DCF4E8' :
            d == "High"       ? '#95C1A1' :
            d == "Very High"  ? '#216632':
            d == "Highest"    ? '#002109':
                                '#FFEDA0';
 }

 function s_getColor_border(d) {
     return d == "Medium"     ? '#5BBF8C' :
            d == "High"       ? '#2E9248' :
            d == "Very High"  ? '#106823':
            d == "Highest"    ? '#002109':
                                '#FFEDA0';
 }

 function d_getColor(d) {
     return d == "Medium"     ? '#FFEBD6' :
            d == "High"       ? '#EAA888' :
            d == "Very High"  ? '#D65C44':
            d == "Highest"    ? '#C40909':
                                '#FFEDA0';
 }

 function d_getColor_border(d) {
     return d == "Medium"     ? '#CD965C' :
            d == "High"       ? '#A54314' :
            d == "Very High"  ? '#9B1800':
            d == "Highest"    ? '#790000':
                                '#FFEDA0';
 }

 function hh_getColor(d) {
     return d == "Medium"     ? '#DCBAF3' :
            d == "High"       ? '#BC83E0' :
            d == "Very High"  ? '#923AC6':
            d == "Highest"    ? '#480470':
                                '#FFEDA0';
 }

 function hh_getColor_border(d) {
     return d == "Medium"     ? '#9E63C6' :
            d == "High"       ? '#803BAC' :
            d == "Very High"  ? '#600894':
            d == "Highest"    ? '#240139':
                                '#FFEDA0';
 }

 //This is an example of you would call the getColor function inside of a style function
 function getStyle(feature) {
   return {
     radius: '3.0',
     fillColor: getColor(feature.properties.Ranking),
     color: getColor_border(feature.properties.Ranking),
     weight: 1.5,
     opacity: 0.5,
     dashArray: '',
     fillOpacity: '0.6'
   };
 }

 function w_getStyle(feature) {
  return {
    radius: '3.0',
    fillColor: w_getColor(feature.properties.Ranking),
    color: w_getColor_border(feature.properties.Ranking),
    weight: 1.5,
    opacity: 0.5,
    dashArray: '',
    fillOpacity: '0.6'
  };
 }

 function s_getStyle(feature) {
  return {
    radius: '3.0',
    fillColor: s_getColor(feature.properties.Ranking),
    color: s_getColor_border(feature.properties.Ranking),
    weight: 1.5,
    opacity: 0.5,
    dashArray: '',
    fillOpacity: '0.6'
  };
 }

 function d_getStyle(feature) {
  return {
    radius: '3.0',
    fillColor: d_getColor(feature.properties.Ranking),
    color: d_getColor_border(feature.properties.Ranking),
    weight: 1.5,
    opacity: 0.5,
    dashArray: '',
    fillOpacity: '0.6'
  };
 }

 function hh_getStyle(feature) {
  return {
    radius: '3.0',
    fillColor: hh_getColor(feature.properties.Ranking),
    color: hh_getColor_border(feature.properties.Ranking),
    weight: 1.5,
    opacity: 0.5,
    dashArray: '',
    fillOpacity: '0.6'
  };
 }

 //Style Function for a leaflet layer
  function boundaryStyle(feature) {
      return {
          weight: 3,
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
            weight: 2.5,
            color: 'grey',
            fillColor: 'none'
        };
    }

    function roadStyle(feature) {
        return {
            weight: 2.5,
            color: '#550000'
        };
    }

    //This is what happens whenever you mouse over a point
    function eachPoint(feature, layer) {
      layer.bindPopup("<strong>Village Name:</strong>" + " " + feature.properties.namevill + "<br>" + "<strong>County:</strong>" + " " + feature.properties.region +
    "<br>" + "<strong>Overall Vulnerability Score:</strong>" + " " + feature.properties.finalindex + "<br>" + "<strong>Number of Total Disasters:</strong> " + " " + feature.properties.totdist +
    "<br>" + "<strong>Household Vulnerability:</strong> " + " " + feature.properties.hhindex + "<br>" + "<strong>Water Vulnerability:</strong> " + " " + feature.properties.water_inde +
    "<br>" + "<strong>Sanitation:</strong> " + " " + feature.properties.sanitation + "<br>" + "<strong>Most Vulnerable Sector:</strong>" + " " + feature.properties.firstIndex);
      layer.on({
        mouseover: function(e){
          this.openPopup();
          layer.setStyle({
            radius: '6.0',
            fillOpacity: 1
          });
        },
        mouseout: function(e) {
          this.closePopup();
          layer.setStyle(pointStyle(feature));
        },
      });
    }

    //This is what happens whenever you mouseover a polygon
    function eachPoly(feature, layer) {
      layer.bindPopup("<strong>Average Vulnerability Score:</strong> " + "<br>" + feature.properties.Score);
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

    function w_eachPoly(feature, layer) {
      layer.bindPopup("<strong>Average Vulnerability Score:</strong> " + "<br>" + feature.properties.Score);
      layer.on({
        mouseover: function(e){
          layer.setStyle({
            fillOpacity: 1.0
          });
            // info.update(layer.feature.properties);
        },
        mouseout: function(e) {
          layer.setStyle(w_getStyle(feature));
          //  info.update();
        },
        click: function (e){
          var bounds = this.getBounds();
          // map.fitBounds(bounds);
        },
      });
    }

    function s_eachPoly(feature, layer) {
      layer.bindPopup("<strong>Average Vulnerability Score:</strong> " + "<br>" + feature.properties.Score);
      layer.on({
        mouseover: function(e){
          layer.setStyle({
            fillOpacity: 1.0
          });
            // info.update(layer.feature.properties);
        },
        mouseout: function(e) {
          layer.setStyle(s_getStyle(feature));
          //  info.update();
        },
        click: function (e){
          var bounds = this.getBounds();
          // map.fitBounds(bounds);
        },
      });
    }

    function d_eachPoly(feature, layer) {
      layer.bindPopup("<strong>Average Vulnerability Score:</strong> " + "<br>" + feature.properties.Score);
      layer.on({
        mouseover: function(e){
          layer.setStyle({
            fillOpacity: 1.0
          });
            // info.update(layer.feature.properties);
        },
        mouseout: function(e) {
          layer.setStyle(d_getStyle(feature));
          //  info.update();
        },
        click: function (e){
          var bounds = this.getBounds();
          // map.fitBounds(bounds);
        },
      });
    }

    function hh_eachPoly(feature, layer) {
      layer.bindPopup("<strong>Average Vulnerability Score:</strong> " + "<br>" + feature.properties.Score);
      layer.on({
        mouseover: function(e){
          layer.setStyle({
            fillOpacity: 1.0
          });
            // info.update(layer.feature.properties);
        },
        mouseout: function(e) {
          layer.setStyle(hh_getStyle(feature));
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

// Define map layers as variables
var osm = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 6,
  maxZoom: 12,
  ext: 'png'
});

var admin = new L.geoJson (boundaries, {
     style: adminStyle
});

var countries = new L.geoJson (countries, {
     style: boundaryStyle
});

var large_towns = new L.geoJson (large_towns, {
     onEachFeature: eachTown,
     style: townStyle
});

var roads = new L.geoJson (roads, {
     style: roadStyle
});

var vulnerability = new L.geoJson (vuln, {
      onEachFeature: eachPoly,
      style: getStyle
});

var water_vuln = new L.geoJson(water_vuln, {
      onEachFeature: w_eachPoly,
      style: w_getStyle
});

var water_buffer = new L.geoJson(water_buffer, {
      style: boundaryStyle
});

var overall_buffer = new L.geoJson(overall_buffer, {
      style: boundaryStyle
});

var san_vuln = new L.geoJson(san_vuln, {
      style: s_getStyle,
      onEachFeature: s_eachPoly
});

var san_buffer = new L.geoJson(san_buffer, {
      style: boundaryStyle
});

var dist_vuln = new L.geoJson(dist_vuln, {
      style: d_getStyle,
      onEachFeature: d_eachPoly
});

var dist_buffer = new L.geoJson(dist_buffer, {
      style: boundaryStyle
});

var hh_vuln = new L.geoJson(hh_vuln, {
      style: hh_getStyle,
      onEachFeature: hh_eachPoly
});

var hh_buffer = new L.geoJson(hh_buffer, {
      style: boundaryStyle
});

var points = new L.geoJson(communities, {
     onEachFeature: eachPoint,
     pointToLayer: function (feature, latlng) {
         return L.circleMarker(latlng, pointStyle(feature));
     }
 });

// Create group layers for vulnerability layers and corresponding buffers
var vulnbuf = L.layerGroup([vulnerability, overall_buffer]);

var waterbuf = L.layerGroup([water_vuln, water_buffer]);

var sanbuf = L.layerGroup([san_vuln, san_buffer]);

var distbuf = L.layerGroup([dist_vuln, dist_buffer]);

var hhbuf = L.layerGroup([hh_vuln, hh_buffer]);

 var baselayers = {
     "Overall Vulnerability": vulnbuf,
     "Water Vulnerability": waterbuf,
     "Sanitation Vulnerability": sanbuf,
     "Household Vulnerability": hhbuf,
     "Total Disasters": distbuf
 };

 var overlays = {
     "Villages": points,
     "Large Towns": large_towns,
     "Administrative Boundaries": admin,
     "Road Network": roads
 };

 // Add the map, basemap, and attirbution
 var map = L.map('map', {
     center: [7.480006, -9.947990],
     zoom: 9,
     layers: [osm, admin, vulnbuf, points, large_towns]
 });

// Create array of all vector layers in their drawing order, back to front: this is for ensuring proper layering in the dynamic map
var mapLayers = [osm, countries, roads, points, large_towns];

// Add layer controls and scale control to map
L.control.layers(baselayers, overlays).addTo(map);
L.control.scale({options: {position: 'bottomleft', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);

 //default zoom
 var defaultViewFunc = function(){
     map.setView([7.480006, -9.947990],9);
 };

 // Reorder map layers
map.on('baselayerchange', function() {
  for( i = 1; i < 12; i++){
  	if(map.hasLayer(mapLayers[i])){
  		mapLayers[i].bringToFront();
  	}};
});

// Create variable containing original html text in sidebar
var defaultText = $("#text").html();

// Change informational text when base layer is changed
map.on('baselayerchange', function(eventLayer) {
    if(eventLayer.name === 'Overall Vulnerability') {
      $("#text").empty();
      $("#text").append("<p>(Click here to return to project overview)</p> <p>This map shows communities' overall vulnerability. Overall vulnerability was calculated by summing the individual vulnerability sectors. Kriging, which is a type of spatial interpolation that produces a statistically-weighted surface, was used to visualize overall vulnerability. Kriging produces a smooth, continuous surface (called raster data), which was then converted into discrete polygons (called vector data). Polygons within the same vulnerability category were dissolved to allow the user to easily see which communities are in the same vulnerability categories.</p> <p>Communities with high overall vulnerability scored high in multiple vulnerability sectors, while communities with lower overall vulnerability either scored lower in multiple vulnerability sectors or only scored high in one or two vulnerability sectors. </p>");
    }
    if(eventLayer.name === 'Water Vulnerability') {
      $("#text").empty();
      $("#text").append("<p>(Click here to return to project overview)</p> <p>This map shows communities’ vulnerability with respect to water. Water-related vulnerability was calculated based on a community’s water source and the time required to fetch water. Communities received a higher vulnerability score if their primary drinking water source was an unimproved water source (ex. unprotected dug well, unprotected spring, surface water, bottled water) as opposed to an improved source (piped water into dwelling, public tap or standpipe, tubewell, protected spring/dug well). High vulnerability scores were also assigned to communities where fetching water required more than 30 minutes. </p>");
    }
    if(eventLayer.name === 'Sanitation Vulnerability') {
      $("#text").empty();
      $("#text").append("<p>(Click here to return to project overview)</p> <p>This map shows vulnerability with respect to sanitation, which focuses on improved versus unimproved facilities. Communities received a higher vulnerability score if most residents used unimproved sanitation facilities (ex. pit latrine without slab, shared or public toilet facilities, unpiped flush toilets) as opposed to improved sanitation facilities (ex. piped flush toilets, composting toilet, pit latrine with slab). </p>");
    }
    if(eventLayer.name === 'Household Vulnerability') {
      $("#text").empty();
      $("#text").append("<p>(Click here to return to project overview)</p> <p>This map shows vulnerability with respect to household conditions. Communities received a higher vulnerability score if most residents have an unimproved type of floor (ex. earth, sand, etc) as opposed to an improved type of floor (ex. wood planks, cement, carpet, vinyl). Floor type has been identified as an indicator of general household materials, so homes with unimproved floors are typically home to more vulnerable people. </p>");
    }
    if(eventLayer.name === 'Total Disasters') {
      $("#text").empty();
      $("#text").append("<p>(Click here to return to project overview)</p> <p>This map shows vulnerability with respect to disasters, which includes drought, famine, flooding, wildfires, Ebola Virus Disease, other epidemics, or armed conflict. Communities received a higher vulnerability score if the community leader reported that the area had experienced more disasters in the past year. This question was asked in terms of the past year because we wanted to have a consistent time frame to ask each community, and one year was long enough to include a full year of seasons and time, but also short enough that it would be easy for respondents to differentiate and think through. </p>");
    }
    if(eventLayer.name === 'High Traffic Vulnerability') {
      $("#text").empty();
      $("#text").append("<p>(Click here to return to project overview)</p> <p>This map shows vulnerability with respect to household conditions. Communities received a higher vulnerability score if most residents have an unimproved type of floor (ex. earth, sand, etc) as opposed to an improved type of floor (ex. wood planks, cement, carpet, vinyl). Floor type has been identified as an indicator of general household materials, so homes with unimproved floors are typically home to more vulnerable people. </p>");
    }
});
map.on('overlayadd', function(eventLayer) {
  if(eventLayer.name === 'Villages') {
    $("#text").empty();
    $("#text").html(defaultText);
  }
  if(eventLayer.name === 'Large Towns') {
    $("#text").empty();
    $("#text").html(defaultText);
  }
});

// Revert text to original description by clicking on sidebar
$("#text").click(function() {
  $("#text").empty();
  $("#text").html(defaultText);
});

 //This creates the button on the side that allows you to go back to the default view
 L.easyButton('<img src="css/images/globe.png" class=globe >', function(btn, map){
   defaultViewFunc();
 }).addTo(map);

// Create overall vulnerability legend
  var vuln_legend = L.control({position: 'bottomright'});

  vuln_legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend title vuln_legend'),
          grades = ["Medium", "High", "Very High", "Highest"];

      div.innerHTML += '<b>Overall Vulnerability</b><br>';  // don't forget the break tag

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i class="circle" style="background:' + getColor(grades[i]) + '"></i> ' +
             (grades[i] ? grades[i] + '<br>' : '+');
      }

      return div;
  };


  // Create water vulnerability legend
  var water_legend = L.control({position: 'bottomright'});

  water_legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend title water_legend'),
          grades = ["Medium", "High", "Very High", "Highest"];

      div.innerHTML += '<b>Water Vulnerability</b><br>';

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i class="circle" style="background:' + w_getColor(grades[i]) + '"></i> ' +
             (grades[i] ? grades[i] + '<br>' : '+');
      }

      return div;
  };

  // Create sanitation vulnerability legend
  var san_legend = L.control({position: 'bottomright'});

  san_legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend title san_legend'),
          grades = ["Medium", "High", "Very High", "Highest"];

      div.innerHTML += '<b>Sanitation Vulnerability</b><br>';

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i class="circle" style="background:' + s_getColor(grades[i]) + '"></i> ' +
             (grades[i] ? grades[i] + '<br>' : '+');
      }

      return div;
  };

  // Create total disaster legend
  var d_legend = L.control({position: 'bottomright'});

  d_legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend title d_legend'),
          grades = ["Medium", "High", "Very High", "Highest"];

      div.innerHTML += '<b>Total Disasters</b><br>';

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i class="circle" style="background:' + d_getColor(grades[i]) + '"></i> ' +
             (grades[i] ? grades[i] + '<br>' : '+');
      }

      return div;
  };

  // Create household vulnerability legend
  var hh_legend = L.control({position: 'bottomright'});

  hh_legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend title hh_legend'),
          grades = ["Medium", "High", "Very High", "Highest"];

      div.innerHTML += '<b>Household Vulnerability</b><br>';

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i class="circle" style="background:' + hh_getColor(grades[i]) + '"></i> ' +
             (grades[i] ? grades[i] + '<br>' : '+');
      }

      return div;
  };


// Update legend when base layer is changed
 vuln_legend.addTo(map);
 water_legend.addTo(map);
 san_legend.addTo(map);
 hh_legend.addTo(map);
 d_legend.addTo(map);
 $(".san_legend").hide();
 $(".water_legend").hide();
 $(".hh_legend").hide();
 $(".d_legend").hide();

 map.on('baselayerchange', function (eventLayer) {
   if(eventLayer.name === 'Overall Vulnerability') {
     $(".water_legend").hide();
     $(".san_legend").hide();
     $(".hh_legend").hide();
     $(".d_legend").hide();
     $(".vuln_legend").show();
   } else if(eventLayer.name === 'Water Vulnerability') {
     $(".vuln_legend").hide();
     $(".san_legend").hide();
     $(".hh_legend").hide();
     $(".d_legend").hide();
     $(".water_legend").show();
   } else if(eventLayer.name === 'Sanitation Vulnerability') {
     $(".vuln_legend").hide();
     $(".water_legend").hide();
     $(".hh_legend").hide();
     $(".d_legend").hide();
     $(".san_legend").show();
   } else if(eventLayer.name === 'Household Vulnerability') {
     $(".vuln_legend").hide();
     $(".water_legend").hide();
     $(".san_legend").hide();
     $(".d_legend").hide();
     $(".hh_legend").show();
   } else if(eventLayer.name === 'Total Disasters') {
     $(".vuln_legend").hide();
     $(".water_legend").hide();
     $(".san_legend").hide();
     $(".hh_legend").hide();
     $(".d_legend").show();
   }
});
