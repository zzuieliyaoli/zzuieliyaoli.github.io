---
layout: post
title:  "倒计时与秒杀倒计时"
date:   2015-3-20
categories: [JavaScript]
---

观腾讯英福伦斯 2015 实习生招聘之收获。

哈哈，如果以为我会写一篇观后感，你就想多啦。

昨晚，腾讯 8 点有[2015 在线实习生宣讲会](http://imgcache.qq.com/ac/www_tencent/join/linkshow2015/online.html)。我怕开始时点不进去，就提前打开了页面。
因为距离开始还有一段时间，视频播放窗口有个倒计时，我就 F12，看了一下代码。
原理挺简单的。就没有放在心上。

今天在知乎上看到一个问题 [可以详细的讲一下平时网页上做活动时的倒计时是怎么实现的吗？](http://www.zhihu.com/question/28896402)？矮油，这不刚好是昨天晚上看的代码嘛？骗赞就是这么简单 ~\(≧▽≦)/~~~。如代码一所示。

不过，我却有更深的思考，源于这里 [2011 年 9 月 23 日，百度前端面试题对话记录（2）](http://blog.csdn.net/dxx1988/article/details/6948658)。里面有一个问题是这样的“假设让你做个时钟倒计时程序，现在很多网站都有那种秒杀的商品，下面都会有时钟倒计时的那种，你应该怎么设计？”这个题比知乎的提问更加深入，涉及到“秒杀倒计时的原理”。而“秒杀”由于其特殊性，比如准确性、安全性（不易被修改）等因素的影响，对代码要求更高。

经过一番资料的查询，对于“秒杀活动”，我认为在实际应用当中，是 setInterval() 与 AJAX 协同起来完成秒杀倒计时的。页面初始加载时，利用 setInterval() 进行倒计时。在即将倒数到约定时间时，AJAX 与服务器通信，验证时间时间是否正确。最后完成秒杀活动。当然， setInterval() 方法有其局限性，但商城是如何优化的，还需要我认真发掘。

以下是补充内容：

## 代码一

```js
setInterval("timer()", 1000); // 每隔 1S 执行一次

function timer() {
  var ts = (new Date(2015, 9, 1, 12, 0, 0)) - (new Date()); // 设置目标时间，并计算剩余的毫秒数

  var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);  // 计算剩余天数
  var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);  // 计算剩余小时
  var mm = parseInt(ts / 1000 / 60 % 60, 10);       // 计算剩余分钟
  var ss = parseInt((ts / 1000 ) % 60 , 10);        // 秒数

  // 为了美观，在剩余时间的数字小于 10 时转换为 0X
  dd = checkTime(dd);
  hh = checkTime(hh);
  mm = checkTime(mm);
  ss = checkTime(ss);

  // 重写数字
  $("#less_day").html(dd);
  $("#less_hour").html(hh);
  $("#less_minutes").html(mm);
  $("#less_seconds").html(ss);
}

// 为了美观，在剩余时间的数字小于 10 时转换为 0X
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
```

[这里是 Demo](../../demo/count-down.html)

但是这样的方法有其局限性：

- 这样仅仅实现了倒计时的功能而已
- setInterval() 函数自身精度有些误差
- 因为浏览器 JavaScript 代码执行进程的原因，会造成跳秒的效果
- 容易被修改

## 代码二

```js
var xhr = new XMLHttpRequest();
//这里的 testServer.txt，其实我没有创建，完全可以不需要这个文件，我们只是要时间罢了
xhr.open('get', 'testServer.txt', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) { // 状态 3 响应
    var header = xhr.getAllResponseHeaders(); // 获得所有的头信息
    alert(header); // 会弹出一堆信息
    // 弹出时间，那么可以利用获得的时间做倒计时程序了
    alert(xhr.getResponseHeader('Date'));
  }
}
xhr.send(null);
```

以上直接返回 HTTP 头部信息，保证了较高的时间准确度，安全性。当然通过通过 `XHR.readyState == 4` 也可以获得获得服务器时间，上面的代码知识为了证明：interactive 状态就可以获得 HTTP 头部内容

以上。

## 参考

- [可以详细的讲一下平时网页上做活动时的倒计时是怎么实现的吗？](http://www.zhihu.com/question/28896402)

- [由秒杀活动想到的](https://github.com/fwon/blog/issues/13)
