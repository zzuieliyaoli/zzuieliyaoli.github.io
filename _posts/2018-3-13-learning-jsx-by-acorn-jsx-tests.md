---
layout: post
title: "学习 JSX 语法"
date: 2018-03-13
categories: [React]
---

## 方法

JSX 的[文法（Grammar）](https://facebook.github.io/jsx/)不复杂，但是对于一个初学者而言，是难以知道基于该种文法可以写出哪些合法形式的 JSX 代码。
我的一个解决办法是：看 JSX Parser 的单元测试。比如，[acorn-jsx](https://github.com/RReverser/acorn-jsx/blob/master/test/tests-jsx.js)。
通过对比 Parser 解析（parse）JSX 代码后的抽象语法树（AST）达到学习的目的（如果想熟悉 JavaScript 的文法，也可以通过如上方式）。

对于我个人而言，还是觉得有很多奇葩但合法的 JSX 代码的。比如：`<a b={x ? <c /> : <d />} />`。

## 参考

- [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)
- [DOM Elements](https://reactjs.org/docs/dom-elements.html)
- [一看就懂的 JSX 簡明入門教學指南](https://blog.techbridge.cc/2016/04/21/react-jsx-introduction/)

以上。
