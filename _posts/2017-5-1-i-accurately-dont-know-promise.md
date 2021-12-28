---
layout: post
title:  "再学一遍 Promise"
date:   2017-5-1
categories: [JavaScript]
---

> 学习使我快乐

## 学习资料

- [We have a problem with promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)
- [Promise Anti-patterns](http://taoofcode.net/promise-anti-patterns/)
- [Promise anti patterns](https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns)
- [JavaScript Promise迷你书（中文版）](http://liubin.org/promises-book/)
- [Promises/A+](https://promisesaplus.com/)

简单来讲，就是过了一遍基础知识（迷你书）和规范（Promise/A+），再看了一些反模式总结。

## 总结

#### 1、 The whole point of promises is to give us back the language fundamentals we lost when we went async: return, throw, and the stack. 

#### 2、 即使在调用 promise.then 注册回调函数的时候 promise 对象已经是确定的状态，Promise 也会以异步的方式调用该回调函数。

```js
const promise = new Promise((resolve) => {
    console.log("inner promise"); // 1
    resolve(42);
});
promise.then((value) => {
    console.log(value); // 3
});
console.log("outer promise"); // 2
```
<a class="jsbin-embed" href="https://jsbin.com/cebema/embed?js,console">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.41.10"></script>

#### 3、 实际上不管是 then 还是 catch 方法调用，都返回了一个新的 Promise 对象

```js
// bad
const promise = () => (new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, 2000)
}))
promise.then((value) => (
  new Promise((resolve) => {
    resolve()
  }))
).then(() => {
  // do something
})
```

```js
// good
const promise = () => (new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, 2000)
}))
promise.then((value) => {
  // do something
  return value
}).then(() => {
  // do something
})
```

当然，如果是多个异步顺序执行，还是要：

```js
const promise = () => (new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, 2000)
}))
promise.then((value) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  }))
).then(() => {
  // do something
})
```

#### 4、 Promise.resolve 可以将 thenable 对象转换为 Promise 对象

```js
const promise = Promise.resolve($.ajax('/json/comment.json')); // => promise 对象
promise.then((value) => {
   console.log(value);
});
```

#### 5、 Promise#catch 只是 promise.then(undefined, onRejected) 方法的一个别名

#### 6、 不能进行错误处理的 onRejected

```js
// bad
const promise = () => (Promise.resolve())
promise.then((value) => {
  throw new Error()
}, (error) => {
  // 不能处理 error
})
```

或者只能处理如下 Error：

```js
const promise = () => (Promise.resolve())
promise.then(() => {
  throw new Error('error')
}).then(null, (error) => {
  console.log(error)
})
```
所以对于上面 bad 的情况，这么写：

```js
// good
const promise = () => (Promise.resolve())
promise.then((value) => {
  throw new Error()
}).catch((error) => {
  // do something
})
```

以上。
