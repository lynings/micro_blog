package com.blog.model;

import java.util.Date;

/**
 * 用户表实体
 * Created by Blink on 3/22/2016 AD.
 */
public class UserInfo implements java.io.Serializable {

    private Long id;
    private Date birth;         // 生日
    private Integer sex;        // 性别 (0:无选择; 1:男; 2:女)
    private String name;        // 名字
    private String image;       // 照片
    private Date createDate;    // 创建日期
    private String username;    // 用户名
    private String password;    // 密码
    private Integer status;     // 状态 (0:删除; 1:正常; 2:黑名单)

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}