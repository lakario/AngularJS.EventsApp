'use strict';

eventsApp.controller('EditEventController',
    function EditEventController($scope, $location, eventData) {
        $scope.saveEvent = function (event, newEventForm) {
            if (newEventForm.$valid) {
                eventData.saveEvent(event).then(
                    function (response) {
                        window.alert('Event saved successfully');
                    },
                    function (response) {
                        console.log('failure', response);
                    }
                );
            }
        }

        $scope.cancelEdit = function () {
            $location.url('/events');
        }
    }
)