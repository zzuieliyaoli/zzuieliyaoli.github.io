---
layout: post
title:  "记 Angular1 对 JavaScript 运行时错误的处理"
date:   2017-04-22
categories: [Angular]
---

## 正文

在 Angular1 中，`uncaught exceptions` 会被在 `$exceptionHandler service` 集中处理，并通过 `console.error()` 将报错信息输出。

```js
// https://github.com/angular/angular.js/blob/master/src/ng/rootScope.js
$apply: function(expr) {
  try {
    beginPhase('$apply');
      try {
        return this.$eval(expr);
      } finally {
        clearPhase();
      }
    } catch (e) {
      $exceptionHandler(e);
    } finally {
      try {
        $rootScope.$digest();
      } catch (e) {
        $exceptionHandler(e);
      throw e;
    }
  }
},
```

这意味着，Angular1 中的运行时错误，将不会被 `window.onerror` 捕获。

<a class="jsbin-embed" href="https://jsbin.com/xulofuc/embed?html,console,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.41.10"></script>

好在可以改写 `$exceptionHandler service` ，使其可以被 `window.onerror` 捕获。

```js
// https://rollbar.com/blog/client-side-angular-error-handling/
angular.module('exceptionOverride', []).factory('$exceptionHandler',
  function() {
    return function(exception, cause) {
      exception.message += 'Angular Exception: "' + cause + '"';
      throw exception;
    };
  }
);
```

然后这样使用：

```js
var myModule = angular.module('myApp', ['exceptionOverride'])
```

<a class="jsbin-embed" href="https://jsbin.com/kirodox/embed?html,console,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.41.10"></script>

## 题外话

最近成功搭建了一套“前端异常监控系统”。

这套系统是根据这篇文章 [前端异常监控系统的落地](https://zhuanlan.zhihu.com/p/26085642) 
及其 [源代码](https://github.com/gomeplusFED/GER) 搭建的。
 
感谢他们对开源社区的贡献。

