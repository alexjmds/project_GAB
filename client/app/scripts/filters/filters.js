'use strict';

angular.module('gab').filter('toCountryFlag', function() {
        return function(origin) {
            var flag;
            switch (origin) {
                case "UA":
                    flag = 'ua';
                    break;
                case "USA":
                    flag = 'us';
                    break;
                case "Canada":
                    flag = 'ca';
                    break;
                case "Ireland":
                    flag = 'ie';
                    break;
                case "Belgium":
                    flag = 'be';
                    break;
            }
            return flag;
        };
    })
    .filter('dataFilte', function() {
        return function(bdate) {
            var now = new Date();
            var minusMonth = now.getMonth() + 1 - (bdate[5] + bdate[6]);
            var minusDay = now.getDate() - (bdate[8] + bdate[9]);
            if (minusMonth) {
                return false;
            } else {
                if (minusDay > 4) {
                    return false;
                } else {
                    return true;
                }
            }

        };
    })
    .filter('datefilter', function() {
        return function(da) {
            return da;
            //return da.slice(0,10);
        };
    })
    .filter('aplyFilter', function() {
        return function(da) {
            var result;
            for (var key in da) {
                if (!result) {
                    result = key + ': ' + da[key] + '; ';
                } else {
                    result = result + key + ': ' + da[key] + '; ';
                }
            }
            return result;
        };
    });