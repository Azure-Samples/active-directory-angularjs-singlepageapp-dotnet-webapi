'use strict';
angular.module('todoApp')
.controller('userDataCtrl', ['$scope', 'adalAuthenticationService', function ($scope, adalService) {
    
    $scope.claims = [];

    for (var property in adalService.userInfo.profile) {
        if (adalService.userInfo.profile.hasOwnProperty(property)) {
            $scope.claims.push({
                key: property,
                value: adalService.userInfo.profile[property],
            });
        }
    }
}]);