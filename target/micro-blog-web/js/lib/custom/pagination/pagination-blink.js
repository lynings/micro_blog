/**
 * Created by lyning on 16-3-14.
 */
/* require jquery 1.8  */
"use strict";
(function(root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
            root.daterCreateNew = factory(root, $);
        });

    } else if (typeof exports !== 'undefined') {
        var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;  //isomorphic issue
        if (!jQuery) {
            try {
                jQuery = require('jquery');
                if (!jQuery.fn) jQuery.fn = {}; //isomorphic issue
            } catch (err) {
                if (!jQuery) throw new Error('jQuery dependency not found');
            }
        }

        factory(root, jQuery);

        // Finally, as a browser global.
    } else {
        root.daterCreateNew = factory(root, {}, (root.jQuery || root.$));
    }

}(this || {}, function(root, $){

    var PaginationBlink = function (options, element, callback) {

        this.initPagination(options, element, callback);

        element.on('click', 'li', $.proxy(this.clickPagination, this));
    };

    PaginationBlink.prototype = {

        constructor : PaginationBlink,

        setOption : function (options) {

            var hasObject = options !== null && typeof options === 'object';

            this.dataList = hasObject ? (options.hasOwnProperty('dataList') ? options.dataList : []) : []; // 分页数据
            // 分页信息
            this.startPage = hasObject ? (options.hasOwnProperty('startPage') ? options.totalSize : 1) : 1; // 第几页 : 当前页
            this.showSize = hasObject ? (options.hasOwnProperty('showSize') ? options.totalSize : 10) : 10; // 每页显示条数
            this.totalSize = this.dataList.length; // 总条数
            this.pageRange = hasObject ? (options.hasOwnProperty('pageRange') ? options.pageRange : 2) : 2; // 页码显示的范围，如1时： '1' 2,  1 '2' 3,  2 '3' 4,  3 '4' 5

            (function (that, element, callback) {

                /* 组装模板 */
                var template = that.getPaginationHTML();
                /* dataList 只保存要显示的数据 */
                var dataArr = that.getPageDataList(that.dataList);
                // 分页
                that.pagination(dataArr, element, template, callback);

            })(this, this.element, this.callbackFn);

        },

        initPagination : function (options, element, callback) {

            this.element = element; // dom

            this.callbackFn = callback; // 回调函数

            this.setOption(options);

        },

        /**
         * 开始分页操作
         * @param element 传入DOM对象
         * @param callback 回调函数
         * @constructor
         */
        //paginationOperation : function (element, callback){
        //    /* 组装模板 */
        //    var template = this.getPaginationHTML();
        //    /* dataList 只保存要显示的数据 */
        //    var dataArr = this.getPageDataList(this.dataList);
        //    // 分页
        //    this.pagination(dataArr, element, template, callback);
        //},

        /**
         * 分页HTML
         * pageRange 页码显示的范围，如1时： '1' 2,  1 '2' 3,  2 '3' 4,  3 '4' 5
         * @param allSize 一共有多少页
         * @param customTemplate  自定义模板
         * @returns {string}
         */
        getPaginationHTML : function() {
            var pages = this.getTotalPage();
            var template = '';
            var pre = '\r<li page-num=1>首页</li>';
            var lastIndex = Number((pages+'').substring(0,Number((pages+'').indexOf('.')>-1?(pages+'').indexOf('.'):(pages+'').length)));
            var last = '\r<li page-num='+lastIndex+'>尾页</li>';

            var minPage = this.startPage - this.pageRange;
            var maxPage = this.startPage + this.pageRange;
            for(var i=1; i<=pages; i++){
                if(i==1 && this.startPage - this.pageRange>1){
                    template += '<li page-num='+parseInt(this.startPage-1)+'> < </li>';
                }
                if((i >= minPage && i<= maxPage) && i!=this.startPage ) {
                    template += '<li page-num='+i+'>' +i+ '</li>';

                }
                if(i == this.startPage) {
                    template += '<li class="btn-success" page-num='+i+'>' +i+ '</li>';
                }
                if(i == maxPage) {
                    break;
                }
            }
            if(lastIndex - this.startPage - this.pageRange>2){
                template += '<li page-num='+parseInt(lastIndex-1)+'> ... </li>';
                template += '<li page-num='+lastIndex+'>'+pages+' </li>';
            }
            if(lastIndex - this.pageRange > this.startPage){
                template += '<li page-num='+parseInt(this.startPage+1)+'> > </li>';
            }
            template = '\r<ul>' + pre + template + last + '</ul>';
            template += '<div style="margin-top: 10px;">共'+this.totalSize+'条记录</div>';
            return template;
        },

        /**
         * 分页
         * @param dataList
         * @param element
         * @param template
         * @param callback
         * @constructor
         */
        pagination : function (dataList, element, template, callback){
            $(element).empty();
            $(template).appendTo(element);
            if(!callback && callback === null && typeof callback ==='undefined') {
                //throw new Error('startPagination(option, callback) error : callback is null or undefined');
                console.warn('in your code , startPagination(option, callback) error : callback is null or undefined');
            } else {
                (callback)(dataList);
            }
        },

        /* 实际分页要展示的数据列表 */
        getPageDataList : function (vehicleLists){
            var dataList = [];
            for(var i=1; i<vehicleLists.length+1; i++){
                if(i > ((this.startPage-1) * this.showSize) && i<=(this.startPage * this.showSize)){
                    dataList.push(vehicleLists[i-1]);
                }
                if(i > (this.startPage * this.showSize)){
                    break;
                }
            }
            return dataList;
        },

        getTotalPage : function () {
            return parseInt(this.totalSize / this.showSize) +1;
        },

        /* 分页 */
        clickPagination : function (e) {
            if(Number($(this).attr('page-num')) != this.startPage) {
                this.startPage = Number($(e.currentTarget).attr('page-num'));

                (function (that, element, callback) {

                    /* 组装模板 */
                    var template = that.getPaginationHTML();
                    /* dataList 只保存要显示的数据 */
                    var dataArr = that.getPageDataList(that.dataList);
                    // 分页
                    that.pagination(dataArr, element, template, callback);

                })(this, this.element, this.callbackFn);

            }
            e.stopPropagation();
        }
    }

    $.fn.startPagination = function(option, callback){
        var dater = null;
        var element = this;
        return function() {

            dater = new PaginationBlink(option, element, callback);
            return dater;
        }
    };

    return PaginationBlink;

}));
