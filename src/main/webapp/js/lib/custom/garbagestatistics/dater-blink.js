/**
 * Created by lyning on 16-2-29.
 */
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
    var DaterBlink = function (options, element) {

        this.setOptions(options);

        this.template = '\r<table class="table" style="border: 1px solid #ddd;">' +
                            '\r<thead id="graphHead">' +
                            '\r<tr>' +
                            '\r<td>日</td>' +
                            '\r<td>一</td>' +
                            '\r<td>二</td>' +
                            '\r<td>三</td>' +
                            '\r<td>四</td>' +
                            '\r<td>五</td>' +
                            '\r<td>六</td>' +
                            '\r</tr>' +
                            '\r</thead>' +
                            '\r<tbody id="graphBody"></tbody>' +
                        '<table>';
        element.html(this.template);

        this.generateYear();
        this.getPage('day');

        //this.getMonthPage(null);

        //this.getDayPage(null);

        element.on('click', 'td', $.proxy(this.clickDateBox, this));

        $('#date-bottom').on('click', 'li.btn-default',  $.proxy(this.clickDateBtn, this));

        //element.delegate('click', '.dg-default',  $.proxy(this.clickDateAndGraphBtn, this));

        $('#dater').on('click', '.left-arrow, .right-arrow', $.proxy(this.clickArrow, this));

    };

    DaterBlink.prototype = {

        constructor: DaterBlink,

        setOptions : function(options) {

            this.lastDate = options && options.hasOwnProperty('lastDate') ? options.lastDate : new Date();
            this.range = options && options.hasOwnProperty('range') ? options.range : 12;
            this.dateArr = {};
            this.currentMonth = null;
            this.currentDay = null;
            this.chooseYear = null;
            this.chooseMonth = null;
            this.format = options && options.hasOwnProperty('format') ? options.format : 'YYYY-MM-DD';
            this.options = options;
            this.yearList = [];
            this.customData = options && options.hasOwnProperty('customData') ? options.customData : null;
            this.dataList = options && options.hasOwnProperty('dataList') ? options.dataList : null;
            this.monthLastDay =
            {
                1: 31,
                2: 28,
                3: 31,
                4: 30,
                5: 31,
                6: 30,
                7: 31,
                8: 31,
                9: 30,
                10: 31,
                11: 30,
                12: 31
            };
            this.onDay =
            {
                0: '日',
                1: '一',
                2: '二',
                3: '三',
                4: '四',
                5: '五',
                6: '六'
            };

            this.dateOption = {
                year: '年',
                month: '月',
                day: '日',
            }

            if(options && options.hasOwnProperty('dateOption')) {
                for(var key in options.dateOption){
                    if(options.dateOption.hasOwnProperty(key)) {
                        if(this.dateOption[key]) {
                            this.dateOption[key] = options.dateOption[key];
                        }
                    }
                }
            }

            var date = this.lastDate;
            this.currentYear = parseInt(date.getFullYear());
            this.currentMonth = parseInt(date.getMonth()) + 1;
            this.currentDay = parseInt(date.getDate());
            this.chooseYear = this.currentYear;
            this.chooseMonth = this.currentMonth;
        },

        generateYear : function() {
            var dateArr = {};
            dateArr[this.currentYear] = this.generateMonth();
            this.yearList[0] = this.currentYear;
            var i = 0;
            while(i < this.range) {
                this.chooseYear = this.currentYear-i;
                dateArr[this.currentYear-i] = this.generateMonth();
                this.yearList[i] = this.currentYear-i;
                i++
            }
            this.chooseYear = this.currentYear;
            this.chooseMonth = this.currentMonth;
            this.dateArr = dateArr;
            return this.dateArr;
        },

        generateMonth : function() {
            this.chooseMonth = 12;
            var months = {};
            if(this.chooseYear == this.currentYear){
                this.chooseMonth = this.currentMonth;
            }
            while(this.chooseMonth>0) {
                months[this.chooseMonth] = this.generateDay();
                this.chooseMonth--;
            }
            return months;
        },

        generateDay : function() {
            if(this.chooseYear == this.currentYear && this.chooseMonth == this.currentMonth){
                return this.currentDay;
            }
            return this.endDay();
        },

        getCurrentYear : function() {
            return this.currentYear;
        },

        getYear : function() {
            return this.chooseYear;
        },

        prevYear : function() {
            if(this.currentYear - this.chooseYear < this.range-1) {
                return --this.chooseYear;
            }
            return this.chooseYear;
        },

        nextYear : function() {
            if(this.currentYear - this.chooseYear >0) {
                return ++this.chooseYear;
            }
            return this.chooseYear;
        },

        getCurrentMonth : function() {
            return this.currentMonth;
        },

        getMonth : function() {
            return this.chooseMonth;
        },

        prevMonth : function() {
            return this.chooseMonth > 1 ? --this.chooseMonth : this.chooseMonth;
        },

        nextMonth : function() {
            if(this.chooseYear === this.currentYear){
                if(this.chooseMonth < this.currentMonth){
                    return ++this.chooseMonth;
                }
            }else {
                if(this.chooseMonth < 12)
                    return ++this.chooseMonth;
            }
            return this.chooseMonth;
        },

        startDay : function(){
            return 1
        },

        endDay : function(){
            if(this.getMonth() == 2){
                var year = this.getYear();
                var isLeapYear = this.isLeapYear(year);
                if(isLeapYear){
                    return 29;
                }
            }
            return this.monthLastDay[this.chooseMonth];
        },

        addMonth : function(num) {
            var month = this.chooseMonth + parseInt(num);
            var a = parseInt(month%12);
            var b = parseInt(month/13);
            this.chooseMonth = month>0 ? (a==0 ? 12 : a) : (month==0 ? 12 : (a==0 ? 12 : 12+a));
            this.chooseYear += month>0 ? (b==0 ? 0 : b) : (month==0 ? -1 : (b==0 ? -1 : b));
            return this;
        },

        subtractMonth : function(num) {
            return this.addMonth(-num);
        },

        getAllDay : function(year) {
            return this.isLeapYear(year?year:this.chooseYear) ? 366 : 365;
        },

        getDay : function() {
            return this.lastDate.getDay();
        },

        whichDay : function(date) {
            return new Date(date).getDay();
        },

        chooseDay : function(day) {
            return new Date(this.chooseYear+'-'+this.chooseMonth+'-'+day).getDay();
        },

        isLeapYear : function(year) {
            var b = false;
            if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                b = true;
            }
            return b;
        },

        /**
         * 生成年月日页面的入口
         * @param dataArr  数据
         * @param type  生成页面的类型
         * @returns {string}
         */
        generatePage : function(dataArr, type) {
            if(type === 'day'){
                return this.generateDayPage(dataArr);
            }
            var max = parseInt(this.getMax(type)) + 10;
            var templateGraph = '';
            var count = 0;
            for(var key in dataArr){
                if(dataArr.hasOwnProperty(key)) {
                    if(count == 0){
                        templateGraph += '\r<tr>';
                    }
                    var info = key;
                    var plan = 0;
                    var real = 0;
                    var exceptionNum = 0; // 异常数
                    var garbage;
                    var selector;
                    if(type === 'year'){
                        selector = key;
                    }else if(type === 'month'){
                        var monthStr = key<10 ? '0'+key : key;
                        selector = this.chooseYear+'-'+monthStr;
                    }
                    garbage = this.getCustomData(type, selector);
                    plan = garbage.plan;
                    real = garbage.real;
                    exceptionNum = garbage.ex;
                    var planGraphWidth = (plan>0 ? plan/max*100 : 1) + '%';
                    var realGraphWidth = (real>0 ? real/max*100 : 1) + '%';
                    var division = (real - plan)/plan;
                    if(division > 1.3 || division<0.3){
                        templateGraph += '\r<td data-param='+info+' data-type='+type+'>' +
                            '<label class="'+type+'-label red">'+info+'</label>' +
                            '<div class="realAmount" style="width: '+planGraphWidth+'" title="'+plan+'"></div>' +
                            '<div class="planAmount" style="width: '+realGraphWidth+'" title="'+real+'"></div>' +
                            '</td>';
                    }else {
                        templateGraph += '\r<td data-param='+info+' data-type='+type+'>' +
                            '<label class="'+type+'-label green">'+info+'</label>' +
                            '<div class="realAmount" style="width: '+planGraphWidth+'" title="'+plan+'"></div>' +
                            '<div class="planAmount" style="width: '+realGraphWidth+'" title="'+real+'"></div>' +
                            '</td>';
                    }

                    count ++;

                    if(count % 4 == 0){
                        templateGraph += '</tr>';
                        count = 0;
                    }

                }
            }
            while(count % 4 !=0){ //补齐
                templateGraph += '\r<td></td>';
                count++;
                if(count % 4 == 0){
                    templateGraph += '</tr>';
                    count = 0;
                }
            }
            return templateGraph;
        },

        /**
         * 生成天数
         * @param datas
         * @returns {string}
         */
        generateDayPage : function(datas) {
            var html = '';
            var count = 0;
            var plan = 0;
            var real = 0;
            var type = 'day';
            var selector;
            var templateData = '';
            var max = this.getMax(type) + 10;
            for(var key in datas) {
                if(datas.hasOwnProperty(key)){
                    key = parseInt(key);
                    if(key != this.chooseMonth) continue;
                    this.chooseMonth = key;
                    var firstOnDay = this.chooseDay(1);
                    if(firstOnDay!=0){ // 如果当前月的第一天不是星期天就拿到上个月的数据补齐
                        var endDay = this.subtractMonth(1).endDay();
                        for(var j=firstOnDay; j>0; j--){
                            if(count == 0){
                                templateData += '<tr>'; // 天数数据
                            }
                            var day = (endDay - j+1);
                            var monthStr = this.chooseMonth<9 ? '0'+this.chooseMonth : this.chooseMonth;
                            var dayStr = day<9 ? '0'+day : day;
                            selector = this.chooseYear+'-'+monthStr+'-'+dayStr;
                            var garbage = this.getCustomData(type, selector);
                            plan = garbage.plan;
                            real = garbage.real;
                            var planGraphWidth = (plan>0 ? plan/max*100 : 1) + '%';
                            var realGraphWidth = (real>0 ? real/max*100 : 1) + '%';
                            templateData += '\r<td data-param='+day+' data-type='+type+'>' +
                                                '<label class="'+type+'-label red">'+day+'</label>' +
                                                '<div class="realAmount" style="width: '+planGraphWidth+'" title="'+plan+'"></div>' +
                                                '<div class="planAmount" style="width: '+realGraphWidth+'" title="'+real+'"></div>' +
                                            '</td>';
                            count ++;

                            if(count % 7 == 0){
                                templateData += '</tr>';
                                count = 0;
                            }

                        }
                        this.addMonth(1);
                    }
                    for(var i=0; i<datas[key]; i++) {  // 本月
                        if(count == 0){
                            templateData += '<tr>'; // 天数数据
                        }
                        var day = (i+1);
                        var monthStr = this.chooseMonth<9 ? '0'+this.chooseMonth : this.chooseMonth;
                        var dayStr = day<9 ? '0'+day : day;
                        selector = this.chooseYear+'-'+monthStr+'-'+dayStr;
                        var garbage = this.getCustomData(type, selector);
                        plan = garbage.plan;
                        real = garbage.real;
                        var planGraphWidth = (plan>0 ? plan/max*100 : 1) + '%';
                        var realGraphWidth = (real>0 ? real/max*100 : 1) + '%';
                        templateData += '\r<td data-param='+day+' data-type='+type+'>' +
                                            '<label class="'+type+'-label red">'+day+'</label>' +
                                            '<div class="realAmount" style="width: '+planGraphWidth+'" title="'+plan+'"></div>' +
                                            '<div class="planAmount" style="width: '+realGraphWidth+'" title="'+real+'"></div>' +
                                        '</td>';
                        count ++;

                        if(count % 7 == 0){
                            templateData += '</tr>';
                            count = 0;
                        }
                    }
                    if(count%7!=0){  // 拿到下个月的天数补齐尾部
                        if(this.chooseMonth == this.currentMonth && this.chooseYear == this.currentYear) {
                            while(count % 7 !=0){
                                templateData += '\r<td></td>';
                                count++;
                                if(count % 7 == 0){
                                    templateData += '</tr>';
                                    count = 0;
                                }
                            }
                        }else {
                            var startDay = this.addMonth(1).startDay();
                            for(var j=startDay; count%7!=0; count++, j++){
                                var day = j;
                                var monthStr = this.chooseMonth<9 ? '0'+this.chooseMonth : this.chooseMonth;
                                var dayStr = day<9 ? '0'+day : day;
                                selector = this.chooseYear+'-'+monthStr+'-'+dayStr;
                                var garbage = this.getCustomData(type, selector);
                                plan = garbage.plan;
                                real = garbage.real;
                                var planGraphWidth = (plan>0 ? plan/max*100 : 1) + '%';
                                var realGraphWidth = (real>0 ? real/max*100 : 1) + '%';
                                templateData += '\r<td data-param='+day+' data-type='+type+'>' +
                                                    '<label class="'+type+'-label red">'+day+'</label>' +
                                                    '<div class="realAmount" style="width: '+planGraphWidth+'" title="'+plan+'"></div>' +
                                                    '<div class="planAmount" style="width: '+realGraphWidth+'" title="'+real+'"></div>' +
                                                '</td>';

                                if(count % 7 == 0){
                                    templateData += '</tr>';
                                    count = 0;
                                }
                            }
                            this.subtractMonth(1);
                        }
                    }
                }
            }
            html = templateData;
            return html;
        },

        getPage : function (type, date) {
            if(type === 'year') {
                this.getYearPage();
            }else if (type === 'month') {
                var year = !date ? this.chooseYear : date;
                this.getMonthPage(year);
            }else if (type === 'day') {
                var month = !date ? this.chooseMonth : date;
                this.getDayPage(month);
            }else {
                this.chooseYear = this.currentYear;
                this.getDayPage(this.currentMonth);
            }
        },

        getYearPage : function () {
            var type = 'year';
            var years = this.dateArr;
            var template = this.generatePage(years, type);
            document.getElementById("dater").style.display = 'none';
            this.changePageShow(type, template);
        },

        getMonthPage : function (year) {
            var type = 'month';
            if(year){
                this.chooseYear = year;
            }
            var monthList = this.dateArr[this.chooseYear];
            var template = this.generatePage(monthList, type);
            this.changePageShow(type, template);
        },

        getDayPage : function (month){
            if(month){
                this.chooseMonth = month;
            }
            var type = 'day';
            var monthList = this.dateArr[this.chooseYear];
            var template = this.generatePage(monthList, type);
            this.changePageShow(type, template);
        },

        changePageShow : function (type, html) {
            var style = '';
            if(type === 'year') {
                style = 'none';
                document.getElementById("graphHead").style.display = 'none';
            }else {
                document.getElementById("graphHead").style.display = '';
            }
            var month = this.chooseMonth<10 ? '0'+this.chooseMonth : this.chooseMonth;
            if(type === 'month') {
                $('#yearMonth').html(this.chooseYear);
                document.getElementById("graphHead").style.display = 'none';
            } else {
                $('#yearMonth').html(this.chooseYear+'-'+month);
            }
            document.getElementById("dater").style.display = style;
            document.getElementById('graphBody').innerHTML = html;
        },

        /**
         * 获取自定义数据, 可以是某年, 某月, 某日,
         * @param type : year, month, day
         * @param selector : 日期
         * @returns {*}
         */
        getCustomData : function(type, selector){
            var result = this.customData[type];
            if(selector){
                var plan = result[selector] ? result[selector][0] : 0;
                var real = result[selector] ? result[selector][1] : 0;
                var exceptionNum = result[selector] ? result[selector][2] : 0;
                plan = (plan<1 && plan>0) ? Number(plan).toFixed(1): parseInt(plan);
                real = (real<1 && real>0) ? Number(real).toFixed(1): parseInt(real);
                result = {'plan' : plan, 'real' : real, 'ex' : exceptionNum};
                //result = result ? (result[selector] ? {'plan':parseInt(result[selector][0]), 'real':parseInt(result[selector][1])} : {'plan':0, 'real':0}) : {'plan':0, 'real':0};
            }
            return result;
        },

        getMax : function(type){
            var max = 0;
            var dataList = this.getCustomData(type);
            for(var key in dataList){
                if(dataList.hasOwnProperty(key)){
                    var arr = dataList[key];
                    for(var i=0; i<arr.length; i++){
                        if(arr[i]>max){
                            max = arr[i];
                        }
                    }
                }
            }
            return max;
        },

        clickDateBox : function(e) {
            var target = $(e.currentTarget);
            var dataType = target.attr('data-type');
            var data = target.attr('data-param');
            var id = '';
            if(dataType === 'day') {
                return ;
            }
            if(dataType === 'year') {
                var type = 'month';
                id = type;
                var year = parseInt(data);
                this.getPage(type, year);
            }
            if(dataType === 'month') {
                var type = 'day';
                id = type;
                var month = parseInt(data);
                this.getPage(type, month);
            }
            $('#date-bottom li').attr('class','btn btn-default');
            $('#'+id).attr('class','btn btn-success');
            e.stopPropagation();
        },

        clickDateBtn : function(e) {
            $('#date-bottom > .btn-success').attr('class','btn btn-default');
            $(e.currentTarget).attr('class','btn btn-success');
            var pageTypeFlag = $(e.currentTarget).attr('id');
            var date = $('#yearMonth').html();
            this.getPage(pageTypeFlag);
            e.stopPropagation();
        },

        clickArrow : function(e) {
            var pageType = $('#date-bottom > li.btn-success').attr('id');
            var oldDate = $('#yearMonth').html();
            if (pageType === 'onDay') return ;
            if (pageType === 'month') {
                var year = this.currentYear;
                var oldYear = parseInt(oldDate);
                if($(e.currentTarget).hasClass('left-arrow')) {
                    year = this.prevYear();
                }else {
                    year = this.nextYear();
                }
                if(oldYear != year) {
                    this.getPage('month', year);
                }
            } else if (pageType === 'day') {
                var month = this.chooseDay;
                var oldMonth = parseInt(oldDate.split('-')[1]);
                if($(e.currentTarget).hasClass('left-arrow')) {
                    month = this.prevMonth();
                }else {
                    month = this.nextMonth();
                }
                if(oldMonth != month) {
                    this.getPage('day', month);
                }
            } else if (pageType === 'year') {
                this.getPage('year');
            }
            e.stopPropagation();
        },

        clickDateAndGraphBtn : function(e) {
            var target = e.currentTarget;
            $('.dg-active').attr('class','dg-btn dg-default');
            $(target).attr('class','dg-btn dg-active');

            var pageTypeFlag = $(target).attr('id');
            if(pageTypeFlag === 'data'){
                $('.main-container > ul').removeClass('custom-hide');
                $('.main-container > table').addClass('custom-hide');
            }else{
                $('.main-container > ul').addClass('custom-hide');
                $('.main-container > table').removeClass('custom-hide');
            }
            e.stopPropagation();
        },

    };

    $.fn.daterCreateNew = function(option){
        var dater = null;
        var element = this;
        return function() {
            if(element && element.length>0) {
                if(!dater) {
                    dater = new DaterBlink(option, element);
                }
            }
            return dater;
        }
    };

    return DaterBlink;

}));