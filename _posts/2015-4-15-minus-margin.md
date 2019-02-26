---
layout: post
title:  "负外边距"
date:   2015-4-15
categories: [CSS]
---

这两天的主要精力在完成 baidu-ife 的 task0001，其中涉及到负外边距的知识和实战。虽然平时关于这方面接触的不多，但好在网上、书上的资料比较丰富，就趁着这个机会总结整理一下。

## 基础知识

抄书、粘贴复制也没意思，贴上几篇博文。

> [CSS 布局奇淫巧计之-强大的负边距](http://www.cnblogs.com/2050/archive/2012/08/13/2636467.html)，这篇文章从“负边距在普通文档流中的作用和效果”、“左和右的负边距对元素宽度的影响”、“负边距对浮动元素的影响”、“负边距对绝对定位元素的影响”这四个方面讲解，浅显易懂。

> [由浅入深漫谈 margin 属性](http://www.planabc.net/2007/03/18/css_attribute_margin/)，这个讲的深。

> [我知道你不知道的负 Margin](http://www.hicss.net/i-know-you-do-not-know-the-negative-margin/)，这个偏实战。

> [负值之美：负值在页面布局中的应用](http://www.topcss.org/?p=94)，这个也偏实战。

## 布局

### 三列布局，其中左侧和右侧的部分宽度固定，中间部分宽度随浏览器宽度的变化而自适应变化（双飞翼布局）。


```html
<div class="wrapper">
  <div class="main">
    <div class="content">
      <h1>main方法一</h1>
    </div>
  </div>
  <div class="sub">
    <h1>sub</h1>
  </div>
  <div class="extra">
    <h1>extra</h1>
  </div>
</div>
```

```css
div.containerFirst div.wrapper {
    height: 200px;
    text-align: center;
}
div.containerFirst div.main {
    float: left;
    width: 100%;
    height: 200px;
    background-color: #3F5057;
}
div.containerFirst div.main div.content {
    height: 200px;
    margin: 0 190px;
    color: white;
}
div.containerFirst div.sub {
  float: left;
  width: 190px;
  height: 200px;
  margin-left: -100%;
  background-color: #C6D38E;
}
div.containerFirst div.extra {
  float: left;
  width: 190px;
  height: 200px;
  margin-left: -190px;
  background-color: #A1C5BB;
}
```

利用负边距对 **浮动元素** 的影响。将 `div.sub` 和 `div.extra` 放置在浏览器两侧。而 `main` 内部增加一个 `div.content` ，设置其 `margin-left` 、 `margin-right` 的值分别为 `div.sub` 和 `div.extra` 的宽度。这样做的目的是使 `div.content` 里的内容正常显示，而不会跑到 `div.sub` 内。

[请点击 DEMO，如方法一所示](./../demo/ife/task0001/box-model-postion/item4.html)

### 两列布局，其中左侧部分宽度固定、右侧部分宽度随浏览器宽度的变化而自适应变化

```html
<div class="wrapperFirst">
  <div class="aside">
    <h1>aside</h1>
  </div>
  <div class="main">
    <div class="content">
      <h1>main</h1>
    </div>
  </div>
</div>
```

```css
div.wrapperFirst div.aside {
  float: left;
  width: 360px;
  height: 300px;
  background-color: #C9EFBA;
}
div.wrapperFirst div.main {
  width: 100%;
  height: 300px;
  margin-right: -360px;
  background-color: #F5D999;
}
```

利用负边距对 **浮动元素** 的影响。

[请点击 DEMO，如方法一所示](./../demo/ife/task0001/box-model-postion/item3.html)

知乎采取的便是这样的布局，不过对 `div.wrapper` 增加了最大宽度。

### 三栏等高布局

```html
<div class="wrapper">
  <div class="box">
  </div>
  <div class="box">
  </div>
  <div class="box">
  </div>
</div>
```

```css
* {
  padding: 0px;
  margin: 0px;
}
div.wrapper {
  width: 100%;
  overflow: hidden;
}

div.box {
  width: 250px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;

  padding-bottom: 520px;
  margin-bottom: -500px;

  margin-left: 20px;
  float: left;
  display: inline-block;

  color: white;
  background-color: #0767c8;
}
```

把列的 `padding-bottom` 设为较大的值（因为不知道最长列与最短列之间的差值有多少），用来抵消 `margin-bottom` 负值带来的内容移动。最后配合 `div.wrapper` 的 `overflow:hidden` ，拦腰截断最长列，三栏等高布局。

[请点击 DEMO](./../demo/minus-margin/three-colums-same-height.html)

## 定位

### 水平垂直居中

```html
<div class="wrapper">
  <div class="inner">

  </div>
</div>
```

```css
div.wrapper {
  position: relative;
  height: 500px;
  width: 500px;
  margin: 0 auto;
  background-color: black;
}
div.inner {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 300px;
  margin-left: -150px; /*  宽度的一半 */
  margin-top: -150px;  /* 高度的一半 */
  background-color: white;
}
```
用绝对定位将 `div.inner` 的定点定位到 `div.wrapper` 的中心，然后设置 `div.inner` 的 `margin-top` 、 `margin-left` 的负值，将其拉回中心，最后达到水平居中的效果。

[请点击 DEMO](./../demo/minus-margin/vertical-horizontal.html)

## 除去列表右边距

```html
<div class="wrapper clear">
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
```

```css
* {
  padding: 0px;
  margin: 0px;
}
div.wrapper {
  width: 590px;
  margin: 20px auto;
  border:1px solid #0767c8;
  overflow: hidden;
}
div.wrapper.minus ul {
  margin-right: -10px;
}
div.wrapper li {
  float: left;
  display: inline-block;
  width: 90px;
  height: 90px;
  margin-bottom: 10px;
  margin-right: 10px;
  background-color: #0767c8;
}
.clear:after {
  content: " ";
  display: table;
  clear:both;
}
```

利用负边距对 **元素宽度** 的影响。为 `ul` 设置负右外边距，增加其宽度，让 `li` 能够恰好排列切最后一个右外边距超出 `div.wrapper` 的边框，配合 `overflow:hidden` ，达到消除列表右边距的效果

[请点击 DEMO](./../demo/minus-margin/list-right-margin.html)

类似的用法还有[3.去除列表最后一个 li 元素的 border-bottom](http://www.topcss.org/?p=94)。同样也是：增加(`marin-bottom` 负值)-超出-`hidden`


## 其他收获

- 实现“两列布局，其中左侧部分宽度固定、右侧部分宽度随浏览器宽度的变化而自适应变化”有很多方法。[请点击 DEMO](./../demo/ife/task0001/box-model-postion/item3.html)

  虽然看起来很乱，但是这几个方法其实就涉及到两点：一个是如何使 `aside` 在预定位置，一个是 `aside` 在预定位置的情况下，使得 `main` 的内容正常显示。前者可以使用浮动、绝对定位，后者可以对 `main` 使用负边距，还是 `content` 使用 `margin-left` 。

- 《CSS权威指南》中提到：对于一个正常流中的块级元素，其水平部分综合就等于父元素的 width。也就是说，`margin-left` 、 `border-left` 、 `padding-left `、 `width` 、 `padding-right` 、 `border-right` 、 `margin-right`
这 7 个属性的值加在一起必须是元素包含块的宽度。

  在这 7 个属性中，只有 3 个属性可以设置为 `auto` 、元素内容的 `width`，以及左右外边距。

以上。
