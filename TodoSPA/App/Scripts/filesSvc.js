'use strict';
angular.module('todoApp')
.factory('filesSvc', ['$http', function ($http) {

    var apiEndpoint = "https://graphdir1-my.sharepoint.com/";

    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];
    
    return {
        getItems: function () {
            return $http.get(apiEndpoint + '_api/v1.0/me/files');
        },
    };
}]);