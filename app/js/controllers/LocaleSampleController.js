'use strict';

eventsApp.controller('LocaleSampleController',
    function LocaleSampleController($scope, $locale) {

        $scope.myDate = Date.now();
        $scope.myFormat = $locale.DATETIME_FORMATS.fullDate;
        $scope.dateTimeFormats = [];

        for(var prop in $locale.DATETIME_FORMATS) {
            if(typeof($locale.DATETIME_FORMATS[prop]) === 'string') {
                $scope.dateTimeFormats.push(prop);
            }
        }

        $scope.changeFormat = function(format) {
            $scope.myFormat = format;
        };

//        throw { message: "Alert! Alert!" };
    }
)