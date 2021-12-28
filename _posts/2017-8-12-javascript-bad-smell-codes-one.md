---
layout: post
title:  "写出更好的 JavaScript 代码（一）—— Code Review 小结"
date:   2017-8-12
categories: [JavaScript]
---


在框架功能日渐完善的现今，绝大部分需求场景都可以借助框架来完成。
但是作为一个有追求的程序员，绝不应该以此为终点。
除了完成需求，还更应该写出一手风格简洁、易于理解的代码。
毕竟，框架可以帮助你处理 `视图与模型` 的绑定，但是不会告诉你 `如何抽象数据`。

本文是平时 Code Review 的总结，以此为警示。

## 变量

### 常量提取

```js
// bad
if (file.fileSize > 200 * 1024 * 1024) {
  stopUploadingFiles();
}

// good
const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200m

if (file.fileSize > MAX_FILE_SIZE) {
  stopUploadingFiles();
}
```
#### 解释

如果文件大小限制变为 300m，比起 `查找并全局替换`，直接修改常量值能更快满足产品需求变动。

### 多余的临时变量

```js
// bad
function personFactory(config) {
  const person = new Person(config);
  return person;
}

// good
function personFactory(config) {
  return new Person(config);
}
```

## 函数

### 强行副作用

```js
const objArray = [{ checked: false }, { checked: false }];

// bad
const makeAllChecked = (array) => {
  array.forEach((item) => {
    item.checked = true;
  });
  return array;
};

makeAllChecked(objArray);

// good
const getAllChecked = array => (
  array.map(item => Object.assign(item, {
    checked: true,
  }))
);

const checkedObjArray = getAllChecked(objArray);
```

### 职责不单一

```js
const ALLOWED_MUSIC_FILE_TYPE_LIST = ['wav', 'aac', 'flac', 'mp3'];

// bad
const isMusicFile = (fileName) => {
  const fileTypeString = fileName.split('.').pop().toLowerCase();
  return (ALLOWED_MUSIC_FILE_TYPE_LIST.indexOf(fileTypeString) > -1);
};

// good
const getFileType = fileName => (fileName.split('.').pop().toLowerCase());
const isMusicFile = fileName => (
  ALLOWED_MUSIC_FILE_TYPE_LIST.indexOf(getFileType(fileName)) > -1
);
```

### `callback` 判断

```js
// bad
function asyncFunction(timeout, callback) {
  // done
  if (callback !== undefined) {
    callback();
  }
}

// good
function asyncFunction(timeout, callback) {
  // done
  if (callback === 'function') {
    callback();
  }
}
```

#### 解释

既然 `callback` 的目的是 `函数调用`，那就应该直接判断是否为 `function`，毕竟也可以传入 `string` 等其他乱七八糟类型的参数。

### 迂回的返回值

```js
const ALLOWED_MUSIC_FILE_TYPE_LIST = ['wav', 'aac', 'flac', 'mp3'];

// bad
// 判断是否是允许的音乐文件
const isMusicFile = (fileName) => {
  const fileTypeString = fileName.split('.').pop().toLowerCase();
  if (ALLOWED_MUSIC_FILE_TYPE_LIST.indexOf(fileTypeString) > -1) {
    return true;
  }
  return false;
};

// good
// 判断是否是允许的音乐文件
const isMusicFile = (fileName) => {
  const fileTypeString = fileName.split('.').pop().toLowerCase();
  return (ALLOWED_MUSIC_FILE_TYPE_LIST.indexOf(fileTypeString) > -1);
};
```

## Array

### 用错方法

```js
// https://www.zhihu.com/question/63732073
// 用 JavaScript 编写，实现从键盘输入 n 个整数，求该组整数的平均值，并将大于平均值的整数输出

// bad one
const getTargetNumbers = numbers =>
  numbers.filter(
    number => (number > (
      numbers.reduce((prev, number) => (number + prev), 0) / numbers.length
    ))
  );

console.log(getTargetNumbers([1, 2, 3, 4, 5, 6, 7]))

// bad two
let arr = [1, 2, 3, 4, 5, 6, 7];
let average = arr.reduce((sum, now) => { return sum + now; }, 0) / arr.length;
arr.map(item => {
  if(item > average) {
    console.log(item)
  }
);

// good
const averageNumber = (numbers) => (
  numbers.reduce((prev, number) => (number + prev), 0) / numbers.length
);

const getTargetNumbers = numbers => (
  numbers.filter(
    number => (number > averageNumber(numbers))
  )
);
```

#### 相关参考：

- [如何形象地解释 JavaScript 中 map、foreach、reduce 间的区别？](https://www.zhihu.com/question/24927450)

## 条件

### 扭捏的判断
```js
const numberArray = [1, 2, 3, 4];

// bad
if (numberArray.indexOf(1) !== -1) {}

// good
if (numberArray.indexOf(1) > -1) {}
```

## Vue

### 复杂的 template 内渲染条件

```html
<template>
  <div v-if="(index > 1) && (array.indexOf(item) > -1)">
  </div>
</template>
```

#### 解释

复杂的 DOM 的渲染条件，应该放在 `computed` 内或者抽离成为 `method`。


## jQuery

### 扩大选择器范围

```js
// bad
const $error = $('.error');

// good
const $error = $('#error-container .error');
```

#### 解释

`.error` 是一个非常常用的类名，如果直接 `$('.error')` 进行相关操作，无异于 `修改全局变量`。

### 选择器缓存

```js
// bad
const $error = $('#error-container .error');

// good
const $errorContainer = $('#error-container');
const $error = $errorContainer.find('.error');
```

## 其他资料

- [Vue 官方 Style Guide](https://cn.vuejs.org/v2/style-guide/)
- [Airbnb JavaScript Style Guide() {](https://github.com/airbnb/javascript)
- [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)
- [编写「可读」代码的实践](http://taobaofed.org/blog/2017/01/05/writing-readable-code/index.html)
- [怎么消除 JavaScript 中的代码坏味道](https://github.com/gaohailang/blog/issues/5)
- [如何优雅的编写 JavaScript 代码](https://zhuanlan.zhihu.com/p/28910636)

以上。
