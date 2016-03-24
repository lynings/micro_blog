/**
 * Created by talenttan on 11/3/16.
 */
define(['app'], function (app) {
    app.factory('accountMessageService', accountMessageService);
});
function accountMessageService($http, data_host) {
    var prefix =  data_host+"/ctrl/apply/";
    return {
        applySave:function(object){
            var url =prefix+"applySave";
            return $http.post(url,object);
        },comfirmApply:function(applyId,status){
            var url = prefix+"applyComfirm?applyId="+applyId+"&status="+status;
            return $http.get(url);
        },getApplyForm:function(){
            var url =prefix+"getApplyForm";
            return $http.get(url);
        }

    }
}
