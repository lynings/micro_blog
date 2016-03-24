'use strict';
define(['app', 'service/basic/corporate'], function (app) {
    app.controller('CorporateCtrl', CorporateCtrl);
});
function CorporateCtrl($scope, CorporateService, uiGridConstants, i18nService, lang,$,swal) {
    i18nService.setCurrentLang(lang);
    $scope.object = {};
    $scope.addObject = {};
    $scope.selectedRow = {};

    var clearModal = function () {
        $scope.addObject.corpCode = "";
        $scope.addObject.name = "";
        $scope.addObject.longName = "";
        $scope.addObject.contact = "";
        $scope.addObject.phone = "";
        $scope.addObject.mobile = "";
        $scope.addObject.fax = "";
        $scope.addObject.email = "";
    };

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
                name: "序號",
                field: 'corpId',
                displayName:'ID',
                headerCellFilter: 'translate',
                sort: {
                    direction: uiGridConstants.ASC,
                    ignoreSort:true,
                    priority: 0
                }
            },
            {
                name: "公司碼",
                field: 'corpCode',
                displayName:'COMPANY_CODE',
                headerCellFilter: 'translate',
                sort: {
                    direction: uiGridConstants.ASC,
                    ignoreSort: false,
                    priority: 0
                }
            },
            {
                name: "名稱",
                field: 'name',
                displayName:'NAME',
                headerCellFilter: 'translate',
                sort: {
                    direction: uiGridConstants.ASC,
                    ignoreSort: false,
                    priority: 0
                }
            },
            {
                name: "完整名稱",
                field: 'longName',
                displayName:'FULL_NAME',
                headerCellFilter: 'translate',
                sort: {
                    direction: uiGridConstants.ASC,
                    ignoreSort: false,
                    priority: 0
                }
            },
            {
                name: "聯繫人",
                field: 'contact',
                displayName:'CONTACTS',
                headerCellFilter: 'translate',
                sort: {
                    direction: uiGridConstants.ASC,
                    ignoreSort: false,
                    priority: 0
                }
            },
            {
                name: "電話號碼",
                field: 'phone',
                displayName:'TELEPHONE_NUMBER',
                headerCellFilter: 'translate',
                sort: {
                    direction: uiGridConstants.ASC,
                    ignoreSort: false,
                    priority: 0
                }
            },
            {
                name: "移動電話號碼",
                field: 'mobile',
                displayName:'MOBILE_TELEPHONE_NUMBER',
                headerCellFilter: 'translate',
                sort: {
                    direction: uiGridConstants.ASC,
                    ignoreSort: false,
                    priority: 0
                }
            },
            {
                name: "傳真",
                field: 'fax',
                displayName:'FAX',
                headerCellFilter: 'translate',
                sort: {
                    direction: uiGridConstants.ASC,
                    ignoreSort: false,
                    priority: 0
                }
            },
            {
                name: "電郵",
                field: 'email',
                displayName:'EMAIL',
                headerCellFilter: 'translate',
                sort: {
                    direction: uiGridConstants.ASC,
                    ignoreSort: false,
                    priority: 0
                }
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
                CorporateService.list(newPage, pageSize).success(function (data) {
                    $scope.gridOptions.totalItems = data.totalSize;
                    $scope.gridOptions.data = data.list;
                });
            });
            //外置搜索
            $scope.gridApi.core.on.filterChanged($scope, function () {
            });
            gridApi.core.on.sortChanged($scope, function(grid,gridColumn){
            });
        }
    };

    CorporateService.list(1, $scope.gridOptions.paginationPageSize).success(function (data) {
        $scope.gridOptions.totalItems = data.totalSize;
        $scope.gridOptions.data = data.list;
        uiGridUtil.autoGridHeight();
    });

    $scope.add = function () {
        clearModal();
        $("#add").modal('show');
    };

    $scope.edit = function () {
        if (!$scope.object.corpId) {
            swal("Please select a company");
            return;
        }
        $("#edit").modal('show');
    };

    $scope.saveAdd = function () {
        CorporateService.add($scope.addObject).success(function (data) {
            clearModal();
            swal("Success", "", "success");
            CorporateService.list(1, $scope.gridOptions.paginationPageSize).success(function (data) {
                $scope.gridOptions.totalItems = data.totalSize;
                $scope.gridOptions.data = data.list;
            });
        });
    };

    $scope.saveEdit = function () {
        CorporateService.update($scope.object).success(function (data) {
            swal("Success", "", "success");
        });
    };

    $("#edit").on('hidden.bs.modal', function (e) {
        $scope.responseCode = {};
    });

    $scope.delete = function () {
        if (!$scope.object.corpId) {
            swal("Please select a company");
            return;
        }
        if (confirm("Confirm delete?")) {
            CorporateService.delete($scope.object.corpId).success(function (data) {
                swal("Success", "", "success");
                $scope.responseCode = data;
                $scope.remove();
            });
        }
    };

    $scope.remove = function () {
        angular.forEach($scope.gridApi.selection.getSelectedRows(), function (item) {
            for (var i = 0; i < $scope.gridOptions.data.length; i++) {
                if ($scope.gridOptions.data[i].corpId == item.corpId) {
                    $scope.gridOptions.data.splice(i, 1);
                }
            }
        });
    };

    //select2
    $scope.options = {
        language: "zh-CN",
        multiple: true,
        width: '100%',
        initSelection: function (element, callback) {
            callback($(element).data('$ngModelController').$modelValue);
        },
        query: function (query) {
            query.callback({results: $scope.roles});
        }
    };
}