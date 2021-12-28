---
layout: post
title: "学习 React 的最佳实践（Best Practices）"
date: 2018-03-15
categories: [React]
---

> 博采众长，摘取重点或盲区

## [《Airbnb React/JSX Style Guide》](https://github.com/airbnb/javascript/tree/master/react)

配合 ESLint，可以极大提高代码质量。

## [《Clean Code vs. Dirty Code: React Best Practices》](http://americanexpress.io/clean-code-dirty-code/)

虽然标题是关于 “React Best Practices”，但是文中提到关于 Clean Code 的原则并不只适用于 React，也可以适用其他编程语言或场景。

- Clean code passes the “smell test”
- Clean code is DRY
- Clean code is predictable and testable
- Clean code is self-commenting
- Naming things
- Clean code follows proven design patterns and best practices
- Clean code doesn’t (necessarily) take longer to write

## [《Our Best Practices for Writing React Components》](https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8)

- Passing setState a Function

  ```js
  // bad
  this.setState({ expanded: !this.state.expanded })

  // good
  this.setState(prevState => ({ expanded: !prevState.expanded }))
  ```

  React batches state changes for performance reasons, so the state may not change immediately after setState is called.

  That means you should not rely on the current state when calling setState — since you can’t be sure what that state will be!

- Avoid passing new closures to subcomponents

  ```jsx
  // bad
  <input
    type="text"
    value={model.name}
    onChange={(e) => { model.name = e.target.value }}
    placeholder="Your Name"
  />

  // good
  <input
    type="text"
    value={model.name}
    onChange={this.handleChange}
    placeholder="Your Name"
  />
  ```

  Every time the parent component renders, a new function is created and passed to the input.

  If the input were a React component, this would automatically trigger it to re-render, regardless of whether its other props have actually changed.

- Conditionals in JSX

  ```jsx
  // 返回 IIFE
  // 缺点在于性能，每次 render 时都会创建一个新的匿名函数
  <div>{
    (() => {
      if (isValid) {
        return <Result />
      } else {
        return <Error />
      }
    })()
  }</div>
  ```

  ```jsx
  // 拆分组件，根据 prop 渲染
  <div>{
    isValid ? <Result /> : <Error />
  }</div>
  ```

## [《9 things every React.js beginner should know》](https://camjackson.net/post/9-things-every-reactjs-beginner-should-know)

- Write stateless components
  - State makes components difficult to test
  - State makes components difficult to reason about
  - State makes it too easy to put business logic in the component
  - State makes it difficult to share information to other parts of the app

## [《React.js Best Practices and Tips by Toptal Developers》](https://www.toptal.com/react/tips-and-practices)

- Create Tiny Components That Just Do One Thing
  - Do you have some elements in your render method that need to be updated much more often than others? Extract that chunk into a separate component, and try to localize the state updates inside (if it makes sense), or implement `shouldComponentUpdate` in the other components to avoid unnecessary re-renders.


以上。
