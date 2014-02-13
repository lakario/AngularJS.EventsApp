'use strict';

'use strict';

eventsApp.controller('NavbarController',
    function NavbarController($scope, $rootScope, $q, userManager) {
        $scope.isUser = false;

        userManager.getCurrentUser().then(function (user) {
            $scope.currentUser = user;
            $scope.isUser = user !== undefined;
        });

        $scope.signIn = function (userName, password) {
            var deferred = $q.defer();

            if (!userName) {
                deferred.reject('Username is missing');
                return;
            }

            userManager.signIn(userName, password).then(function (user) {
                $scope.currentUser = user;
                $scope.isUser = user !== undefined;

                deferred.resolve('Sign in successful.');

                $rootScope.$broadcast('user.changed', user);
            }, function () {
                $scope.currentUser = null;
                $scope.isUser = false;

                deferred.reject('Unable to sign in.')
            });

            return deferred.promise;
        }

        $scope.signOut = function () {
            userManager.signOut();

            $scope.currentUser = null;
            $scope.isUser = false;

            $rootScope.$broadcast('user.changed');
        }
    }
);