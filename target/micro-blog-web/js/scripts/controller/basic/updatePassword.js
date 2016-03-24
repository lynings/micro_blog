/**
 * Created by talenttan on 10/3/16.
 */
define(['app', 'service/basic/updatePassword'], function (app) {
    app.controller('UpdatePasswordCtrl', UpdatePasswordCtrl);
});
function UpdatePasswordCtrl($scope, updatePasswordService,swal) {
    $scope.object ={};
    $scope.isSame = false;

    $scope.commit=function(){
        $scope.isSame = false;
        updatePasswordService.commitPassword($scope.object.originPassword,$scope.object.newPassword).success(function(data){
            swal(data.message);
        });
    }
    $scope.checkPassword = function(){
        var comfirmPwd = $scope.object.comfirmPassword;
        var newPwd = $scope.object.newPassword;
        if(comfirmPwd ==newPwd){
            $scope.isSame = true;
        }

    }




}
