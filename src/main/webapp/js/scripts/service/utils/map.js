define(['app'], function (app) {
    'use strict';
    app.factory('MapBarService', MapBarService);
});

function MapBarService(data_host) {
    return {
        getRoutelatlon: function (points) {
            var mid = "";
            for (var i = 1; i < points.length-1; i++) {
                var point = points[i];
                mid += point.lon + ",";
                mid += point.lat + ";";
            }
            var url = data_host+"/ctrl/map?url=mapx.mapbar.com/route/getDriveByLatLon.json";
            return $.ajax({
                url: url,
                data: {
                    inGb:'02',
                    outGb:'02',
                    style:2,
                    encode:'UTF-8',
                    orig:points[0].lon + ',' + points[0].lat,
                    dest:points[points.length-1].lon + ',' + points[points.length-1].lat,
                    customer:2,
                    mid:mid
                },
                type: 'POST',
                dataType: 'JSON'
            });
        },
        getRoutelatlon2: function (points) {
            var url = data_host+"/ctrl/map?url=mapx.mapbar.com/route/getDriveByLatLon.json";
            return $.ajax({
                url: url,
                data: {
                    inGb:'02',
                    outGb:'02',
                    encode:'UTF-8',
                    style:2,
                    orig:points[0].lon + ',' + points[0].lat,
                    dest:points[1].lon + ',' + points[1].lat,
                    customer:2
                },
                type: 'POST',
                dataType: 'JSON'
            });
        },
        getRoutePointArray: function (routelatlon) {
            var routelalonArray = new Array();
            var routeString = routelatlon.split(";");
            for (var i = 0; i < routeString.length; i++) {
                var lng = routeString[i].split(",")[0];
                var lat = routeString[i].split(",")[1];
                if(isNaN(lng)||isNaN(lat)){
                    continue;
                }
                routelalonArray.push(new MPoint(lng, lat));
            }
            return routelalonArray;
        }
    }
}
