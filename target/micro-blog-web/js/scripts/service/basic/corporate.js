'use strict';
define(['app'], function (app) {
    app.factory('CorporateService', CorporateService);
});

function CorporateService($http, data_host) {
    return {
        list: function (page, size, condition) {
            return $http.get(data_host + "/ctrl/corporateInfo/list?page=" + page + "&size=" + size + "&condition=" + condition);
        },
        update: function (object) {
            return $http.post(data_host + "/ctrl/corporateInfo/update", object);
        },
        delete: function (id) {
            return $http.post(data_host + "/ctrl/corporateInfo/delete?id=" + id);
        },
        add: function (object) {
            return $http.post(data_host + "/ctrl/corporateInfo/add", object);
        },
        host: function() {
            return data_host;
        }
    }
}
