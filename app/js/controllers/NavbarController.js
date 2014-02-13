'use strict';

'use strict';

eventsApp.controller('NavbarController',
    function NavbarController($scope, $rootScope, $q, userManager, gravatarUrlBuilder) {
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
                $rootScope.$broadcast('user.changed', user);

                deferred.resolve('Sign in successful.');
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

        $scope.$on('user.changed', function(event, user) {
            $scope.currentUser = user;
            $scope.isUser = user !== undefined;
        });

        $scope.getNavGravatarUrl = function (email) {
            return gravatarUrlBuilder.buildGravatarUrl(email, 38);
        };
    }
);