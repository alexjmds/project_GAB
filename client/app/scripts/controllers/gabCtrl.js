'use strict';

angular.module('gab')
    .controller('gab', function($scope, Beers, $location, $routeParams, Restangular, auth, $auth, alert, authToken) {
        $scope.beers = Beers.getList().$object;
        $scope.newbeers = {
            "new": true
        };
        $scope.saveBeer = function() {
            Beers.post($scope.newbeers).then(function() {
                $location.path('/beers');
                $scope.addClose();
                alert('thump-up', '', 'A ' + $scope.newbeers.name + ' beer is saved!');
                $scope.beers = Beers.getList().$object;
                $scope.newbeers = {
                    "new": true
                };
            });
        };
        $scope.newshop = {};
        $scope.saveShop = function() {
            var beerid = this.beers2._id;
            Restangular.all("beers", 'http://localhost:3000/').customPOST($scope.newshop, beerid + '/shops').then(function() {
                $scope.addClose();
                alert('thump-up', '', 'A ' + $scope.newshop.shopName + ' shop is saved!');
                $scope.beers = Beers.getList().$object;
                $scope.newshop = {};
                $scope.beers2 = {};
            });

        };


        $scope.register = 0;
        $scope.addIsOpen = 0;
        $scope.isAppVisible = 1;
        $scope.isPanelVisible = 1;
        $scope.currentBeer = 0;
        $scope.addHomeSectionShow = 1;
        $scope.addBeerSectionShow = 0;
        $scope.addShopSectionShow = 0;

        var closeLoginPop = function() {
            $scope.loginPop = 0;
        };
        $scope.addSectionOption = function(option) {
            $scope.addHomeSectionShow = 0;
            console.log(option);
            if (option === 'b') {
                $scope.addBeerSectionShow = 1;

            }
            if (option === 's') {
                $scope.addShopSectionShow = 1;
                setTimeout(initialize2, 1);
            }
        };
        $scope.addShopOpen = function(data) {
            if ($scope.isAuthenticated()) {
                $scope.addOpen();
                $scope.addHomeSectionShow = 0;
                $scope.addShopSectionShow = 1;
                setTimeout(initialize2, 1);
                $scope.beers2 = data;
                console.log($scope.beers2);
            } else {
                $scope.goLogin();
            }
        };
        $scope.showMobileMenu = function() {
            $scope.isMobileMenuVisible = !0;
        };
        $scope.hideMobileMenu = function() {
            $scope.isMobileMenuVisible = !1;
            closeLoginPop();
        };
        $scope.hideBeerPanel = function() {
            $scope.currentBeer = 0;
        };
        $scope.addClose = function() {
            $scope.addIsOpen = 0;
            $scope.addHomeSectionShow = 1;
            $scope.addBeerSectionShow = 0;
            $scope.addShopSectionShow = 0;
            $scope.beers2 = {};
        };

        $scope.addOpen = function() {
            $scope.addIsOpen = !$scope.addIsOpen;
            $scope.isMobileMenuVisible = 0;

        };
        $scope.mapToList = function() {
            $scope.isPanelVisible = !$scope.isPanelVisible;
            $scope.currentBeer = 0;
        };

        $scope.goToBeer = function() {
            $scope.currentBeer = 1;
            $scope.item = this.beers;

        };


        $scope.goToMap = function() {
            route(this.shop);
            //console.log (distance);
            $scope.dis = distance;
            if (document.body.clientWidth <= 640) {
                $scope.isPanelVisible = 0;
                $scope.currentBeer = 0;
            }
        };
        $scope.goLogin = function() {
            $scope.loginPop = !$scope.loginPop;
        };
        $scope.countryList = ['UA', 'PL', 'USA', "Belgium", "Ireland", "Canada"];
        $scope.colorList = ['Dark', 'Light', 'Amber', 'Brown'];
        $scope.styleList = ['Ale', 'Lager', 'Stout', 'Wheat', 'Hybrid'];

        // addsection googlemaps
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
            // var shoplat = angular.element(document.querySelector('#lat'));
            // var shoplng = angular.element(document.querySelector('#lng'));
            // shoplat.val(latLng.lat());
            // shoplng.val(latLng.lng());

            $scope.newshop = {
                lat: latLng.lat(),
                lng: latLng.lng()
            };
            console.log($scope.newshop);


        }

        function updateMarkerAddress(str) {
            str = str.replace(/,\s79.../g, '');
            str = str.replace(/вулиця/g, '');
            str = str.replace(/,\sЛьвівська область,\sУкраина/g, '');
            // document.getElementById('address').value = str;
            $scope.newshop.address = str;
            $scope.$apply();
        }

        function initialize2() {
            var latLng = new google.maps.LatLng(49.8488419, 24.0269501);
            var map = new google.maps.Map(document.getElementById('mapforadd'), {
                zoom: 14,
                center: latLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var marker = new google.maps.Marker({
                position: latLng,
                title: 'Shop here!',
                map: map,
                draggable: true
            });

            google.maps.event.addListener(map, 'drag', function() {

                // console.log(map.center.lat(), map.center.lng());
                // marker.position(map.center.lat(), map.center.lng());
            });

            google.maps.event.addListener(marker, 'drag', function() {
                updateMarkerPosition(marker.getPosition());

            });

            google.maps.event.addListener(marker, 'dragend', function() {
                geocodePosition(marker.getPosition());

            });
        }


        //Login - logout - reg 
        $scope.isAuthenticated = $auth.isAuthenticated;

        $scope.submit = function() {
            $auth.login({
                    email: $scope.email,
                    password: $scope.password
                }).then(function() {
                    console.log('ligin... ok');
                    $scope.userLogin = $scope.email;

                    alert('thump-up', 'Login successful.', 'Welcome ' + $scope.email + ' back!');
                })
                .catch(function() {
                    alert('err-up', 'Login failed.', 'Incorect login or password');
                });
        };

        $scope.goLogout = function() {
            console.log('logout...');
            alert('thump-up', 'Logout successful.', '');
            $scope.addClose();
            $auth.logout();
        };

        $scope.reg = function() {
            $auth.signup({
                    email: $scope.email,
                    password: $scope.password
                })
                .then(function(res) {
                    console.log('Reg... ok!..' + res.data.user.email);
                    alert('thump-up', 'Registration successful.', 'Welcome ' + $scope.email + ' to GotABeer!');
                    $scope.loginPop = 0;
                    $auth.login({
                        email: $scope.email,
                        password: $scope.password
                    }).then(function() {
                        console.log('ok');
                    });

                })
                .catch(function(err) {
                    console.log('Something went wrong :(' + err.message);
                    $scope.loginPop = 0;
                });
        };


        //For filters directive

        for (var key in $scope.searchbeer) {
            $scope.filterSearch += $scope.searchbeer[key];
        }




    });