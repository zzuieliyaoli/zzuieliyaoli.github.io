---
layout: post
title:  "Flexbox 解决 options 和 input 宽度和数量不定的布局问题"
date:   2016-09-27
categories: [CSS]
---

最近的在用 `Flexbox` 来完成大部分的布局任务。在要解决 `i18n` 的情况下，遇到一个很典型的布局需求。

## 需求

如下图所示：

![options](/images/posts/20160927-options.png)

简单描述一下：

- 这是一个表单项的内容部分；
- 可以选择给定的 `选项(options)` 或者填写 `自定义内容(input)`；
- `options` 从左至右排列，且数目不确定（>=1）；
- 当 `input`（宽度有最小值）可以与 `options` 排列于一行时，`input` 占满除 `options` 以外的空间；
- 如果 `input` 无法与 `options` 排列于一行时，`input` 需另起新行，并占满新行的空间。

## 为什么用 `Flexbox`

- 浮动（float）不能用；
- JavaScript 不想用。

## 分析问题

这个布局的问题在于：

- `options` 数量不确定；
- `option` 宽度不确定；
- `input` 在上面两种情况下的宽度要求。

如果没有 `input`，或者 `input` 的宽度固定，那么我们可以直接将 `options` 、 `input`全部浮动起来就可以了。

<a class="jsbin-embed" href="https://jsbin.com/xugeli/embed?html,scss,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.39.18"></script>

**所以，我们主要解决的是 `input` 宽度自适应的问题。**

## 解决问题

其实问题分析对了，解决起来就很简单。

首先将 `input` 的父元素设置如下：

```scss
li:last-child {
  flex-grow: 1; // 容器宽度变大时，占满剩余空间
  flex-shrink: 0; // 容器宽度变小时，不收缩
}
```

其次，给 `input` 设置宽度和最小宽度。即保证了随着父元素宽度的放大而放大，也能保证在父元素宽度缩小时，触发换行。

```scss
li:last-child input {
  width: 100%;
  min-width: 300px;
}
```

最后，将容器设置为 `Flexbox`:

```scss
ul {
  display: flex;
  flex-wrap: wrap;  // 容器内元素换行
}
```

<a class="jsbin-embed" href="https://jsbin.com/cufagey/embed?html,scss,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.39.18"></script>

注：测试上面的 Demo 的时候，要手动调整 `options` 的宽度。比如：

```scss
li:not(:last-child) {
  width: 150px;
}
```

## 总结

- 分析问题，抽象问题的能力很重要；
- `Flexbox` 的能力不止于此，需多探索。

## 参考资料

- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
- [移动端全兼容的 flexbox 速成班](https://isux.tencent.com/flexbox.html)
- [Flexbox 全兼容模板](http://115.159.36.96/tikizheng/flextest/demo.html)
- [Flexbox 布局实战](http://www.w3cplus.com/scss3/going-all-in-on-flexbox.html)
