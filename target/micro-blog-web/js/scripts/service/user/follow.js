/**
 * Created by Blink on 3/23/2016 AD.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('FollowService', FollowService);
});

function FollowService($http, data_host) {

    var createNew = function () {

        var instance = {};

        /**
         * 获取用户详细信息
         * @returns {HttpPromise}
         */
        instance.getUserDetailInfo = function (id) {

            return $http.get(data_host + '/ctrl/home/getUserDetailInfo?id='+ id);
        };

        /**
         * 获取用户相关推文信息
         * @returns {HttpPromise}
         */
        instance.getFollow = function (uid, type) {

            return $http.get(data_host + '/ctrl/user/getFollow?uid='+ uid +'&type=' + type);
        };

        /**
         * 取消关注
         * @returns {HttpPromise}
         */
        instance.removeFollow = function (id) {

            return $http.get(data_host + '/ctrl/home/removeFollow?id='+ id);
        };

        /**
         * 获取用户的相关推荐
         * @returns {HttpPromise}
         */
        instance.getRecommend = function (id) {

            return $http.get(data_host + '/ctrl/home/getRecommend?id='+ id);
        };

        /**
         * 取消关注
         * @param uid
         */
        instance.removeFollow = function (id) {

            if(instance.checkNull([id])) {
                return $http.get(data_host + '/ctrl/user/removeFollow?id='+ id);
            }
            return null;
        }

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