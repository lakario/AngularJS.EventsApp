'use strict';

eventsApp.controller('EventController',
    function EventsController($scope) {

        $scope.snippet = '<span style="color:red;">hi there</span>';
        $scope.boolValue = true;
        $scope.mystyle = {color:'red'};
        $scope.myclass = 'blue';
        $scope.buttonDisabled = true;

        $scope.event = {
            name: 'AngularJS Bootcamp',
            date: '1/2/2013',
            time: '1:00 pm',
            location: {
                address: '123 Fake St',
                city: 'Mountain View',
                state: 'CA'
            },
            imageUrl: 'img/AngularJS-large.png',
            sessions: [
                {
                    name: 'Directives Masterclass',
                    creatorName: 'Bob Smith',
                    duration: '1 hr',
                    level: 'Advanced',
                    abstract: 'In this session you will learn the inns and outs of directives!',
                    upVoteCount: 0
                },
                {
                    name: 'Scopes for fun and profit',
                    creatorName: 'John Doe',
                    duration: '30 mins',
                    level: 'Intermediate',
                    abstract: 'Vivamus commodo, enim ut commodo fermentum, augue est tempus libero, ut fermentum magna turpis sed nisl.',
                    upVoteCount: 0
                },
                {
                    name: 'Well Behaved Controllers',
                    creatorName: 'Mike Jones',
                    duration: '2 hrs',
                    level: 'Beginner',
                    abstract: 'Aenean mauris nunc, porttitor eu lorem quis, tincidunt molestie neque.',
                    upVoteCount: 0
                }
            ]
        };

        $scope.upVoteSession = function($event, session) {
            session.upVoteCount++;
            flash($event.currentTarget);
        };

        $scope.downVoteSession = function($event, session) {
            session.upVoteCount--;
            flash($event.currentTarget);
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