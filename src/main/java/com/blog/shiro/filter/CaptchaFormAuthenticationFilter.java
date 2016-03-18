package com.blog.shiro.filter;

import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zpf on 16/2/1.
 *
 * 继承shiro自带的form认证过滤器，重写登录成功后的跳转操作
 */
public class CaptchaFormAuthenticationFilter extends FormAuthenticationFilter {

    /**
     * 覆盖默认实现
     * @param token
     * @param subject
     * @param request
     * @param response
     * @return
     * @throws Exception
     * @see FormAuthenticationFilter#onLoginSuccess(AuthenticationToken, Subject, ServletRequest, ServletResponse)
     */
    @Override
    protected boolean onLoginSuccess(AuthenticationToken token, Subject subject,
                                     ServletRequest request, ServletResponse response) throws Exception {
        //issueSuccessRedirect(request, response);
        //we handled the success redirect directly, prevent the chain from continuing:
        HttpServletRequest httpServletRequest = (HttpServletRequest)request;
        HttpServletResponse httpServletResponse = (HttpServletResponse)response;

        httpServletRequest.getRequestDispatcher("/login").forward(httpServletRequest, httpServletResponse);

        return false;
    }
}
