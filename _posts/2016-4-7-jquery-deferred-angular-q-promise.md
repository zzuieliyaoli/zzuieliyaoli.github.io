---
layout: post
title:  "jQuery Deferred、Angular $q、ES6 Promise"
date:   2016-4-7
categories: [JavaScript]
---

jQuery 中的 Deferred() 、 Angular 中的 $q() 、ES6 中的 Promise 都是为了解决异步而各自实现或定义的方法。

## jQuery Deferred()

### 直接通过调用 `$.Deferred()` 可以返回一个新的 deferred 对象。

<a class="jsbin-embed" href="https://jsbin.com/ruwoso/embed?js,console">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.35.12"></script>


### 调用 `$.Deferred()` 时是可以传入一个函数，这个函数会先于 `$.Deferred()` 返回（A function that is called just before the constructor returns）。

<a class="jsbin-embed" href="https://jsbin.com/kepuba/embed?js,console">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.35.12"></script>


### Deferred.promise()

<a class="jsbin-embed" href="https://jsbin.com/loseta/embed?js,console">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.35.12"></script>

The Promise exposes only the Deferred methods needed to attach additional handlers or determine the state ( `then` , `done` , `fail` , `always` , `pipe` , `progress` , `state` and `promise` ).

<a class="jsbin-embed" href="https://jsbin.com/powofi/embed?js,console">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.35.12"></script>


But not ones that change the state (`resolve` , `reject` , `notify` , `resolveWith` , `rejectWith` , and `notifyWith`).

<a class="jsbin-embed" href="https://jsbin.com/zeqevoy/4/embed?js,console">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.35.12"></script>

If `target` is provided, `deferred.promise()` will attach the methods onto it and then return this object rather than create a new one. This can be useful to attach the Promise behavior to an object that already exists.

If you are creating a Deferred, keep a reference to the Deferred so that it can be resolved or rejected at some point. Return only the Promise object via `deferred.promise()` so other code can register callbacks or inspect the current state.

<a class="jsbin-embed" href="https://jsbin.com/gicavo/embed?js,console">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.35.12"></script>


## Angular $q

$q can be used in two fashions --- one which is more similar to Kris Kowal's Q or jQuery's Deferred implementations, and the other which resembles ES6 (ES2015) promises to some degree.

### ES6-style

<a class="jsbin-embed" href="https://jsbin.com/taxuju/embed?js,console">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.35.12"></script>

Note: progress/notify callbacks are not currently supported via the ES6-style interface.

Note: unlike ES6 behavior, an exception thrown in the constructor function will NOT implicitly reject the promise.


### jQuery's Deferred

<a class="jsbin-embed" href="https://jsbin.com/govina/embed?js,console">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.35.12"></script>

### Differences between Kris Kowal's Q and $q

Here are two main differences:

- $q is integrated with the $rootScope.Scope Scope model observation mechanism in angular, which means faster propagation of resolution or rejection into your models and avoiding unnecessary browser repaints, which would result in flickering UI.
- Q has many more features than $q, but that comes at a cost of bytes. $q is tiny, but contains all the important functionality needed for common async tasks.

## ES6 Promise

<a class="jsbin-embed" href="https://jsbin.com/pijonec/embed?js,console">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.35.12"></script>

### Reference

- [jQuery-DeferredObject](https://api.jquery.com/category/deferred-object/)
- [Angular-$q](https://docs.angularjs.org/api/ng/service/$q)
- [ES6 Promise](http://liubin.org/promises-book/)
