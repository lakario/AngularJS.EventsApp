'use strict';

eventsApp.controller('TicketQuantityPickerSampleController',
    function TicketQuantityPickerSampleController($scope) {

        $scope.setQuantity = function(quantity) {
            alert('Quantity set to: ' + quantity);
        }

    }
)