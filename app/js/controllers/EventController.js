'use strict';

eventsApp.controller('EventController',
    function EventsController($scope, eventData) {
        $scope.sortorder = 'name';
        $scope.limit = 5;

        var eventPromise = eventData.getEvent();

        eventPromise.then(
            function(event) {
                $scope.event = event;
            },
            function(response) {
                console.log(response);
            }
        );

        $scope.event = eventData.getEvent();

        $scope.upVoteSession = function(event, session) {
            session.upVoteCount++;
            flash(event.currentTarget);
        };

        $scope.downVoteSession = function(event, session) {
            session.upVoteCount--;
            flash(event.currentTarget);
        };

        var flash = function(element) {
            $(element).siblings('.badge').eq(0).finish().animate({
                opacity: .3
            }, 'slow').animate({
                opacity: 1
            }, 'slow');
        }
    }
);