---
layout: post
title: "给 Python 实习生的 JavaScript 讲座"
date: 2018-01-03
categories: [JavaScript]
---

## 前言

- 不纠结 JS 的细节，Good Parts
- 兼容性：ES5、ES6+、[https://caniuse.com/](https://caniuse.com/)
- 参考资料：
  - 《JavaScript 高级程序设计》
  - 《JavaScript 权威指南》
  - 《深入理解 ES6》
  - [Mozilla 开发者网络（MDN）](https://developer.mozilla.org/bm/docs/Web/JavaScript)

## 正文

## 1 JavaScript

[JavaScript - Wiki](https://zh.wikipedia.org/wiki/JavaScript)

### 1.1 组成

JavaScript = ECMAScript（标准）+ DOM（宿主）+ BOM（宿主）

Node = ECMAScript（标准）+ 宿主 API

### 1.2 运行

- Browsers - HTML
- Browsers - Console
- Node

#### 1.2.1 Browsers - HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <!-- 1 外部 js -->
  <script src="path/filename.js"></script>
  <!-- 2 内联 -->
  <script> var a = 2; </script>
  <!-- 3 忽略内联，只加载外部 js-->
  <script src="path/filename.js"> var a = 2; </script>
</head>
<body>

</body>
</html>

```

- 顺序加载、执行，并阻塞页面渲染
- 共享变量

```html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div class="container"></div>
  <!-- 1 外部 js -->
  <script src="path/filename.js"></script>
  <!-- 2 内联 -->
  <script> var a = 2; </script>
</body>
</html>
```

#### 1.2.2 总结

- `<script></script>` 类型、位置、属性
- 《JavaScript 高级程序设计》P10

### 1.3 语法

- 大量借鉴 C 以及其他类 C 语言的语法
- 不强制缩进

#### 1.3.1 区分大小写

```js
var a = 2;
var A = 2;
```
#### 1.3.2 标识符

```js
var _ = 2;
var $ = 2;
var a = 2;

// var 2 = 3;
```

#### 1.3.3 注释

```js
// 单行注释

/*
  多行注释
*/
```
#### 1.3.4 严格模式

```js
"use strict";
```

详细了解：[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)

#### 1.3.5 分号

ECMAScript 中语句以一个分号结尾；如果省略分号，则由解析器确定语句的结尾。

```js
// bad1
return
{
  a: 2
}

// 解析为
return;
{
  a: 2
}

// bad2
a = b
[1,2,3].forEach(function (e) {
  console.log(e)
})

// 解析为
a = b[3].forEach(function (e) {
  console.log(e)
})

// good
return {
  a: 2
}

a = b;
[1,2,3].forEach(function (e) {
  console.log(e)
})
```

拓展阅读：[JavaScript 语句后应该加分号么？](https://www.zhihu.com/question/20298345)

#### 1.3.6 debug

- `alert(1)`
- `console.log(1)`
- `debugger`

拓展阅读：

- [【原创】一探前端开发中的JS调试技巧](http://seejs.me/2016/03/27/jsdebugger/)
- [在 Chrome DevTools 中调试 JavaScript 入门](https://developers.google.com/web/tools/chrome-devtools/javascript/?hl=zh-cn)

### 1.4 关键字与保留字

- 《JavaScript 高级程序设计》P21
- [Reserved Words](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Reserved_words)

### 1.5 变量

#### 1.5.1 语法

```js
var a = 2;
let b = 2; // ES6
const c = 3; // ES6

var i = 1, j = 4;
let e = 1, f = 4;
const m = 1, n = 4;
```

#### 1.5.2 坑点

- 作用域
  - `val` - 函数级
  - `let`、`const` - 块级

```js
if (true) {
  var a = 3;
}
console.log(a); // 3

for (var i = 0; i < 3; i++) {}
console.log(i); // 3

for (let j = 0; j < 3; j++) {}
console.log(j); // error

function test() {
  var f = 2;
}
test();
console.log(f); // error

if (true) {
  var b = 4;
  let c = 5;
  const d = 6;
}
console.log(b); // 4
console.log(c); // error
console.log(d); // error
```

- 省略 `var`、`let`、`const` - 变为全局变量

```js
function outer() {
  function test() {
    a = 2;
  }
  test();
}
outer();
console.log(a); // 2
```

- 重新赋值

```js
const a = 2;
a = 3; // error

const b = { n: 2 }
b.n = 3;
console.log(b.n); // 3
```

### 1.6 数据类型

《JavaScript 高级程序设计》P23

```js
// 基础数据类型
var a; // Undefined
b // Undefined
var c = "test"; // String
var d = false; // Boolean
var e = 1; // Number
var f = null; // Null
// 引用类型
var g = {}; // Object dict
var g1 = []; // Array list
var g2 = /at/g; // RegExp
var g3 = new Date(); // Date
var g4 = function () {} // Function
function g4() {}
// ES6
var h = new Map();
var i = new Set();
var j = Symbol();
```

重点：《JavaScript 高级程序设计》P35：在 ECMAScript 中，Object 类型是所有它的实例的基础。Object 类型所具有的任何属性和方法也同样存在于更具体的对象中。

#### 1.6.1 类型转换

```js
// 常见
var a = parseInt("123", 10); // 123
var b = Number.parseInt("123", 10); // 123 ES6
var c = "" + 123; // "123"
var d = "" + 123 + 2; // "1232"
var e = "123" + 2; // "1232"
var f = "" + (123 + 2); // "125"
var g = !!1 // true
```

- 《JavaScript 高级程序设计》P26 P30 P34
- [数据类型转换](http://javascript.ruanyifeng.com/grammar/conversion.html)

#### 1.6.2 类型判断

[类型判断](http://www.liyaoli.com/2015-06-12/type-judging.html)

### 1.7 操作符

《JavaScript 高级程序设计》P36

- 类型转换
- `==` 和 `===` 《JavaScript 高级程序设计》P51  [JavaScript Equality Table](https://dorey.github.io/JavaScript-Equality-Table/)

### 1.8 语句

《JavaScript 高级程序设计》P54

#### 1.8.1 If

```js
// bad
if (true) console.log(1)
else console.log(2)

// good
// 类型转换 Boolean(true)
if (true) {
  console.log(1)
} else {
  console.log(2)
}
```

#### 1.8.2 for-in

```js
var obj = { name: "jane", age: 123 }
obj.__proto__.weight = 123;
// bad
for (var key in obj) {
  var value = obj["key"];
  console.log(value);
}
```

- 顺序不确定
- 会遍历出 `__proto__` 的上变量

```js
// good
for (var key in obj) {
  if (obj.hasOwnProperty(key)) {
    var value = obj["key"];
    console.log(value); // name age weight
  }
}
```

### 1.9 Object

《JavaScript 高级程序设计》P83

#### 1.9.1 声明

```js
var a = new Object();
a.name = "Jane";

var b = {
  name: "Jane",
  "second name": "Mike"
};

var c = {};
c.name = "Jane";
```

#### 1.9.2 取值/赋值
  - `.`: `a.name`
  - `[]`: `a["name" + 1]` `b["second name"]`

### 1.10 Array

《JavaScript 高级程序设计》P86

#### 1.10.1 声明

```js
var a = new Array(1); // [1]
var a2 = Array(1);
var b = new Array(1, "asd"); // [1, "asd"]
var b2 = Array(1, "asd");
var c = [1, 2, 3];
```

#### 1.10.2 `length`

```js
var a = [1, 2, 3]; // length: 3
a.length = 2; // [1, 2]

var b = [1, 2, 3] // length: 3
b.length = 4; // [1, 2, 3, undefined]
```

#### 1.10.3  栈、队列

```js
var a = []
a.push(1); // [1]
a.pop(); // []

var b = [1];
b.unshift(2); // [2, 1]
b.shift(); // [1]
```

#### 1.10.4 排序、操作、位置、迭代、并归

#### 1.10.5 JSON

```js
JSON.stringify([1, 2, 3])
JSON.parse('{"name":"asd","age":123,"male":false}')
```

### 1.11 函数

《JavaScript 高级程序设计》P110 P176

#### 1.11.1 声明

```js
var a = function () {} // 函数表达式
function b() {} // 函数声明

var c = () => {} // ES6
```

但是

```js
console.log(a); // undefined
console.log(c); // undefined

var a = function () {}
var c = () => {} // ES6
```

要这样

```js
console.log(b); // function
function b() {}
```

相当于

```js
function b() {}
console.log(b)
```

#### 1.11.2 特点

- 参数个数没限制：`arguments`
- 没有重载
- first-class：函数式
- `this`
  - `function`： 运行时确定
  - `arrow functon`： `lexical`

```js
var name = 1;
function a() {
  console.log(this.name)
}
a(); // 1

var obj = {
  name: "Jane",
  sayName: function () {
    return function () {
      return this.name
    }
  },
}
obj.sayName()(); // 1
```

其实

```js
var obj = {
  name: "Jane",
  sayName: function () {
    return function () {
      return this.name
    }
  },
}
var b = obj.sayName();
b();
```

要处理：

```js
var obj = {
  name: "Jane",
  sayName: function () {
    var that = this;
    // var _this = that;
    return function () {
      return that.name
    }
  },
  sayName2: function () {
    return () => {
      return this.name;
    }
  }
}
var a = obj.sayName2();
console.log(a()); // Jane
```

### 1.12 Window

《JavaScript 高级程序设计》P193

- BOM 核心，浏览器的一个实例，操控浏览器
- Global 对象：全局作用域 `window.parseInt`、`window.alert`；在全局作用域中声明的变量、函数都会变为 window 对象的属性和方法

### 1.13 DOM

《JavaScript 高级程序设计》P247

[DOM - MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/DOM)

DOM（Document Object Model——文档对象模型）是用来呈现以及与任意 HTML 或 XML 交互的API文档。DOM 是载入到浏览器中的文档模型，它用节点树的形式来表现文档，每个节点代表文档的构成部分（例如： element——页面元素、字符串或注释等等）。

DOM 是Web——万维网上使用最为广泛的API之一，因为它允许运行在浏览器中的代码访问文件中的节点并与之交互。节点可以被创建，移动或修改。事件监听器可以被添加到节点上并在给定事件发生时触发。

DOM 并不是天生就被规范好了的，它是浏览器开始实现JavaScript时才出现的。这个传统的 DOM 有时会被称为 DOM 0。现在， W3C领导着 DOM 规范，DOM 工作组正在制订第四版的规范。

### 1.14 参考资料

- [Airbnb JavaScript Style Guide() {](https://github.com/sivan/javascript-style-guide/blob/master/es5/README.md)
- [JQUERY BEST PRACTICES](http://gregfranko.com/jquery-best-practices/)
- [Coding Standards & Best Practices](http://lab.abhinayrathore.com/jquery-standards/)
