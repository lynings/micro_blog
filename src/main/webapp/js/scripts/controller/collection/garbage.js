/**
 * Created by lyning on 16-3-10.
 */
define(['app', 'service/collection/garbage', '../../../lib/daterangepicker/moment', '../../../lib/custom/garbagestatistics/dater-blink', '../../../lib/custom/pagination/pagination-blink'], function (app) {
    'use strict';
    app.controller('CreateGarbageCtrl' , CreateGarbageCtrl);
});

function CreateGarbageCtrl ($scope, CreateGarbageService) {

    $scope.statisticsData = null;
    $scope.statisticsGraph = null;
    $scope.dateMsg = '';
    var paginationObj = null;

    CreateGarbageService.statisticsData().success(function (data) {
        //$scope.statisticsData = data.list;
        var options = {};
        options.dataList = data.list;
        paginationObj = $('#pagination').startPagination(options, drawData)();
    });

    CreateGarbageService.statisticsGraph().success(function (data) {
        //$scope.statisticsGraph = data.list;
        drawGraph(data.list, 12);
    });

    /* 数据 */
    function drawData (dataList) {
        if(!dataList || dataList === null){
            return ;
        }
        var html = '';
        // a : 收运时间; b : 上报量; c : 实际收量; d : 收运车; e : 收运人; f : 收运时长(min); g : 异常数
        var template = '\r<tr>' +
            '\r<td>$a</td>' +
            '\r<td>$b</td>' +
            '\r<td>$c</td>' +
            '\r<td>$d</td>' +
            '\r<td>$e</td>' +
            '\r<td>$f</td>' +
            '\r<td>$g</td>' +
            '</tr>';
        for(var i=0; i<dataList.length; i++){
            var data = dataList[i];
            html += template.replace('$a', data.startTime)
                .replace('$b', data.plan)
                .replace('$c', data.reals)
                .replace('$d', data.plate_number)
                .replace('$e', data.name)
                .replace('$f', data.completeTime)
                .replace('$g', data.ex);
        }
        $('#dataContainer').html(html);
    }

    /* 图表 */
    function drawGraph (dataList, range) {
        var options = {customData: dataList, range: range};
        $('#graph-context').daterCreateNew(options)();
    }

    /* 改变显示状态 */
    function changePageShowType (target) {
        $('#topNav button').attr('class', 'btn btn-default');
        $('.main-container').css('display', 'none');
        $(target).attr('class', 'btn btn-success');
        $('#'+target.id + '-container').css('display', '');
    }

    /* 监听数据和图表按钮 切换 */
    $('#topNav').on('click', '.btn-default', function(e) {
        var target = e.currentTarget;
        changePageShowType(target);
    });

    /* 初始化显示的日期 */
    var initDate = function (start, end) {
        $('#reportrange span').html(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
    }

    initDate(moment().subtract(1, 'days'), moment());
    /* 日期控件 */
    $('#reportrange').daterangepicker({
        ranges: {
            '今天': [moment(), moment()],
            '最近一周': [moment().subtract(6, 'days'), moment()],
            '最近30天': [moment().subtract(29, 'days'), moment()],
        },
        // 为ranges增加id , 也可以不用这个属性
        rangesMappingToId: {
            '今天': 'today',
            '最近一周': 'lastWeek',
            '最近30天': 'lastMonth',
        },
        locale: {
            customRangeLabel: '自定义',
            applyLabel: '确定',
            cancelLabel: '关闭'
        }
    }, initDate);

    $('.data-bottom-list').delegate('#search', 'click', function (e) {
        var dataTime = $('#dateTime').html().replace(' ', '').split('-');
        var startTime = dataTime[0];
        var endTime = dataTime[1];
        search(startTime, endTime);
    });

    function search (startTime, endTime) {
        var object = {};
        object.startTime = startTime;
        object.endTime = endTime;
        CreateGarbageService.statisticsData(object).success(function (data) {
            //$scope.statisticsData = data.list;
            var options = {};
            options.dataList = data.list;
            paginationObj.setOption(options);
        });
    }

}
