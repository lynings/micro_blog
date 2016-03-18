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
        // angularAMD
        'angularAMD' : '../lib/requirejs/angularAMD.min',
        'ngload' : '../lib/requirejs/ngload.min',
        // angular 表单插件
        'ngGrid' : '../lib/nggrid/ui-grid-unstable.min',
        'ngGridUtil' : '../lib/nggrid/ui-grid.util',
        // angular 国际化插件及转换文件
        'translate' : '../lib/translate/angular-translate',
        'langCN' : '../lib/translate/language/lang-cn',
        'langEN' : '../lib/translate/language/lang-en',
        'langTW' : '../lib/translate/language/lang-tw',
        // angular 树形插件
        'uiTree' : '../lib/uiTree/angular-ui-tree',
        // angular 文件上传插件
        'ngUploadFile' : '../lib/upload-progress/ng-file-upload',
        'ngUploadFileShim' : '../lib/upload-progress/ng-file-upload-shim',
        // angular bootstrap 界面插件
        'uiBootstrap' : '../lib/angular/ui-bootstrap-tpls-0.14.2.min',
        // sweetalert 美丽的弹出框
        'sweetAlert' : '../lib/sweetalert/sweet-alert.min',
        // echarts 图形插件
        'echarts' : '../lib/echarts-2.2.7/echarts-all',
        // jquery
        'jquery' : '../lib/jquery/jquery',
        // jquery bootstrap 界面插件
        'bootstrap' : '../lib/bootstrap/bootstrap.min',
        // jquery metisMenu 菜单插件
        'metisMenu' : '../lib/metisMenu/jquery.metisMenu',
        // jquery select2 下拉框插件
        'select2' : '../lib/select2/select2',
        'select2ZhCN' : '../lib/select2/select2_locale_zh-CN',
        // jquery datetimepicker
        'datetimepicker' : '../lib/bootstrap/bootstrap-datetimepicker.min',
        'datetimepickerZhCN' : '../lib/bootstrap/bootstrap-datetimepicker.zh-CN',
        // jquery daterangepicker
        'daterangepicker' : '../lib/daterangepicker/daterangepicker',
        'moment' : '../lib/daterangepicker/moment',
        // hightcharts 图形插件
        'highcharts' : '../lib/highcharts/highcharts',
        'highcharts3d' : '../lib/highcharts/highcharts-3d',
        'highchartsExporting' : '../lib/highcharts/exporting',
        'highchartsNoDataToDisplay' : '../lib/highcharts/no-data-to-display.src',
        // jquery bootstrap progressbar 插件
        'progressbar' : '../lib/progressbar/bootstrap-progressbar',
        'angular_ui_select': '../lib/ui_select/select.min'
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
        'ngGrid': {
            deps : ['angular']
        },
        'translate': {
            deps : ['angular']
        },
        'uiTree': {
            deps : ['angular']
        },
        'ngUploadFile': {
            deps : ['angular','ngUploadFileShim']
        },
        'uiBootstrap': {
            deps : ['angular']
        },
        'bootstrap': {
            deps : ['jquery']
        },
        'metisMenu': {
            deps : ['jquery']
        },
        'select2': {
            deps : ['jquery','angularUI']
        },
        'select2ZhCN': {
            deps : ['select2']
        },
        'datetimepicker': {
            deps : ['jquery']
        },
        'datetimepickerZhCN': {
            deps : ['datetimepicker']
        },
        'moment': {
            exports : 'moment'
        },
        'daterangepicker': {
            deps : ['jquery','moment']
        },
        'progressbar': {
            deps : ['jquery','bootstrap']
        },
        'highcharts3d': {
            deps : ['highcharts']
        },
        'highchartsExporting': {
            deps : ['highcharts']
        },
        'highchartsNoDataToDisplay': {
            deps : ['highcharts']
        },
        'angular_ui_select':{
            deps:['angularSanitize']
        }
    },
    deps: ['app']
});