'use strict';
angular.module('todoApp')
.controller('filesCtrl', ['$scope', '$location', 'filesSvc', 'adalAuthenticationService', function ($scope, $location, filesSvc, adalService) {
    $scope.error = "";
    $scope.loadingMessage = "Loading...";
    $scope.files = null;

    $scope.populate = function () {
        filesSvc.getItems().success(function (results) {
            $scope.files = results;
            $scope.loadingMessage = "";
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
}]);