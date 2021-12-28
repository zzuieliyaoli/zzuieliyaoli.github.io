---
layout: post
title:  "2015年360前端星第3天(2)"
date:   2015-6-4
categories: [360前端星]
---

这一篇里的内容，以我现在的能力还不能完全理解，只当是记录吧。我觉着这次360之行有点悬。。。

## JavaScript

### multicast

	function multicast(fn) {
	  return function (){
	    var pre = [].slice.call(arguments[0]);
		// 获取arguments[0]后面的参数
	    var rest = [].slice.call(arguments, 1);
	    var ret = pre.map(function(ele) {
		  // 将[ele]与ret拼接，组成数组。
		  // 利用apply，直接使用fn函数
	      return fn.apply(this, [ele].concat(rest));
	    })
	    return ret;
	  }
	}

	function add(x, y){
      return x + y;
	}

	var add = multicast(add);

	add([2,3,4],5); // [7,8,9]

### 过程抽象

	function registerCustomEvent(type, options){
	  var evt = document.createEvent('Events');
	  evt.initEvent(type, false, false);
	  for(var i in options){
	    evt[i] = options[i];
	  }
	  window.dispatchEvent(evt);
	}

	function watch(func){
	  return function(){
	    var evtArgs = {
	      func: func,
	      args: [].slice.apply(arguments),
	      thisObj: this
	    };

	    registerCustomEvent('beforecall', evtArgs);
	    evtArgs.returnValues = [func.apply(this, evtArgs.args)];
	    registerCustomEvent('aftercall', evtArgs);

	    return evtArgs.returnValues[0];
	  }
	}

	function add(x, y){
	  return x + y;
	}

	add = watch(add);

	window.addEventListener('beforecall', function(evt){
	  console.log(evt);
	  evt.args[0] *= 2;
	});

	window.addEventListener('aftercall', function(evt){
	  console.log(evt);
	  evt.returnValues[0] = evt.thisObj;
	});

	console.log(add(2, 3));

私以为这和设计模式中“装饰者”很像。但是怎么用，还需要我继续探索。

以上。
