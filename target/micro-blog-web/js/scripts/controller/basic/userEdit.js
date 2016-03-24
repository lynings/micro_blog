'use strict';
define(['app', 'service/basic/user'], function (app) {
    app.controller('UserEditCtrl', UserEditCtrl);
});
function UserEditCtrl($scope, UserService,$) {

    $scope.object = {};
    $scope.object.personalBase = {};

    // 截取url最后一个斜杠之后的参数
    $scope.getIdByUrl = function() {
        var url = window.location.href;
        var idx = url.lastIndexOf("/");
        var id = url.substr(idx + 1);
        return id;
    };
    $scope.object.id = $scope.getIdByUrl();

    UserService.findById($scope.object.id).success(function(data){
        if(data.code == 200){
            $scope.object.person_id                 = data.object.person_id;
            $scope.object.personalBase.id           = data.object.personalBase.id;
            $scope.object.personalBase.name         = data.object.personalBase.name;
            $scope.object.personalBase.birth        = data.object.personalBase.birth;
            $scope.object.personalBase.sex          = data.object.personalBase.sex;
            $scope.object.tel                       = data.object.tel;
            $scope.object.mobile                    = data.object.mobile;
            $scope.object.email                     = data.object.email;
            $scope.object.address                   = data.object.address;
            $scope.object.personalBase.employee_no  = data.object.personalBase.employee_no;
            $scope.object.personalBase.status       = data.object.personalBase.status;
            UserService.getRoleByUserId(data.object.person_id).success(function (data) {
                $scope.object.roles = data.roles[0];
            });
            UserService.selectedCorpForEdit(data.object.personalBase.corp_id).success(function (data) {
                $scope.object.corp_id = data.corporate[0];
            });
        }
    });

    UserService.roles().success(function (data) {
        $scope.roles = data.roles;
    });

    UserService.corp($("#userCorporate").val()).success(function (data) {
        $scope.corporates = data.corporate;
    });

    $scope.save = function(){
        $scope.object.personalBase['corp_id'] = $scope.object.corp_id.id;
        if ($scope.object.id) {
            UserService.update($scope.object).success(function (data) {
                $scope.responseCode = data;
                if (data.code == 200) {
                    if ($scope.object.roles != undefined) {
                        UserService.updateRole(data.object.person_id, $scope.object.roles).success(function (data) {
                            $scope.responseCode = data;
                        });
                    }
                }
            });
        }
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