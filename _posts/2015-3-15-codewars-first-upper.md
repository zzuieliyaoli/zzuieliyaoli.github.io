---
layout: post
title:  "Jaden Casing Strings - Codewars"
date:   2015-3-15
categories: [Codewars]
---

说白了，题目的要求是“把英文句子中的单词首字母全部转换为大写”

## 我的解法：

```js
String.prototype.toJadenCase = function () {
  var matches = this.split(" "),
      array = new Array(),
      first = "",
      upperFirst = "",
      end = "";
  for(var i = 0, len = matches.length; i < len; i++) {
      first = matches[i].slice(0, 1);
      upperFirst = first.toLocaleUpperCase();
      end = matches[i].replace(/^\b\w{1}/g, upperFirst);
      array.push(end);
  }
  return array.join(" ");
};
```

思路分析：我的想法很简单：切开、转换、拼接

 - 切开：利用 split() 方法，把众多单词（字符串，下同）转换为数组元素
 - 转换：利用 toLocaleUpperCase() 方法单词首字母转换为大写，然后 replace() 方法替换原单词的首字母
 - 拼接：转换后的单词 push() 成为新数组，最后 join() 方法得到答案

## 来看别人怎么写：

解法一：

```js
String.prototype.toJadenCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
```

其中用于匹配的正则表达式不同，解法也就不同。

解法二：

```js
String.prototype.toJadenCase = function () {
  return this.split(" ").map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}
```

解法三：

```js
String.prototype.toJadenCase = function () {
  return this.replace(/(^|\s)[a-z]/g, function (x) { return x.toUpperCase(); });
};
```

同样，用于匹配的正则表达式不同，解法也就不同。

## 分析：

解法一：向 replace() 方法传入函数。因为 text 代表着模式的匹配项，所以在正则的配合下，一个个匹配的单词被函数操作。最后返回首字母大写的单词，去替换句子中未首字母大写的单词。

解法二：数组的链式操作，精彩！首先 split() 方法去掉字符串中的空格，并把其转换为以字符串为元素的数组。接着 map() 方法迭代数组内元素（字符串）。最后 join() 方法再将数组内元素还原为字符串。

解法三：避免了解法一的字符串拼接，直接替换单词首字母，精彩！

## 知识点：

- split()，String 类型的方法。基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。
- charAt()，String 类型的方法。以单字字符串的形式返回给定位置的那个字符。
- slice()，String 类型的方法。基于字符串创建新字符串的方法。
- map()，Array 类型的迭代方法。对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
- join()，Array 类型转换方法，接收一个用于分隔符的字符串，返回包含所有数组项的字符串。
- replace()，Array 类型。其第二个参数除了可以为字符串外，还可以为函数。在只有一个匹配项的情况下，会向这个函数传递 3 个参数：模式的匹配项、模式匹配项在字符串中的位置和原始字符串。这个函数应该返回一个字符串，表示应该被替换的匹配项使用函数作为 replace() 方法的第二个参数可以实现更加精细的替换操作。
- 正则表达式：
  - `/\w\S*/g`，匹配不含空格的字符串
  - `/(^|\s)[a-z]/g`，匹配在字符串首位（index = 0）且小写的字母或者前方（字母的index - 1）为空格的小写字母。


## 个人反思：

- 正则表达式掌握不好，所以不能写出可以直接操作字符串的式子。
- 加强锻炼！
