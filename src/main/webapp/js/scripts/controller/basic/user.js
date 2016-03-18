'use strict';
define(['app', 'service/basic/user'], function (app) {
    app.controller('UserCtrl', UserCtrl);
});
function UserCtrl($scope, UserService, uiGridConstants, i18nService, lang,$) {
    i18nService.setCurrentLang(lang);
    $scope.object = {};
    $scope.selectedRow = {};
    $scope.gridOptions = {
        paginationPageSizes: [25, 50, 100],
        paginationPageSize: 25,
        useExternalPagination: true,
        useExternalFiltering: false,
        enableSorting: true,
        enableRowSelection: true,
        enableFiltering: true,
        enableRowHeaderSelection: false,
        enableColumnResizing: true,
        multiSelect: false,
        columnDefs: [
            {
                name: '序號',
                field: 'id',
                sort: {
                    direction: uiGridConstants.DESC
                },
                width: 100,
                displayName:'ID',
                headerCellFilter: 'translate'
            },
            {
                name: '名字',
                field: 'personalBase.name',
                width: 100,
                displayName:'USER_NAME',
                headerCellFilter: 'translate'
            },
            {
                name: '用戶賬號',
                field: 'personalBase.employee_no',
                width: 100,
                displayName:'USER_ACCOUNT',
                headerCellFilter: 'translate'
            },
            {
                name: '性别',
                field: 'personalBase.sex',
                cellFilter: 'personSex',
                width: 60,
                displayName:'GENDER',
                headerCellFilter: 'translate'
            },
            {
                name: '出生日期',
                field: 'personalBase.birth',
                type: 'date', cellFilter: 'limitTo:11',
                width: 100,
                displayName:'DATE_OF_BIRTH',
                headerCellFilter: 'translate'
            },
            {
                name: '地址',
                field: 'address',
                width: 300,
                displayName:'ADDRESS',
                headerCellFilter: 'translate'
            },
            {
                name: '聯繫電話',
                field: 'tel',
                width: 150,
                displayName:'CONTACT_NUMBER',
                headerCellFilter: 'translate'
            },
            {
                name: '移動電話',
                field: 'mobile',
                width: 150,
                displayName:'MOBILE_PHONE',
                headerCellFilter: 'translate'
            },
            {
                name: '電子郵箱',
                field: 'email',
                width: 150,
                displayName:'EMAIL',
                headerCellFilter: 'translate'
            },
            {
                name: '狀態',
                field: 'personalBase.status',
                cellFilter: 'personStatus',
                width: 100,
                displayName:'STATUS',
                headerCellFilter: 'translate'
            }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if(row.isSelected){
                    $scope.object = row.entity;
                    $scope.selectedRow = row;
                }
                else{
                    $scope.object = null;
                    $scope.selectedRow = null;
                }
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                UserService.list(newPage, pageSize).success(function (data) {
                    $scope.gridOptions.totalItems = data.totalSize;
                    $scope.gridOptions.data = data.list;
                });
            });
            //外置搜索
            $scope.gridApi.core.on.filterChanged($scope, function () {
            });
        }
    };
    UserService.roles().success(function (data) {
        $scope.roles = data.roles;
    });
    UserService.corp($("#userCorporate").val()).success(function (data) {
       $scope.corporates = data.corporate;
    });
    UserService.list(1, $scope.gridOptions.paginationPageSize).success(function (data) {
        $scope.gridOptions.totalItems = data.totalSize;
        $scope.gridOptions.data = data.list;
        uiGridUtil.autoGridHeight();
    });
    $scope.add = function () {
        location.href = "#/basic/userCreate";
    };
    $scope.edit = function () {
        location.href = "#/basic/userEdit/" + $scope.object.id;
    };
    $scope.modifyPassword = function(){
        $("#edit").modal('show');
    };

    // 清空提示框信息
    $("#edit").on('hidden.bs.modal', function () {
        $scope.responseCode = {};
    });

    $scope.save = function () {
        if ($scope.object.id) {
            UserService.update($scope.object).success(function (data) {
                $scope.responseCode = data;
            });
        }
    };
    $scope.delete = function () {
        if (confirm("是否删除?")) {
            UserService.delete($scope.object.id).success(function (data) {
                $scope.responseCode = data;
                $scope.remove();
            });
        }
    };
    $scope.remove = function () {
        angular.forEach($scope.gridApi.selection.getSelectedRows(), function (item) {
            for (var i = 0; i < $scope.gridOptions.data.length; i++) {
                if ($scope.gridOptions.data[i].id == item.id) {
                    $scope.gridOptions.data.splice(i, 1);
                }
            }
        });
    };
    //select2
    $scope.options1 = {
        language: "zh-CN",
        multiple: false,
        width: '100%',
        initSelection: function (element, callback) {
            callback($(element).data('$ngModelController').$modelValue);
        },
        query: function (query) {
            query.callback({results: $scope.corporates});
        }
    };
    //select2
    $scope.options = {
        language: "zh-CN",
        multiple: false,
        width: '100%',
        initSelection: function (element, callback) {
            callback($(element).data('$ngModelController').$modelValue);
        },
        query: function (query) {
            query.callback({results: $scope.roles});
        }
    };
    $('.date').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        minView: 2,
        maxView: 4,
        format: 'yyyy-mm-dd'
    });
}