'use strict';
define(['app'], function (app) {
    app.factory('OperateService', OperateService);
});
function OperateService($http, data_host) {
    return {
        treelist: function () {
            return $http.get(data_host + "/ctrl/operate/getLevOp");
        },
        addSubItem: function (object) {
            return $http.post(data_host + "/ctrl/operate/add", object);
        },
        delete: function (id) {
            return $http.get(data_host + "/ctrl/operate/delete?id=" + id);
        },
        update: function (object) {
            return $http.post(data_host + "/ctrl/operate/update", object);
        }
    }
}