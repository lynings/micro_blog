'use strict';
define(['app'], function (app) {
    app.factory('WelcomeService', WelcomeService);
});
function WelcomeService($http, data_host) {
    return {
        username: function () {
            return $http.get(data_host + "/ctrl/user/getCurrentUser");
        }
    }
}