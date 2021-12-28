---
layout: post
title:  "那些年，学 React.js 遇到的坑"
date:   2016-09-15
categories: [React]
---

## `React` VS `ReactDom`

在学 React 看资料和 Demo 时，遇到这样的代码：

```js
// ES6
import React from 'react'
import ReactDOM from 'react-dom'

// CommonJS
const React = require('react')
const ReactDom = require('react-dom')
```

<img src="/images/emojis/question.jpg" alt="黑人问号" style="width: 200px;">

不要怕，其实是这样的：在 React v0.14 时，React被拆分为 `react` 好 `react-dom` 两个包。如下：

- react
  - React.createElement
  - React.createClass
  - React.Component
  - React.PropTypes
  - React.Children
- react-dom
  - ReactDOM.render
  - ReactDOM.unmountComponentAtNode
  - ReactDOM.findDOMNode
  - server
    - ReactDOMServer.renderToString
    - ReactDOMServer.renderToStaticMarkup

按照官方的说法，这样做的原因是为了 React 早日一统江湖，跨平台地（isomorphic）分享组件代码。

> As we look at packages like react-native, react-art, react-canvas, and react-three, it has become clear that the beauty and essence of React has nothing to do with browsers or the DOM.
>
> To make this more clear and to make it easier to build more environments that React can render to, we’re splitting the main react package into two: react and react-dom. This paves the way to writing components that can be shared between the web version of React and React Native. We don’t expect all the code in an app to be shared, but we want to be able to share the components that do behave the same across platforms.

Reference

- [React v0.14](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html)
- [React vs ReactDOM?](http://stackoverflow.com/questions/34114350/react-vs-reactdom)

## 为啥 `React.Component` 比 `React.createClass` 要多 `bind(this)` ？

对比 `React.Component` 与 `React.createClass` 相关的资料有很多:

- [React.createClass versus extends React.Component](https://toddmotto.com/react-create-class-versus-component/)
- [React.Component vs React.createClass](https://reactjsnews.com/composing-components)

其中最令我迷惑的就是 `React.Component No Autobinding`。

<img src="/images/emojis/question.jpg" alt="黑人问号" style="width: 200px;">

这篇文章讲的超级棒！[Why and how to bind methods in your React component classes?](http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/)

简单来讲，对于 `React.createClass` 来说，`render` 的情况如下：

```js
const obj = {
  name: 'react',
  render() {
    console.log(this.name)
  }
}

// onClick = this.clickHandler
obj.render() // 'react'
```

`this` 可以正确被绑定。

但是 `React.Component` 来讲，`render` 的情况如下：

```js
const name = 'window'
const obj = {
  name: 'react',
  render() {
    console.log(this.name)
  }
}

// onClick = this.clickHandler
const f = obj.render
f() // 'window'
```


