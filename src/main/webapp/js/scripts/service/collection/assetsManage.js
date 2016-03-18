/**
 * Created by Jiyq on 2016/3/9.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('AssetsManageService', AssetsManageService);
});
function AssetsManageService($http, data_host){
    return{
        list:function(){
          return $http.get(data_host+"/ctrl/assetsManage/list");
        },
        update:function(object){
            return $http.post(data_host+"/ctrl/assetsManage/update",object)
        },
        add: function (object) {
            return $http.post(data_host + "/ctrl/assetsManage/add", object);
        },
        username: function () {
            return $http.get(data_host + "/ctrl/user/getCurrentUser");
        },
        getAssetsRecordById:function(id){
            return $http.get(data_host+"/ctrl/assetsManage/getAssetsRecordById?id="+id);
        }
    }
}