/**
 * Created by bryant on 11/3/16.
 */
define(['app'], function (app) {
    app.factory('VehicleLocationServive', VehicleLocationServive);
});
function VehicleLocationServive($http, data_host){
    return {
        list: function () {
            return $http.get(data_host + "/ctrl/taskObject/list");
        },
        predictVehicleInfo: function (customId) {
            return $http.get(data_host + "/ctrl/taskObject/getPredictInfo?customId=" + customId);
        },
        getGpsByVehicle: function (vehicleId) {
            return $http.get(data_host + "/ctrl/taskObject/getVehicle?vehicleId=" + vehicleId);
        }
    };
}
