/**
 * Created by lyning on 16-2-29.
 */
"use strict";
!function ($) {

    var DaterBlink = function(options, element, dataList) {

        this.setOptions(options, dataList);

        this.template = '<div class="date-container">'+
                            '<div class="date-btn date-default" id="day">'+this.dateOption['day']+'</div>'+
                            '<div class="date-btn date-default" id="month">'+this.dateOption['month']+'</div>'+
                            '<div class="date-btn date-active" id="year">'+this.dateOption['year']+'</div>'+
                        '</div>'+
                        '<div class="main" id="yearPage">'+
                            '<div class="weight">单位: 吨</div>'+
                            '<div class="main-container"></div>'+
                        '</div>'+
                        '<div class="main" id="monthPage" style="display: none;">' +
                            '<div class="weight">单位: 吨</div>' +
                            '<div class="date-btn-container"></div>' +
                            '<div class="main-container"></div>' +
                        '</div>'+
                        '<div class="main" id="dayPage" style="display: none;">' +
                            '<div class="weight">单位: 桶</div>' +
                            '<div class="date-btn-container"></div>' +
                        '</div>'+
                        '<div class="global-bottom-bar">'+
                            '<div class="data-graph-box">'+
                                '<div class="dg-btn dg-active" id="data" data-mapping="year">数据</div>'+
                                '<div class="dg-btn dg-default" id="graph" data-mapping="year">图形</div>'+
                            '</div>'+
                        '</div>';

        element.append($(this.template));
        element.css('text-align','center').css('margin-bottom','90px');

        this.createDaterView();

        this.getYearPage();

        this.getMonthPage(null);

        this.getDayPage(null);

        element.on('click', '.date-box', $.proxy(this.clickDateBox, this));

        element.on('click', '.date-default',  $.proxy(this.clickDateBtn, this));

        element.on('click', '.dg-default',  $.proxy(this.clickDateAndGraphBtn, this));

        element.on('click', '.left-arrow, .right-arrow', $.proxy(this.clickArrow, this));

    };

    DaterBlink.prototype = {

        constructor: DaterBlink,

        setOptions : function(options, customData) {

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
            this.customData = customData;
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

        createDaterView : function() {
            var template = '<ul>'+
                                '\r<li><img src="../images/wechat/left-jiantou.png" class="btn left-arrow"/></li>'+
                                '\r<li><div class="dater">2016</div></li>'+
                                '\r<li><img src="../images/wechat/right-jiantou.png" class="btn right-arrow"/></li>'+
                            '</ul>';
            $('.date-btn-container').append(template);
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
            var width = $('.main-container').width();
            var max = this.getMax(type);
            width = width > max ? width : max;
            var id = $('.dg-active').attr('id');
            var dataClass = '';
            var graphClass = '';
            if(id === 'graph') { // 判断显示的是数据还是图形
                dataClass = 'custom-hide';
            }else {
                graphClass = 'custom-hide';
            }
            var templateData = '<ul class='+dataClass+'>';
            var templateGraph = '<table class='+graphClass+'>';
            var count = 0;
            for(var key in dataArr){
                if(dataArr.hasOwnProperty(key)) {
                    var info = key;
                    var plan = 0;
                    var real = 0;
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
                    var planGraphWidth = plan>0 ? plan * plan/width : 0;
                    var realGraphWidth = real>0 ? real * real/width : 0;
                    templateData += '\r<li class="date-box" data-param='+info+' data-type='+type+'>' +
                                        '<div class="info-date">'+info+'</div>' +
                                        '<div class="info-data">'+plan+' | '+real+'</div>' +
                                    '</li>';

                    templateGraph += '\r<tr class="date-box" data-param='+info+' data-type='+type+'>' +
                                        '<td class="text">'+info+'</td>' +
                                        '<td>' +
                                            '<div style="width: '+planGraphWidth+'px" class="top-graph graph-info"></div>' +
                                            '<div style="width: '+realGraphWidth+'px" class="below-graph graph-info"></div>' +
                                        '</td>' +
                                    '</tr>';
                    count ++;
                }
            }
            while(count % 4 != 0){  // 补齐
                templateData += '\r<li class="date-box"></li>';
                count ++;
            }
            templateGraph += '</table>';
            templateData += '</ul>';
            var html = templateData + templateGraph;
            return html;
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
            var width = $('.main-container').width();
            var max = this.getMax(type);
            width = width > max ? width : max;
            for(var key in datas) {
                if(datas.hasOwnProperty(key)){
                    key = parseInt(key);
                    this.chooseMonth = key;
                    var firstOnDay = this.chooseDay(1);
                    var template = '<div class="main-outer-box">' +
                                    '<div class="month-text">'+key+' 月</div>' +
                                    '<div class="main-container">';
                    var id = $('.dg-active').attr('id');
                    var dataClass = '';
                    var graphClass = '';
                    if(id && id === 'graph') {
                        dataClass = 'custom-hide';
                    }else {
                        graphClass = 'custom-hide';
                    }
                    var templateData = '<ul class='+dataClass+'>';
                    var templateGraph = '<table class='+graphClass+'>';
                    template += templateData;
                    var head = ''; // 组装日期表头
                    for(var k in this.onDay) {
                        if(this.onDay.hasOwnProperty(k)) {
                            head += '\r<li class="day-head">' +
                                        '<div class="on-date">'+this.onDay[k]+'</div>' +
                                    '</li>';
                        }
                    }
                    var dayData = ''; // 天数数据
                    var dayGraph = ''; // 天数图形
                    if(firstOnDay!=0){ // 如果当前月的第一天不是星期天就拿到上个月的数据补齐
                        var endDay = this.subtractMonth(1).endDay();
                        for(var j=firstOnDay; j>0; j--){
                            var day = (endDay - j+1);
                            var monthStr = this.chooseMonth<9 ? '0'+this.chooseMonth : this.chooseMonth;
                            var dayStr = day<9 ? '0'+day : day;
                            selector = this.chooseYear+'-'+monthStr+'-'+dayStr;
                            var garbage = this.getCustomData(type, selector);
                            plan = garbage.plan;
                            real = garbage.real;
                            dayData += '\r<li class="day-box day-box-other">' +
                                            '<div class="info-date">'+day+'</div>' +
                                            '<div class="info-data">'+plan+' | '+real+'</div>' +
                                        '</li>';
                            count ++;
                        }
                        this.addMonth(1);
                    }
                    for(var i=0; i<datas[key]; i++) {  // 本月
                        var day = (i+1);
                        var monthStr = this.chooseMonth<9 ? '0'+this.chooseMonth : this.chooseMonth;
                        var dayStr = day<9 ? '0'+day : day;
                        selector = this.chooseYear+'-'+monthStr+'-'+dayStr;
                        var garbage = this.getCustomData(type, selector);
                        plan = garbage.plan;
                        real = garbage.real;
                        var planGraphWidth = plan>0 ? plan * plan/width : 0;
                        var realGraphWidth = real>0 ? real * real/width : 0;
                        if((real - plan)/plan>1.3 || (real - plan)/plan<0.3){
                            dayData += '\r<li class="day-box day-box-warming">' +
                                            '<div class="info-date info-date-warming">'+(i+1)+'</div>' +
                                            '<div class="info-data info-data-warming">'+plan+' | '+real+'</div>' +
                                        '</li>';
                        }else {
                            dayData += '\r<li class="day-box">' +
                                            '<div class="info-date">'+(i+1)+'</div>' +
                                            '<div class="info-data">'+plan+' | '+real+'</div>' +
                                        '</li>';
                        }
                        dayGraph += '\r<tr><td class="text">'+(i+1)+'</td>' +
                                        '<td>' +
                                            '<div style="width: '+planGraphWidth+'px" class="top-graph graph-info"></div>' +
                                            '<div style="width: '+realGraphWidth+'px" class="below-graph graph-info"></div>' +
                                        '</td>' +
                                    '</tr>';
                        count ++;
                    }
                    if(count%7!=0){  // 拿到下个月的天数补齐尾部
                        if(this.chooseMonth == this.currentMonth && this.chooseYear == this.currentYear) {
                            while(count % 7 !=0){
                                dayData += '\r<li class="day-box day-box-other"></li>';
                                count++;
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
                                dayData += '\r<li class="day-box day-box-other">' +
                                                '<div class="info-date">'+ j +'</div>' +
                                                '<div class="info-data">'+plan+' | '+real+'</div>' +
                                            '</li>';
                            }
                            this.subtractMonth(1);
                        }
                    }
                    template += head;
                    template += dayData + '</ul>';
                    template += templateGraph + dayGraph + '</table>';
                    template += '</div></div>';
                    html += template;
                }
            }
            return html;
        },

        getYearPage : function (){
            var years = this.generateYear();
            var template = this.generatePage(years, 'year');
            document.getElementById('yearPage').lastElementChild.innerHTML = template;
        },

        getMonthPage : function (year){
            if(year){
                this.chooseYear = year;
            }
            var monthList = this.dateArr[this.chooseYear];
            var template = this.generatePage(monthList, 'month');
            $('.dater').html(this.chooseYear);
            document.getElementById('monthPage').lastElementChild.innerHTML = template;
        },

        getDayPage : function (month){
            var monthList = this.dateArr[this.chooseYear];
            var template = this.generatePage(monthList, 'day');
            if(month){
                this.chooseMonth = month;
            }
            var domObj = document.getElementById('dayPage');
            $('.main-outer-box').remove();
            domObj.innerHTML = (domObj.innerHTML + template);
        },

        getCustomData : function(type, selector){
            var result = this.customData[type];
            if(selector){
                var plan = result[selector] ? result[selector][0] : 0;
                var real = result[selector] ? result[selector][1] : 0;
                plan = (plan<1 && plan>0) ? Number(plan).toFixed(1): parseInt(plan);
                real = (real<1 && real>0) ? Number(real).toFixed(1): parseInt(real);
                result = {'plan' : plan, 'real' : real};
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
            var type = target.attr('data-type');
            var data = target.attr('data-param');
            var id = '';
            if(type === 'year') {
                id = 'month';
                var year = parseInt(data);
                this.getMonthPage(year);
            }
            if(type === 'month') {
                id = 'day';
                var month = parseInt(data);
                this.getDayPage(month);
            }
            $('.date-active').attr('class','date-btn date-default');
            $('.main').css('display', 'none');
            $('#'+id).attr('class','date-btn date-active');
            $('#'+id+'Page').css('display', 'block');
            if(type === 'month') {
                var top = $('.month-text')[month-1].offsetTop;
                $(document.body).scrollTop(top);
            }
            e.stopPropagation();
        },

        clickDateBtn : function(e) {
            $('.date-active').attr('class','date-btn date-default');
            $(e.currentTarget).attr('class','date-btn date-active');
            $('.main').css('display', 'none');

            var pageTypeFlag = $(e.currentTarget).attr('id');
            $('#'+pageTypeFlag+'Page').css('display', 'block');

            $('#data').attr('data-mapping', pageTypeFlag+'Data');
            $('#graph').attr('data-mapping', pageTypeFlag+'Graph');
            e.stopPropagation();
        },

        clickArrow : function(e) {
            var year = 2016;
            var oldYear = parseInt($('.dater').html());
            if($(e.currentTarget).hasClass('left-arrow')) {
                year = this.prevYear();
            }else {
                year = this.nextYear();
            }
            if(oldYear != year){
                $('.dater').html(year);
                this.getMonthPage(year);
                this.getDayPage(null);
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

    }

    Object.prototype.daterCreateNew = function(option, params){
        var dater = null;
        var element = this;
        return function() {
            if(element && element.length>0) {
                if(!dater) {
                    dater = new DaterBlink(option, element, params);
                }
            }
            return dater;
        }
    };

}(window.jQuery);