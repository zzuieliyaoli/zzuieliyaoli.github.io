---
layout: post
title:  "基本包装类型等概念辨析"
date:   2015-3-19
categories: [JavaScript]
---
书读百遍，其义自现。

好歹学习 JavaScript 小半年了，连一些基础的概念都没完全弄懂，也不知道看的书都去哪了。话说今天看《基于 MVC 的 JavaScript 富文本应用开发》，实在是难以忍受基础概念模糊不清的状态。必须再次认真的看书啦！

以下是读书笔记：

## 数据类型
ECMA 中有 5 种简单的数据类型（也称作基本数据类型）：Undefine、Null、Boolean、Number、String，还有一种复杂数据类型——**引用类型**。

吐槽一下，来看高程（《JavaScript 高级程序设计》，下同）是怎么说的：

> 还有一种复杂数据类型—— Object，Object 本质上是由一组无序的名值对组成的。

Object 这是个什么鬼！？？这与第五章将的“引用类型”有什么区别于联系？？。。

虽然书中也说道：Object 类型是所有它的实例的基础，换句话说，Object 类型所具有的任何属性和方法也同样存在于更具体的对象中。

喵的，被搞迷糊了哇。。。。

综上，我觉得这样理解比较好：

ECMA 中有 5 种简单的数据类型（也称作基本数据类型）：Undefine、Null、Boolean、Number、String，还有一种复杂数据类型——**引用类型**。而引用类型除了 Object 类型、Array 类型、Date 类型、RegExp 类型、Function 类型外，还有基本包装类型：Boolean、Number 和 String，单体内置对象：Global 对象、Math 对象。
其中，Object 类型很重要，所有引用类型的值都是 Object 的实例，如下代码所示：

```js
new Object() instanceof Object // true
new Array() instanceof Object // true
new RegExp() instanceof Object // true
new String() instanceof Object // true
new Function() instanceof Object // true
```

## 基本包装类型
实际上，每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从让我们能够调用一些方法来操作数据。

```js
var s1 = "some text";
var s2 = s1.substring(2);
```

如代码所示，s1 包含一个字符串，是基本类型值。下一行调用了 s1 的 substring() 方法，并将返回的结果保存在了 s2 中。基本类型不是对象，因为从逻辑上是不能有刚发的。但是为了让我们实现这种直观的操作，后台已经自动完成了一系列的处理。P119

引用类型与基本包装类型的主要区别就是 **对象的生存期** 。使用 `new` 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即销毁。这意味着我们不能在运行时为基本类型值添加属性和方法。比如下面的例子：

```js
var s1 = "some text";
s1.color = "red";
console.log(s1.color); // undefined
```

代码所示，在第二行代码试图为字符串 s1 添加一个 color 属性。但是，当第三行代码再次访问 s1 时，其 color 属性不见了。问题的原因就是第二行创建的 String 对象在执行第三行代码时已经被销毁了。第三行代码又创建了自己的 String 对象，而该对象没有 color 属性。

以上。
