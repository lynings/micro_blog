package com.blog.model;

import java.util.List;

/**
 * 用户相关
 * Created by Blink on 3/22/2016 AD.
 */
public class UserRelation implements java.io.Serializable {

    private Long id;
    private Long uid;               // 用户表Id
    private Integer type;           // 类型(1:粉丝; 2:关注)
    private Long worship_id;      // 崇拜者ID

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUid() {
        return uid;
    }

    public void setUid(Long uid) {
        this.uid = uid;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Long getWorship_id() {
        return worship_id;
    }

    public void setWorship_id(Long worship_id) {
        this.worship_id = worship_id;
    }
}
