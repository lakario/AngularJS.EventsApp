'use strict';

eventsApp.controller('EditProfileController',
    function EditProfileController($scope, gravatar) {
        $scope.user = {};

        $scope.getGravatarUrl = function(email) {
            return gravatar.buildGravatarUrl(email);
        };
    }
)