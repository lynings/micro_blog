/**
 * Created by Blink on 3/23/2016 AD.
 */
define(['app', 'service/basic/user/userOperation'], function (app) {
    'use strict';
    app.controller('UserOperationCtrl', UserOperationCtrl);
});

function UserOperationCtrl($scope, UserOperationService, $, swal, data_host) {


    $scope.object = {};

    $scope.user = {};

    var userService = UserOperationService();

    $scope.login = function () {

        var username = $scope.object.username;
        var password = $scope.object.password;
        userService.login(username, password).success(function (data) {
            if(data.code == '200') {
                window.location.href= 'home.html';
            }else {
                $scope.msg = data.msg;
            }
        });
    };

    $scope.register = function () {

        var name = $scope.object.name;
        var username = $scope.object.username;
        var password = $scope.object.password;
        userService.register(name, username, password).success(function (data) {
            if(data.code == '200') {
                $scope.msg = data.msg;
            }else {
                $scope.msg = data.msg;
            }
        });
    };

    $scope.list = function () {

    }

    $scope.logout = function () {

    };

    $scope.update = function () {

    };

    $scope.getUserInfo = function () {
        userService.getUserInfo().success(function (data) {
            if(data.code == 200) {
                $scope.user = data.userInfo;
            }else {
                window.location.href = data_host + '/index.jsp';
            }
        })
    };

    $scope.getUserInfo();

}
