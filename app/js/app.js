'use strict';

var appVersion = "0.1";

var eventsApp = angular.module('eventsApp', ['ngResource', 'ngCookies', 'ngRoute'])
    .config(function($routeProvider, $locationProvider) {

        $routeProvider.when('/newEvent', {
            templateUrl: 'templates/NewEvent.html',
            controller: 'EditEventController'
        });

        $routeProvider.when('/events', {
            templateUrl: 'templates/EventList.html',
            controller: 'EventListController'

            /* resolve binding is useful for slow loading data, prevents the page from rendering until the data is ready */
//            , resolve: {
//                events: function($q, eventData) {
//                    var deferred = $q.defer();
//
//                    eventData.getAllEventsSlow()
//                        .then(function(events) {
//                            deferred.resolve(events);
//                        },
//                        function(response) {
//                            deferred.reject(response);
//                        });
//
//                    return deferred.promise;
//                }
//            }
        });

        $routeProvider.when('/event/:eventId', {
            templateUrl: 'templates/EventDetails.html',
            controller: 'EventController'
        });

        $routeProvider.when('/user/editProfile', {
            templateUrl: 'templates/EditProfile.html',
            controller: 'EditProfileController'
        });

        $routeProvider.when('/version', {
            template: 'App Version: ' + appVersion
        });

        $routeProvider.when('/directiveSample', {
            templateUrl: 'templates/DirectiveSample.html'
        })

        $routeProvider.otherwise({redirectTo: '/events'});

        //$locationProvider.html5Mode(true);

    });
//    .factory('myCache', function($cacheFactory) {
//        return $cacheFactory('myCache', {capacity: 3})
//    });

