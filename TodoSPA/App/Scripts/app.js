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

        // Map the location of a request to an API to a the identifier of the associated resource
        "Enter the root location of your To Go API here, e.g. https://contosotogo.azurewebsites.net/":
            "Enter the App ID URI of your To Go API here, e.g. https://contoso.onmicrosoft.com/ToGoAPI",
    };

    adalProvider.init(
        {
            instance: 'https://login.microsoftonline.com/',
            tenant: 'Enter your tenant name here e.g. contoso.onmicrosoft.com',
            clientId: 'Enter your client ID here e.g. e9a5a8b6-8af7-4719-9821-0deef255f68e',
            extraQueryParameter: 'nux=1',
            endpoints: endpoints,
            //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.  
            // Also, token acquisition for the To Go API will fail in IE when running on localhost, due to IE security restrictions.
        },
        $httpProvider
        );
   
}]);
