'use strict';

angular.module('gab')
    .directive ('beerList', function (){
    return {
        restrict: 'E',
       /* scope: {
            beers: '='
        },*/
        templateUrl: '../views/beerlist.html'
    };

})
    .directive ('shopsList', function(){
        return {
            restrict: 'E',
            templateUrl: '../views/shopslist.html'
        };
});