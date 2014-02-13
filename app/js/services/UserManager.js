'use strict';

eventsApp.factory('userManager', function (cookieManager, userData, $q) {
    return {
        saveUser: function (user) {
            var self = this;
            var deferred = $q.defer();

            user.userName = user.userName.trim();

            userData.saveUser(user).then(function () {
                self.signIn(user.userName, user.password).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject('Unable to sign in.');
                });
            }, function() {
                deferred.reject('Unable to save user');
            });

            return deferred.promise;
        },
        signIn: function (userName, password) {
            var deferred = $q.defer();
            var getUserPromise = this.getUser(userName);

            getUserPromise.then(
                function (user) {
                    if (user && user.password == password) {
                        cookieManager.setUserCookie(user);
                        deferred.resolve(user);
                    }
                    else {
                        console.log('Unable to sign in. Invalid password.');
                        deferred.reject();
                    }
                },
                function (response) {
                    console.log('Unable to sign in. User not found.', response);
                    deferred.reject();
                }
            )

            return deferred.promise;
        },
        signOut: function () {
            cookieManager.setUserCookie(null);
        },
        getUser: function (userName) {
            return userData.getUser(userName);
        },
        getCurrentUser: function () {
            var deferred = $q.defer();
            var userName = cookieManager.getUserCookie();

            if (!userName) {
                deferred.reject('No active user.');
            }
            else {
                userData.getUser(userName).then(function (user) {
                    deferred.resolve(user);
                }, function() {
                    deferred.reject('Unable to find user specified: ' + userName);
                })
            };

            return deferred.promise;
        }
    }
})