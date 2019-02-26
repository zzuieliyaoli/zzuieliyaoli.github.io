---
layout: post
title: "近期 Code Reivew 小结（一）"
date: 2018-08-06
categories: [CodeReview]
---

## Programming

#### 在编写代码时，同一页面或相同功能的变量名的命名前后要保持一致

```js
// bad
const getAHtml = () => {}
const getBJsx = () => {}

const aClassName = 'button'
const bStyle = 'button-red'

// good
const getAHtml = () => {}
const getBHtml = () => {}

const getAJsx = () => {}
const getBJsx = () => {}

// React 中，Style 有其 inline-style 的意义
const aClassName = 'button'
const bClassName = 'button-red'
```

#### magic number 应提出为变量，不要 hard code

```js
const chanceCount = serverResponse.count
// bad
if (chanceCount > 3) {
  doSomething()
}

// good
const MAX_CHANCE_COUNT = 3
if (chanceCount > MAX_CHANCE_COUNT) {
  doSomething()
}
```

#### 涉及到灰度的代码，应该考虑如下情况

- 灰度期间有迭代需求，减少在多个地方增添相同的代码，尽可能减少维护成本
- 在灰度切 0 或 全量 后，方便移除冗余代码
- 尽可能的不改动交互代码，减少出现 Bug 的几率

## React

#### 由于 `JSX` 的特殊性，可能导致 `render` 函数内嵌套过多逻辑与模板的拼接，建议切分出子组件或子函数

```jsx
// bad
class Component extends React {
  render() {
    return (
      list.map((item) => (
        <div>
          <img />
          <div>
          </div>
        </div>
      ))
    );
  }
}

// good
class Component extends React {
  render() {
    return (
      list.map((item) => (
        this.renderItem(item)
      ))
    );
  }
  renderItem(item) {
    return (
      <div>
        <img />
        <div>
        </div>
      </div>
    );
  }
}
```

#### 对于 `JSX` 语法，建议使用 `自闭合` 标签

```jsx
// bad
<div role="button" ></div>

// good
<div role="button" />
```


#### React Spread Attributes

```jsx
// wrong
const props = {
  show() {
    this.isShow = true;
  },
};
<Component {...props} />

// good
const props = {
  show: () => {
    this.isShow = true;
  },
};
const hide = () => {
  this.isShow = false;
};
<Component {...props} hide={hide} />
```

#### 炫技

由于 `JSX` （本质上是 `JS Expression`）的存在，导致一些在 `JSX` 合法的语法（常规 JS 代码中合规但显得怪异）会直接出现在常规 JS 语法中，最常见的是 `&&` 。

而在常规 JS 代码中除了减少怪异的语法外，也应避免过度炫技，简单的 `if else` 就可以简单的表达思想。

```js
// bad
const trueFlag = true
trueFlag && doSomething()
if (!trueFlag) {
  doOther()
} else {
  doOthers()
}

// good
if (trueFlag) {
  doSomething()
  doOthers()
} else {
  doOther()
}
```

## CSS

- iOS9 不支持 `min-width: auto`，需要覆盖时，推荐 `min-width: unset` 或者 `min-width: 0`
- 写布局 CSS 时，要想一想究竟用不用 `flex`，想一想布局元素

## JavaScript

#### DOM

```js
parseInt(window.getComputedStyle(groupContainerDom).marginTop, 10)
```

#### Array.map

`Array.map` 方法本质上是 映射（a => map => b），在 `JS` 中常应用于 `函数式` 编程，达到切断的目的，避免副作用 。

在实际的使用过程中，避免如下使用：

```js
// bad
const array2 = array.map((item, index) => {
  item.index = index
  return item
})

// good
const array2 = array.map((item, index) => Object.assign({}, item, {
  index,
}))
```

以上。
