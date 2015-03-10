'use strict';
angular.module('todoApp')
.factory('graphSvc', ['$http', function ($http) {

    var apiEndpoint = "https://graph.ppe.windows.net/strockisdevthree.ccsctp.net/";

    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];
    
    return {
        getUsers: function () {
            return $http.get(apiEndpoint + 'users?api-version=1.5');
        },
    };
}]);