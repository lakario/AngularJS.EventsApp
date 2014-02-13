'use strict';

eventsApp.controller('EditProfileController',
    function EditProfileController($scope, gravatarUrlBuilder, userManager) {
        $scope.user = {};

        var userPromise = userManager.getCurrentUser();

        if(userPromise) {
            userPromise.then(function(user) {
                $scope.user = user;
            });
        }

        $scope.getGravatarUrl = function (email) {
            return gravatarUrlBuilder.buildGravatarUrl(email);
        };

        $scope.saveUser = function (user, editProfileForm) {
            if (editProfileForm.$valid) {
                userManager.saveUser(user).then(function() {
                    window.alert('user updated!');
                });
            }
        }
    }
)