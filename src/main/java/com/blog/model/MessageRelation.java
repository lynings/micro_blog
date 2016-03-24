package com.blog.model;

/**
 * 推文相关实体
 * Created by Blink on 3/23/2016 AD.
 */
public class MessageRelation implements java.io.Serializable {

    private Long id;
    private Long[] mid;       // 信息推送者Id
    private Long[] sid;       // 选择人ID
    private Integer type;   // 类型(1:转发; 2:喜欢)
    private Integer status; // 状态(0:已读; 1:未读)

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long[] getMid() {
        return mid;
    }

    public void setMid(Long[] mid) {
        this.mid = mid;
    }

    public Long[] getSid() {
        return sid;
    }

    public void setSid(Long[] sid) {
        this.sid = sid;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
