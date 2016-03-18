
/**
 * Created by talenttan on 28/2/16.
 */
define(['app', 'service/collection/request','echarts'], function (app) {
    app.controller('NewRequestCtrl', NewRequestCtrl);
});
function NewRequestCtrl($scope,NewRequestService,swal){
    $scope.requestList =[];
    $scope.object ={};
    $scope.collectionTimes =[];
    $scope.garbageTypes = [];
    $scope.contacts=[];
    $scope.contacts.selected = {};
    $scope.garbageTypes.selected ={};
    $scope.collectionTimes.selected ={};
    function addTaskObject(){
        assemblyObject();
        $scope.object.status = 0;
        NewRequestService.add($scope.object).success(function(data){
            swal("新建请求成功!");
            searchRequest();
            resetForm();
        });
    }
    function updateTaskObject(){
        assemblyObject();
        NewRequestService.update($scope.object).success(function(data){
            swal("更新请求成功!");
            searchRequest();
            resetForm();
        });
    }
    function assemblyObject(){
        $scope.object.restaurant_time_id=$scope.collectionTimes.selected.id;
        $scope.object.restaurant_contact_id =$scope.contacts.selected.id;
        $scope.object.garbage_type = $scope.garbageTypes.selected.id;
    }

    function resetForm(){
        $scope.object ={};
        $scope.contacts.selected = {};
        $scope.garbageTypes.selected ={};
        $scope.collectionTimes.selected ={};
    }
    function searchRequest(){
        NewRequestService.requestFormSelect().success(function(data){
            $scope.collectionTimes =data.timeList;
            $scope.garbageTypes = data.garbageTypes;
            $scope.contacts =data.contacts;
        });
        NewRequestService.list().success(function(data){
            $scope.requestList = data.list;
        });
    }
    function match(record){
        var timeId = record.restaurant_time_id;
        var contactId = record.restaurant_contact_id;
        var typeId = record.garbage_type;
        $scope.contacts.selected = findOnRecords($scope.contacts,contactId);
        $scope.garbageTypes.selected = findOnRecords($scope.garbageTypes,typeId);
        $scope.collectionTimes.selected = findOnRecords($scope.collectionTimes,timeId);
        $scope.object.quantity = record.quantity;
        $scope.object.id = record.id;
    }
    function findOnRecords(records,id){
        var selectRecord = null;
        for(var i = 0;i<records.length;i++){
            var obj = records[i];
            if(obj.id == id){
                selectRecord = obj;
                break;
            }
        }
        return selectRecord;
    }

    /**
     *
     * @param chartType
     * @returns {{title: {text: string, subtext: string}, tooltip: {trigger: string}, legend: {data: Array}, calculable: boolean, xAxis: {type: string, data: Array}[], yAxis: {type: string}[], series: {name: string, type: *, data: Array}[]}}
     */
    function commonOption(chartType){
        return option = {
            title : {
                text: '',
                subtext: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:[]
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : []
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'',
                    type:chartType,
                    itemStyle : { normal: {label : {show: true, position: 'insideBottom'}}},
                    data:[]
                }
            ]
        };
    }

    /**
     * 1Series柱状图
     * @param title
     * @param legendData
     * @param xAxisData
     * @param seriesData
     * @returns {*}
     */
    function oneBar(title,legendData,xAxisData,seriesData){
        var oneBarOption = commonOption('bar');
        oneBarOption.title.text = title;
        oneBarOption.legend.data = legendData;
        oneBarOption.xAxis[0].data = xAxisData;
        oneBarOption.series[0].data = seriesData;
        oneBarOption.series[0].name = legendData[0];
        return oneBarOption;
    }

    /**
     * 2Series柱状图
     * @param title
     * @param legendData
     * @param xAxisData
     * @param seriesData1
     * @param seriesData2
     * @returns {*}
     */
    function towBar(title,legendData,xAxisData,seriesData1,seriesData2){
        var towBarOption = oneBar(title,legendData,xAxisData,seriesData1);
        var series = {data:seriesData2,name:legendData[1],type:'bar'};
        towBarOption.series.push(series);
        return towBarOption;
    }
    function foldBar(title,legendData,xAxisData,allSeriesData){
        var stack = '异常';
        if(allSeriesData&&allSeriesData.length>0){
            //allSeriesData[0].stack = stack;
            var foldOption = oneBar(title,legendData,xAxisData,allSeriesData[0]);
            foldOption.series[0].stack = stack;
            for(var i =1;i<allSeriesData.length;i++){
                var series = {data:allSeriesData[i],name:legendData[i],type:'bar',stack: stack};
                foldOption.series.push(series);
            }
            return foldOption;
        }else{
            return null;
        }


    }


    function initSevenChart(){
        var timechart = getChart('timeChart');
        var exceptionChart = getChart('exceptionChart');
        var collectionChart = getChart('collectionChart');
        NewRequestService.chartData().success(function(data){
            var timeOptioin = oneBar("收运时间",['耗时'],data.xAxis,data.timeData);
            timechart.setOption(timeOptioin);
            var collectionOption = towBar("收集量对比图",['计划','实际'],data.xAxis,data.requestData,data.recycleData);
            collectionChart.setOption(collectionOption);
            var exceptionOption = foldBar("",data.typeNames,data.xAxis,data.sonExceptionList);
            if(exceptionOption)
                exceptionChart.setOption(exceptionOption);
        });
    }
    function getChart(id){
        var dom = document.getElementById(id);
        if(dom!=null)
            return echarts.init(dom);
        else
            return null;
    }
    searchRequest();
    initSevenChart();
    $scope.save = function(){
        if(typeof($scope.object.id) !="undefined"){
            updateTaskObject();
        }else{
            addTaskObject();
        }

    }
    $scope.delete = function(id){
        NewRequestService.delete(id).success(function(data){
            searchRequest();
            swal("删除请求成功");
        });
    }
    $scope.updateForm = function(id){
        var record = findOnRecords($scope.requestList,id);
        match(record);
    }
}
