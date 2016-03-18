/**
 * Created by Blink on 3/14/2016 AD.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('CreateExceptionService', CreateExceptionService);
});

function CreateExceptionService ($http, data_host) {

    return {

        list : function () {
            return $http.get(data_host + '/ctrl/exception/list');
        }
    }
}
