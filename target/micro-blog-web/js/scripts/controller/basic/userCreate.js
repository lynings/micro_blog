'use strict';
define(['app', 'service/basic/user'], function (app) {
    app.controller('UserCreateCtrl', UserCreateCtrl);
});
function UserCreateCtrl($scope, UserService,$) {

    $scope.object = {};
    $scope.object.personalBase = {};
    $scope.object.personalBase.sex = 1;
    $scope.object.personalBase.status = 1;

    UserService.roles().success(function (data) {
        $scope.roles = data.roles;
    });

    UserService.corp($("#userCorporate").val()).success(function (data) {
        $scope.corporates = data.corporate;
    });

    $scope.save = function(){
        $scope.object.personalBase['corp_id']=$scope.object.corp_id.id;

        UserService.add($scope.object).success(function (data) {
            $scope.responseCode = data;
            if ($scope.object.roles != undefined) {
                UserService.updateRole(data.object.person_id, $scope.object.roles).success(function (data) {
                    $scope.responseCode = data;
                });
            }
        });
    };

    $scope.back = function(){
        location.href = "#/basic/user";
    };

    //select2
    $scope.optionsCorp = {
        language: "zh-CN",
        multiple: false,
        width: '100%',
        initSelection: function (element, callback) {
            callback($(element).data('$ngModelController').$modelValue);
        },
        query: function (query) {
            query.callback({results: $scope.corporates});
        }
    };

    $scope.optionsRoles = {
        language: "zh-CN",
        multiple: false,
        width: '100%',
        initSelection: function (element, callback) {
            callback($(element).data('$ngModelController').$modelValue);
        },
        query: function (query) {
            query.callback({results: $scope.roles});
        }
    };
    // datetime
    $('.date').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        minView: 2,
        maxView: 4,
        format: 'yyyy-mm-dd'
    });
}