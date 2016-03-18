package com.blog.utils;

import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

@Component("uuidUtils")
public class UUIDUtils {

    public String getUUID() {
        String uuid = UUID.randomUUID().toString();
        return uuid.replace("0", "");
    }

    /**
     * 获取唯一的packageNo
     * */
    public String getPackageNo(String companyShortCode, String fixNo){
        if(null==companyShortCode||"".equals(companyShortCode)){
            companyShortCode = "LT";
        }else{
            if(companyShortCode.length()>2){
                //如果长度大于2，那么就去掉第二位后的字符串
                companyShortCode = companyShortCode.substring(0,2);
            }
        }
        String dateTimeString = null;
        try {
            dateTimeString = DateUtils.getParttenDate(new Date(),"yyMMddHHmmss");
        } catch (ParseException e) {
            System.out.println("时间格式化出错");
            //e.printStackTrace();
            dateTimeString = "";
        }
        return companyShortCode + fixNo + dateTimeString;
    }

    public String getOrderNo(String companyShortCode, String type){
        if(null==companyShortCode||"".equals(companyShortCode)){
            companyShortCode = "LT";
        }else{
            if(companyShortCode.length()>2){
                //如果长度大于2，那么就去掉第二位后的字符串
                companyShortCode = companyShortCode.substring(0,2);
            }
        }
        String dateTimeString = null;
        try {
            dateTimeString = DateUtils.getParttenDate(new Date(),"yyMMddHHmmss");
        } catch (ParseException e) {
            System.out.println("时间格式化出错");
            //e.printStackTrace();
            dateTimeString = "";
        }
        return companyShortCode + type + this.genRandomNum() + dateTimeString;
    }


    public  String genRandomNum(){
        int  maxNum = 36;
        int i;
        int count = 0;
        char[] str = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
                'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
                'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
        StringBuffer pwd = new StringBuffer("");
        Random r = new Random();
        while(count < 6){
            i = Math.abs(r.nextInt(maxNum));
            if (i >= 0 && i < str.length) {
                pwd.append(str[i]);
                count ++;
            }
        }
        return pwd.toString();
    }

}
