'use strict';

eventsApp.controller('EditProfileController',
    function EditProfileController($scope, $rootScope, userManager, $location) {
        $scope.user = {};

        var userPromise = userManager.getCurrentUser();

        if(userPromise) {
            userPromise.then(function(user) {
                $scope.user = user;
            });
        }

        $scope.saveUser = function (user, editProfileForm) {
            if (editProfileForm.$valid) {
                userManager.saveUser(user).then(function() {
                    window.alert('user updated!');

                    $rootScope.$broadcast('user.changed', user);
                });
            }
        }

        $scope.cancelEdit = function() {
            $location.url('/events');
        }
    }
)