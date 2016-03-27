/**
 * Created by Blink on 3/23/2016 AD.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('TwitterService', TwitterService);
});

function TwitterService($http, data_host) {

    var createNew = function () {

        var instance = {};

        /**
         * 只获取获取用户详细信息
         * @returns {HttpPromise}
         */
        instance.getOnlyUserMessage = function (id) {

            return $http.get(data_host + '/ctrl/user/getOnlyUserMessage?id='+ id);
        };

        instance.checkNull = function (arr) {

            arr = arr || [];

            for(var i=0; i<arr.length; i++) {
                var val = arr[i];
                if(val === null || typeof val === 'undefined' || !val) {
                    return false;
                }
            }
            return true;
        };

        return instance;

    };

    return createNew;
}