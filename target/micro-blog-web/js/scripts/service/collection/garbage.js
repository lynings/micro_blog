/**
 * Created by lyning on 16-3-10.
 */
define(['app'] , function (app) {
    'use strict';
    app.factory('CreateGarbageService' , CreateGarbageService)
})
function CreateGarbageService($http, data_host) {

    return {

        statisticsData : function (object) {
            if(object && typeof object !== 'undefined'){
                return $http.get(data_host + '/ctrl/garbage/statisticsData?startTime='+object.startTime+'&endTime='+object.endTime);
            }else {
                return $http.get(data_host + '/ctrl/garbage/statisticsData');
            }
        },

        statisticsGraph : function () {
            return $http.get(data_host + '/ctrl/garbage/statisticsGraph');
        },
    };

}
