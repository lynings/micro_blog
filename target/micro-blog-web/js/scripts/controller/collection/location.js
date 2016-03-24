
/**
 * Created by bryant on 11/3/16.
 */
define(['app', 'service/collection/location','echarts', 'service/utils/map','service/basic/welcome'], function (app) {
    app.controller('VehicleLocationCtrl', VehicleLocationCtrl);
});
var maplet;
function VehicleLocationCtrl($scope,VehicleLocationServive,swal,$interval, MapBarService,WelcomeService){
    var move;
    var arrVehiclesMakers = new Array();
    var arrVehiclesStatus = new Array();
    $scope.selectedRow;

    var autoPushTime;

    WelcomeService.username().success(function(data){
        $scope.custom = data.custom;
        VehicleLocationServive.predictVehicleInfo($scope.custom.id).success(function(data){
            $scope.predictInfo = data;
        });
    });


    var autoPushTime = $interval(function () {
        vehicleMove();
    }, 3 * 1000);

    $scope.$on('$destroy', function () {
        $interval.cancel(autoPushTime);
        move = null;
        autoPushTime = null;
    });

    /**
     * 垃圾车移动
     **/
    function vehicleMove() {
        if($scope.predictInfo.vehicle_id!=undefined){
            VehicleLocationServive.getGpsByVehicle($scope.predictInfo.vehicle_id).success(function (data) {
                    arrVehiclesStatus = [];
                    removeVehiclesMakers();
                    var data = data.vehicle;
                    var lat = Number(data.lat);
                    var lng = Number(data.lng);
                    if (lat != undefined && lng != undefined) {
                        var gcjloc = transformFromWGSToGCJ(lng, lat);
                        lng = gcjloc.lng;
                        lat = gcjloc.lat;
                        var lngLat = new MPoint(lng, lat);
                        var icon = new MIcon("images/icon_mylocation.png", 37.3, 56.6, 22, 48);
                        var vehicleMaker = new MMarker(lngLat, icon, null, new MLabel(data.plate_number));
                        vehicleMaker.setZIndex(10000);
                        //MEvent.addListener(vehicleMaker, 'click', showVehicleStatus);
                        maplet.addOverlay(vehicleMaker);
                        arrVehiclesMakers.push(vehicleMaker);
                    }
                }
            );
        }

    }

    function removeVehiclesMakers() {
        if (arrVehiclesMakers.length > 0) {
            for (var j = 0, vl = arrVehiclesMakers.length; j < vl; j++) {
                maplet.removeOverlay(arrVehiclesMakers[j], true);
            }
            arrVehiclesMakers = new Array();
        }
    }

    maplet = new Maplet("map");
    maplet.addControl(new MStandardControl());
    maplet.centerAndZoom(new MPoint(113.13523000659, 23.0511236125), 13);
    maplet.showOverview(true, false);

    $scope.myLocation = function(){
        var lngLat = new MPoint($scope.custom.lng, $scope.custom.lat);
        var icon = new MIcon("images/machine_point.png", 37.3, 56.6, 48, 48);
        var s = "<li>地址：" + $scope.custom.address + "</li><li>联系人：" + $scope.custom.contact + "</li><li>联系电话：" + $scope.custom.telephone + "</li>";
        var marker = new MMarker(lngLat, icon, new MInfoWindow($scope.custom.name, s), null/*new MLabel(custom.name)*/);
        maplet.addOverlay(marker);
        maplet.centerAndZoom(new MPoint($scope.custom.lng, $scope.custom.lat), 16);
        maplet.showOverview(true, false);
    }
}
