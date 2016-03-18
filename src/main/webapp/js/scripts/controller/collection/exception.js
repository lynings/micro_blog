/**
 * Created by Blink on 3/14/2016 AD.
 */
define(['app', 'service/collection/exception', '../../../lib/custom/pagination/pagination-blink'], function (app) {
    'use strict';
    app.controller('CreateExceptionCtrl', CreateExceptionCtrl);
});

function CreateExceptionCtrl ($scope, CreateExceptionService) {

    $scope.dataList = null;
    var exceptionManager = ExceptionManagement.createNew();
    CreateExceptionService.list().success(function (data) {
        $scope.dataList = data.list;
        var options = {};
        options.dataList = data.list;
        $('#pagination').startPagination(options, exceptionManager.generateTable)();
    });

    $('.table').on('click', '.drop-box', $.proxy(exceptionManager.toggles, this));

    $('#main').on('click', '#selectAll', $.proxy(exceptionManager.selectAll, this));

    $(document).on('click', '#allOut', $.proxy(exceptionManager.showAll, this));

}

var ExceptionManagement = {

    createNew : function() {

        var exception = {};

        exception.showOrHide = 'hide';

        exception.timer = 400; // animate timer

        exception.statusType = {
            'mark' : 'mark',
            'status' : 'status',
            'checkbox' : 'checkbox'
        };

        // 附件类型
        exception.attach = {
            '0' : '\r<li title="其它"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></li>',
            '1' : '\r<li title="图片"><span class="glyphicon glyphicon-picture" aria-hidden="true"></span></li>',
            '2' : '\r<li title="音频"><span class="glyphicon glyphicon-volume-up" aria-hidden="true"></span></li>',
            '3' : '\r<li title="视频"><span class="glyphicon glyphicon-play-circle" aria-hidden="true"></span></li>'
        };

        exception.toggles = function (e) {

            var domObject = e.currentTarget;
            var oldFlag;
            var flag = exception.changeArrow(domObject);
            var oldElement = $('.exception-box[status-flag="show"]');
            if(oldElement && typeof oldElement.attr('ex-flag') !== 'undefined' && oldElement.length<2) {
                oldFlag = oldElement.attr('ex-flag');
                if(oldFlag !== flag) {
                    $('.drop-box[ex-flag='+oldFlag+']').html('>');
                    var pervElement = $('.exception-box[ex-flag='+oldFlag+']');
                    pervElement.animate({height: ['toggle', 'swing']}, exception.timer);
                    pervElement.children().find('.hide-show-box').animate({height: ['toggle', 'swing']}, exception.timer);
                    pervElement.attr('status-flag', 'hide');
                }
            }
            var element = $('.exception-box[ex-flag='+flag+']');
            var status = element.attr('status-flag') === 'hide' ? 'show' : 'hide';
            element.attr('status-flag', status);
            element.animate({height: ['toggle', 'swing']}, exception.timer);
            element.children().find('.hide-show-box').animate({height: ['toggle', 'swing']}, exception.timer);

            // 解决当展示全部按钮被点击后, 在手动关闭所有异常信息后, 导致再次点击展示全部按钮需要点击2次才有效果
            if(status === 'hide' && oldElement.length < 2 && status !== exception.showOrHide) {
                exception.showOrHide = 'hide';
            }
        };

        exception.showAll = function () {
            var status = '';
            if(exception.showOrHide === 'hide') {
                status = 'show';
            }else {
                status = 'hide';
            }
            var element = $('.exception-box[status-flag='+exception.showOrHide+']');
            element.animate({height: ['toggle', 'swing']}, exception.timer);
            element.children().find('.hide-show-box').animate({height: ['toggle', 'swing']}, exception.timer);
            $('.exception-box').attr('status-flag', status);
            exception.showOrHide = status;

            for (var i=0; i<element.length; i++) {
                var e = element[i];
                var flag = $(e).attr('ex-flag');
                var arrowElement = $('.drop-box[ex-flag="'+flag+'"]');
                exception.changeArrow(arrowElement);
            }
        };

        exception.selectAll = function (e) {

            if(e.currentTarget.checked) {
                $('.box-selected[param-type="can-edit"]').prop("checked",true);
            } else {
                $('.box-selected[param-type="can-edit"]').prop("checked",false);
            }
        };

        exception.changeStatus = function () {

        };

        // 修改 > 和 v  箭头
        exception.changeArrow = function (element) {
            var element = $(element);
            if(!element || element === null || typeof element ==='undefined') {
                throw new Error('exception.changeArrow() error : element is null or undefined');
            }
            var flag = element.attr('ex-flag');
            if (!flag || flag === null || typeof flag === 'undefined') {
                return ;
            }
            var text = element.html()+ "".replace(' ', '');
            if (text === 'v') {
                element.html('>');
            } else {
                element.html('v');
            }
            return flag;

        };

        exception.getAttachListHTML = function (attachType) {

            var attachHTML = '';
            var attachArray = attachType.split(',');
            var length = attachArray.length;
            for (var j=0; j<length; j++) {
                var type = attachArray[j];
                attachHTML += exception.attach[type];
            }
            return attachHTML;
        };

        exception.getTemplateHTML = function (dataList) {

            var html = '';
            for (var i=0; i<dataList.length; i++) {
                var showExceptionTemplate = '';
                var hideExceptionTemplate = '';
                var data = dataList[i];
                var flag = data.rid;
                var status = data.status;
                var exceptionTime = data.exceptionTime;
                var exceptionName = data.name;
                var attachType = data.attachType;
                var attachUrl = data.url;
                var detail = data.detail;
                showExceptionTemplate += exception.getShowTemplate(status, exceptionTime, exceptionName, attachType, flag);
                if(exception.checkAttachType(attachType)) {
                    var attachListHTML = exception.getAttachListHTML(attachType);
                    hideExceptionTemplate += exception.getHideTemplate(flag, detail, attachListHTML);
                }
                html += (showExceptionTemplate + hideExceptionTemplate);
            }
            return html;
        };

        exception.getShowTemplate = function (status, exceptionTime, exceptionName, attachType, flag) {

            var template = '\r<tr>' +
                '\r<td>'+exception.getHTMLByStatus(status, 'checkbox')+'</td>' +
                '\r<td>'+exception.getHTMLByStatus(status, 'status')+'</td>' +
                '\r<td>'+exceptionTime+'</td>' +
                '\r<td>'+exceptionName+'</td>' +
                '\r<td>'+(attachType==='?' ? '' : '<span class="glyphicon glyphicon-link" aria-hidden="true"></span>')+'</td>' +
                '\r<td>'+exception.getHTMLByStatus(status,'mark') +
                '\r</td>' +
                '\r<td class="drop-box" ex-flag='+flag+'> > </td>' +
                '</tr>';
            return template;
        };

        exception.getHideTemplate = function (flag, detail, attachListHTML) {

            var exceptionTemp = '\r<tr class="exception-box" ex-flag='+flag+' status-flag="hide">' +
                '\r<td></td>' +
                '\r<td></td>' +
                '\r<td><div class="exception-msg hide-show-box">'+detail+'</div></td>' +
                '\r<td></td>' +
                '\r<td>' +
                '\r<div class="exception-list">' +
                '\r<ul class="hide-show-box">' +attachListHTML +
                '\r</ul>' +
                '\r</div>' +
                '\r</td>' +
                '\r<td></td>' +
                '\r<td></td>' +
                '</tr>';
            return exceptionTemp;
        };

        exception.checkAttachType = function (attachType) {

            return typeof attachType !== 'undefined' && attachType !== null && attachType !== '?';
        };

        exception.getHTMLByStatus = function (status, type) {

            var st = exception.statusType;
            switch (type) {
                case st.checkbox : return '<input type="checkbox" class="box-selected" '+(status === '2' ? 'disabled' : 'param-type="can-edit"')+'/>';
                case st.mark : return status==='2' ? '<button class="btn btn-success" class="mark-read" type="button">标记已读</button>' : '';
                case st.status : return status === '2' ? '<span class="hasRead-tip tip"></span>' : '<span class="noRead-tip tip"></span>';
                default : '';
            }
        };

        exception.generateTable = function (dataList) {

            var html = exception.getTemplateHTML(dataList);
            $('#exceptionBody').html(html);
        };

        return exception;
    }
}
