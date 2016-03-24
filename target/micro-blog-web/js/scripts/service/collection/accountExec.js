/**
 * Created by Jiyq on 2016/3/10.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('AccountExecService', AccountExecService);
});
function AccountExecService($http, data_host){
    return{
        list:function(){
            return $http.get(data_host+"/ctrl/accountExec/list");
        },
        update:function(object){
            return $http.post(data_host+"/ctrl/accountExec/update",object)
        },
        searchById:function(id){
            return $http.get(data_host+"/ctrl/accountExec/searchById?id="+id);
        }
    }
}
