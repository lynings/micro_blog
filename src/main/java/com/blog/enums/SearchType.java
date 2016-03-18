package com.blog.enums;

public enum SearchType {
    //查询所有数据不分页
    SEARCH_ALL_NO_PAGING(0),
    //查询全部并分页
    SEARCH_ALL_PAGING(1),
    //根据ID查询
    SEARCH_BY_ID(2),
    //根据关键字查询
    SEARCH_BY_KEYWORD(3);

    private int value = 0;

    private SearchType(int value) {
        this.value = value;
    }

    public static SearchType valueOf(int value) {
        switch (value) {
            case 0:
                return SEARCH_ALL_NO_PAGING;
            case 1:
                return SEARCH_ALL_PAGING;
            case 2:
                return SEARCH_BY_ID;
            case 3:
                return SEARCH_BY_KEYWORD;
            default:
                return null;
        }
    }

    public int value() {
        return this.value;
    }
}
