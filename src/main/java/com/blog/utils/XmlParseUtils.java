package com.blog.utils;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.XStreamException;
import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.io.xml.XmlFriendlyNameCoder;
import com.thoughtworks.xstream.io.xml.XppDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.Set;

public class XmlParseUtils<T> {
    private static final Logger logger = LoggerFactory.getLogger(XmlParseUtils.class);
    private XStream xStream = null;

    /**
     * XStreamUtils 构造方法
     *
     * @param packagePath
     */
    public XmlParseUtils(String packagePath) {
        xStream = new XStream(new XppDriver(new XmlFriendlyNameCoder("_-", "_")));
        //设置reference模型
        //xStream.setMode(XStream.NO_REFERENCES);//不引用
        xStream.setMode(XStream.ID_REFERENCES);//id引用
        //启用Annotation
        xStream.autodetectAnnotations(true);
        this.initXStream(packagePath);
    }

    /**
     * 无参数构造
     * XStreamUtils 构造方法
     */
    public XmlParseUtils() {
        xStream = new XStream(new XppDriver(new XmlFriendlyNameCoder("_-", "_")));
        //设置reference模型
        //xStream.setMode(XStream.NO_REFERENCES);//不引用
        xStream.setMode(XStream.ID_REFERENCES);//id引用
        //启用Annotation
        xStream.autodetectAnnotations(true);
    }

    public XStream getxStream() {
        return xStream;
    }

    /**
     * 从文件读入XML
     *
     * @param inputSolutionFile
     * @return
     */
    public T xmlToObjectFromFile(String inputSolutionFile) {
        T result = null;
        try {
            File xmlFile = new File(getClass().getClassLoader().getResource("").getPath() + inputSolutionFile);
            //System.out.println(readFileContent(xmlFile));
            result = (T) xStream.fromXML(xmlFile);
        } catch (XStreamException x) {
            x.printStackTrace();
        }
        return result;
    }

    public String readFileContent(File file) {
        StringBuilder sb = new StringBuilder();
        try {
            FileReader fr = new FileReader(file);
            BufferedReader reader = new BufferedReader(fr);
            while (reader.readLine() != null) {
                sb.append(reader.readLine() + '\n');
            }
        } catch (FileNotFoundException e) {
            //当抛出多个异常时，子异常当在父异常前抛出。
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return sb.toString();
    }

    /**
     * 根据传入的包名，将包下所有标有XStreamAlias注解的类进行扫描
     *
     * @param packagePath 包名
     */
    public void initXStream(String packagePath) {
        xStream.autodetectAnnotations(true);
        Set<Class<?>> classes = AchieveFileUtils.getClasses(packagePath);
        for (Class clazz : classes) {
            Annotation annotation = clazz.getAnnotation(XStreamAlias.class);
            if (annotation != null) {
                xStream.processAnnotations(clazz);
            } else {
                for (Field field : clazz.getFields()) {
                    Annotation annotationFiled = field.getAnnotation(XStreamAlias.class);
                    if (annotationFiled != null) {
                        xStream.processAnnotations(clazz);
                        break;
                    }
                }
            }
        }
    }

    /**
     * 将包下的object转换成string xml形式,object的class已经初始化了。
     *
     * @param obj 要转换的对象
     * @return 字符串
     */
    public String toXml(T obj) {
        xStream.denyTypesByRegExp(new String[]{"previousStandstill", "previousStandstillId", "vehicleId"});
        return xStream.toXML(obj);
    }

    /**
     * 将某一对象转换成string xml形式
     *
     * @param obj 要转换的对象
     * @return 字符串的xml
     */
    public String toXmlSingle(T obj) {
        xStream.processAnnotations(obj.getClass());
        return xStream.toXML(obj);
    }

    /**
     * 将string的xml字符串转换成对象
     *
     * @param xml   要转换的string
     * @param clazz 要转换成相应的clazz对象
     * @return 转换后的对象
     */
    public <T> T fromObjectSingle(String xml, Class<T> clazz) {
        xStream.processAnnotations(clazz);
        T object = (T) xStream.fromXML(xml);
        return object;
    }

    /**
     * 将包下string的xml转换成对象，对象的class已经初始化
     *
     * @param xml 要进行转换的string
     * @return 转换后的对象
     */
    public T fromObject(String xml) {
        return (T) xStream.fromXML(xml);
    }
}
