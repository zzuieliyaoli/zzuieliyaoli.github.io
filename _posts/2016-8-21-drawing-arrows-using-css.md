---
layout: post
title:  "用 CSS 画流程箭头"
date:   2016-08-21
categories: [CSS]
---

## 正文

感谢 CSS 的发展，让 Web 前端工程师可以完成以前需要切图才能实现的设计效果。最近遇到一个需求：用 CSS 画流程箭头。具体的效果图如下所示：

![step-2](/images/posts/20160821-arrow-2.png)

![step-3](/images/posts/20160821-arrow-3.png)

![step-1](/images/posts/20160821-arrow-1.png)

这要放到 CSS2.1 的年代或者想偷懒的话，直接三个切图搞定。但是切图无疑会增加页面的体积，减慢页面的加载速度。更何况，这几个切图的效果完全用 CSS 来搞定。

![variablse](/images/posts/20160821-varables.png)

- 正如上图所示，整个过程分为三部分（第一步、第二步、第三步）；
- 不同部分拥有不同效果的箭头；不同部分之间存在白色间隔（红圈圈）。

当我决定用 CSS 来完成设计效果时，我认为实现上图效果的难点在于：箭头和不同部分之间的间隔。

其实呢，整个流程既然分为三部分，那么把三部分单独列出来的话，问题就会很清晰了：

![variablse](/images/posts/20160821-arrows.png)

第一步的右箭头插入第二步的左侧，第二步的右箭头插入第三步的左侧，第三步是带有圆角的矩形。

我们再将问题细化，首先解决“画箭头”的问题。

## 箭头

对于“箭头”这些 CSS 无法直接绘制的形状，通常的解决思路是“拼接”。如下图所示：

![variablse](/images/posts/20160821-shapes-1.png)

或者

![variablse](/images/posts/20160821-shapes-2.png)

通常决定使用“拼接”时，其实是配合 `position: absolute` ，使用 `:after` 与 `:before` 。

<a class="jsbin-embed" href="https://jsbin.com/qudoxo/embed?html,css,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.39.12"></script>

从上面的 Demo 的代码可以看出，两种实现方式的具体方式（分别记为：三角方法一、三角方法二）：

- border 模拟三角形;
- 正方形旋转，被切掉一半。

## 间隔

箭头的问题解决了，那么我们就把三个部分组合起来。

<a class="jsbin-embed" href="https://jsbin.com/sifasi/embed?html,css,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.39.12"></script>

除了没有间隔以外，简直完美。那么，什么属性可以设置或者模拟间隔呢？（分别记为：间隔方法一、间隔方法二）

- `border`
- `box-shadow`

比较遗憾的是， `三角方法一` 是无法再绘制出间隔的。`三角方法二` 是可以用 `间隔方法一` 、 `间隔方法二` 。

如下 Demo 所示：

<a class="jsbin-embed" href="https://jsbin.com/vigaza/embed?html,css,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.39.12"></script>

## 总结

- 将设计效果分为三部分，再讲每部分进行拆分；
- CSS 无法直接搞定的效果，通常需要拼接来解决。

## 参考

- [The Shapes of CSS](https://css-tricks.com/examples/ShapesOfCSS/)
- [border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)
- [box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
- 《CSS 揭秘》

## 工具

- [CSS3 Box Shadow Generator](http://css3gen.com/box-shadow/)

以上。
