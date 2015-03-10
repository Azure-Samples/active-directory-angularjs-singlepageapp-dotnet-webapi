'use strict';
angular.module('todoApp')
.controller('graphCtrl', ['$scope', '$location', 'graphSvc', 'adalAuthenticationService', function ($scope, $location, graphSvc, adalService) {
    $scope.error = "";
    $scope.loadingMessage = "Loading...";
    $scope.files = null;

    $scope.populate = function () {
        graphSvc.getUsers().success(function (results) {
            $scope.users = results;
            $scope.loadingMessage = "";
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
}]);