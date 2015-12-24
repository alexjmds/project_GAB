
function DropDown(el) {
        this.dd = el;
        this.placeholder = this.dd.children('span');
        this.opts = this.dd.find('ul.dropdown > li');
        this.val = '';
        this.index = -1;
        this.initEvents();
      }
      DropDown.prototype = {
        initEvents : function() {
          var obj = this;

          obj.dd.on('click', function(event){
            $(this).toggleClass('active');
            return false;
          });

          obj.opts.on('click',function(){
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
                        console.log (obj.val);
                        return (obj.val);
          });
        },
        getValue : function() {
          return this.val;
        },
        getIndex : function() {
          return this.index;
        }
      }

      $(function() {

        var dd = new DropDown( $('#dd') );
                var dd = new DropDown( $('#dd2') );    
        $(document).click(function() {
          $('.wrapper-dropdown-3').removeClass('active');
        });

      });

          
        
    var map = null;
    var directions = null;
    var distance = null;
    var dms;
    
    function initialize() {
     var mapOptions = {
        center: new google.maps.LatLng(49.8488419, 24.0269501),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 16,
  
      };

      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      dms = new google.maps.DistanceMatrixService();
      directionService = new google.maps.DirectionsService();
      directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
   };
    
   
        var request = {
        origin: new google.maps.LatLng (49.871815, 24.032105),
        destination: new google.maps.LatLng (49.850007, 24.022910),
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      }
        
         navigator.geolocation.getCurrentPosition(function(position) {
            var la = position.coords.latitude;
            var lo = position.coords.longitude;
            request.origin = new google.maps.LatLng (la, lo);
        });    
        
    function route(data) {
        
        var lat = data.lat;
        var lng = data.lng;
        request.destination = new google.maps.LatLng (lat, lng)
       directionService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
            
               
        } else {
          alert("Directions query failed: " + status);
        }
      });
           dms.getDistanceMatrix({
           origins: [request.origin],
           destinations: [request.destination],
           travelMode: request.travelMode,
           unitSystem: google.maps.UnitSystem.METRIC 
           }, function(response, status) {
        if (status == "OK") {
           return distance = (response.rows[0].elements[0].distance.text);
        }
    }
    );
        
    };
         
        function updateMode() {
    switch (document.getElementById("mode").value) {
      case "DRIVING":
        request.travelMode = google.maps.TravelMode.DRIVING;
        break;
      case "TRANSIT":
        request.travelMode = google.maps.TravelMode.TRANSIT;
        break;
      case "WALKING":
        request.travelMode = google.maps.TravelMode.WALKING;
        break;
    };
         
     document.getElementById("travelMode").innerHTML = request.travelMode;
     route();
        
};