---
layout: post
title: "学习 React 基础"
date: 2018-03-14
categories: [React]
---

## [事件处理](https://reactjs.org/docs/handling-events.html)

```jsx
// bad
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

The problem with this syntax is that a different callback is created each time the LoggingButton renders. In most cases, this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering. We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.

## [Lists and Keys](https://reactjs.org/docs/lists-and-keys.html#extracting-components-with-keys)

Keys only make sense in the context of the surrounding array.

## [Forms](https://reactjs.org/docs/forms.html)

An input form element whose value is controlled by React in this way is called a **“controlled component”**.

## Lifecycle Methods

> [React.Component](https://reactjs.org/docs/react-component.html#the-component-lifecycle)

> [I wish I knew these before diving into React](https://engineering.opsgenie.com/i-wish-i-knew-these-before-diving-into-react-301e0ee2e488)

> 《深入浅出 React 与 Redux》

### Mounting

![Mounting: an instance of the component is being created and inserted into the DOM.](https://cdn-images-1.medium.com/max/1600/0*-WAfLyN5ufULfPnR.)

- 一个 React 组件可以忽略其他所有生命周期函数不实现，但是一定要实现 `render()`。
因为所有 React 组件的父类 React.Component 类对 `render()` 之外的生命周期函数都有默认实现。
- `componentWillMount()`
  - 基本无用，即使在其内部调用 `this.setState()` 也无法引起重新绘制。
  换句话说，所有可以在其内完成的操作，都可以放到 `constructor()` 中去完成。
  - 既可以在服务器端调用，也可以在浏览器端调用。
- `componentDidMount()`
  - 只能在浏览器端调用，通常在其内部处理与其他类库的交互，比如 jQuery；也可以通过 AJAX 获取数据来填充组件内容。

### Updating

![Updating: component is being re-rendered, can be caused by changes of props or state.](https://cdn-images-1.medium.com/max/1600/0*P5I1CUDhaZpytVhb.)

- `componentWillReceiveProps()`
  - 只有当 `props` 发生改变时，才会被调用；调用 `this.setState()` 方法不会被触发。
  - 只要父组件 `render()` 被调用，在 `render()` 内的子组件就会经历更新过程，不管父组件传给子组件的 `props` 有没有被改变，
  都会触发子组件的 `componentWillReceiveProps()`。
  - If you want to update the state in response to props changes, this is the method you need. Compare `this.props` with `nextProps` and if there is a significant change, act on it.

    ```js
    componentWillReceiveProps(nextProps) {
      if (this.props.foo !== nextProps.foo) {
        this.whenFooChanges()
      }
      if (this.props.bar !== nextProps.bar) {
        this.whenBarChanges()
      }
    }
    ```
- `shouldComponentUpdate()`
  - 通过 `this.setState()` 函数引发的更新过程，并不是立刻更新组件的 `state` 值，在执行到到 `shouldComponentUpdate()` 的时候，`this.state` 依然是 `this.setState()` 函数执行之前的值，所以我们要做的实际上就是在 `nextProps`、`nextState`、`this.props` 和 `this.state` 中互相对比。
  - 在 React 组件被更新时，原有的内容被重新绘制，需要在 `shouldComponentUpdate()` 内重新调用 jQuery 的代码；在服务器端基本不会触发 React 组件的更新过程，所以可以在 `shouldComponentUpdate()` 内调用 jQuery 的代码。

### Unmounting

![Unmounting: component is being removed from the DOM.](https://cdn-images-1.medium.com/max/1600/0*VfBt3aVveN0n_4Pd.)

- `componentWillUnmount()`
  - `componentWillUnmount()` is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in `componentDidMount()`.

### componentDidCatch(error, info)

Error boundaries only catch errors in the components below them in the tree. An error boundary can’t catch an error within itself.

```jsx
class App extends React.component {
  getUserInfo() {
    // can't handle
    throw new Error('Error')
  }
  componentDidCatch() {}
  render() {
    return (<div>
      <ChildComponent />
    </div>)
  }
}
```

换句话说，只能处理 `ChildComponent` 中的 `unhandled error`，`App` 本身的错误，是无法处理的。


## [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime)

### Choosing the Type at Runtime

You cannot use a general expression as the React element type. If you do want to use a general expression to indicate the type of the element, just assign it to a capitalized variable first. This often comes up when you want to render a different component based on a prop:

```jsx
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Correct! JSX type can be a capitalized variable.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

### Booleans, Null, and Undefined Are Ignored

## [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

The `defaultProps` will be used to ensure that this.props.name will have a value if it was not specified by the parent component. The `propTypes` typechecking happens after `defaultProps` are resolved, so typechecking will also apply to the `defaultProps`.

## [Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)

### Adding a Ref to a DOM Element

When the `ref` attribute is used on an HTML element, the `ref` callback receives the underlying DOM element as its argument.

React will call the `ref` callback with the DOM element when the component mounts, and call it with `null` when it unmounts. `ref` callbacks are invoked before `componentDidMount` or `componentDidUpdate` lifecycle hooks.

### Adding a Ref to a Class Component

When the `ref` attribute is used on a custom component declared as a class, the `ref` callback receives the mounted instance of the component as its argument.

### Refs and Functional Components

**You may not use the ref attribute on functional components** because they don’t have instances.

You should convert the component to a class if you need a ref to it, just like you do when you need lifecycle methods or state.

You can, however, **use the ref attribute inside a functional component** as long as you refer to a DOM element or a class component
.

### Caveats

If the `ref` callback is defined as an inline function, it will get called twice during updates, first with `null` and then again with the DOM element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one. You can avoid this by defining the `ref` callback as a bound method on the class, but note that it shouldn’t matter in most cases.

## [Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html)

Since an uncontrolled component keeps the source of truth in the DOM, it is sometimes easier to integrate React and non-React code when using uncontrolled components. It can also be slightly less code if you want to be quick and dirty. Otherwise, you should usually use controlled components.

## [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html)

### Avoid Reconciliation

In most cases, instead of writing `shouldComponentUpdate()` by hand, you can inherit from `React.PureComponent`. It is equivalent to implementing `shouldComponentUpdate()` with a shallow comparison of current and previous props and state.

## [Reconciliation](https://reactjs.org/docs/reconciliation.html)

Because React relies on heuristics, if the assumptions behind them are not met, performance will suffer.

1. The algorithm will not try to match subtrees of different component types. If you see yourself alternating between two component types with very similar output, you may want to make it the same type. In practice, we haven’t found this to be an issue.
2. Keys should be stable, predictable, and unique. Unstable keys (like those produced by `Math.random()`) will cause many component instances and DOM nodes to be unnecessarily recreated, which can cause performance degradation and lost state in child components.


## [Context](https://reactjs.org/docs/context.html)

### Referencing Context in Lifecycle Methods

If `contextTypes` is defined within a component, the following lifecycle methods will receive an additional parameter, the `context` object:

- constructor(props, context)
- componentWillReceiveProps(nextProps, nextContext)
- shouldComponentUpdate(nextProps, nextState, nextContext)
- componentWillUpdate(nextProps, nextState, nextContext)

As of React 16, `componentDidUpdate` no longer receives `prevContext`.


### Referencing Context in Stateless Functional Components

Stateless functional components are also able to reference `context` if `contextTypes` is defined as a property of the function.


## [Portals](https://reactjs.org/docs/portals.html)

### Event Bubbling Through Portals

Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way. Features like context work exactly the same regardless of whether the child is a portal, as the portal still exists in the React tree regardless of position in the DOM tree.

This includes event bubbling. An event fired from inside a portal will propagate to ancestors in the containing React tree, even if those elements are not ancestors in the DOM tree.

## [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)

Error boundaries do not catch errors for:

- Event handlers
- Asynchronous code (e.g. `setTimeout` or `requestAnimationFrame` callbacks)
- Server side rendering
- Errors thrown in the error boundary itself (rather than its children)

### New Behavior for Uncaught Errors

As of React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree.

### How About Event Handlers?

React doesn’t need error boundaries to recover from errors in event handlers. Unlike the render method and lifecycle hooks, the event handlers don’t happen during rendering. So if they throw, React still knows what to display on the screen.

### Caveats

- Don’t Use HOCs Inside the render Method

In those rare cases where you need to apply a HOC dynamically, you can also do it inside a component’s lifecycle methods or its constructor.

- Static Methods Must Be Copied Over


以上。
