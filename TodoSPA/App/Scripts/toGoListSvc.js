'use strict';
angular.module('todoApp')
.factory('toGoListSvc', ['$http', function ($http) {

    var apiEndpoint = "https://adaltogo.azurewebsites.net/api";

    return {
        getItems: function () {
            return $http.get(apiEndpoint + '/ToGoList');
        },
        getItem: function (id) {
            return $http.get(apiEndpoint + '/ToGoList/' + id);
        },
        postItem: function (item) {
            return $http.post(apiEndpoint + '/ToGoList/', item);
        },
        putItem: function (item) {
            return $http.put(apiEndpoint + '/ToGoList/', item);
        },
        deleteItem: function (id) {
            return $http({
                method: 'DELETE',
                url: apiEndpoint + '/ToGoList/' + id,
            });
        }
    };
}]);