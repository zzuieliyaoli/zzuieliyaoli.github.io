---
layout: post
title:  "对闭包的理解"
date:   2014-12-24
categories: [JavaScript]
---

我对闭包一直理解不了，今天突然开窍了，好开森。难点有二，对于我个人来说：

- this 的值
- 各种 return 语句

## this 的值

读《JavaScript语言精粹》解决，并作出整理，见个人文章。其中的重点是“匿名函数 this 的值”。

## 各种 return 语句

### 闭包的概念一（维基百科）：

> 在计算机科学中，闭包（Closure）是词法闭包（Lexical Closure）的简称，是引用了自由变量的函数。这个被引用的自由变量将和这个函数一同存在，即使已经离开了创造它的环境也不例外。所以，有另一种说法认为闭包是由函数和与其相关的引用环境组合而成的实体。

> Peter J. Landin 在 1964 年将术语闭包定义为一种包含环境成分和控制成分的实体。

### 闭包的概念二（《JavaScript高级程序设计 第三版》）

> 闭包是指有权访问另一个函数作用域中的变量的函数。

### 闭包的概念三 (《JavaScript语言精粹》)

> 通过函数字面量创建的函数对象包含一个连到外部上下文的链接，这叫做“闭包”。

简单不？确实很简单，但是你不得不承认，这就是闭包。

```js
var hello = (function () {
  var myName = "Tom";
  return function (yourName) {
    console.log("Nice to meet you " + yourName + "."+ " My name is " + myName + ".");
  }
})();

hello("Jone"); //  "Nice to meet you Jone. My name is Tom."
```

#### 解释：

第一行等号右边 `(function...)();` 的函数，记为“外函数”，第三行 `return` 的函数为“内函数”。

1.内函数是闭包，它访问了外函数的变量 `myName`。

2.变量 `hello` 等于内函数，可以理解为：

```js
//记为 “hello函数”
function hello (yourName) {
  console.log("Nice to meet you " + yourName + "."+ " My name is " + myName + ".");
}
```

**变量 `hello` 获得了内函数返回的函数，也就是说变量 `hello` 被内函数 return 回来的函数给初始化了**。

而且，该 `函数hello` 可以随时访问外函数中的变量 `myName` ，即使在外函数执行完毕后。也就是说 `函数hello` 也算闭包（这里涉及了作用域链的相关知识，内容较多，暂时不详细说明）


## 需要注意的地方

### 闭包只能取得包含函数中任何变量的最后一个值

```js
function example() {
  var result = new Array();
  for (var i = 0; i < 10; i++) {
    result[i] = function () {
      console.log(i);
    };
  }
  return result;
}

console.log(example());       // [function, function, function, ... ,function, function]
console.log(example()[0]());  // 10
console.log(example()[1]());  // 10
console.log(example()[2]());  // 10
console.log(example()[3]());  // 10
console.log(example()[4]());  // 10
console.log(example()[5]());  // 10
console.log(example()[6]());  // 10
console.log(example()[7]());  // 10
console.log(example()[8]());  // 10
console.log(example()[9]());  // 10
```

这个函数会返回一个函数数组。表面上看，似乎每个函数都应该返回自己的索引值，即位置 0 的函数返回 0，位置 1 的函数返回 1，以此类推。但是实际上，每个函数都返回 10。因为它们都引用的同一个 `变量i` ，它们绑定的是 `变量i` 本身，而不是其在构造时的 `变量i` 的值。当 `函数example` 返回后，函数数组中的每个函数的 `变量i` 都为 10。

```js
function example() {
  var result = new Array();
  for (var i = 0; i < 10; i++) {
    result[i] = function (num) {
      return function () {
        console.log(num);
      }
    }(i);    //△
  }
  return result;
}
console.log(example()[0]());  // 0
console.log(example()[1]());  // 1
console.log(example()[2]());  // 2
console.log(example()[3]());  // 3
console.log(example()[4]());  // 4
console.log(example()[5]());  // 5
console.log(example()[6]());  // 6
console.log(example()[7]());  // 7
console.log(example()[8]());  // 8
console.log(example()[9]());  // 9
```

解释：return 创建闭包，console.log 出 num 的值，而 num 是 △ 处的 `i` 通过值传递赋的值。

## 参考资料

- 《JavaScript高级程序设计 第三版》

- 《JavaScript语言精粹》

- [http://www.cnblogs.com/xiaotie/archive/2011/08/03/2126145.html](http://www.cnblogs.com/xiaotie/archive/2011/08/03/2126145.html)

- [http://www.cnblogs.com/frankfang/archive/2011/08/03/2125663.html](http://www.cnblogs.com/frankfang/archive/2011/08/03/2125663.html)
