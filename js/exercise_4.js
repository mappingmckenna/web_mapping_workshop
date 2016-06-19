// Here is the javascript setup for a basic map:

// Enter your mapbox map id here to reference it for the base layer,
// this one references the ugly green map that I made.
var mapId = 'el-s.0eg533bn';

// And this is my access token, use yours.
var accessToken = 'pk.eyJ1IjoiZWwtcyIsImEiOiJjbWxMT3BJIn0.aaOFFPZxMh3dFMaccYwRuw';

// Create the map object with your mapId and token,
// referencing the DOM element where you want the map to go.
L.mapbox.accessToken = accessToken;
var map = L.mapbox.map('map', mapId);

var dataFileToAdd = 'data/cbdLunch.geojson'
var featureLayer = L.mapbox.featureLayer()
    .loadURL(dataFileToAdd)
    .addTo(map);

//when loaded style and set bound to layer
featureLayer.on('ready', function() {
  this.eachLayer(function(layer){
    layer.setIcon(L.mapbox.marker.icon({
      'marker-color': '#8834bb',
      'marker-size': 'large',
      'marker-symbol': 'restaurant'
    }))
  });
  map.fitBounds(featureLayer.getBounds());
});

//featureLayer.on('ready', function(){
//  this.eachLayer(function(layer){
 //   layer.bindPopup(layer.feature.properties.Name);
 // });
//});

var clickHandler = function(e){
    $('#info').empty();
  var feature = e.target.feature;
  $('#sidebar').fadeIn(400, function(){

    var info = '';

    info += '<div>'
    info += '<h2>' + feature.properties.Name + '</h2>'
    info +=  '<p>'  + feature.properties.Type + '</p>'
    info +=   '<p>'  + feature.properties.descriptio + '</p>'
    info +=   '<p>'  + feature.properties.Cost + '</p>'
    info +=   '<p>'  + feature.properties.Website + '</p>'
    info +=   '<p><a href="' + feature.properties.Website + '">'  + feature.properties.Website + '</a></p>'
    info += '</div>'

    $('#info').append(info);
  });
};

var myGeoJSON = myLocation.getGeoJSON();

getDirections(myGeoJSON.geometry.coordinates, feature.geometry.coordinates);

featureLayer.on('ready', function(){
  this.eachLayer(function(layer){
    layer.on('click', clickHandler);
  });
});

map.on('click',function(e){
  $('#sidebar').fadeOut(200);
});

var myLocation = L.mapbox.featureLayer().addTo(map);

map.on('locationfound', function(e) {

    myLocation.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
        }
    });

});


map.locate({setView:true});

/*
function getDirections(frm, to){
  var jsonPayload = JSON.stringify({
    locations:[
      {lat: frm[1], lon: frm[0]},
      {lat: to[1], lon: to[0]}
    ],
    costing: 'pedestrian',
  })
  $.ajax({
    url:'http://valhalla.mapzen.com/route',
    data:{
      json: jsonPayload,
      api_key: 'valhalla-VpS3MVg'
    }
  }).done(function(data){

  })
};

var routeLine = L.mapbox.featureLayer().addTo(map);
function getDirections(frm, to){
  var jsonPayload = JSON.stringify({
    locations:[
      {lat: frm[1], lon: frm[0]},
      {lat: to[1], lon: to[0]}
    ],
    costing: 'pedestrian',
  })
  $.ajax({
    url:'http://valhalla.mapzen.com/route',
    data:{
      json: jsonPayload,
      api_key: 'valhalla-VpS3MVg'
    }
  }).done(function(data){
    var routeShape = polyline.decode(data.trip.legs[0].shape);
    routeLine.setGeoJSON({
      type:'Feature',
      geometry:{
        type:'LineString',
        coordinates: routeShape
      },
      properties:{
        "stroke": '#ed23f1',
        "stroke-opacity": 0.8,
        "stroke-width": 8
      }
    })
  }) 
};
*/
// Set the initial view of the map to the whole US
//map.setView([39, -96], 4);

// Great, now we have a basic web map!
