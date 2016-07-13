var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var markers = [];
var path = undefined;

function initMap() {
	var mapStyle = getMapStyle();

	var bangalore = {
		lat : 12.97,
		lng : 77.59
	};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom : 12,
		center : bangalore,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
          }
	});

	map.mapTypes.set('map_style', mapStyle);
	
	// This event listener calls addMarker() when the map is clicked.
	google.maps.event.addListener(map, 'click', function(event) {
		addMarker(event.latLng, map);
	});
}

var createPathFromMarkers = function() {
	var pathPoints = [];
	for (var i = 0; i < markers.length; i++) {
		var marker = markers[i];
		pathPoints.push(marker.getPosition().toJSON());
	}
	path = new google.maps.Polyline({
		path : pathPoints,
		geodesic : true,
		strokeColor : '#FF0000',
		strokeOpacity : 1.0,
		strokeWeight : 2
	});

	path.setMap(map);
}

var deletePathFromMarkers = function() {
	if(path != undefined){
		path.setMap(null);
		path = undefined;
	}
}

var deleteMarkers = function() {
	for (var i = 0; i < markers.length; i++) {
		var marker = markers[i];
		marker.setMap(null);
	}
	markers = [];
	labelIndex = 0;
}

// Adds a marker to the map.
function addMarker(location, map) {

	var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
	// Add the marker at the clicked location, and add the next-available label
	// from the array of alphabetical characters.
	var marker = new google.maps.Marker({
		position : location,
		label : labels[labelIndex++ % labels.length],
		map : map,
		draggable : true
	});

	markers.push(marker);
}

var getMapStyle = function() {
	var styleArray = [ {
		featureType : "all",
		stylers : [ {
			saturation : -80
		} ]
	}, {
		featureType : "road.arterial",
		elementType : "geometry",
		stylers : [ {
			hue : "#00ffee"
		}, {
			saturation : 50
		} ]
	}, {
		featureType : "poi.business",
		elementType : "labels",
		stylers : [ {
			visibility : "off"
		} ]
	} ];

	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(styleArray, {
		name : "Styled Map"
	});

	return styledMap;
}