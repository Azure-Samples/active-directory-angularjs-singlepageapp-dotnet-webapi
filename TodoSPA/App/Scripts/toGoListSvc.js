'use strict';
angular.module('todoApp')
.factory('toGoListSvc', ['$http', function ($http) {

    var apiEndpoint = "Enter the root location of your To Go API here, e.g. https://contosotogo.azurewebsites.net/";

    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];
    
    return {
        getItems: function () {
            return $http.get(apiEndpoint + 'api/ToGoList');
        },
        getItem: function (id) {
            return $http.get(apiEndpoint + 'api/ToGoList/' + id);
        },
        postItem: function (item) {
            return $http.post(apiEndpoint + 'api/ToGoList/', item);
        },
        putItem: function (item) {
            return $http.put(apiEndpoint + 'api/ToGoList/', item);
        },
        deleteItem: function (id) {
            return $http({
                method: 'DELETE',
                url: apiEndpoint + 'api/ToGoList/' + id,
            });
        }
    };
}]);