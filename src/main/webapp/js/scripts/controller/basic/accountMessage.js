/**
 * Created by talenttan on 11/3/16.
 */
define(['app', 'service/basic/accountMessage'], function (app) {
    app.controller('AccountMessageCtrl', AccountMessageCtrl);
});
function AccountMessageCtrl($scope, accountMessageService,swal) {
    $scope.object = {};
    $scope.object.customTemp ={};
    $scope.object.customTemp.contactTemps = new Array();
    $scope.object.customTemp.collectTimeTemps = new Array();
    $scope.contactList = new Array();
    $scope.object.status = 1;
    $scope.times = new Array();
    $scope.firstType = 1;
    $scope.secondType = 2;
    $scope.thirdType =3;
    var count =0;
    $scope.baseId = "contact_";
    $scope.addElementIds = new Array();

    //$scope.object = {};
    //$scope.object.name='嘉邦国金中心';
    //$scope.object.status = 1;
    //$scope.object.customTemp ={};
    //$scope.object.customTemp.name ='嘉邦国金中心';
    //$scope.object.customTemp.address="桂城嘉石龙南路邦国金中心";
    //$scope.object.customTemp.contactTemps = new Array();
    //$scope.object.customTemp.contactTemps.push({name:'张三',telephone:'0757-8862234',tel:'12345678909',remark:'xxx',type:1});
    //$scope.object.customTemp.contactTemps.push({name:'张er',telephone:'0757-12345678',tel:'12345678909',remark:'xxx',type:1});
    //$scope.object.customTemp.contactTemps.push({name:'历经',telephone:'',tel:'123885678909',remark:'xxx',type:2});
    //$scope.object.customTemp.contactTemps.push({name:'刘明明',telephone:'',tel:'13710095391',remark:'xxx',type:2});
    //$scope.object.customTemp.contactTemps.push({name:'网优',telephone:'',tel:'123885678909',remark:'xxx',type:3});
    //$scope.object.customTemp.collectTimeTemps = new Array();
    //$scope.object.customTemp.collectTimeTemps.push({collect_time:'10:00-12:00'});
    //$scope.object.customTemp.collectTimeTemps.push({collect_time:'18:00-19:00'});
    /**
     * 刷新申请表单的值
     */
    function refreshForm(){
        accountMessageService.getApplyForm().success(function(data){
            $scope.object = data.custom;
            $scope.contactList = data.contactList;
            getContactIds($scope.contactList);
            transTimeFormat(data.collectTimes);
            $scope.times =data.collectTimes;
        });
    }
    refreshForm();
    $scope.save = function(){
        //组装参数
        assemblyObject();
        accountMessageService.applySave($scope.object).success(function(data){
            swal(data.message);
            refreshForm();
        });
    }
    $scope.cancelApply = function(){
        accountMessageService.comfirmApply(23,2).success(function(data){
            swal(data.message);
        });
    }
    $scope.deletePerson =function(id){
        deleteContactIds(id);
        $("#"+id).remove();
    }
    $scope.change = function(){
        document.getElementById("editPage").style.display="block";
        document.getElementById("displayPage").style.display="none";
    }
    $scope.cancel = function(){
        document.getElementById("editPage").style.display="none";
        document.getElementById("displayPage").style.display="block";
    }
    $scope.addFirstContact = function(){
        addContact("firstContact",1);
    }
    $scope.addSecondContact = function(){
        addContact("secondContact",2);
    }
    $scope.addThirdContact = function(){
        addContact("thirdContact",3);
    }
    function addContact(id,type){
        count ++;
        var divId = $scope.baseId +count;
        var delButtonId = divId + "Button";
        $( "#"+id ).prepend('<div id="'+divId+'" style="display: inline" ng-if="item.type==2"><input type="hidden" value="'+type+'" name="type"/>姓名<input value="" name="name"/>电话<input value="" name="tel"/>手机号码<input value="" name="mobile"/>备注<input value="" name="remark"/><a id="'+delButtonId+'">删除</a></div><br>');
        $("#"+delButtonId).click(function(){
            $scope.deletePerson(divId);
        });
        $scope.addElementIds.push(divId);
    }
    function save(){
        document.getElementById("displayPage").style.display="block";
    }
    $scope.addTime = function(){
        var collectTime=document.getElementById("Time");
        var input1=document.createElement("input");
        input1.type="text";
        insertAfter(input1,collectTime);
    }
    function insertAfter(newEl, targetEl) {
        var parentEl = targetEl.parentNode;

        if(parentEl.lastChild == targetEl)
        {
            parentEl.appendChild(newEl);
        }else
        {
            parentEl.insertBefore(newEl,targetEl.nextSibling);
        }
    }

    /**
     * 后台查询收运时间~转换成-
     * @param arr
     */
    function transTimeFormat(arr){
        for(var i = 0 ;i<arr.length;i++){
            arr[i]=arr[i].replace("~", "-");
        }
    }

    /**
     * 从后台数据获取页面的div id
     * @param arr
     */
    function getContactIds(arr){
        for(var j =0;j<arr.length;j++){
            $scope.addElementIds.push(arr[j].id);
        }
    }

    /**
     * 从数组删除联系人div 的id
     * @param delId
     */
    function deleteContactIds(delId){
        var arr =  $scope.addElementIds;
        for(var i = 0;i<arr.length;i++){
            if(arr[i]==delId){
                arr = arr.splice(i,1);
                break;
            }
        }
    }

    /**
     * 构造发送到后台的对象
     */
    function assemblyObject(){
        //object已经存在的、customTemp、contactTemps、collectTimeTemps
        getCustomTemp();
        getContactTemps();
        getCollectTimeTemps();
    }

    /**
     * 构造customTemp对象
     */
    function getCustomTemp(){
        $scope.object.customTemp ={};
        $scope.object.customTemp.name = $scope.object.name;
        $scope.object.customTemp.address = $scope.object.address;
    }

    /**
     * 构造发送到后台的联系人数组
     */
    function getContactTemps(){
        $scope.object.customTemp.contactTemps = new Array();
        var divIds = $scope.addElementIds;
        for(var j = 0;j<divIds.length;j++){
            var id = divIds[j];
            var record = $("#"+id+" input").serializeArray();
            var obj = {name:'',telephone:'',tel:'',remark:'',type:0};
            constructe(obj,record);
            $scope.object.customTemp.contactTemps.push(obj);
        }
    }

    /**
     * 构造发送到后台的收运时间数组
     */
    function getCollectTimeTemps(){
        $scope.object.customTemp.collectTimeTemps = new Array();
        $("#collectTimes input").each(function(){
            var value = $(this).val();
            if(value!=''){
                $scope.object.customTemp.collectTimeTemps.push({collect_time:value});
            }
        });
    }

    /**
     *将对象字段数组值拷贝到对象
     * @param obj   对象
     * @param arr   对象字段数组
     */
    function constructe(obj,arr){
        for(var x in obj){
            for(var i=0;i<arr.length;i++){
                obj[arr[i].name]=arr[i].value;
            }
        }
    }




}
