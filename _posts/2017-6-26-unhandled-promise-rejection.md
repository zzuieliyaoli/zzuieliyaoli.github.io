---
layout: post
title:  "unhandled promise rejection"
date:   2017-6-26
categories: [JavaScript]
---

> 我的高中物理老师常说：基础不牢，地动山摇。学习如此，编程也如此。

本来打算整理一篇最近学习 Node 的笔记，但我发现始终卡在 `错误处理` 这块，其中最让我迷惑当属 Node 如下的报错：

```sh
(node:17928) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): Error
(node:17928) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

这篇文章先来看一下 `unhandled promise rejection`。

## 在什么情况下会出现：`UnhandledPromiseRejectionWarning`

> 或者说：什么是 `unhandled promise rejection`

当 `Promise` 的状态变为 `rejection` 时，我们没有正确处理，让其一直冒泡（propagation），直至被进程捕获。这个 `Promise` 就被称为 `unhandled promise rejection`。

`Promise` 的异常，有两种触发方式：

- 主动调用 `reject` 方法
- 抛出异常（exception）

```js
// reject
new Promise((resolve, reject) => {
  reject('timeout');
});

// exception
new Promise((resolve, reject) => {
  undefinedVariable();
});
```

我们有两种方式去处理 `rejection`，`方式二` 是 `方式一` 的语法糖。

```js
// 方式一 .then(undefined, () => {})
new Promise((resolve, reject) => {
  // ...
  reject('timeout');
}).then(undefined, (error) => {
  console.error(error);
});

// 方式二 .catch(() => {})
new Promise((resolve, reject) => {
  // ...
  reject('timeout')
}).catch((error) => {
  console.error(error);
})
```

关键点是：不能在让异常继续往上抛（propagation）了，否则还是会触发 `unhandled promise rejection`。如下代码所示：

```js
// 方式一
new Promise((resolve, reject) => {
  // ...
  reject('timeout');
}).then(undefined, (error) => {
  throw new Error(error);
});

// 方式二
new Promise((resolve, reject) => {
  // ...
  reject('timeout');
}).catch((error) => {
  throw new Error(error);
});
```

原因在于：不论 `.then(onFulfilled, onRejection)` 中的 `onFulfilled` 还是 `onRejection` 返回的都是 `Promise`，如果在他们内部抛出了异常，那么意味着接下来的 `then chains` 还是 `rejection` 的。

```js
const promise2 = (new Promise((resolve, reject) => {
  // ...
  reject('timeout');
}).catch((error) => {
  throw new Error(error);
}));
```

在这里，对于 `promise2` 来讲，它的 `rejectiton` 还没有被 `handle`。所以，还需要做如下处理：

```js
const promise2 = (new Promise((resolve, reject) => {
  // ...
  reject('timeout');
}).catch((error) => {
  throw new Error(error);
}));

promise2.catch((error) => {
  console.error(error);
});
```

### Async/Await 中

在 `Async/Await` 中，`unhandled promise rejection` 是这样触发：

```js
// Promise 未能阻止异常抛出
;(async () => {
  await (new Promise((resolve, reject) => {
    reject('timeout');
  }));
})();

// async 没有妥善处理异常
;(async () => {
  try {
    await (new Promise((resolve, reject) => {
      reject('timeout');
    }));
  } catch(e) {
    throw new Error(e);
  }
})();
```

## 怎么得到 `错误堆栈`

> Node.js v8.1.2 Documentation: https://nodejs.org/api/process.html#process_event_unhandledrejection

```js
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
```

## 参考

- [Promises/A+](https://promisesaplus.com/)
- [Possibly Unhandled Rejection NodeJS Promise Hook](https://gist.github.com/benjamingr/0237932cee84712951a2)
- [应该如何理解 Erlang 的「任其崩溃」思想？](https://www.zhihu.com/question/21325941/answer/173370966)
