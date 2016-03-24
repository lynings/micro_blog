'use strict';
define(['angularAMD',
        'sweetAlert',
        'jquery',
        'angularRoute',
        'bootstrap',                                // 全局bootstrap样式，jquery
        //'uiBootstrap',                              // 全局bootstrap样式，angular，目前只用到tab插件部分，其余都是用jquery的
        //'metisMenu',                                // 首页左侧菜单样式，jquery
        //'ngGrid','ngGridUtil',                      // 全局表格样式，angular
        //'translate','langCN','langEN','langTW',     // 全局国际化，angular
        //'uiTree',                                   // 全局树形样式，angular，目前用到地方：权限管理页面
        //'ngUploadFile',                             // 全局文件上传，angular
        //'angularUI','select2','select2ZhCN',        // 全局下拉框样式，angular + jquery
        //'datetimepicker','datetimepickerZhCN',
        //'daterangepicker','moment',
        //'angularSanitize',
        //'progressbar',
        'filter/filter', 'directive/directive'
        //'angular_ui_select'
    ],
function(angularAMD,sweetAlert,jquery){
    var app = angular.module("micro_blog",[
        'ngRoute'                  // 路由模块
        //'ui.grid',                  // ng-grid 基础模块
        //'ui.grid.selection',        // ng-grid 选行模块
        //'ui.grid.pagination',       // ng-grid 分页模块
        //'ui.grid.resizeColumns',    // ng-gird 列头宽度可拖动模块
        //'ui.grid.autoResize',       // ng-grid 表格自动缩放模块
        //'ui',                       // angularUI与select2组合 下拉框模块
        //'ui.tree',                  // angular树模块
        //'ngFileUpload',             // angular文件上传模块
        //'ui.bootstrap',             // angular bootstrap样式模块，目前只用到tab
        //'pascalprecht.translate',   // 国际化 模块
        //'ngSanitize' ,               // html无害化（即允许html注入，默认anuglar是关闭） 模块
        //'ui.select'
    ]);

    app.config(function ($routeProvider) {
        $routeProvider
            /* 欢迎页面 */
            .when("/basic/index", angularAMD.route({
                templateUrl: 'views/basic/index.html',
                controller: 'UserOperationCtrl',
                controllerUrl: 'controller/basic/user/userOperation'
            }))
            .when("/basic/user", angularAMD.route({
                templateUrl: 'views/basic/index.html',
                controller: 'HomeCtrl',
                controllerUrl: 'controller/basic/home'
            }))
    });

    //// 设置国际化语言
    //app.config(['$translateProvider', function ($translateProvider) {
    //    $translateProvider.translations("zh-cn", translation_cn);
    //    $translateProvider.translations("en", translation_en);
    //    $translateProvider.translations("zh-tw", translation_tw);
    //    $translateProvider.preferredLanguage("zh-tw");
    //}]);
    //app.controller('TranslateCtrl', function ($scope, $translate) {
    //    $scope.changeLanguage = function (key) {
    //        $translate.use(key);
    //    };
    //});

    // 设置全局变量(value可以修改，不能在provide内访问；constant不可以修改，可以在provide内访问）
    app.value("data_host", window.location.origin + "/blog");    // api地址前缀
    app.constant("lang", window.localStorage["lang"]);          // 当前语言
    app.constant("swal", sweetAlert);                           // 全局弹出框对象
    app.constant("$",jquery);                                   // 全局jquery对象

    //// 注册当前登录用户的服务
    //app.factory('UserCtrlService',function($http,data_host){
    //   return {
    //        getRoleAndPermisionByCurrentUser: function() {
    //            return $http.get(data_host + "/ctrl/user/getRoleAndPermisionByCurrentUser");
    //        },
    //        getSessionByCurrentUser: function(){
    //            return $http.get(data_host + "/ctrl/user/getCurrentUser");
    //        }
    //    }
    //});

    // 权限控制，获取当前用户权限
    //app.controller('RoleCtrl', function($http,$rootScope,UserCtrlService){
    //    //UserCtrlService.getRoleAndPermisionByCurrentUser()
    //    //    .success(function(data){
    //    //        var userPermissionList = [];
    //    //        for(var i in data.permissions){
    //    //            userPermissionList.push(data.permissions[i].permission);
    //    //        }
    //    //        // 获取权限信息，在hasPermission指令中实现
    //    //        $rootScope.userPermissionList = userPermissionList;
    //    //    });
    //});

    //app.run(function($rootScope,$http,UserCtrlService){
    //    // 面页初始化时记录session时间
    //    UserCtrlService.getSessionByCurrentUser().success(function(data){
    //        if(data.code){
    //            window.currentSessionTime = new Date();
    //        }
    //    });
    //
    //    // 在改变路由时，监听session是否存在
    //    $rootScope.$on('$locationChangeStart', function (event, next) {
    //        //UserCtrlService.getSessionByCurrentUser()
    //        //    .success(function(data){
    //        //        if(!data.code){
    //        //            var timeDiff = new Date().getMinutes() - window.currentSessionTime.getMinutes();
    //        //            if(timeDiff >= 10){ // 超时时间10分钟，为服务器shiro控制
    //        //                location.href = "/web/login?timeout=1";
    //        //            }else{
    //        //                location.href = "/web/login?kickout=1";
    //        //            }
    //        //        }
    //        //    });
    //    });
    //});

    // 加载到页面中
    return angularAMD.bootstrap(app);
});
