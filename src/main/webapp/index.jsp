<%--
  Created by IntelliJ IDEA.
  User: Blink
  Date: 3/24/2016 AD
  Time: 14:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>NIU NIU Study</title>
  <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/bootstrap.css"/>
  <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/lib/sweetalert/sweet-alert.css"/>
  <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/custom/index/index.css"/>
</head>
<body style="text-align: center;">

<header>
  <div id="indexTopBar">
    <div class="top-bar-container index-top-bg img">
      <div class="content">
        <div class="button-list">
          <div class="logo">
            <a href="#" >
              <img class="logo-tuniu" src="images/index-logo.png"/>
            </a>
          </div>
          <div class="login-register">
            <button type="button" class="btn btn-default" id="register">注册</button>
            <button type="button" class="btn btn-default" id="login">登录</button>
          </div>
        </div>
        <div class="topbar-content">
          <h2>查看当前状态</h2>
          <p>寻找关于你喜欢的内容的社区，对话和灵感。</p>
        </div>
      </div>
    </div>
    <div id="topNav">
      <ul>
        <li><a href="#">精选</a></li>
        <li><a href="#">精选</a></li>
        <li><a href="#">精选</a></li>
        <li><a href="#">精选</a></li>
        <li><a href="#">精选</a></li>
        <li><a href="#">精选</a></li>
        <li><a href="#">精选</a></li>
        <li><a href="#">精选</a></li>
      </ul>
    </div>
  </div>
</header>

<div id="loginBox" class="customBox modal fade myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span >&times;</span></button>
    <h4 class="modal-title">登录 NIU NIU</h4>
    <!--<h3 class="modal-title"> <span class="glyphicon glyphicon-remove"  style="color:#8899a6; float: right; margin: 0 10px;cursor: pointer;"></span></h3>-->
  </div>
  <div class="login-form">
    <div class="login">
      <a href="#" >
        <img class="logo-tuniu" src="images/iconfont-tuniu.png" style="width: 30px; height: 30px;"/>
      </a>
    </div>
    <form action="${pageContext.request.contextPath}/ctrl/user/login" method="post">
      <div class="input-group">
        <input type="text" name="username" class="form-control" placeholder="手机 邮箱 " aria-describedby="basic-addon1" autofocus required/>
      </div>
      <div class="input-group">
        <input type="password" name="password" class="form-control" placeholder="密码" aria-describedby="basic-addon1" required/>
      </div>
      <div class="input-group">
        <label><input type="checkbox" aria-label="...">  记住我</label>
        <span> . </span>
        <a href="#">忘记密码</a>
      </div>
      <button type="submit" class="customBtn btn btn-info btn-lg">登录</button>
    </form>
  </div>
  <div class="modal-header">
    <h4 class="modal-title" style="border-bottom: 0;border-top: 1px solid #e1e8ed;font-size: 14px;">还没有账号吗? <a href="#">注册</a> </h4>
  </div>
</div>

<div id="registerBox" class="customBox modal fade myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span >&times;</span></button>
    <h4 class="modal-title">注册 NIU NIU</h4>
  </div>
  <div class="login-form">
    <div class="login">
      <a href="#" >
        <img class="logo-tuniu" src="images/iconfont-tuniu.png" style="width: 30px; height: 30px;"/>
      </a>
    </div>
    <form action="${pageContext.request.contextPath}/ctrl/user/register" method="post">
      <div class="input-group">
        <input type="text" name="name" class="form-control" placeholder="全名" aria-describedby="basic-addon1" required/>
      </div>
      <div class="input-group">
        <input type="text" name="username" class="form-control" placeholder="手机 邮箱 " aria-describedby="basic-addon1" required/>
      </div>
      <div class="input-group">
        <input type="password" name="password" class="form-control" placeholder="密码" aria-describedby="basic-addon1" required/>
      </div>
      <div class="input-group">
        <label><input type="checkbox" aria-label="..." required>  基于我最近访问的网站来定制 Twitter</label>
        <span> . </span>
        <a href="#">了解更多</a>
      </div>
      <button type="submit" class="customBtn btn btn-info btn-lg">注册</button>
    </form>
  </div>
</div>


<script type="text/javascript" src="${pageContext.request.contextPath}/js/lib/jquery/jquery.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/lib/bootstrap/bootstrap.min.js"></script>

<script type="text/javascript">
  $(document).ready(function () {

    $('#login').click(function (e) {
      $('#loginBox').modal('show');
      e.stopPropagation();
      e.stopImmediatePropagation();
    });

    $('#register').click(function (e) {
      $('#registerBox').modal('show');
      e.stopPropagation();
      e.stopImmediatePropagation();
    })


  })

</script>
</body>
</html>
