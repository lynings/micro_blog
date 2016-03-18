package com.blog.shiro.service;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

@Service(value = "authService")
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class ShiroAuthService {

    private static final String CRLF = "\r\n";

    /**
     * 返回URL配置路径
     *
     * @return String Url
     */
    public String loadFilterChainDefinitions() {
        StringBuffer sb = new StringBuffer();
        initAnonFilter(sb);
//        initPermissionUrl(sb);
        initLoginFilter(sb);
        initAuthcFiter(sb);
        initWechatFilter(sb);
        return sb.toString();
    }

    public void initPermissionUrl(StringBuffer stringBuffer) {
        
    }

    public void initAuthcFiter(StringBuffer stringBuffer) {
        stringBuffer.append("/logout = logout").append(CRLF);
        stringBuffer.append("/** = kickout,user").append(CRLF);
    }

    /**
     * 加入不过滤的url地址
     *
     * @param stringBuffer
     */
    public void initAnonFilter(StringBuffer stringBuffer) {
        stringBuffer.append("/unauthorized/** = anon").append(CRLF);
        stringBuffer.append("/js/** = anon").append(CRLF);
        stringBuffer.append("/css/** = anon").append(CRLF);
        stringBuffer.append("/images/** = anon").append(CRLF);
        stringBuffer.append("/upload/** = anon").append(CRLF);
    }

    /**
     * 微信请求链接
     * */
    public void initWechatFilter(StringBuffer stringBuffer){
        stringBuffer.append("/wechat/** = anon").append(CRLF);
    }

    /**
     * 加入登陆url地址
     *
     * @param stringBuffer
     */
    public void initLoginFilter(StringBuffer stringBuffer) {
        stringBuffer.append("/login = authc").append(CRLF);
    }

}
