package com.blog.utils.mybatis;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by virgilyan on 12/16/14.
 */
public class PagingResult<T> {
    //当前页
    private int currentPage;
    //总共记录条数
    private int totalSize;
    //总共页数
    private int totalPage;
    //结果集
    private List<T> resultList = new ArrayList<T>();

    public PagingResult(int currentPage, int totalSize, int totalPage) {

    }

    public PagingResult(int currentPage, Long totalSize, int totalPage, List<T> resultList) {
        this.currentPage = currentPage;
        this.totalSize = totalSize.intValue();
        this.totalPage = totalPage;
        this.resultList = resultList;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getTotalSize() {
        return totalSize;
    }

    public void setTotalSize(int totalSize) {
        this.totalSize = totalSize;
    }

    public List<T> getResultList() {
        return resultList;
    }

    public void setResultList(List<T> resultList) {
        this.resultList = resultList;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }
}
