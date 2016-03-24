/**
 * Created by Jiyq on 2016/3/10.
 */
define(['app', 'service/collection/accountExec'], function (app) {
    'use strict';
    app.controller('AccountExecCtrl', AccountExecCtrl);
});
function AccountExecCtrl($scope,AccountExecService,swal){
    $scope.object={};
    AccountExecService.list().success(function(data){
        $scope.accountExecList=data.list;
    });
    $scope.updateRemark = function(id){
        AccountExecService.searchById(id).success(function(data){
            $scope.object=data.object;
        });
        $("#edit").modal('show');
    }
    $scope.save = function () {
        AccountExecService.update($scope.object).success(function(data){
            if ($scope.code==401){
                $scope.responseCode = data;
            }else if(data.code==200){
                $("#edit").modal('hide');
                AccountExecService.list().success(function(data){
                    $scope.accountExecList=data.list;
                });
                swal("保存成功");
                $scope.object = {};
            }else{
                $scope.responseCode = data;
            }
        });
    }
    $scope.cancel = function(){
        $("#edit").modal('hide');
    }
}
