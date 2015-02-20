'use strict';
angular.module('todoApp', ['ngRoute','AdalAngular'])
.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {

    $routeProvider.when("/Home", {
        controller: "homeCtrl",
        templateUrl: "/App/Views/Home.html",
    }).when("/TodoList", {
        controller: "todoListCtrl",
        templateUrl: "/App/Views/TodoList.html",
        requireADLogin: true,
    }).when("/Files", {
        controller: "filesCtrl",
        templateUrl: "/App/Views/Files.html",
        requireADLogin: true,
    }).when("/UserData", {
        controller: "userDataCtrl",
        templateUrl: "/App/Views/UserData.html",
    }).otherwise({ redirectTo: "/Home" });

    var endpoints = {

        // Map the location of a request to an API to a the identifier of the associated resource
        "https://graphdir1-my.sharepoint.com": "https://graphdir1-my.sharepoint.com",
    };

    adalProvider.init(
        {
            tenant: 'GraphDir1.onMicrosoft.com',
            clientId: 'b8a1fa1b-a6c2-4f41-8db5-acd90a53d9bc',
            extraQueryParameter: 'nux=1',
            endpoints: endpoints,
            cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
        },
        $httpProvider
        );
   
}]);
