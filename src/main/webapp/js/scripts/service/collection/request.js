/**
 * Created by talenttan on 28/2/16.
 */
define(['app'], function (app) {
    app.factory('NewRequestService', NewRequestService);
});
function NewRequestService($http, data_host){
    return {
        list: function () {
            return $http.get(data_host + "/ctrl/taskObject/list");
        },
        update: function (object) {
            return $http.post(data_host + "/ctrl/taskObject/update", object);
        },
        delete: function (id) {
            return $http.get(data_host + "/ctrl/taskObject/delete?id=" + id);
        },
        add: function (object) {
            return $http.post(data_host + "/ctrl/taskObject/add", object);
        },
        host: function() {
            return data_host;
        },requestFormSelect:function(){
            return $http.get(data_host + "/ctrl/taskObject/requestFormSelect");
        },chartData:function(){
            return $http.get(data_host +"/ctrl/request/ountSevenDay");
        }
    };
}
