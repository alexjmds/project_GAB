'use strict';


angular.module('gab', ['ngRoute', 'restangular', 'ui.router', 'satellizer'])
  
  .config(function ($routeProvider, RestangularProvider, $urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {

      RestangularProvider.setBaseUrl('http://localhost:3000');

    $authProvider.loginUrl = API_URL + 'login';
    $authProvider.signupUrl = API_URL + 'register';
  
    $httpProvider.interceptors.push('authInterceptor');

    })
  .constant('API_URL', 'http://localhost:4000/')

.run(function($window){

    var params = $window.location.search.substring(1);

    if(params && $window.opener && $window.opener.location.origin === $window.location.origin){

        var pair = params.split('=');
        var code = decodeURIComponent(pair[1]);
        $window.opener.postMessage(code, $window.location.origin);
    }
})
  .factory('BeersRestangular', function(Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setRestangularFields({
          id: '_id'
        });
      });
    })
    .factory('Beers', function(BeersRestangular) {
      return BeersRestangular.service('beers');
    });