
define(['angularAMD'], function (angularAMD) {
    angularAMD.filter('personSex', function () {
        var genderHash = {
            1: '男',
            0: '女'
        };
        return function (input) {
            return genderHash[input];
        };
    });
    angularAMD.filter('personStatus', function () {
        var genderHash = {
            0: '解雇',
            1: '正常',
            2: '被锁'
        };
        return function (input) {
            return genderHash[input];
        };
    });
});



