'use strict';

eventsApp.directive('ticketQuantityPicker', function () {
    return {
        restrict: 'E'
        , templateUrl: '/templates/directives/TicketQuantityPicker.html'
        , replace: true
        , scope: {
            selectedQuantity: '@quantity'
            , setQuantity: '&'
        }
        , controller: function ($scope) {
            $scope.canIncrement = $scope.selectedQuantity < 8;
            $scope.canDecrement = $scope.selectedQuantity > 1;
            $scope.disableIncrement = !$scope.canIncrement;
            $scope.disableDecrement = !$scope.canDecrement;

            var updateQty = function (quantity) {
                $scope.selectedQuantity = quantity;
                $scope.setQuantity({ 'quantity': quantity });
                $scope.canIncrement = $scope.selectedQuantity < 8;
                $scope.canDecrement = $scope.selectedQuantity > 1;
                $scope.disableIncrement = !$scope.canIncrement;
                $scope.disableDecrement = !$scope.canDecrement;
            }

            $scope.increment = function () {
                if (!$scope.canIncrement) {
                    return;
                }

                var newVal = Math.min(8, Number($scope.selectedQuantity) + 1);

                if (newVal != $scope.selectedQuantity) {
                    updateQty(newVal);
                }
            };

            $scope.decrement = function () {
                if (!$scope.canDecrement) {
                    return;
                }

                var newVal = Math.max(1, Number($scope.selectedQuantity) - 1);

                if (newVal != $scope.selectedQuantity) {
                    updateQty(newVal);
                }
            };
        }
    };
});