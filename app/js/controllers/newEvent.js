'use strict';

eventsApp.controller('editEditController',
    function editEditController($scope){
        $scope.saveEvent = function(event){
            window.alert("saved");
        };
    }
);