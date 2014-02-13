'use strict';

eventsApp.controller('EventListController',
    function EventListController($scope, $location, eventData) {
        $scope.sortorder = 'name';

        $scope.events = eventData.getAllEvents()
    }
)