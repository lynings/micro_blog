package com.blog.utils;

import com.blog.model.PersonalBase;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Component;

@Component("passwordHelper")
public class PasswordHelper {

    public static final String algorithmName = "md5";
    public static final int hashIterations = 2;

    public void encryptPassword(PersonalBase user) {
        String newPassword = new SimpleHash(algorithmName, user.getPassword(), ByteSource.Util.bytes(user.getEmployee_no()), hashIterations).toHex();
        user.setPassword(newPassword);
    }

    public String getEncryptPassword(String employee_no,String password) {
        if(null==employee_no||"".equals(employee_no)||null==password||"".equals(password)){
            return null;
        }
        String newPassword = new SimpleHash(algorithmName, password, ByteSource.Util.bytes(employee_no), hashIterations).toHex();
        return newPassword;
    }
}
