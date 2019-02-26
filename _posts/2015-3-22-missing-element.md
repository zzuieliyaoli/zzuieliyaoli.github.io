---
layout: post
title:  "Return the Missing Element - Codewars"
date:   2015-3-22
categories: [Codewars]
---

Fellow code warrior, we need your help! We seem to have lost one of our array elements, and we need your help to retrieve it! Our array, superImportantArray, was supposed to contain all of the integers from 0 to 9 (in no particular order), but one of them seems to be missing.

Write a function called getMissingElement that accepts an array of unique integers between 0 and 9 (inclusive), and returns the missing element.

Examples:

```js
getMissingElement([0, 5, 1, 3, 2, 9, 7, 6, 4]) // returns 8
getMissingElement([9, 2, 4, 5, 7, 0, 8, 6, 1]) // returns 3
```

翻译过来：0-9 这 10 个数字，任选 9 个组成数组，求没被选上的那个数字。

## 我的解法：

很惭愧，这个我只想出来思路，实际写函数没有写出来。

**我错的解法**：

```js
function getMissingElement(superImportantArray) {
  superImportantArray.forEach(function (item, index) {
    for(var i = 0, count = 0; i < 10; i++) {
        if (num != item) {
          count++;
          if(count == 10) {
            return i;
          }
        }
    }
  });
}
```

**设想：**i = 0 时，superImportantArray 中的每一项都与 i 对比，若不相等则 `count++` ，若相等，这数组下一项与 i 对比。最后会发现，当 `count == 10` 时，说明数组中不存在等于i的元素，这时 `return i` 。
简而言之，我的思路是：固定 i ，让数组的每一项都与i对比。

**错误原因是：**由于选择了 `forEach()` 方法，导致的是 item 固定，i 由 0 到 9 依次进行对比。因为 i 是 0-9，而 item 肯定在0-9 之间，所以对于每个 item，每次 count 的值都相等，都为 9。最后错误也就不言而喻了。


## 来看别人怎么写：

解法一：

```js
function getMissingElement(superImportantArray) {
  return superImportantArray.reduce(function (sum, value) {return sum - value;}, 45);
}
```

解法二：

```js
function getMissingElement(superImportantArray) {
  for (i = 0; i < 10; i++) {
    if (superImportantArray.indexOf(i) === -1) return i;
  }
}
```

### 分析：

解法一：**当头棒喝！**，0-9 这 10 个数字的和是 45，不会变的喵。

解法二：嗯，和我的想法一样，真聪明。。。。！固定 i ，让数组的每一项都与 i 对比。

## 知识点

### reduce()方法

从数组的第一项开始，迭代数组的所有项，然后构建一个返回的值。**要注意的是**：可以接受两个参数，一个在每一项上调用的函数和（可选的）作为并归基础的初始值。

例子：

```js
var vaules = [0, 1, 3, 4, 5, 6]; //sum = 19
var sum = vaules.reduce(function (prev, cur, index, array) {
  return prev + cur;
}, 1000);

console.log(sum); // 1000 + 19 = 1019
```

### indexOf() 方法

接受两个参数，要查找的项和（可选的）表示查找起点位置的索引。方法最后会返回要查找的项在数组中位置，或者在没有找到的情况相爱返回-1 。要注意的是：在比较第一个参数与数组中的每一项是，会使用全等操作符；也就是说，查找的项必须严格相等（===）。


## 反思

- 这个阶段的 Codewars 的题目，对 Array、Number 等这些数据类型的方法考察的很多。对深入理解这些方法有很大的益处。
- 因为最近关注暑假实习比较多，对各种求职信息比较敏感。发现即使作为前端，对计算机基础的要求也是不低的。数据结构、计算机组成原理等等。也正是由于要求多了，才越发的对实习不那么热心了。因为基础不好，前端技术再好，求职也是白搭不是。加油啊，少年！
