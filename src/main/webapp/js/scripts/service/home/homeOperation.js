/**
 * Created by Blink on 3/23/2016 AD.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('HomeOperationService', HomeOperationService);
});

function HomeOperationService($http, data_host) {

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
        instance.getUserMessage = function (id) {

            return $http.get(data_host + '/ctrl/home/getUserMessage?id='+ id);
        };

        /**
         * 只获取用户相关推文信息
         * @returns {HttpPromise}
         */
        instance.getOnlyUserMessage = function (id) {

            return $http.get(data_host + '/ctrl/home/getOnlyUserMessage?id='+ id);
        };

        /**
         * 获取用户的相关推荐
         * @returns {HttpPromise}
         */
        instance.getRecommend = function (id) {

            return $http.get(data_host + '/ctrl/home/getRecommend?id='+ id);
        };

        /**
         * 关注
         * @param type 类型(1:粉丝; 2:关注)
         * @param worship_id 崇拜者ID
         */
        instance.follow = function (type, worship_id) {

            if(instance.checkNull([type, worship_id])) {
                return $http.get(data_host + '/ctrl/home/follow?type='+ type + '&worship_id=' + worship_id);
            }
            return null;
        }

        /**
         * 取消关注
         * @param uid
         */
        instance.removeFollow = function (id) {

            if(instance.checkNull([id])) {
                return $http.get(data_host + '/ctrl/home/removeFollow?id='+ id);
            }
            return null;
        }

        /**
         * 喜欢
         * @param type 类型(1:转发; 2:喜欢)
         * @param mid
         * @returns {*}
         */
        instance.like = function (type, mid) {

            if(instance.checkNull([type, mid])) {
                return $http.get(data_host + '/ctrl/home/like?type='+ type + '&mid=' + mid);
            }
            return null;
        }

        /**
         * 取消喜欢
         * @param id
         * @returns {*}
         */
        instance.removeLike = function (id) {

            if(instance.checkNull([id])) {
                return $http.get(data_host + '/ctrl/home/removeLike?type='+ type + '&mid=' + mid);
            }
            return null;
        }

        instance.review = function (mid, notify_id, content) {

            if(instance.checkNull([mid, notify_id, content])) {
                return $http.get(data_host + '/ctrl/home/review?notify_id='+ notify_id + '&mid=' + mid +'&content=' + content);
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