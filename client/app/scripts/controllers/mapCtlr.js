'use strict';
angular.module('gab')
	.controller('map', function ($scope){
			var geocoder = new google.maps.Geocoder();

			function geocodePosition(pos) {
			  geocoder.geocode({
			    latLng: pos
			  }, function(responses) {
			    if (responses && responses.length > 0) {
			      updateMarkerAddress(responses[0].formatted_address);
			    } else {
			      updateMarkerAddress('Cannot determine address at this location.');
			    }
			  });
			}

			 function updateMarkerPosition(latLng) {
			      console.log(latLng.lat());
			      console.log(latLng.lng()); 
			      document.getElementById('shoplat').value = latLng.lat();
			      document.getElementById('shoplng').value = latLng.lng();
			 }

			function updateMarkerAddress(str) {
			  str = str.replace(/,\s79.../g, '');
			  str = str.replace(/вулиця/g, '');
			  document.getElementById('shopaddress').value = str.replace(/,\sЛьвівська область,\sУкраина/g, '');
			}

			$scope.initialize2 =  function () {
			  var latLng = new google.maps.LatLng(49.8488419, 24.0269501);
			  var map = new google.maps.Map(document.getElementById('mapforadd'), {
			    zoom: 14,
			    center: latLng,
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			  });
			  var marker = new google.maps.Marker({
			    position: latLng,
			    title: 'Point A',
			    map: map,
			    draggable: true
			  });
			     
			  google.maps.event.addListener(marker, 'drag', function() {
			    updateMarkerPosition(marker.getPosition());
			  });
			  
			  google.maps.event.addListener(marker, 'dragend', function() {
			        geocodePosition(marker.getPosition());
			  });
			};

			google.maps.event.addDomListener(window, 'load', initialize);



	});