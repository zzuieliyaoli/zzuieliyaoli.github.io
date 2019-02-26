---
layout: post
title:  "Node.js 学后感（一）"
date:   2017-01-11
categories: [Node.js]
---

## 前言

最近在学 Node.js，稳步推进年前制定的小计划。学习的方式很简单，就是写 Demo。

## Demo

这个 Demo 的用途是`截图`；不间断地、按照设定好的链接，不断的截取网页。有两个用途：

- 监控网站样式情况；
- 辅助测试人员进行界面回归。

Demo 的地址在这里 [zzuieliyaoli/monitor](https://github.com/zzuieliyaoli/monitor)

主要用到的技术栈：ES2015/2016、node-phantom、Koa、Mongodb。

参考如下的资料：

- [PhantomJS & NodeJS 在京东网站前端监控平台的最佳实践](http://www.infoq.com/cn/articles/practise-of-phantomjs-and-nodejs-in-jingdong)
- [node 截图服务可用性报告](http://blog.angrytoro.com/2016/01/27/%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%88%AA%E5%9B%BE%E5%BC%95%E5%8F%91%E7%9A%84%E8%A1%80%E6%A1%88/)
- [webshot - 基于 phantomjs 和 nodejs 的服务器端截图服务](https://github.com/node-modules/webcamera)
- [web-camera - 通过 phantomjs 来打开渲染网页，对网页进行截图](https://github.com/node-modules/webcamera)

## 感受

### API

没怎么翻过 API，就可以写能跑得动的 Demo。是我的错觉吗？赶紧滚回去翻一翻文档。

### 语法

`async/await` 真好用啊！

这个视频很棒：[Jafar Husain - Async Programming in ES7 - JSConf US 2015](https://www.youtube.com/watch?v=lil4YCCXRYc&t=2s)

### 目录结构

搜了很多最佳实践，但是都不怎么适合。所以，只能走一步看一步，跟着 Demo 的变化而变化。

### 错误处理

参考 [Node.js 错误处理实践](https://jysperm.me/2016/10/nodejs-error-handling/)

### 截图模块

首先，肯定要实现一个`相机模块`

```
class Camera {
  constructor (config) {}
  capture(url) {}
  close() {}
}
```

其次，需要实现一个`截图模块`，达到调度和控制`相机模块`的作用。

问题来了，怎么写？

#### 第一种：在相机模块的基础上，派生出截图模块

```js
class Screenshot extends Camera {
  constructor() {
    super()
  }
  async start(tasks) {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i]
      await this.capture(task.url)
    }
  }
}
```

#### 第二种：在截图模块中，调用相机模块的实例

```js
class Screenshot {
  constructor() {
    this.camera = new Camera()
  }
  async start(tasks) {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i]
      await this.camera.capture(task.url)
    }
  }
}
```

我还在想哪一种好。

### 其他

许多经常听后端哥哥们提到的词`数据库`、`SQL`、`索引`、`进程`、`部署`、`Docker`等，也开始慢慢接触了。

总之，感觉不错。争取把这个 Demo 应用到公司里。

以上。