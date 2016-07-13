(function(){
	var myApp = angular.module('myApp', []);
	
	myApp.controller('InfoController', function($scope){
		$scope.vin=undefined;
		$scope.sn=undefined;
		
		
	});
	
	myApp.controller('MapController', function($scope, $timeout){
		$scope.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$scope.labelIndex = 0;
		$scope.checkPoints = [];
		$scope.path = undefined;
		
		$timeout(function(){
			var bangalore = {
					lat : 12.97,
					lng : 77.59
				};
			var myOptions = {
	                zoom: 8,
	                center: bangalore,
	                mapTypeId: google.maps.MapTypeId.ROADMAP
	            };
			$scope.map = new google.maps.Map(document.getElementById('map'), myOptions);
			$scope.element = document.getElementById('map');
			
			// This event listener calls addMarker() when the map is clicked.
			google.maps.event.addListener($scope.map, 'click', function(event) {
				$scope.addMarker(event.latLng);
			});
			
		}, 100);
		
		// Adds a marker to the map.
		$scope.addMarker = function(location) {
			//var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
			var marker = new google.maps.Marker({
				position : location,
				label : $scope.labels[$scope.labelIndex++ % $scope.labels.length],
				map : $scope.map,
				draggable : true
			});

			var distance = 0;
			if($scope.checkPoints.length>0){
				var lastCheckPoint = $scope.checkPoints[$scope.checkPoints.length-1];
				var lastMarker = lastCheckPoint.marker;
				distance = $scope.calculateDistance(lastMarker, marker);
				distance += lastCheckPoint.distance;
			}
				
			var checkPoint = {
					marker:marker,
					distance:distance
			}
			$scope.checkPoints.push(checkPoint);
			$scope.$apply();
		};
		
		$scope.rad = function(x) {
            return x * Math.PI / 180;
        };
        
		$scope.calculateDistance = function(p1, p2){
			 var R = 6378137; // Earth’s mean radius in meter
             var dLat = $scope.rad(p2.position.lat() - p1.position.lat());
             var dLong = $scope.rad(p2.position.lng() - p1.position.lng());
             var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
             Math.cos($scope.rad(p1.position.lat())) * Math.cos($scope.rad(p2.position.lat())) *
             Math.sin(dLong / 2) * Math.sin(dLong / 2);
             var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
             var partialDistance = R * c / 1000;
             return partialDistance;
        };
	});
})();