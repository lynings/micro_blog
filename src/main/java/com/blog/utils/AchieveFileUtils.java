package com.blog.utils;

import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.Set;

@Component
public class AchieveFileUtils {
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(XmlParseUtils.class);

    /**
     * 获取某包下所有类的实例
     * @param packagePath 包名
     * @return class集合
     */
    public static Set<Class<?>> getClasses(String packagePath){
        Set<Class<?>> classes = new LinkedHashSet<Class<?>>();
        String packageClassPath = packagePath.replace(".", "/")+"/**/*.class" ;
        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        try {
            Resource[] resources = resolver.getResources("classpath*:"+packageClassPath);
            for(int i = 0;i < resources.length;i ++){
                Resource resource = resources[i];
                String completeFilePath = resource.getFile().getPath().replace(File.separator, "/");
                logger.info("completeFilePath:"+completeFilePath);
                String className =  completeFilePath.substring(completeFilePath.lastIndexOf(packagePath.replace(".", "/")), completeFilePath.length()-6);
                try {
                    classes.add(Class.forName(className.replace("/", ".")));
                } catch (ClassNotFoundException e) {
                    logger.error("没有加载到此类");
                    logger.error(e.getMessage(), e.getCause());
                }
                logger.info("className:"+className);
            }
        } catch (IOException e) {
            logger.error(e.getMessage(), e.getCause());
        }
        return classes;
    }
}
