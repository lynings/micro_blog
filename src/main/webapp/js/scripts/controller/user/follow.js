/**
 * Created by Blink on 3/23/2016 AD.
 */
define(['app', 'service/home/homeOperation', 'service/user/follow'], function (app) {
    'use strict';
    app.controller('FollowCtrl', FollowCtrl);
});

function FollowCtrl($scope, HomeOperationService, FollowService, $, swal, data_host) {


    $scope.object = {};
    $scope.user = {};

    var homeService = HomeOperationService();

    var followService = FollowService();


    var refreshPage = function () {

        var id = $('#name').attr('data-param') || '';

        homeService.getUserDetailInfo(id).success(function (data) {

            if(checkNull([data])) {
                if(data.code == 200) {
                    var userInfos = data.userInfos;
                    showDetailInfo(userInfos);
                }else {
                    sendIndexPage('/index.jsp')
                }
            }
        });

        homeService.getRecommend(id).success(function (data) {

            if(checkNull([data])) {
                if(data.code == 200) {
                    var recommends = data.recommends;
                    showRecommendBox(recommends);
                }else {
                    sendIndexPage('/index.jsp');
                }
            }
        });
    };



    $('#mainContainer').on('mouseover', 'button.btn-default', function (e) {
        if(e.type === 'mouseover') {
            var current = $(e.currentTarget);
            var lastChild = $(e.currentTarget.parentElement.lastElementChild);
            current.attr('class', current.attr('class')+' hidden');
            lastChild.removeClass('hidden');
        }
        stopEventBubble(e);
    });


    $('#mainContainer').on('mouseleave click', 'button.btn-danger', function (e) {
        if(e.type === 'mouseleave') {
            var current = $(e.currentTarget);
            var firstChild = $(e.currentTarget.parentElement.firstElementChild);
            current.attr('class', current.attr('class')+' hidden');
            firstChild.removeClass('hidden');
        }
        if(e.type === 'click') {
            var current = $(e.currentTarget);
            var followId = current.attr('data-param');
            removeFollow(followId);
        }
        stopEventBubble(e);
    });

    $('#currentFollow').on('click', function (e) {
        var type = 2;
        getFollow(type);
    });

    $('#currentFans').on('click', function (e) {
        var type = 1;
        getFollow(type);
    });

    var getFollow = function (type) {
        var uid = $('#name').attr('data-param');
        followService.getFollow(uid, type).success(function (data) {

            if(checkNull([data])) {
                if(data.code == 200) {
                    var worshipMessages = data.result;
                    showFollow(worshipMessages, type);
                }else {
                    sendIndexPage('/index.jsp')
                }
            }
        });
    }

    /**
     * 删除关注者
     * @param id
     */
    var removeFollow = function (id) {

        followService.removeFollow(id).success(function (data) {
           if(data.code == 200) {
               refreshPage();
               var type = 2;
               getFollow(type);
           }else if(data.code == 401) {
               swal(data.message);
           }else {
               sendIndexPage('/index.jsp');
           }
        });
    }

    refreshPage();

    $('#logout').click(function () {
        sendIndexPage("/ctrl/user/logout");
    })

    $('#main').on('click','.forward', function (e) {
        var a = $(e.currentTarget);
        var mid = a.attr('data-param');
        var type = 1;
        like(type, mid);
        stopEventBubble(e);
    });

    $('#take-photo').on('click', '#commitUpload', function (e) {

        var image = $('#uploadPhoto').val();
        if(image && image !== null && typeof image !== 'undefined') {
            $('#uploadForm').submit();
        }else {
            swal("您还没选好图片呢");
        }
    });

    var showDetailInfo = function (dataList) {
        for(var i=0; i<dataList.length; i++){
            var data = dataList[i];
            if(data.hasOwnProperty('type')) {
                if(data.type == 1) {
                    $scope.user.fans = data.quantity;
                }
                if(data.type == 2) {
                    $scope.user.follow = data.quantity;
                }
            }
            if(i == 0) {
                $scope.user.name = data.name;
                $scope.user.username = data.username;
                $scope.user.tw = data.tw;
                $('#name').html(data.name);
                $('#name').attr('data-param',data.id);
            }
        }
    }

    var showRecommendBox = function (dataList) {
        var html = '';
        for(var i=0; i<dataList.length; i++){
            var data = dataList[i];
            html += '\r<li id="'+data.username+'">' +
                            '\r<div class="attention-info">' +
                                '\r<div class="attention-photo">' +
                                    '\r <a href="#">' +
                                    '\r <img class="attention-img" src="'+('image' in data && data.image ? data.image : 'images/krioBcV7_bigger.jpg')+'"/>' +
                                    '\r </a>' +
                            '\r </div>' +
                            '\r <div class="attention-content">' +
                                '\r <div class="attention-inner">' +
                                    '\r <a href="#">' +
                                    '\r <span class="attention-name" class="attention-msg">'+data.name+'</span>' +
                                    '\r </a>' +
                                    '\r <span class="attention-msg">@'+data.username+'</span>' +
                                '\r</div>' +
                                '\r<div class="attention-inner">' +
                                    '\r <button type="button" class="attention-btn blue" data-param="'+data.id+'" data-model="'+data.username+'" >关注</button>' +
                                    '\r <span class="attention-msg" style="margin-left: 5px">推荐</span>' +
                                '\r </div>' +
                            '\r </div>' +
                                '\r <div style="float: right; cursor: pointer" class="attention-msg">x</div>' +
                            '\r </div>' +
                    '\r </li>';
        }
        $('#followRelative').html(html);

    }

    var showFollow = function (dataList, type) {

        var template = "";
        for(var i=0; i<dataList.length; i++) {
            var data = dataList[i];
            var temp = '';
            if(type == 2) {
                temp = '\r<button type="button" class="btn btn-default" role="button">正在关注</button>' +
                    '\r<button type="button" class="btn btn-danger hidden" role="button" data-param="'+data.rid+'">取消关注</button>';
            }else {
                if(data.flag == 1) {
                    temp = '\r<button type="button" class="btn btn-default" role="button">正在关注</button>' +
                        '\r<button type="button" class="btn btn-danger hidden" role="button" data-param="'+data.rid+'">取消关注</button>';
                }else {
                    temp = '<button type="button" class="btn blue followFansBtn" role="button" data-param="'+data.id+'">关注</button>';
                }
            }

            template += '\r<div class="col-sm-5 col-md-4">' +
                            '\r<div class="thumbnail">' +
                                '\r<img src="'+(typeof data.image === 'undefined' ? 'images/SMmZLt2Y_bigger.jpeg' : data.image)+'" alt="">' +
                            '\r<div class="caption">' +
                                '\r<h3>'+data.name+'</h3>' +
                                '\r<p>@'+data.username+'</p>' +
                                '\r<p class="follow-btn">' + temp +
                                '\r</p>' +
                            '\r</div>' +
                            '\r</div>' +
                        '\r</div>';

        }
        $('#mainContainer').html(template);
    }

    var sendIndexPage = function(uri){
        window.location.href = data_host + uri;
    }

    var stopEventBubble  = function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    }

    $('#followRelative').on('click', '.attention-btn', function (e) {
        var button = $(e.currentTarget);
        var follow_id = button.attr('data-param');
        var type = 2;
        follow(type, follow_id);
        stopEventBubble(e);
    });

    $('#mainContainer').on('click', '.followFansBtn', function (e) {
        var button = $(e.currentTarget);
        var fans_id = button.attr('data-param');
        var type = 2;
        follow(type, fans_id);
        stopEventBubble(e);
    });

    var follow = function (type, vorship_id) {

        homeService.follow(type, vorship_id).success(function (data) {
            if(data.code == 200) {
                refreshPage();
                getFollow(type);
            }else {
                swal(data.message);
            }
        })
    };


    $('#global-action li').delegate('a', 'click', function (e) {

        var currentTarget = $(e.currentTarget.parentElement);
        var parentTarget = $(e.delegateTarget.parentElement);
        parentTarget.find('li.active').attr('class', '');
        currentTarget.addClass('active');
        stopEventBubble(e);
    });

    var checkNull = function (arr) {

        arr = arr || [];

        for(var i=0; i<arr.length; i++) {
            var val = arr[i];
            if(val === null || typeof val === 'undefined' || !val) {
                return false;
            }
        }
        return true;
    };

}
