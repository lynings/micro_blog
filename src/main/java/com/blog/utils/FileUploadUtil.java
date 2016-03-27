package com.blog.utils;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.UUID;

/**
 * Created by Blink on 3/25/2016 AD.
 */
public class FileUploadUtil {

    /**
     * 图片上传
     * @param request
     * @return
     * @throws IOException
     */
    public static String uploadImages(HttpServletRequest request) throws IOException {

        //将当前上下文初始化给  CommonsMutipartResolver （多部分解析器）
        CommonsMultipartResolver multipartResolver=new CommonsMultipartResolver(request.getSession().getServletContext());
        String images = "";
        //检查form中是否有enctype="multipart/form-data"
        if(multipartResolver.isMultipart(request)) {

            MultipartHttpServletRequest multiRequest=(MultipartHttpServletRequest)request;  //将request变成多部分request
            Iterator iter = multiRequest.getFileNames();    //获取multiRequest 中所有的文件名
            String pathRoot = request.getSession().getServletContext().getRealPath("/") + "/"; //获得物理路径webapp所在路径
            String path = "";
            while(iter.hasNext()) {
                MultipartFile file = multiRequest.getFile(iter.next().toString());  //一次遍历所有文件
                if(!file.isEmpty()){
                    //生成uuid作为文件名称
                    String uuid = UUID.randomUUID().toString().replaceAll("-","");
                    //获得文件类型（可以判断如果不是图片，禁止上传）
                    String contentType=file.getContentType();
                    //获得文件后缀名称
                    String imageName = contentType.substring(contentType.indexOf("/")+1);
                    path="upload/images/"+uuid+"."+imageName;

                    File newFile = new File(pathRoot+path);
                    if(!newFile.exists()) {
                        newFile.mkdirs();
                    }
                    file.transferTo(newFile);
                    images += path;
                }
            }
        }
        return images;
    }
}
