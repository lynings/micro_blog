package com.blog.enums;

public enum ResultCode {
    // API操作状态提示语
    CODE_200(200, "Success"),
    CODE_401(401, "非法請求，參數錯誤"),
    CODE_402(402, "未授权，token过期或者无效"),
    CODE_403(403, "Method使用错误，请查看API"),
    CODE_404(404, "未找到访问地址"),
    CODE_405(405, "暂无数据"),
    CODE_406(406, "没有权限访问"),
    CODE_408(408, "没有当前进行的任务"),
    CODE_500(500, "系统内部错误"),
    // 任务状态提示语
    CODE_600(600, "添加失败"),
    CODE_601(601, "任务已完成"),
    CODE_602(602, "该桶已回收"),
    // 用户验证
    CODE_700(700, "賬號或密碼錯誤，請檢查後重新輸入"),
    CODE_701(701, "賬號狀態異常，請與管理員聯繫"),
    CODE_702(702, "賬號登錄超時，請重新登錄"),
    CODE_703(703, "服務器驗證超時，請稍後重新登錄"),
    CODE_704(704, "您已經被管理員強制退出，請重新登錄"),
    CODE_705(705, "退出系統成功"),
    CODE_706(706, "員工編號要保證唯一性"),
    CODE_707(707, "角色名称要保证唯一性"),
    CODE_708(708, "賬號登錄次数已超出，請30分钟後再重新登錄"),
    CODE_709(709, "您的賬號已在其他地方登錄"),
    // 用户注册
    CODE_710(710, "用户名已被注册"),
    CODE_711(711, "注册失败, 用户名或密码为空"),
    CODE_712(712, "注册失败, 请稍后再试"),
    // 绑定验证
    CODE_800(800, "RFID绑定成功"),
    CODE_801(801, "RFID绑定失败"),
    CODE_802(802, "该RFID已被绑定,请先解绑再进行此次绑定"),
    CODE_803(803, "人员绑定成功"),
    CODE_804(804, "人员绑定失败"),
    CODE_805(805, "该RFID暂无绑定实体"),
    // 删除
    CODE_901(901, "删除失败，已绑定角色"),
    CODE_902(902, "删除失败，没找到ID"),
    CODE_1010(1010, "定位错误"),
    CODE_1011(1011, "妈蛋没ID啊"),

    // 更新
    CODE_1001(1001, "更新失败，必须添加参数ID"),
    CODE_1002(1002, "设定更新版本号比旧版本要低，请重新设定"),
    CODE_1003(1003, "不存在該APM信息"),
    CODE_1004(1004, "ParcelNo is null"),
    CODE_1005(1005, "ParcelNo長度不足8位"),
    CODE_1006(1006, "The first 8 digits of the ParccelNo are repeated"),

    // 任务编辑与事件响应
    // 线下阶段客户操作
    CODE_8000(8000, OperationMode.MODE_1.msg + "模式" + "添加新客户成功"),
    CODE_8001(8001, OperationMode.MODE_1.msg + "模式" + "添加新客户失败"),
    CODE_8002(8002, OperationMode.MODE_1.msg + "模式" + "删除客户成功"),
    CODE_8003(8003, OperationMode.MODE_1.msg + "模式" + "删除客户失败"),
    // 线下阶段垃圾车操作
    CODE_8100(8100, OperationMode.MODE_1.msg + "模式" + "添加新垃圾车成功"),
    CODE_8101(8101, OperationMode.MODE_1.msg + "模式" + "添加新垃圾车失败"),
    CODE_8102(8102, OperationMode.MODE_1.msg + "模式" + "删除垃圾车成功"),
    CODE_8103(8103, OperationMode.MODE_1.msg + "模式" + "删除垃圾车失败"),
    CODE_8104(8104, OperationMode.MODE_1.msg + "模式" + "操作实体准备成功"),
    CODE_8105(8105, OperationMode.MODE_1.msg + "模式" + "操作实体准备失败"),
    CODE_8125(8125, OperationMode.MODE_2.msg + "模式" + "操作实体准备成功"),
    CODE_8126(8126, OperationMode.MODE_2.msg + "模式" + "操作实体准备失败"),
    // 线下阶段任务编辑
    CODE_8200(8200, OperationMode.MODE_1.msg + "模式" + "为垃圾车添加客户成功"),
    CODE_8201(8201, OperationMode.MODE_1.msg + "模式" + "为垃圾车添加客户失败"),
    CODE_8202(8202, OperationMode.MODE_1.msg + "模式" + "从垃圾车删除客户成功"),
    CODE_8203(8203, OperationMode.MODE_1.msg + "模式" + "从垃圾车删除客户失败"),
    CODE_8204(8204, OperationMode.MODE_1.msg + "模式" + "绑定客户成功"),
    CODE_8205(8205, OperationMode.MODE_1.msg + "模式" + "绑定客户失败"),
    CODE_8206(8206, OperationMode.MODE_1.msg + "模式" + "解绑客户成功"),
    CODE_8207(8207, OperationMode.MODE_1.msg + "模式" + "解绑客户失败"),
    CODE_8208(8208, OperationMode.MODE_1.msg + "模式" + "保存当前解决方案成功"),
    CODE_8209(8209, OperationMode.MODE_1.msg + "模式" + "保存当前解决方案失败"),
    CODE_8210(8210, OperationMode.MODE_1.msg + "模式" + "分派解决方案成功"),
    CODE_8211(8211, OperationMode.MODE_1.msg + "模式" + "分派解决方案失败"),
    CODE_8212(8212, OperationMode.MODE_1.msg + "模式" + "新建解决方案成功"),
    CODE_8213(8213, OperationMode.MODE_1.msg + "模式" + "新建解决方案失败"),
    CODE_8214(8214, OperationMode.MODE_1.msg + "模式" + "编辑解决方案成功"),
    CODE_8215(8215, OperationMode.MODE_1.msg + "模式" + "编辑解决方案失败"),

    CODE_8225(8225, OperationMode.MODE_2.msg + "模式" + "绑定客户成功"),
    CODE_8226(8226, OperationMode.MODE_2.msg + "模式" + "绑定客户失败"),
    CODE_8227(8227, OperationMode.MODE_2.msg + "模式" + "解绑客户成功"),
    CODE_8228(8228, OperationMode.MODE_2.msg + "模式" + "解绑客户失败"),
    CODE_8229(8229, OperationMode.MODE_2.msg + "模式" + "保存当期方案成功"),
    CODE_8230(8230, OperationMode.MODE_2.msg + "模式" + "保存当前方案失败"),
    CODE_8231(8231, OperationMode.MODE_2.msg + "模式" + "分派解决方案成功"),
    CODE_8232(8232, OperationMode.MODE_2.msg + "模式" + "分派解决方案失败"),
    // 线上阶段客户操作
    CODE_8300(8300, OperationMode.MODE_1.msg + "模式" + "记录已收运客户成功"),
    CODE_8301(8301, OperationMode.MODE_1.msg + "模式" + "记录已收运客户失败"),
    CODE_8302(8302, OperationMode.MODE_1.msg + "模式" + "取消记录已收运客户成功"),
    CODE_8303(8303, OperationMode.MODE_1.msg + "模式" + "取消记录已收运客户失败"),
    CODE_8304(8304, OperationMode.MODE_1.msg + "模式" + "挂起客户成功"),
    CODE_8305(8305, OperationMode.MODE_1.msg + "模式" + "挂起客户失败"),
    CODE_8306(8306, OperationMode.MODE_1.msg + "模式" + "恢复客户成功"),
    CODE_8307(8307, OperationMode.MODE_1.msg + "模式" + "恢复客户失败"),
    CODE_8308(8308, OperationMode.MODE_1.msg + "模式" + "编辑客户成功"),
    CODE_8309(8309, OperationMode.MODE_1.msg + "模式" + "编辑客户失败"),
    // 线上阶段异常处理
    CODE_8400(8400, OperationMode.MODE_1.msg + "模式" + "标记垃圾车异常成功"),
    CODE_8401(8401, OperationMode.MODE_1.msg + "模式" + "标记垃圾车异常失败"),
    CODE_8402(8402, OperationMode.MODE_1.msg + "模式" + "垃圾车异常恢复成功"),
    CODE_8403(8403, OperationMode.MODE_1.msg + "模式" + "垃圾车异常恢复失败"),
    CODE_8404(8404, OperationMode.MODE_1.msg + "模式" + "处理道路异常成功"),
    CODE_8405(8405, OperationMode.MODE_1.msg + "模式" + "处理道路异常失败"),
    CODE_8406(8406, OperationMode.MODE_1.msg + "模式" + "道路异常修复成功"),
    CODE_8407(8407, OperationMode.MODE_1.msg + "模式" + "道路异常修复失败"),
    // 线上阶段任务编辑
    CODE_8500(8500, OperationMode.MODE_1.msg + "模式" + "上传任务改动成功"),
    CODE_8501(8501, "操作不合法"),

    CODE_9000(9000, "无法找到匹配的模式"),
    CODE_9001(9001, "最后一个任务无法挂起"),
    CODE_9002(9002, "解绑收集点失败，请检查收集点绑定状态");

    public int code;
    public String msg;

    ResultCode(int code, String msg) {
        this.msg = msg;
        this.code = code;
    }
}
