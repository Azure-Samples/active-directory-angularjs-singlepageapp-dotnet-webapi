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
    }).when("/ToGoList", {
        controller: "toGoListCtrl",
        templateUrl: "/App/Views/ToGoList.html",
        requireADLogin: true,
    }).when("/UserData", {
        controller: "userDataCtrl",
        templateUrl: "/App/Views/UserData.html",
    }).otherwise({ redirectTo: "/Home" });

    var endpoints = {
        "https://localhost:44327/": "https://strockisdev.onmicrosoft.com/scratchservice",
        "https://adaltogo.azurewebsites.net/": "https://strockisdev.onmicrosoft.com/scratchservice",
    };

    adalProvider.init(
        {
            tenant: 'strockisdev.onmicrosoft.com',
            clientId: 'b075ddef-0efa-453b-997b-de1337c29185',
            extraQueryParameter: 'nux=1',
            endpoints: endpoints,
        },
        $httpProvider
        );
   
}]);
