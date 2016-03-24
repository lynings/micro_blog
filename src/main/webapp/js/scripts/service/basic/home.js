/**
 * Created by Blink on 3/23/2016 AD.
 */
define(['app'], function(app) {
    'use strict';
    app.factory('NewHomeService', NewHomeService);
});

function NewHomeService($http, data_host) {

        var homeService = {};

        homeService.goHome = function() {
            $http.get(data_host + 'ctrl/user/login')
        }
}