/**
 * Created by Blink on 3/23/2016 AD.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('UserOperationService', UserOperationService);
});

function UserOperationService($http, data_host) {

    var createNew = function () {

        var userInstance = {};

        /**
         * 登录
         * @param username
         * @param password
         * @returns {*}
         */
        userInstance.login = function (username, password) {

            if(userInstance.checkNull([username, password])) {
                var object = {'username': username, 'password': password};
                return $http.post(data_host + '/ctrl/user/login', object);
            }
            return null;
        };

        /**
         * 注册
         * @param name
         * @param username
         * @param password
         * @returns {*}
         */
        userInstance.register = function (name, username, password) {

            if(userInstance.checkNull([name, username, password])) {
                var object = {'name': name, 'username': username, 'password': password};
                return $http.post(data_host + '/ctrl/user/register', object);
            }
            return null;
        };

        /**
         * 退出
         */
        userInstance.logout = function () {

        };

        userInstance.checkNull = function (arr) {

            arr = arr || [];

            for(var i=0; i<arr.length; i++) {
                var val = arr[i];
                if(val === null || typeof val === 'undefined' || !val) {
                    return false;
                }
            }
            return true;
        };

        return userInstance;

    };

    return createNew;
}