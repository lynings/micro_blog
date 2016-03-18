
define(['angularAMD'], function (angularAMD) {
    angularAMD.directive('hasPermission', ['$rootScope', function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                // 监听在程序加载时获取到的权限数据
                var int = setInterval(function(){
                    if($rootScope.userPermissionList && element.context){
                        clearInterval(int);
                        var userPermissionList = $rootScope.userPermissionList;
                        var permission = attrs.hasPermission;
                        if (userPermissionList.indexOf(permission.trim()) > -1) {
                            element.show();
                        } else {
                            element.remove();
                        }
                    }
                },100);
            }
        }
    }]);
});

