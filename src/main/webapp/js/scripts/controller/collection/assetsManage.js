/**
 * Created by Jiyq on 2016/3/9.
 */
define(['app', 'service/collection/assetsManage'], function (app) {
    'use strict';
    app.controller('AssetsManageCtrl', AssetsManageCtrl);
});
function AssetsManageCtrl($scope,AssetsManageService,swal){
    $scope.object = {};
    getAssetsList();
    $scope.replaceAsset = function(){
        if($scope.object.name==undefined){
            swal("选择要增加的物品！");
            return;
        }
        if($scope.object.applyCounts==undefined||$scope.object.applyCounts==0){
            swal("数量不能为空！");
            return;
        }
        $scope.object.applyType="替换";
        if($scope.object.id==undefined){
            swal("请选择要替换的物品！");
            //addAssetsObject();
        }else{
            updateAssetsObject();
        }
    }

    $scope.applyAsset = function(){
        if($scope.object.name==undefined){
            swal("选择要增加的物品！");
            return;
        }
        if($scope.object.applyCounts==undefined||$scope.object.applyCounts==0){
            swal("数量不能为空！");
            return;
        }
        $scope.object.applyType="增加";
        if($scope.object.id==undefined){
            swal("请选择要增加的物品！");
            //addAssetsObject();
        }else{
            updateAssetsObject();
        }
    }
    function getAssetsList(){
        AssetsManageService.list().success(function(data){
            $scope.assetsList = data.assetsManageList;
        })
    }
    function getAssetsRecordById(id){
        AssetsManageService.getAssetsRecordById(id).success(function(data){
            $scope.object=data.assetsRecord;
        })
    }
    function updateAssetsObject(){
        AssetsManageService.update($scope.object).success(function(data){
            if ($scope.code==401){
                $scope.responseCode = data;
            }else if(data.code==200){
                getAssetsList();
                swal("更新成功");
                $scope.object = {};
            }else{
                $scope.responseCode = data;
            }
        })
    }
    function addAssetsObject(){
        var newDate=new Date();
        var year=newDate.getFullYear();
        var month=newDate.getMonth()+1;
        var day=newDate.getDate();
        var hour=newDate.getHours();
        var minute=newDate.getMinutes();
        $scope.object.applyTime=year+"-"+month+"-"+day+" "+hour+":"+minute;
        $scope.object.status="0";
        //AssetsManageService.username().success(function (data) {
        //    $scope.object.customName=data.id;
        //})
        AssetsManageService.add($scope.object).success(function(data){
            if ($scope.code==401){
                $scope.responseCode = data;
            }else if(data.code==200){
                getAssetsList();
                swal("保存成功");
                $scope.object = {};
            }else{
                $scope.responseCode = data;
            }
        })
    }
    $scope.updateForm= function (id) {
        getAssetsRecordById(id);
    }
}
