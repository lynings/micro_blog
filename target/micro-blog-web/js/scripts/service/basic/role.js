'use strict';
define(['app'], function (app) {
    app.factory('RoleService', RoleService);
});

function RoleService($http, data_host) {
    return {
        list: function () {
            return $http.get(data_host + "/ctrl/role/search?type=1");
        },
        add: function (object) {
            return $http.post(data_host + "/ctrl/role/add", object);
        },
        update: function (object) {
            return $http.post(data_host + "/ctrl/role/update", object);
        },
        updateOperate: function (roleId, object) {
            return $http.post(
                data_host + "/ctrl/role/updateOperate",
                $.param({
                    roleId: roleId,
                    operates: JSON.stringify(object)
                }), {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }
            );
        },
        delete: function (id) {
            return $http.get(data_host + "/ctrl/role/delete?id=" + id);
        },
        getOperateByRoleId: function (roleId) {
            return $http.get(data_host + "/ctrl/role/getOperateByRoleId?roleId=" + roleId);
        },
        operators: function () {
            return $http.get(data_host + "/ctrl/role/operators");
        }
    }
}