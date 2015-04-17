'use strict';
angular.module('todoApp')
.controller('profileCtrl', ['$scope', '$location', 'graphSvc', 'adalAuthenticationService', function ($scope, $location, graphSvc, adalService) {
    $scope.error = "";
    $scope.loadingMessage = "Loading...";
    $scope.files = null;

    $scope.populate = function () {
        graphSvc.getProfile().success(function (results) {
            $scope.profile = results;
            $scope.profileString = JSON.stringify(results, undefined, 2);
            $scope.tenant = adalService.config.tenant;
            $scope.loadingMessage = "";
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
}]);