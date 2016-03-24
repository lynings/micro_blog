package com.blog.utils;

import com.blog.model.UserInfo;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Component;

@Component("passwordHelper")
public class PasswordHelper {

    public static final String algorithmName = "md5";
    public static final int hashIterations = 2;

    public static void encryptPassword(UserInfo user) {
        String newPassword = new SimpleHash(algorithmName, user.getPassword(), ByteSource.Util.bytes(user.getUsername()), hashIterations).toHex();
        user.setPassword(newPassword);
    }

    public static String getEncryptPassword(String username, String password) {
        if(null==username||"".equals(username)||null==password||"".equals(password)){
            return null;
        }
        String newPassword = new SimpleHash(algorithmName, password, ByteSource.Util.bytes(username), hashIterations).toHex();
        return newPassword;
    }
}
