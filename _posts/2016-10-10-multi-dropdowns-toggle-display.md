---
layout: post
title:  "多个下拉列表间的显隐切换"
date:   2016-10-10
categories: [Vue]
---

多个下拉列表间的显示与隐藏切换是个挺常见的交互。

![multi-dropdowns-1](/images/posts/20161010-multi-dropdowns-1.gif)

是的，我最近遇到了这样的需求。

![multi-dropdowns-2](/images/posts/20161010-multi-dropdowns-2.gif)

完成这个需求的过程中，借鉴和尝试了几种方法，有利也有弊。

## 变量

<a class="jsbin-embed" href="https://jsbin.com/zuhadel/embed?js,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.39.19"></script>

### 优点：

- 粗暴简单。

### 缺点：

- 得维护多个变量；
- 多个下拉菜单之间耦合。

## 隐形 Overlay

<a class="jsbin-embed" href="https://jsbin.com/qeqose/embed?js,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.39.19"></script>

### 优点：

- 多个下拉菜单之间解耦。

### 缺点：

- 需要注意 `z-index` 问题；
- 多余的 DOM 结构。

## click 事件处理

<a class="jsbin-embed" href="https://jsbin.com/jarube/embed?js,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.39.19"></script>

### 优点：

- 多个下拉菜单之间解耦。

### 缺点：

- 需要处理绑定 `addEventListener` 元素与 `event.target` 之间的逻辑。

以上。
