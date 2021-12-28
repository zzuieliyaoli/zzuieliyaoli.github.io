---
layout: post
title:  "使用 Vue、Vuex 时组件之间消息 / 数据传递的思考"
date:   2016-05-04
categories: [Vue]
---

遇到的需求很典型：用户点击不同的按钮时，对数据进行不同的排序或不同的筛选。
简而言之，类似于饿了么的销量高、销量高、新开商家等商家排序或商家筛选。

![](/images/posts/2016050401.png)

有需求才会编码，有编码才会困难，有困难才会思考。

摆在面前的问题有以下几个：

1. 多个 `action` ，引起多个 `mutation` ，但是处理同一个数据。
2. 在什么地方处理数据？ `Component` 还是 `Store` ？
3. 如果放在 `Component` 内处理，如何通过那组件之间如何传递 `action` ? 在处理数据的时候会遇到什么问题？
4. 如果放在 `Store` 内处理，在处理数据的时候会遇到什么问题？

不论在 `Component` 还是 `Store` ，我其实都尝试了。

在 `Component` 内处理处理的时候，其实是在 `Store` 上维护了一个 `action type` 变量，在 `Component` 内 `getter` 该变量。 `action type` 的变化，触发 `Component` 内的数据处理。

除此之外，在两个地方处理数据都遇到了同一个问题：不同 `action` 时，需要处理的数据要 `一致` 且 `不可变` 。这样才能保证从多次 `action` 后数据处理的结果和顺序是完全一致的。在实际的编码过程中，我们在使用 `Array` 的 `sort` 、 `filter` 等方法时，是难以保证数组数据与页面初始化时保持一致。

那为了解决数据变化这问题，使用了 [Immutable.js](https://facebook.github.io/immutable-js/)

最后，我选择在 `Store` 内处理数据。是因为要考虑 `Component` 初始化的同时，也要处理数据的 Immutable。太繁琐了。

结语：引入 `Immutable.js` 保证数据的 `一致` 与 `不可变` 。`Component` 只 `getter` 一个变量，只负责将处理过的数据展示即可。
