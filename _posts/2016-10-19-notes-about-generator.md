---
layout: post
title:  "关于 Generator 的微小笔记"
date:   2016-10-19
categories: [JavaScript]
---

经常见如下的代码：


```js
co(function *() {
  // resolve multiple promises in parallel
  var a = Promise.resolve(1);
  var b = Promise.resolve(2);
  var c = Promise.resolve(3);
  var res = yield [a, b, c];
  console.log(res);
  // => [1, 2, 3]
}).catch(onerror);
```

其实是这样的：


```js
function co(genFunc) {
  const genObj = genFunc();
  step(genObj.next());

  function step({ value, done }) {
    if (!done) {
      // A Promise was yielded
      value
        .then(result => {
          step(genObj.next(result)); // (A)
        })
        .catch(error => {
          step(genObj.throw(error)); // (B)
        });
    }
  }
}
```

利用 `Generator` 的特性，在 `iterator.next()` 时，只有 `Promise` 被 `fullfilled` 后，才会运行 `yeild` 后的代码。

上面的例子是用的 [CO](https://github.com/tj/co)，是基于 Promise 的。与此类似的还有 [Q](https://github.com/kriskowal/q)，Q 在内部自己实现了 Promise 规范。

在这篇文章 [No promises: asynchronous JavaScript with only generators](http://www.2ality.com/2015/03/no-promises.html) 中，作者实现了一个小库，也可以同样完成相同的效果。不同的是实现原理：


```js
setTimeout(runYieldedValue, 0, yielded.value);
```

还要提到一个库 [wait-promise](https://github.com/akira-cn/wait-promise)。

参考文章：[http://exploringjs.com/es6/ch_generators.html](http://exploringjs.com/es6/ch_generators.html)

以上。
