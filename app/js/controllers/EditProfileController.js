'use strict';

eventsApp.controller('EditProfileController',
    function EditProfileController($scope, $rootScope, gravatarUrlBuilder, userManager) {
        $scope.user = {};

        var userPromise = userManager.getCurrentUser();

        if(userPromise) {
            userPromise.then(function(user) {
                $scope.user = user;
            });
        }

        $scope.getGravatarUrl = function (email) {
            return gravatarUrlBuilder.buildGravatarUrl(email, 200);
        };

        $scope.saveUser = function (user, editProfileForm) {
            if (editProfileForm.$valid) {
                userManager.saveUser(user).then(function() {
                    window.alert('user updated!');

                    $rootScope.$broadcast('user.changed', user);
                });
            }
        }

        $scope.cancelEdit = function() {
            window.location.hash = '#/events';
        }
    }
)