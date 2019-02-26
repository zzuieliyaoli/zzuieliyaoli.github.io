---
layout: post
title:  "页面滚动条的一二事"
date:   2015-8-17
categories: [JavaScript]
---

本篇文章涉及到“滚动条”的相关东东。这个算是工作上遇到的问题，虽然最后的效果满足了产品需求，但是其中还是有一些问题需要认真研究。

需求（兼容性 IE9+)是类似于 [stickUp.js](http://lirancohen.github.io/stickUp/ "stickup.js") 一样的效果，根据页面的滚动(scroll)，对导航条的位置进行不同的调整。除此之外，点击首屏的按钮，页面会滚动到指定的次屏。

这个需求看起来很简单，但在完成的过程中遇到了几个问题：

- 页面滚动的监听(scroll event listener)应该绑定在哪个元素上？window，doucment，body，html？
- 通过哪个元素的何种属性来控制页面，使其滚动到指定的位置？

## 页面滚动的监听绑定在哪个元素上？

doucment，window，body，html 中的哪一个呢？获得问题答案的方式很简单，一个一个元素来试就可以了。

```js
// jquery-1.10.2.js
$(window).on("scroll", function(){
  console.log("hello"); // Chrome、Firefox、IE9+ 都可以
});

$(document).on("scroll", function(){
  console.log("hello"); // Chrome、FireFox、IE9+ 都可以
});

$("html").on("scroll", function(){
  console.log("hello"); // Chrome、FireFox、IE9+ 都不行
});

$("body").on("scroll", function(){
  console.log("hello"); // Chrome、FireFox、IE9+ 都不行
});
```

所以，页面的监听应绑定到 `window` 和 `document` 上。答案虽然的出来了，但是为什么呢？

## scroll event 会在什么时间触发？

- Scrolling the contents of an element with the scrollbar.
- Rolling the mouse wheel over an element.
- Pressing a cursor left, up, right, down or the HOME, END, PAGE UP, PAGE DOWN or SPACE key when an element has the focus.
- Scrolling the contents of the element by JavaScript (scrollTop and scrollLeft properties, scrollTo, scrollBy, scrollByLines, scrollByPages and doScroll methods).

## 谁拥有页面的滚动条呢？window 还是 document？

在 Google 了一大堆资料后，我突然想明白了两点：

- 我用的事件监听，所以在上面的代码只能告诉我 scroll event 能够在 window/document 上被捕获到。
- 我其实是在纠结 `event.target` 是谁！！！！这个简直 so easy!

```js
$(window).on("scroll", function(e){
  console.log(e.target);
});
```

所以，在 Chrome、FireFox、IE9+ 上 scroll event target 都是 `document`

综上，我的问题不是“页面滚动的监听绑定在哪个元素上”，而是“页面滚动时的 event.target 是谁”。页面的滚动条属于 document ，也就是说“滚动的页面”其实是 document 。document 的滚动事件冒泡被 document/window 捕获到。

## 通过哪个元素的何种属性来控制"页面"，使其滚动到指定的位置？

当然，我脑里出现这个疑问的时候，还不知道页面滚动事件的目标是 document 。所以，我用 jQuery 进行了一系列的探索（骄傲状）。为什么用 jQuery 呢，最大的原因当然是它提供了 `$.scrollTop()` 方法。闲话不多说，来看代码：

```js
$("#btn").click(function(e){
  $(window).scrollTop(300); // 都可以
  $(document).scrollTop(300) // 都可以
  $("html").scrollTop(300); // Chrome 不可以
  $("body").scrollTop(300); // FireFox IE9+ 不可以
  return false;
});
```

当时的我，在测完这些代码的时候，内心是崩溃的。当然，在想通了“页面滚动时的 event.target 是谁”这个问题，外加翻了一下 jQuery 的源码后，我觉得我自己真是太蠢了。首先我们来看一下 jQuery 的源码

```js
// jquery-1.9.1.js
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {

  // 根据 $.each 方法，可以得出
  // prop 的值为 pageXOffset 或者 pageYOffset
  // method 的名字为 scrollLeft 或者 scrollTop

  var top = /Y/.test( prop ); 	// 判断是否含有字母 Y

  jQuery.fn[ method ] = function( val ) {
    // jQuery 定义 $ 对象方法的一种方式
    return jQuery.access( this, function( elem, method, val ) {
      // win 的值为两种 window 或者 false
      var win = getWindow( elem );

      // $.scrollTop()，直接返回值
      if ( val === undefined ) {
        return win ? (prop in win) ? win[ prop ] :
          win.document.documentElement[ method ] :
          elem[ method ];
      }
      // 使用 window.scrollTo 方法
      if ( win ) {
        win.scrollTo(
          !top ? val : jQuery( win ).scrollLeft(),
          top ? val : jQuery( win ).scrollTop()
        );

      } else {
        elem[ method ] = val;
      }
    }, method, val, arguments.length, null );
  };
});

// 判断 elem 是否为 window 或 document ，是则返回 window ，不是则为 false
function getWindow( elem ) {
  return jQuery.isWindow( elem ) ?
    elem :
    // document.nodeType === 9
    elem.nodeType === 9 ?
      // 通过 document 来获得 window
      elem.defaultView || elem.parentWindow :
      false;
}
```
我得出以下几点：

- `$(window).scrollTop(300)` 与 `$(document).scrollTop(300)` 都是使用的 `window.scrollTo()` 方法。
- Chrome 上，`$("html").scrollTop(300)` 使用的是body元素的 `scrollTop/Left` 方法。可以通过 `document.querySelector("body").scrollTop = 20` 来测试。同理，在 FireFox 和 IE9+ 上，使用的是 html 元素的 `scrollTop/Left` 方法。可以通过`document.querySelector("html").scrollTop = 20` 来测试。

```js
$(window).scrollTop(300);
$(document).scrollTop(300)
$("html, body").scrollTop(300);
```

所以到此为止，在不考虑兼容性的情况下，这个问题的答案就是：**window对象的scrollTo()方法、body/html.scrollTop/Left**

我们没有考虑原生，那原生有没有解法呢？当然是有的。

```js
document.body.scrollTop = 300; // FireFox IE9+ 不可以
document.documentElement.scrollTop = 300; // Chrome 不可以 document.documentElement === html
```

## 综上

页面滚动条是属于 document 的，但是通过 window 、document.body 、html ，可以控制它滚动到指定的位置。其实关于页面滚动的应用其实有很多，比如“返回顶部”、“Lazy Load”。

说(qi)点(shi)题(zai)外(tou)话(lan)：在解决这一系列问题的时候，其实 Google 了很多资料，也看了看 MDN。发现关于 scroll 相关的方法，是在是太多了。跳进去又是一个大坑，而跟本篇文章有没有很大的联系，所以，俺就不深究了。

## 参考链接

- [The scroll event is raised when the user scrolls the contents of a element-MDN](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onscroll)
>
- [http://help.dottoro.com/ljurkcpe.php](http://help.dottoro.com/ljurkcpe.php)

以上。
