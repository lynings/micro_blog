/**
 * Created by Blink on 3/23/2016 AD.
 */
define(['app', 'service/home/homeOperation'], function (app) {
    'use strict';
    app.controller('HomeOperationCtrl', HomeOperationCtrl);
});

function HomeOperationCtrl($scope, HomeOperationService, $, swal, data_host) {


    $scope.object = {};
    $scope.user = {};

    var homeService = HomeOperationService();


    var refreshHome = function () {

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

        homeService.getUserMessage(id).success(function (data) {

            if(checkNull([data])) {
                if(data.code == 200) {
                    var userMessages = data.userMessages;
                    showMessageBox(userMessages);
                }else {
                    sendIndexPage('/index.jsp')
                }
            }
        });
    }

    refreshHome();

    $('#logout').click(function () {
        sendIndexPage("/ctrl/user/logout");
    });

    $('.bottom-right').on('click', '.attention-btn', function (e) {
        var button = $(e.currentTarget);
        var vorship_id = button.attr('data-param');
        var elementId = button.attr("data-model");
        var type = 2;
        follow(type, vorship_id, elementId);
        stopEventBubble(e);
    });

    $('#main').on('click','.like', function (e) {
        var a = $(e.currentTarget);
        var mid = a.attr('data-param');
        var type = 2;
        like(type, mid);
        stopEventBubble(e)
    });

    $('#main').on('click','.forward', function (e) {
        var a = $(e.currentTarget);
        var mid = a.attr('data-param');
        var type = 1;
        like(type, mid);
        stopEventBubble(e);
    });

    $('#exampleModal').on('click', '#review', function (e) {

        var mid = $('.modal-body input[name="mid"]').val();
        var notify_id = $('.modal-body input[name="notify_id"]').val();
        var content = $('#message-text').val();
        homeService.review(mid, notify_id, content).success(function (data) {
            if(data.code == 200) {
                refreshHome();
                $('.modal-header button').click();
                swal("推送成功");
            }else {
                swal(data.message);
                sendIndexPage("/home.html")

            }
        });

    });

    $('#take-photo').on('click', '#commitUpload', function (e) {

        var image = $('#uploadPhoto').val();
        if(image && image !== null && typeof image !== 'undefined') {
            $('#uploadForm').submit();
        }else {
            swal("您还没选好图片呢");
        }
    });


    var follow = function (type, vorship_id, elementId) {
        homeService.follow(type, vorship_id).success(function (data) {
            if(data.code == 200) {
                //$('#'+elementId).remove();
                //$scope.user.follow = ($scope.user.follow || 0) + 1;
                refreshHome();
            }else {
                swal(data.message);
            }
        })
    };

    var like = function (type, mid) {
        homeService.like(type, mid).success(function (data) {
            if(data.code == 200) {
                refreshHome();
            }else {
                swal(data.message);
            }
        })
    }

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
                $('#name').attr('data-param', data.id);
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
                                    '\r <img class="attention-img" src="images/krioBcV7_bigger.jpg"/>' +
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

    var showMessageBox = function (dataList) {

        var returnDataList = getMessage(dataList);
        var template = "";
        for(var i=0; i<returnDataList.length; i++) {
            var data = returnDataList[i];
            template += '\r<li>' +
                            '\r<div class="attention-info-box">' +
                                '\r<div class="attention-info-inner attention-info">' +
                                    '\r<div class="review-name '+(data.flag==='review'?'':'hidden')+'"><span class="icon icon--reply Icon--small def-color"></span><span class="attention-msg">回复给 <a href="javascript:void(0);">'+data.content.split(' ')[0]+'</span></a></div>' +
                                    '\r<div class="attention-photo">' +
                                        '\r<a href="#">' +
                                            '\r<img class="attention-img" src="'+(data.uimg !=='?' && typeof data.uimg  !=='undefined' ? data.uimg : 'images/krioBcV7_bigger.jpg')+'"/>' +
                                        '\r</a>' +
                                    '\r</div>' +
                                '\r<div class="attention-content">' +
                                    '\r<div class="attention-inner">' +
                                        '\r<a href="#">' +
                                            '\r<span class="attention-name" class="attention-msg">'+data.name+'</span>' +
                                            '\r<span class="attention-msg">@'+data.username+'</span>' +
                                        '\r</a>' +
                                        '\r<span class="attention-msg">   .'+data.createDate+'</span>' +
                                    '\r</div>' +
                                    '\r<div class="attention-push-msg attention-inner">' +
                                    '   \r<span>'+(data.flag === 'review' ? '<a href="javascript:void(0);">'+data.content.split(' ')[0]+'</a>  '+data.content.split(' ')[1]+'' : data.content)+'</span>' +
                                    '\r</div>' +
                                '\r</div>' +
                                '\r<span class="icon icon--translator msg" title="查看翻译"></span>' +
                                '\r<div class="attention-img-box">' +
                                    '\r<img class="'+(data.mimg && data.mimg !== '?' ? "attention-upload-img" : '')+'" src="'+(data.mimg && data.mimg !== '?' ? data.mimg : '')+'"/>' +
                                    '\r<div class="stream-item-footer myself-msg">' +
                                        '\r<ul class="myself-list">' +
                                            '\r<li>' +
                                                '\r<a href="javascript:void(0);">' +
                                                    '\r<span class="icon icon--reply def-color" data-toggle="modal" data-target="#exampleModal" data-mid="'+data.mid+'" data-uid="'+data.uid+'" data-whatever="@'+data.username+'" title="回复"></span>' +
                                                '\r</a>' +
                                            '\r</li>' +
                                            '\r<li>' +
                                                '\r<a class="forward" href="javascript:void(0);" data-param="'+data.mid+'">' +
                                                    '\r<span class="icon icon--retweet def-color" title="转发"></span>' +
                                                    '\r<span class="def-color counts">'+(data.forward ? data.forward : 0)+'</span>' +
                                                '\r</a>' +
                                            '\r</li>' +
                                                '\r<li>' +
                                                '\r<a href="javascript:void(0);" class="like" data-param="'+data.mid+'">' +
                                                    '\r<span class="icon icon--love def-color" title="喜欢">' +
                                                    '\r<span class="def-color counts" style="margin-left: 25px;">'+(data.like ? data.like : 0)+'</span>' +
                                                '\r</span>' +
                                                '\r</a>' +
                                            '\r</li>' +
                                            '\r<li>' +
                                                '\r<a href="javascript:void(0);">' +
                                                    '\r<span class="icon icon--dots def-color"></span>' +
                                                '\r</a>' +
                                            '\r</li>' +
                                        '\r</ul>' +
                                        '<a href="javascript:void(0);" class="look-all-msg'+(data.flag==='review'? '' : ' hidden')+'">查看对话</a>' +
                                    '\r</div>' +
                                '\r</div>' +
                                '\r</div>' +
                            '\r</div>' +
                        '\r</li>';

        }
        $('#messageContainer').html(template);
    }

    var getMessage = function (dataList) {
        var map = {}
        for(var i=0; i<dataList.length; i++) {
            var data = dataList[i];
            var key = data['mid']+data['createDate']+data['uid']+data['username'];
            if(!map[key]) {
                if('type' in data) {
                    var type = data.type;
                    if(type == 1) {
                        data.forward = data.quantity;
                        delete data.quantity;
                    }
                    if(type == 2) {
                        data.like = data.quantity;
                        delete data.quantity;
                    }
                }
                map[key] = data;
            }else {
                if('type' in data) {
                    var type = data.type;
                    if(type == 1) {
                        map[key].forward = data.quantity;
                    }
                    if(type == 2) {
                        map[key].like = data.quantity;
                    }
                }
            }
        }
        dataList = [];
        for(var key in map) {
            dataList.push(map[key]);
        }
        return dataList.sort(function(a, b) {return new Date(b.createDate).getTime() - new Date(a.createDate).getTime()});
    }

    var sendIndexPage = function(uri){
        window.location.href = data_host + uri;
    }

    $('#exampleModal').on('show.bs.modal', function (event) {

        var button = $(event.relatedTarget);        // Button that triggered the modal
        var recipient = button.data('whatever');    // Extract info from data-* attributes
        var mid = button.attr('data-mid');
        var notify_id = button.attr('data-uid');
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('.modal-title').text('推送给 ' + recipient);
        modal.find('#recipient-name').val(recipient);
        $('.modal-body input[name="mid"]').val(mid);
        $('.modal-body input[name="notify_id"]').val(notify_id);
    });

    $('#global-action li').delegate('a', 'click', function (e) {

        var currentTarget = $(e.currentTarget.parentElement);
        var parentTarget = $(e.delegateTarget.parentElement);
        parentTarget.find('li.active').attr('class', '');
        currentTarget.addClass('active');
        stopEventBubble(e);
    })

    var stopEventBubble  = function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    }


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
