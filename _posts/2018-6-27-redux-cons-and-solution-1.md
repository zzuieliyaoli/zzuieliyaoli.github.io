---
layout: post
title: "学习 Redux —— 缺陷"
date: 2018-06-27
categories: [Redux]
---

> 非商业转载，侵权必删

## [Redux 数据流管理架构有什么致命缺陷，未来会如何改进？](https://www.zhihu.com/question/277623017)

- [joker](https://www.zhihu.com/question/277623017/answer/405455942)
  - 架构上要求数据是 Immutable 的，但是不提供对数据的保护

- [corol](https://www.zhihu.com/question/277623017/answer/395056100)
  - Dialog Problem：假如你有 2 个页面 A 和 B，A 里面有一个 button 组件 B 和 Dialog 组件 D。现在从 A 组件切换到 B，D 组件需要被卸载。Redux 的话你需要在 store 创建阶段就要提前声明所有的状态，包括 Dialog 的状态。如果 Dialog 组件被卸载了，Dialog 的状态仍然残留在 Redux 中。这就是问题；
  - 如果你的组件触发了某个行为，这个时候你是知道需要修改 Redux 中的哪部分状态的。但是你还是得把这部分 state merge 到 Redux 中。最后组件只能把全部状态拿出来，再识别出自己需要的那部分状态；
  - 项目越来越大，Store 越来越多，如果所有的 Store 都往根节点挂的话，难免有命名的问题。特别是 Portal 已经往 system 挂了一个 UserStore，当你把 system 共享给子项目 A， A 也有一个 UserStore。这就会有冲突了；

- [kuitos](https://www.zhihu.com/question/277623017/answer/409520763)
  - 直接把 api 暴露给应用开发者就有点过分了，要擦屁股的地方太多了，尤其是 action type，本就不应该是应用开发者需要感知的存在。这也是为什么 redux-xxx middleware 那么多，基于 redux 的改良封装层出不穷的原因；

## [除 Redux 外，目前还有哪些状态管理解决方案？](https://www.zhihu.com/question/63726609)

- [Jim Liu](https://www.zhihu.com/question/63726609/answer/212357616)
  - 为了保持其“纯度”，不去提供解决“副作用”的方法；

## [如果用 Redux 不爽的话，那就试试 MobX 吧（含中文文档）](https://zhuanlan.zhihu.com/p/25722002)
  -  永远记不得 action 的命名到底是什么？在 dispatch、redux-saga、reducer、service 等多个文件中写 action 的时候，我永远记不得之前给 action 的命名；
  - action 的流向到底是什么？是直接流向 reducer，还是流向 redux-saga 向服务端发送请求后再流向 reducer，或是流向 redux-saga 再触发 4 个关联 action？
  - payload 的结构到底是什么？ 经过 redux-saga 的种种处理和反复传递，写 reducer 的时候不 console.log 一下真的不知道拿到的到底是什么结构的数据。

以上。
