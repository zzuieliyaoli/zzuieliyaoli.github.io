---
layout: post
title:  "this 在 Arrorow Function 中是 lexical 的，所以呢？"
date:   2016-11-22
categories: [JavaScript]
---

## 前情提要

晚上从公司回住的地方，不知道脑子怎么抽了，拿出了垫桌脚的《编译原理（第二版）》，翻到了第 15 页，奇迹出现了！！困扰已久的问题貌似有了转机。

## 问题描述

看 ES2015 中有关于箭头函数（Arrow Function）的内容，经常会有这样讲解：

因为箭头函数中的 `this` 的值是 `lexical` 的，所以我们可以这样用：

```js
dom.addEventListener('click', () => {
  // click handler
}, false)
```

而不需要

```js
dom.addEventListener('click', (function () {
  // click handler
}).bind(this), false)
```

在定义对象（Object）的方法时，不要这样用：

```js
const person = {
  name: 'John',
  say: () => {
    console.log(this.name)
  }
}
```

（讲解结束）

所以，我觉得很蛋疼的是：`lexical` 究竟代表着什么？具有这个特性的变量（this）会表现出什么特征？

## 求证

《编译原理》里面讲的很明白，抄书也没意思。我就只列一下关键的知识点和代码（JavaScript实现）。

> x 的一个声明的作用域（scope）是指程序的一个区域，在其中对 x 的使用都指向这个声明。如果仅通过阅读程序就可以确定一个声明的作用域，那么这个语言使用的就是 `静态作用域（static scope）` ，或者说 `词法作用域（lexical scope）` 。否则，这个语言使用的是 `动态作用域（dynamic scope）` 。 P15

**JavaScript 使用的是静态作用域。**

```js
// 静态作用域
const i = 1

function fun1() {
  const i = 3
  fun2() // 1 不是 3
}

function fun2() {
  console.log(i)
}

fun1()
```

```js
// 动态作用域，JavaScript 不是动态作用域
const i = 1
function fun1() {
  const i = 3
  fun2() // 3 不是 1
}
function fun2() {
  console.log(i)
}
fun1()
```

说到这里，我们再回到箭头函数。

```js
const person = {
  name: 'John',
  say: () => {
    console.log(this.name)
  }
}
```

其实是对应这个：

```js
const name = 'Peter'
function person() {
  const name = 'John'
  say() // Peter
}
function say() {
  console.log(name)
}
person()
```

更暴力一点是这样：

```js
this.name = 'Perter'
const person = {
  this: {
    name: 'John'
  },
  say: () => {
    console.log(this.name)
  }
}
person.say() // Perter
```

## 题外话

我还有一个小疑问，在用 `esprima` parse 如下代码：

```js
var test = {
  a: () => {}
}

var test2 = {
  a() {}
}
```

两者的 diff 来看，

前者：

```json
{
  "type": "ArrowFunctionExpression",
  "method": false,
}
```

后者：

```json
{
  "type": "FunctionExpression",
  "method": true,
}
```

这是为啥呢？

## 参考

- 《编译原理（第二版）》
- 《代码之髓》—— 7.2 作用域的演变
- [esprima](http://esprima.org/demo/parse.html)
- [exploringjs - 13. Arrow functions](http://exploringjs.com/es6/ch_arrow-functions.html)

以上。
