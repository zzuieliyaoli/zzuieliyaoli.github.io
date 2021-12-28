---
layout: post
title:  "document对象"
date:   2015-03-07 
categories: [javascript学习]
---

一准备面试，发现对一些基础的概念理解不到位。但亡羊补牢，为时未晚。

以下是知识点整理。

1. 虽然JavaScript和ECMAScript通常被人们来表达相同的含义，但JavaScript的含义却比ECMA-262规定的要多得多。

	![My helpful screenshot](/images/posts/2015030701.jpg)

2. ECMA-262定义的基础，在此基础上可以构建更完善的脚本语言。Web浏览器知识ECMAScript实现的宿主环境之一。宿主环境不仅提供基本的ECMAScript实现，同时也会提供该语言的扩展，以便语言与环境之间对接交互。比如DOM，利用ECMAScript的核心类型和语法提供更多更具体的功能，以便实现针对环境的操作。

3. DOM是文档对象模型（Document Object Model）的简称，它的基本思想是把结构化文档（比如HTML和XML）解析成一系列的节点，再由这些节点组成一个树状结构。所有的节点和最终的树状结构，都有规范的对外接口，以达到使用编程语言操作文档的目的（比如增删内容）。所以，DOM可以理解成文档的编程接口。

    DOM有自己的国际标准，目前的通用版本是DOM 3，下一代版本DOM 4正在拟定中。

4. DOM1级定义了一个Node接口，该接口将由DOM中的所有节点类型实现，该Node接口在JavaScript中是作为Node类型实现的。

5. document对象

     5.1 document对象是文档的根节点
     
     5.2 document对象是HTMLDocument（继承自Document）的一个实例，表示整个HTML页面；

     5.3 document对象是window的对象的一个属性，因此可以当做全局对象来访问（window.document或者document）。

**参考资料：**

> [http://javascript.ruanyifeng.com/dom/document.html](http://javascript.ruanyifeng.com/dom/document.html)

> 《JavaScript高级程序设计》