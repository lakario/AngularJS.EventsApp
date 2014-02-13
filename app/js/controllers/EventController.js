'use strict';

eventsApp.controller('EventController',
    function EventsController($scope, $anchorScroll, $routeParams, eventData, userManager) {
        $scope.sortorder = 'name';
        $scope.limit = 5;
        $scope.isUser = false;

        userManager.getCurrentUser().then(function (user) {
            $scope.currentUser = user;
            $scope.isUser = user !== undefined;
        });

        eventData.getEvent($routeParams.eventId).then(
            function (event) {
                $scope.event = event;
            },
            function (response) {
                console.log(response);
            }
        );

        $scope.upVoteSession = function (clickEvent, eventId, session) {
            if (!$scope.isUser) {
                console.log('Unauthenticated attempt to vote.');
                return;
            }

            eventData.recordVote(eventId, session.id, $scope.currentUser, 1).then(function () {
                eventData.getEvent(eventId).then(function (event) {
                    $scope.event = event;
                    flash($(clickEvent.currentTarget).siblings('.badge').eq(0));
                });
            })
        };

        $scope.downVoteSession = function (clickEvent, eventId, session) {
            if (!$scope.isUser) {
                console.log('Unauthenticated attempt to vote.');
                return;
            }

            eventData.recordVote(eventId, session.id, $scope.currentUser, -1).then(function () {
                eventData.getEvent(eventId).then(function (event) {
                    $scope.event = event;
                    flash($(clickEvent.currentTarget).siblings('.badge').eq(0));
                });
            })
        };

        $scope.scrollToSession = function () {
            $anchorScroll();
        }

        $scope.$on('user.changed', function(event, user) {
            $scope.currentUser = user;
            $scope.isUser = user !== undefined;
        });

        var flash = function (element) {
            $(element).finish().animate({
                opacity: .3
            }, 'slow').animate({
                    opacity: 1
                }, 'slow');
        }

    }
);