---
layout: post
title:  "近期学习小结（二）"
date:   2017-11-26
categories: [Essay]
---

人一闲下来，就容易瞎想。这一瞎想就会影响心情，进而影响学习。大概的学习规划是有的，但是缺少明确检验标准。虽然杂七杂八看了不少新内容、温故了旧知识。但一来二去，学习效率明显降低。

这么长时间的学习并没有总结出一篇笔记，实在是资料太杂，把别人的文章再总结一遍实在是没意思，就把资料列出来吧。
列出资料并不代表什么，甚至也不能代表我完全理解了，但好歹是个纪念。

## MOOC

- [Programming Language](https://www.coursera.org/learn/programming-languages/home/welcome) 旨在学习英语和了解编程范式。

## 数据可视化

- 《数据之美：一本书学会可视化设计》

## RxJS

之前有接触过 [听徐飞叔叔讲 RxJS](/2016-11-29/learning-from-xufei.html)，这次详细得过了遍 [官方文档](http://reactivex.io/rxjs/manual/overview.html)（访问速度实在是太慢了）。

- [Redux in a single line of code with RxJS ](http://rudiyardley.com/redux-single-line-of-code-rxjs/) Redux 与 RxJS 怎么结合。同理，Vue 也可以借鉴。
- [DaoCloud 基于 RxJS 的前端数据层实践](https://zhuanlan.zhihu.com/p/28958042) 超典型的例子。

## Vue 源码

从最新版本开始看了一段时间，很吃力。后又从 0.6.0 一个 commit 一个 commit 看起，依旧吃力。挫败感很强，还需继续努力。

- Object 方法的利用
- 代码解耦
- apply 保证 this 引用
- 依赖收集
- 指令系统

## 前端性能优化

关注点在“2017”这个时间节点，因为大部分资料已经过时。

- 得益于前端工程化的沉淀，一些最佳实践已经集成在项目的脚手架当中，可以无痛使用。
- PWA、HTTP2、Prefetch
- [The Cost Of JavaScript](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e)
- 浏览器

以上。
