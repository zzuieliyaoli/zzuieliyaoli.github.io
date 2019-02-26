---
layout: post
title:  "2015年360前端星第2天"
date:   2015-5-30
categories: [360前端星]
---

第二天结束了，痛苦并快乐着。

痛苦是因为被月影大神虐JavaScript，快乐是360的伙食很好，哈哈。

## JavaScript

1. 以前我会有疑问，为什么那么多的库会封装各种各样用于检测变量类型的函数。答案是：由于JavaScript本身的动态性，每个变量仅仅是一个用于保存值的占位符而已。

	在代码运行的过程中，变量可能会被改变类型。夸张点说，不到运行前的最后一刻，谁也没办法保证变量的类型是自己需要的那种。所以我们不能寄希望于运行环境或者程序员不去改变变量的类型，要在必要的时候进行变量类型的判定。

2. `Object.defineProperty()`方法的使用


	1. 防止对象属性被更改

			var person = {};
			Object.defineProperty(person, "name", {
				writable: false,
				value: "zzuieliyaoli"
			});
			console.log(person.name); // zzuieliyaoli

			person.name = "hansome";
			console.log(person.name); // zzuieliyaoli

		创建了一个只读的属性name，其值不能被修改。如果修改值的话会被浏览器忽略。如果在严格模式下，赋值操作将会导致抛出错误。

	2. 通过访问器的getter与setter函数，在读、写属性时进行一些操作。在读取访问器属性时，会调用getter函数，这个函数负责返回有效的值；在写入访问器属性时，会调用setter函数并传入新值，这个函数负责决定如何处理数据。

			var person = {
				_age: 0,
				adult: false

			};
			Object.defineProperty(person, "age", {
				get: function(){
					return this._age;
				},
				set: function(newValue){
					this._age = newValue;

					if (newValue >= 18) {
						this.adult = true;
					}
				}
			});

			person.age = 22;
			console.log(person.adult); // true
			console.log(person.age); // 22

		这是使用访问器属性的常见方式，即设置一个属性值为导致其他属性发生变化。

	3. 函数声明以及函数声明提升

		这一部分经常和变量的赋值搞在一起，让我们一起来捋一捋。

		1. 例子一

				(function a(){
					console.log(i);
					for(var i=0; i<10; i++);
					console.log(i);
				})();

			等价于：

				(function a(){
					var i;
					console.log(i); // undefined
					for(var i=0; i<10; i++);
					console.log(i); // 10
				})();


		解释：(function a(){})()中变量i被提升，第一次console.log时，i未被赋值，而第二次log时，经过for循环，i = 10;


		2. 例子二

				var a = function(){
					return 11;
				}
				console.log(a());  // 11

				function a(){
					return 10;
				}
				console.log(a()); // 11

			等价于

				function a(){
					return 10;
				}

				var a = function(){
					return 11;
				}

				console.log(a()); // 11
				console.log(a()); // 11

			解释： function比var还要优先

		3. 例子三

				var a = function(){
					return 11;
				}
				console.log(a()); // 11

				var a = funtion(){
					return 10;
				}
				console.log(a()); // 10

			等价于：

				var a = function(){
					return 11;
				}
				console.log(a()); // 11

				var a = funtion(){
					return 10;
				}
				console.log(a()); // 10

		注意点： 函数表达式和一般的表达式一样，都是执行到的时候才编译。也就是说函数表达式只能在代码执行阶段创建而且不存在于变量对象中，换个更通俗的说法是：函数表达式只有当执行到的时候，其才存在，否则是当他不存在的。

	> [https://msdn.microsoft.com/zh-cn/library/hh968323.aspx](https://msdn.microsoft.com/zh-cn/library/hh968323.aspx)

	> [http://openwares.net/js/javascript_declaration_hoisting.html](http://openwares.net/js/javascript_declaration_hoisting.html)

## CSS

1. 有时候为块级元素设置百分比高度的时候，会无效。因为此时的包含块的高度是靠内部元素撑起来的。如果内部元素再以百分比设置高度，就会造成循环引用。这样设置高度就会无效。

	比如，如果想要一个元素的高度为body的100%，要同时把body、html元素的高度设置为100%；

2. 浮动的清除可以用来建立“左栏固定，右栏自适应”经典布局。[demo](http://code.w3ctech.com/detail/684)。需要注意的是，在实际的使用当中，左栏与右栏的高度不会一致，这样就会使得较高度较高一栏的文字环绕另一个高度较低的一栏。这时候需要对高度较高的一栏触发BFC。

3. 有时候我们需要文字环绕图片，但是文字紧挨图片会显得不够优雅，为图片设置外边距可以避免文字过于紧挨。

4. 绝对定位元素的高度与宽度可以由left、top、bottom、right确定。比如，一个元素left:0;right:0;那么其宽度就为视口的100%；

6. 当同时有left、right、width时，优先width;

7. 利用绝对定位、:after、:before制造一些小图标。 [http://saeedalipoor.github.io/icono/](http://saeedalipoor.github.io/icono/)    
