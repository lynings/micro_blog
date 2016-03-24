'use strict';
define(['app','service/basic/welcome'], function (app) {
    app.controller('WelcomeCtrl', WelcomeCtrl);
});
function WelcomeCtrl($scope,WelcomeService) {
    WelcomeService.username().success(function(data){
        $scope.username = data.username;
    });
}