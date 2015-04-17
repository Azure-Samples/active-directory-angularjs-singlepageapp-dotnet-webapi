'use strict';
angular.module('todoApp')
.factory('graphSvc', ['$http', function ($http) {

    var apiEndpoint = "https://graph.windows.net/strockisdev.onmicrosoft.com/";

    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];
    
    return {
        getProfile: function () {
            return $http.get(apiEndpoint + 'me?api-version=1.5');
        },
    };
}]);