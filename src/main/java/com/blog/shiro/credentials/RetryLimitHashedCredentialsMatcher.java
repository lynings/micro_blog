
package com.blog.shiro.credentials;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.Resource;
import java.util.concurrent.atomic.AtomicInteger;

public class RetryLimitHashedCredentialsMatcher extends HashedCredentialsMatcher {
    @Resource
    private PasswordEncoder passwordEncoder;
    private Cache<String, AtomicInteger> passwordRetryCache;

    public RetryLimitHashedCredentialsMatcher() {
    }

    public RetryLimitHashedCredentialsMatcher(CacheManager cacheManager) {
        passwordRetryCache = cacheManager.getCache("passwordRetryCache");
    }

    public void setPasswordRetryCache(Cache<String, AtomicInteger> passwordRetryCache) {
        this.passwordRetryCache = passwordRetryCache;
    }

    @Override
    public boolean doCredentialsMatch(AuthenticationToken authcToken, AuthenticationInfo info) {
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        String password = new String(token.getPassword());
        String ecodePassword = (String)info.getCredentials();
        String username = token.getUsername();
        //retry count + 1
        AtomicInteger retryCount = passwordRetryCache.get(username);
        if(retryCount == null) {
            retryCount = new AtomicInteger(0);
            passwordRetryCache.put(username, retryCount);
        }


        if(retryCount.incrementAndGet() > 50) {
            //if retry count > 50 throw
            throw new ExcessiveAttemptsException();
        }

        boolean matches = passwordEncoder.matches(DigestUtils.shaHex(password),ecodePassword);
        if(matches) {
            //clear retry count
            passwordRetryCache.remove(username);
        }
        return true;
    }
}

