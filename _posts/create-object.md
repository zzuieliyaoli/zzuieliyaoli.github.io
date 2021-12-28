---
layout: post
title:  "《JavaScript设计模式》(1)——创建对象、继承与封装"
date:   2015-5-5
categories: [Notes]
---

读书是一件纠结的事情。因为越读书，接触的知识面越广，就会发现自己懂得越少，疑问也就越多。可是读更多的书便可以接触到不同的看法、领略不同的思想，疑问也就会变少，以此得到精神的愉悦与个人能力的提升。

前人的短短数语，便可解今人之惑。实在是爽哉、妙哉。闲话不多讲，本文是《JavaScript设计模式》的读书笔记，涉及到JavaScript的创建对象、继承与封装。

## 创建对象

	var book = (function(){
	    //私有静态成员
	    var numOfBooks = 0;
	    //私有静态方法
	    function checkIsbn(isbn){
		  //...
	    }
	    //返回构造器
	    return function(newIsbn, newTitle, newAuthor){
		  //私有属性
		  var isbn, title, author;
		  //特权方法
		  this.getIsbn = function(){
			  return isbn;
		  };
		  this.setIsbn = function(){
			  if(!checkIsbn(newIsbn)) throw new Error("Book: Invalid ISBN.");
		  };
		  this.getTitle = function(){
			  return title;
		  };
		  this.setTitle = function(newTitle){
			  title = newTitle || "No title specified";
		  };
		  this.getAuthor = function(){
			  return author;
		  };
		  this.setAuthor = function(newAuthor){
			  author = newAuthor || "No author specified";
		  };
		  this.setIsbn(newIsbn);
		  this.setTitle(newTitle);
		  this.setAuthor(newAuthor);
		}
	})();

	//公有静态方法
	Book.converToTitleCase = function(inputString){
		//...
	};
	//公有，非特权方法
	Book.prototype = {
		display: function(){
			//...
		}
	};

如上所示，使用作用域或闭包的概念创建的静态成员，包括公用的和私用的。大多数方法和属性所关联的是类的实例，而静态成员所关联的则是类本身。换句话说，静态成员是类的层次上操作，而不是在实例的层次上操作。每个静态成员都只有一份，静态成员是直接通过类对象访问的。

## 继承与封装

从现有的类派生出一个子类时，只有公有和特权成员会被承袭下来。子类无法访问到父类的私有方法。

在派生具有真正的私有成员的类时，因为其特权方法是公有的，所以它会被遗传下来。藉此可以在子类中简介访问父类的私有属性，但子类自身的实例方法都不能直接访问这些私有属性。父类的私有成员只能通过这些既有的特权方法进行访问，你不能在子类中添加能够直接访问它们的新的特权方法。

以上。
