'use strict';
angular.module('todoApp')
.controller('claimsCtrl', ['$scope', 'adalAuthenticationService', function ($scope, adalService) {
    
    $scope.claims = [];
    $scope.userInfo = adalService.userInfo;

    for (var property in adalService.userInfo.profile) {
        if (adalService.userInfo.profile.hasOwnProperty(property)) {
            $scope.claims.push({
                key: property,
                value: adalService.userInfo.profile[property],
            });
        }
    }
}]);