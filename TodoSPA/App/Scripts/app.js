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
    }).when("/Users", {
        controller: "graphCtrl",
        templateUrl: "/App/Views/Users.html",
        requireADLogin: true,
    }).when("/UserData", {
        controller: "userDataCtrl",
        templateUrl: "/App/Views/UserData.html",
        requireADLogin: true,
    }).otherwise({ redirectTo: "/Home" });

    var endpoints = {

        // Map the location of a request to an API to a the identifier of the associated resource
        "https://graph.windows.net/strockisdev.onmicrosoft.com/": "https://graph.windows.net/",
    };

    adalProvider.init(
        {
            instance: 'https://login.microsoftonline.com/',
            tenant: 'strockisdev.onmicrosoft.com',
            clientId: 'b075ddef-0efa-453b-997b-de1337c29185',
            extraQueryParameter: 'nux=1',
            endpoints: endpoints,
            cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
        },
        $httpProvider
        );
   
}]);
