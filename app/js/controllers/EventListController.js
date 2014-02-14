'use strict';

eventsApp.controller('EventListController',
    function EventListController($scope, $location, $route, eventData) {
        $scope.sortorder = 'name';

        // direct data access
        $scope.events = eventData.getAllEvents();

        // resolve binding
//        $scope.events = $route.current.locals.events;
    }
)