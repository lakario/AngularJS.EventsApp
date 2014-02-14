'use strict';

eventsApp.directive('mySample', function() {
    return {
        restrict: 'C', /* A = Attribute (default), E = element, C = class */
        template: "<input type='text' ng-model='sampleData' />{{sampleData}}<br />",
        scope: {

        }
    };
});