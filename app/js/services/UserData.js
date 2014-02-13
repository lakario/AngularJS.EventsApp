'use strict';

eventsApp.factory('userData', function ($resource, $q) {
    var resource = $resource('/data/user/:userName', { userName: '@userName' });

    return {
        getUser: function (userName) {
            var deferred = $q.defer();

            resource.get({ userName: userName },
                function (event) {
                    deferred.resolve(event);
                },
                function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        saveUser: function (user) {
            var deferred = $q.defer();

            resource.save(user,
                function (response) {
                    deferred.resolve(response);
                },
                function (response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }
    };
});