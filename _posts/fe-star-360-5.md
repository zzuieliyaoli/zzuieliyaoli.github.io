---
layout: post
title:  "2015年360前端星第5天"
date:   2015-6-6
categories: [360前端星]
---

第五天喽~~

## 移动端开发

《移动Web手册》译者之一的黄薇姐姐来讲，分享大部分内容与书中的知识相对应。

有以下几个重点：

1. CSS像素、设备像素
2. 移动端的布局视口、视觉视口、理想视口
3. 缩放
4. 媒体查询 Media Query
5. 触摸事件

## 高性能网站维护

这部分内容与前几天的课程有重叠，但是我觉得作为一个前端工程师，真真正正的需要对计算机网络有深入的认识。因为，网站性能的优化不仅仅是后端、服务器端的事，前端开发需要充分挖掘任何可以提升性能的地方。大到减少连接请求数目与体积，小到JS文件中一个字符，一段代码。所以，“雅虎页面优化军规”，只是一个最最基础的东西。

下面是简单的笔记，发现开始变懒了啊。其实是忙着组内项目，回到旅馆已经很晚了，身心俱疲。回到学校一定会认真整理。

### 减少请求体积

1. 压缩页面
2. 使用GZip传输
3. 模块化，按需加载
4. 合并请求 CSS、JS、图片
5. 并行下载

### 减少传输的距离

1. CDN
2. 缓存
3. Cache-Control/Expries/Last-Modified/Etag

### 伪优化

1. lazy load
2. 预加载

### CSS优化

1. 避免使用@import
2. IE下有选择的使用滤镜
3. 避免CSS表达式expression（）
4. 减少无用的代码
5. 优化选择器结构：从右到左




> http://www.zhihu.com/question/20185756



> http://www.cnblogs.com/zhaodongyu/p/3341080.html



> http://www.alloyteam.com/2012/10/high-performance-css/



> http://www.jianshu.com/p/268c7f3dd7a6



> http://stackoverflow.com/questions/8840580/force-dom-redraw-refresh-on-chrome-mac



> http://www.sitepoint.com/javascript-snippet-force-dom-element-redrawrepaint/



> http://www.planabc.net/2010/01/30/how_to_use_focus_and_blur_event_in_event_delegation/

### JavaScript优化

1. 写在页面最后
2. 不要循环中创建函数
3. 缓存成员对象
5. 善用短路
6. 避免使用eval
7. 避免使用for in
8. 便面使用delete
9. with
10. 循坏插入dom
11. 缓存jQuery选择器
12. 小心HTMLConnection
13. 减少repaint和reflow
14. 使用clone而不是create
15. 事件代理 动态绑定、性能、



> focus事件 冒泡 http://www.cnblogs.com/aaronjs/p/3481075.html

以上。
