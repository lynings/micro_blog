package com.blog.shiro.realm;

import com.blog.model.UserInfo;
import com.blog.service.UserInfoService;
import com.blog.utils.PasswordHelper;
import com.blog.utils.UUIDUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.realm.AuthenticatingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;

import javax.annotation.Resource;

/**
 * Created by talenttan on 24/2/16.
 */
public class UserAuthenticateRealm extends AuthenticatingRealm {
    @Resource
    private UserInfoService userInfoService;
    @Resource
    private UUIDUtils uuidUtils;
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String username = (String)token.getPrincipal();
        char[] pChar = (char[])token.getCredentials();
        String password = new String(pChar);
        String ecodePassword = PasswordHelper.getEncryptPassword(username, password);
        UserInfo user = userInfoService.login(username, ecodePassword);
        user = new UserInfo();
        user.setUsername(username);
        user.setPassword(ecodePassword);
        if (null == user) {
            throw new UnknownAccountException();//没找到帐号
        }

        this.setSession(username, user);
        this.setSession("username",user.getUsername());
        AuthenticationInfo authcInfo = new SimpleAuthenticationInfo(
                username,
                ecodePassword,
                // salt=employee_no + token
                ByteSource.Util.bytes(username + uuidUtils.getUUID().replaceAll("-", "")),
                getName()
        );

        return authcInfo;
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
