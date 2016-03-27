/**
 * Created by zpf on 16/1/15.
 */
require.config({
    baseUrl: "js/scripts",
    paths: {
        'angular' : '../lib/angular/angular',
        // angular ui
        'angularUI' : '../lib/angular/angular.ui',
        // angular route
        'angularRoute' : '../lib/angular/angular-route.min',
        // angular html无害化
        'angularSanitize' : '../lib/angular/angular-sanitize.min',
        //// angularAMD
        'angularAMD' : '../lib/requirejs/angularAMD.min',
        'ngload' : '../lib/requirejs/ngload.min',
        'uiBootstrap' : '../lib/angular/ui-bootstrap-tpls-0.14.2.min',
        // sweetalert 美丽的弹出框
        'sweetAlert' : '../lib/sweetalert/sweet-alert.min',
        // jquery
        'jquery' : '../lib/jquery/jquery',
        // jquery bootstrap 界面插件
        'bootstrap' : '../lib/bootstrap/bootstrap.min',
        // jquery metisMenu 菜单插件
        'metisMenu' : '../lib/metisMenu/jquery.metisMenu'
    },
    shim: {
        'angularUI': {
            deps : ['angular']
        },
        'angularRoute': {
            deps : ['angular']
        },
        'angularSanitize': {
            deps : ['angular']
        },
        'angularAMD': {
            deps : ['angular']
        },
        'ngload': {
            deps : ['angularAMD']
        },
        'uiBootstrap': {
            deps : ['angular']
        },
        'bootstrap': {
            deps : ['jquery']
        }
    },
    deps: ['app']
});