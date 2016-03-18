package com.blog.model;

import java.util.Date;

public class PersonalBase implements java.io.Serializable {

    private Long id;
    private String name;
    private Integer sex;
    private Date birth;
    private Date create_date;
    private String employee_no;
    private int corp_id;
    private String password;
    private String token;

    public static final int DELETE = 0;
    public static final int NORMAL = 1;
    public static final int LOCKED = 2;
    public static final int FIRE = 3;

    //人员状态（0、删除；1、正常；2、被锁；3、解雇）
    private Integer status;

    public int getCorp_id() {
        return corp_id;
    }

    public void setCorp_id(int corp_id) {
        this.corp_id = corp_id;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSex() {
        return this.sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public Date getBirth() {
        return this.birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public Date getCreate_date() {
        return this.create_date;
    }

    public void setCreate_date(Date create_date) {
        this.create_date = create_date;
    }

    public String getEmployee_no() {
        return this.employee_no;
    }

    public void setEmployee_no(String employee_no) {
        this.employee_no = employee_no;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}