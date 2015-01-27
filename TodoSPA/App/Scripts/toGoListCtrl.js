'use strict';
angular.module('todoApp')
.controller('toGoListCtrl', ['$scope', '$location', 'toGoListSvc', 'adalAuthenticationService', function ($scope, $location, toGoListSvc, adalService) {
    $scope.error = "";
    $scope.loadingMessage = "Loading...";
    $scope.toGoList = null;
    $scope.editingInProgress = false;
    $scope.newToGoCaption = "";


    $scope.editInProgressToGo = {
        Description: "",
        ID: 0
    };



    $scope.editSwitch = function (toGo) {
        toGo.edit = !toGo.edit;
        if (toGo.edit) {
            $scope.editInProgressToGo.Description = toGo.Description;
            $scope.editInProgressToGo.ID = toGo.ID;
            $scope.editingInProgress = true;
        } else {
            $scope.editingInProgress = false;
        }
    };

    $scope.populate = function () {
        toGoListSvc.getItems().success(function (results) {
            $scope.toGoList = results;
            $scope.loadingMessage = "";
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.delete = function (id) {
        toGoListSvc.deleteItem(id).success(function (results) {
            $scope.loadingMessage = "";
            $scope.populate();
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.update = function (toGo) {
        toGoListSvc.putItem($scope.editInProgressToGo).success(function (results) {
            $scope.loadingMsg = "";
            $scope.populate();
            $scope.editSwitch(toGo);
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.add = function () {

        toGoListSvc.postItem({
            'Description': $scope.newToGoCaption,
            'Owner': adalService.userInfo.userName
        }).success(function (results) {
            $scope.loadingMsg = "";
            $scope.newToGoCaption = "";
            $scope.populate();
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMsg = "";
        })
    };
}]);