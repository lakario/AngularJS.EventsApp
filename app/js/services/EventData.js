'use strict';

eventsApp.factory('eventData', function($resource, $http, $q) {
    var resource = $resource('/data/event/:id.json', {id: '@id' });

    return {
        getEvent: function() {
            var deferred = $q.defer();

            resource.get({ id:1 },
                function(event) {
                    deferred.resolve(event);
                },
                function(response) {
                    deferred.reject(event);
                });

            return deferred.promise;
        },
        save: function(event) {
            var deferred = $q.defer();

            event.id = 123;

            resource.save(event,
                function(response) { deferred.resolve(response); },
                function(response) { deferred.reject(response); }
            );

            return deferred.promise;
        }
//        event: {
//            name: 'AngularJS Boot Camp',
//            date: '1392068804089',
//            time: '1:00 pm',
//            location: {
//                address: '123 Fake St',
//                city: 'Mountain View',
//                state: 'CA'
//            },
//            imageUrl: 'img/AngularJS-large.png',
//            sessions: [
//                {
//                    name: 'Directives Masterclass',
//                    creatorName: 'Bob Smith',
//                    duration: 1,
//                    level: 'Advanced',
//                    abstract: 'In this session you will learn the inns and outs of directives!',
//                    upVoteCount: 0
//                },
//                {
//                    name: 'Scopes for fun and profit',
//                    creatorName: 'John Doe',
//                    duration: 2,
//                    level: 'Introductory',
//                    abstract: 'Vivamus commodo, enim ut commodo fermentum, augue est tempus libero, ut fermentum magna turpis sed nisl.',
//                    upVoteCount: 0
//                },
//                {
//                    name: 'Well Behaved Controllers',
//                    creatorName: 'Mike Jones',
//                    duration: 4,
//                    level: 'Intermediate',
//                    abstract: 'Aenean mauris nunc, porttitor eu lorem quis, tincidunt molestie neque.',
//                    upVoteCount: 0
//                }
//            ]
//        },
//        getEvent: function() {
//            var deferred = $q.defer();
//
//            deferred.notify('Fetching data');
//
//            $http({method: 'GET', url : '/data/event/1.json'})
//                .success(function(data, status, headers, config) {
//                    console.log(data.name);
//                    deferred.resolve(data);
//                })
//                .error(function(data, status, headers, config) {
//                    deferred.reject(status);
//                });
//
//            return deferred.promise;
//        }
    };
});