package com.blog.shiro.realm;

import com.blog.utils.UUIDUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.realm.AuthenticatingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.Resource;

/**
 * Created by talenttan on 24/2/16.
 */
public class UserAuthenticateRealm extends AuthenticatingRealm {

    @Resource
    private PasswordEncoder passwordEncoder;
    @Resource
    private UUIDUtils uuidUtils;
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String account = (String)token.getPrincipal();
        char[] pChar = (char[])token.getCredentials();
        String password = new String(pChar);

        return null;
    }
    /**
     * 将一些数据放到ShiroSession中,以便于其它地方使用
     */
    private void setSession(Object key, Object value) {
        Subject currentUser = SecurityUtils.getSubject();
        if (null != currentUser) {
            Session session = currentUser.getSession();
            if (null != session) {
                session.setAttribute(key, value);
            }
        }
    }

}
