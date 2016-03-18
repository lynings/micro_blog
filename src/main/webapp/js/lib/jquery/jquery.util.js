/**
 * Created by talenttan on 13/3/16.
 */
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