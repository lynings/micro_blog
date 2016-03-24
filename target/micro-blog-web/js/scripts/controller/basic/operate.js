'use strict';
define(['app', 'service/basic/operate'], function (app) {
    app.controller('OperateCtrl', OperateCtrl);
});
function OperateCtrl($scope, OperateService,$,swal) {
    var operate_no, mtype;
    //一次性查询数据库中所有数据
    OperateService.treelist().success(function (data) {
        $scope.list = data.list;
    });

    $scope.remove = function (scope) {
        scope.remove();
    };

    $scope.addNew = function (scope, type) {
        mtype = type;
        var ftype;
        if (scope != null) {
            var nodeData = scope.$modelValue;
            var s;
            if (type == 1) {
                ftype = "menu";
                //menu的编号从xx100到xx990
                operate_no = nodeData.operate_no
            } else if (type == 2) {
                ftype = "button";
                //button的编号从xxxx1到xxxx9
                operate_no = nodeData.operate_no
            }
        } else {
            if (type == 0) {
                ftype = "parent";
                //parent的编号从10000到99000
            }
        }

        $scope.newOperate = {type: ftype};
    };


    $scope.submit = function () {
        //如果该对象有ID，则是修改操作
        if ($scope.newOperate.id) {
            OperateService.update($scope.newOperate).success(function (data) {
                $scope.responseCode = data;
            });
        } else {
            //如果没有ID，则是新增操作
            if (mtype == 0) {
                //parent的编号从10000到99000
                operate_no = $scope.newOperate.operate_no;
            } else if (mtype == 1) {
                //menu的编号从xx100到xx990
                operate_no = $scope.newOperate.operate_no;
            } else if (mtype == 2) {
                //button的编号从xxxx1到xxxx9
                operate_no = $scope.newOperate.operate_no;
            }
            $scope.newOperate.operate_no = operate_no;
            OperateService.addSubItem($scope.newOperate).success(function (data) {
                $scope.responseCode = data;
                OperateService.treelist().success(function (data) {
                    $scope.list = data.list;
                });
            })
        }
    };

    //编辑对应索引下的对象
    $scope.edit = function (scope) {
        $scope.responseCode = {};
        var nodeData = scope.$modelValue;
        $scope.newOperate = nodeData;
    }

    //删除对应索引下的对象
    $scope.delete = function (scope, lev) {
        var nodeData = scope.$modelValue;
        if (lev == 0) {
            if (nodeData.items.length != 0) {
                swal("Please delete all the child rights first");
            } else {
                if (confirm("Confirm delete?")) {
                    OperateService.delete(nodeData.id).success(function (data) {
                        $scope.responseCode = data;
                        scope.remove();
                    });
                }
            }
        } else if (lev == 1) {
            if (nodeData.items.length != 0) {
                swal("Please delete all the child rights first");
            } else {
                if (confirm("Confirm delete?")) {
                    OperateService.delete(nodeData.id).success(function (data) {
                        $scope.responseCode = data;
                        scope.remove();
                    });
                }
            }
        } else if (lev == 2) {
            if (confirm("Confirm delete?")) {
                OperateService.delete(nodeData.id).success(function (data) {
                    $scope.responseCode = data;
                    scope.remove();
                });
            }
        }
    }

    $(".modal").on('hidden.bs.modal', function (e) {
        $scope.responseCode = {};
    });
}
