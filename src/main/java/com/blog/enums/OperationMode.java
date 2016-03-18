package com.blog.enums;

public enum OperationMode {
    MODE_1(1),//Manual
    MODE_2(2),//Semi-Auto
    MODE_3(3),//Auto-Entrust
    MODE_4(4);//Auto-Approve

    public int msg;

    OperationMode(int msg) {
        this.msg = msg;
    }

}
