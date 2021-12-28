---
layout: post
title:  "我在中秋假日的大雨里看 Coding WebIDE 的源码"
date:   2016-09-16
categories: [React]
---

节前喜闻 Coding 开源他们的 WebIDE，往大了说是业界的一大幸事，往小了说可以让我学一下项目的结构和 React 的写法。在这中秋佳节之际、上海降下暴雨之时，孤独的我孤独的学习着源码。

相关的信息和源码如下：

- [Talk is cheap, PR your code.](https://ide.coding.net/community)
- [https://github.com/Coding/WebIDE](https://github.com/Coding/WebIDE)

## 浅显的整体感受

- 没有测试相关代码；
- 居然没有 `router` 相关的代码，哭啊。我正想学习一下 `React router` 相关代码的。不过对于 IDE 来讲，并没有 router 要切换；
- 所有的样式都放在 `./styles` 里面，并没有和相关 `js/jsx` 代码放在一起。也没有用 `CSS Modules` 或者 `BEM` 来控制 CSS 类的编写；
- `Redux` 的代码和相关 `js/jsx` 代码放在一起了。

## Packages

看了下 `package.json` 中的项目依赖，还是有很多陌生的包。大致过一下，不求深入理解，但求浅显印象。

### Redux Thunk

我理解 `Redux` 其实是参照着 `Vuex` 来理解。`Vuex` 的 `Mutation` 对应 `Redux` 的 `Reducer`。因为 `Vuex` 相比 `Redux` 减少了很多概念，所以这样理解 `Redux` 只是减少了猛然接受一个新鲜名词的 `异物感`，不能从实质上帮助理解。那对 `Redux` 应该有一个怎样正确的初步认识，知乎上 [理解 React，但不理解 Redux，该如何通俗易懂的理解 Redux？](https://www.zhihu.com/question/41312576) 中 [@Wang Namelos](http://zhihu.com/question/41312576/answer/90782136) 说的很棒。

回到 `Redux Thunk`，[官方](https://github.com/gaearon/redux-thunk) 是这样定义 Redux Thunk 的

> Thunk middleware for Redux

首先来看 `middleware`，[wiki](https://en.wikipedia.org/wiki/Middleware) 上对此的介绍与 [Redux官方文档（记为：文档，下同）](http://cn.redux.js.org/docs/advanced/Middleware.html)所述有所不同。我认为不管 `middleware` 究竟是什么，在`Redux` 中 `middleware` 的作用就和文档中描述的一样：

> 它提供的是位于 `action` 被发起之后，到达 `reducer` 之前的扩展点，可以利用 `Redux middleware` 来进行日志记录、创建崩溃报告、调用异步接口或者路由等。

简单表示就是：

> action -> middleware -> reducer

文档以一个 `问题: 记录日志` 来帮助我们理解 `Middleware`。

在 #3 时的

```js
middlewares.forEach(middleware =>
  store.dispatch = middleware(store)
)
```

其实是：

```js
let store
// forEach
store.dispatch = (action) => {
  // some action
  store.dispatch(action)
}
// forEach
store.dispatch = (action) => {
  // some action
  store.dispatch(action)
}
```

以上的代码其实是在每个 `middleware` 执行时能够正确顺序替换 `store.dispatch` 的理想情况下。 文档是这样说的：

> 如果 `applyMiddlewareByMonkeypatching` 方法中没有在第一个 `middleware` 执行时立即替换掉 `store.dispatch`，那么 `store.dispatch` 将会一直指向原始的 `dispatch` 方法。也就是说，第二个 `middleware` 依旧会作用在原始的 `dispatch` 方法

这也就引出了新问题：如何将 `middlewares` 串连起来。解决问题的办法本质上就是 `避免出现无法立即替换`。

在 #6 的代码是这样的:

```js
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

let dispatch = store.dispatch
middlewares.forEach(middleware =>
  dispatch = middleware(store)(dispatch)
)
```

> `middleware` 以方法参数的形式接收一个 `next()` 方法，而不是通过 `store` 的实例去获取。

关于 `middleware` 就先说到这里，下面接着看：为什么需要 `Redux Thunk`。

[官方](https://github.com/gaearon/redux-thunk) 给出了一个在 stackoverflow 的回答：[How to dispatch a Redux action with a timeout?](http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559) 这个回答概括起来有以下几点：

- 简单的应用、简单问题用 React 自带的工具解决就够了。
- `Redux Thunk` 帮你抹平同步代码与异步代码的区别。因为异步代码需要手动传入 `dispatch` 太烦了，而且也容易出错。

答主也给了一些 [Redux Async Example](https://github.com/reactjs/redux/tree/master/examples/async)。在这个回答内包括其他回答，有提到 `Redux Saga` 和 `Redux Loop` 了，不过我已经不打算再深究下去了。

### loadsh

[A modern JavaScript utility library delivering modularity, performance, & extras.](https://github.com/lodash/lodash)

### Webpack Merge

[Merge designed for Webpack](https://github.com/survivejs/webpack-merge)

### Classnames

[Classnames A simple javascript utility for conditionally joining classNames together.](https://github.com/JedWatson/classnames)

## 小节

我想我会继续学习源码，不过就是另外的文章了吧。

另外，知乎上有关于如何写一个 Web IDE 的讨论 [要实现一个 Web IDE 需要哪些前端技术？](https://www.zhihu.com/question/41050429)

以上。
