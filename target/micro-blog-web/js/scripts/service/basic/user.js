'use strict';
define(['app'], function (app) {
    app.factory('UserService', UserService);
});
function UserService($http, data_host) {
    return {
        list: function (page, size) {
            return $http.get(data_host + "/ctrl/user/search?type=1&page=" + page + "&size=" + size);
        },
        add: function (object) {
            return $http.post(data_host + "/ctrl/user/add", object);
        },
        update: function (object) {
            return $http.post(data_host + "/ctrl/user/update", object);
        },
        delete: function (id) {
            return $http.get(data_host + "/ctrl/user/delete?id=" + id);
        },
        findById: function (id) {
            return $http.get(data_host + "/ctrl/user/search?type=2&id=" + id);
        },
        updateRole: function (userId, object) {
            return $http.post(
                data_host + "/ctrl/user/updateRole",
                $.param({
                    userId: userId,
                    roles: JSON.stringify(object)
                }), {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
        },
        getRoleByUserId: function (userId) {
            return $http.get(data_host + "/ctrl/user/getRoleByUserId?userId=" + userId);
        },
        roles: function () {
            return $http.get(data_host + "/ctrl/role/roles");
        },
        corp: function (corpCode) {
            return $http.get(data_host + "/ctrl/corporateInfo/getCorpForUserAdd?corpCode="+corpCode);
        },
        selectedCorpForEdit: function (corpId) {
            return $http.get(data_host + "/ctrl/corporateInfo/selectedCorpForEdit?corpId="+corpId);
        },
        host: function() {
            return data_host;
        }
    }
}