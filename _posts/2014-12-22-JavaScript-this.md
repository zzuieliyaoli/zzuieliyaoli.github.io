---
layout: post
title:  "this 值的总结"
date:   2014-12-22
categories: [JavaScript]
---

## 一、函数字面量（function literal）

```js
// 创建一个名为 add 的变量，并用来把两个数字相加的函数值赋值给它
var add = function (a, b) {
  return a + b;
}
```

### 函数字面量分为四个部分：

- 保留字 **function**
- 函数名，可以被省略
  - 作用：可以通过自己的名字来调用自己，也可以被调试器和开发工具用来识别函数。
  - 省略函数名后，被称为 **匿名函数（anonymous）**
- 包围在圆括号中的一组参数
- 包围在花括号中的一组语句

#### 总结：函数字面量可以出现在任何允许表达式出现的地方。函数也可以被定义在其他函数中，一个内部函数除了可以访问自己的参数和变量，同时它也能自由访问把它嵌套阿紫其中的父函数中的参数和变量。

## 二、函数调用

在 JavaScript 中，函数一共有 4 种调用模式，这些模式在如何初始化 **this** 存在差异：

### 对象的方法调用方式

当一个函数被保存为对象的一个属性时，称为 **方法**

```js
// 创建 objectExample 对象，其拥有 name 属性，sayName() 方法
// sayName() 方法中，this 为自己所属的对象（objectExample）
var objectExample = {
  name: "test",
  sayName: function () {
    return this.name;
  }
};
console.log(objectExample.sayName()); // test
```

### 函数调用模式

**this 被绑定到全局对象**

```js
// 全局变量 name
// 创建 objectExample 对象，其拥有 name 属性，sayName() 方法
var name = "The Window";
var objectExample = {
  name: "The Object",
  sayName: function () {
    var innerFun = function () {
      alert(this.name);
    }();
  }
};

objectExample.sayName();  // The Window
```

### 构造器调用模式

如果在函数前面带上 **new** 调用则会创建一个连接到该函数的 **prototype** 成员的新对象，同时 **this** 会被绑定到新对象上。

```js
// 创建 Example 对象，其拥有 name 属性，为其原型添加 sayName() 方法
var Example = function(string) {
  this.name = string;
};

Example.prototype.sayName = function () {
  console.log(this.name);
}

var nE = new Example("Surprise");
nE.sayName(); // Surprise
```

### **apply** 调用模式

```js
// 创建 Example 对象，其拥有 name 属性，为其原型添加 sayName() 方法
var Example = function(string) {
  this.name = string;
};

Example.prototype.sayName = function () {
  console.log(this.name);
}

// 构造一个包含 status 成员的对象
var nameObject = {
  name: "Jim"
};

// nameObject 并没有继承自 Example.prototype，但是可以在 nameStatus 上
// 调用 sayName() 方法，尽管 nameObject 并没有一个名为 sayName() 的方法

var name = Example.prototype.sayName.apply(nameObject);
console.log(name);  // Jim
```

## 三、this 指向全局变量

### 匿名函数

```js
var name = "The Window";
var objectExample = {
  name: "The Object",
  sayName: function () {
    return function () {   // 匿名函数
      return this.name
    };
  }
};
console.log(objectExample.sayName()()); // The Window
```

### 全局作用域

```js
var name = "The Window";
function sayName () {
  alert(this.name);
}
sayName(); // The Window
```

## 参考图书

《JavaScript语言精粹》

《JavaScript高级程序设计》
