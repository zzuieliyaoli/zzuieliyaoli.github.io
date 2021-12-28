---
layout: post
title:  "2015年360前端星第3天(1)"
date:   2015-5-31
categories: [360前端星]
---

今天内容有很多，慢慢来梳理一下。

## JavaScript

###1. 基于requestAnimationFrame的动画

		// requestAnimFrame 兼容性
	    window.requestAnimFrame = (function() {
	      return window.requestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
	        window.mozRequestAnimationFrame ||
	        function(callback) {
	          // 1000/60 根据显示器的刷新频率60Hz确定最佳渲染间隔
	          window.setTimeout(callback, 1000 / 60);
	        };
	    })();

requestAnimationFrame()这个方法是用来在页面重绘之前，通知浏览器调用一个指定的函数，以满足开发者操作动画的需求。这个方法接受一个函数为参，该函数会在重绘前调用。

下面是月影大大利用该方法封装的一个简单的动画函数。


	    /**
	    * param {Object} 动画目标
	    * param {number} 动画持续时间
	    */
	    function Animation(target, dur) {
	      this.target = target;
	      this.dur = dur;

	      // p = 动画已执行时间 / 动画持续的时间
		  // 等同于物体运动公式中的时间 t
		  // p的取值范围[0,1]，用来控制缓动或渐变过程
	      this.easing = function(p) {
	        return p
	      };
	    }

	    Animation.prototype = {
	      constructor: Animation,

	      // 动画结束时的回调函数
	      onFinished: function() {
	        console.log("animation finished");
	      },

	      // 具体控制动画的函数
	      onProgress: function(p) {
	        console.log("animation playing: " + p);
	      },

	      // 动画初始化
	      start: function() {
	        this.p = 0;
	        this.startTime = Date.now();

	        var self = this;
	        requestAnimationFrame(function f() {
	          if (self.p >= 1) {
	            self.onProgress(self.easing(1.0));
	            self.onFinished();
	          } else {
	            self.p = (Date.now() - self.startTime) / self.dur;
	            self.onProgress(self.easing(self.p));
	            requestAnimationFrame(f);
	          }
	        });
	      }
	    };

利用上面的封装函数，我们可以更加简洁的写出一些有趣事情，而这些有趣的事情都与`p`有关，即物体运动公式中的时间t。嗯，月影大大的课让我懂得了，数学、物理无比重要。

#### 匀速直线运动

	    (function start(){
		  var target = document.querySelector("#block");

		  var anim = new Animation(target, 2000);

		  anim.onProgress = function(p){

		    this.target.style.left = 400 + 500 * p + "px";
		  }
		  anim.onFinished = function(){
		    anim.start();
		  }
		  anim.start();

		})();

[DEMO](http://code.w3ctech.com/detail/1030)

#### 匀加速直线运动

	(function start() {
	  var target = document.querySelector("#block");

	  var anim = new Animation(target, 2000);

	  anim.onProgress = function(p) {
	    this.target.style.left = 400 + 500 * 0.5 * p * p + "px";
	  }
	  anim.onFinished = function() {
	    anim.start();
	  }
	  anim.start();

	})();

[DEMO](http://code.w3ctech.com/detail/1032)

#### 匀速圆周运动

		(function start(){
		  var target = document.querySelector("#block");

		  var anim = new Animation(target, 2000);


		  anim.onProgress = function(p){
		    this.target.style.left = 400 + 50 * Math.sin( p * 2 * Math.PI ) + "px";
		    this.target.style.top = 400 + 50 * Math.cos( p * 2 * Math.PI ) + "px";
		  }
		  anim.onFinished = function(){
		    anim.start();
		  }
		  anim.start();

		})();

[DEMO](http://code.w3ctech.com/detail/1031)

#### 小球坠落bounce

		(function start() {
		  var target = document.querySelector("#block");
		  var anim = new Animation(target, 2000);

		  function bounce(p){
		    if (p < 1/2.75) {
		      return (7.625 * p * p);
		    }else if (p < (2 / 2.75)){
		      return (7.5625 * (p -= (1.5 / 2.75)) * p + 0.75);
		    }else if (p < (2.5 / 2.75) ){
		      return (7.5625 * (p -= (2.25 / 2.75 )) * p + 0.9375);
		    }else {
		      return (7.5625 * (p -= (2.625 / 2.75 )) * p + 0.984375);
		    }
		  }
		  anim.onProgress = function(p) {
		    this.target.style.top = 200 + 500 * bounce(p) + "px";
		    this.target.style.left = 300 + "px";
		  }
		  anim.onFinished = function() {
		    anim.start();
		  }
		  anim.start();

	})();

[DEMO](http://code.w3ctech.com/detail/1034)

### 2. DOMContentLoaded VS onload

[http://code.w3ctech.com/detail/11](http://code.w3ctech.com/detail/11)

这是JavaScript框架QW里的DOM.ready（）方法。里面的代码我就不一一分析了，主要是学习思路和不熟悉的API。

由于不知道参数doc的具体类型（默认为document），一共有三种类型：document、节点元素、iframe，所以代码会有一些条件判断。

首先是`if ('complete' == doc.readyState) `，这是用于document对象。当document文档正在加载时,返回"loading"；当文档结束渲染但在加载内嵌资源时,返回"interactive"；当文档加载完成时,返回"complete"。

第二是`doc.addEventListener('DOMContentLoaded', execCbs, false);`，可用于节点元素、document。与此并列还有`win.addEventListener("load", execCbs, false);`，因为当页面文档完全加载并解析完毕后就触发“DOMContentLoaded”,不管样式文件、图片文件，还有子框架，所以需加上对load事件的监听。

第三是`doc.body.doScroll('left')`和`doc.attachEvent('onreadystatechange',function(){})`。这是对低版本浏览器的兼容。

重复执行`doc.body.doScroll('left')`可以检测DOM文档是否加载完毕。

参考资料：

> [DOMContentLoaded-MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)

> [readystatechange-MDN](https://developer.mozilla.org/en-US/docs/Web/Events/readystatechange)

> [Difference between DOMContentLoaded and Load events-stackoverflow](http://stackoverflow.com/questions/2414750/difference-between-domcontentloaded-and-load-events)

> [onLoad and onDOMContentLoaded](http://javascript.info/tutorial/onload-ondomcontentloaded)

> [从onload和DOMContentLoaded谈起](http://www.cnblogs.com/hh54188/archive/2013/03/01/2939426.html)

以上。
