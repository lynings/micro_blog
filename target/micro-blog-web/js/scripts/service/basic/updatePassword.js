/**
 * Created by talenttan on 10/3/16.
 */
define(['app'], function (app) {
    app.factory('updatePasswordService', updatePasswordService);
});
function updatePasswordService($http, data_host) {
    return {
        commitPassword:function(originPwd,newPwd){
            var data = 'originPwd='+originPwd+'&newPwd='+newPwd;
            var url =data_host+'/ctrl/custom/updatePassword?'+data;
            //var data = {originPwd:originPwd,newPwd:newPwd};

            return $http.post(url,data);
        }

    }
}
