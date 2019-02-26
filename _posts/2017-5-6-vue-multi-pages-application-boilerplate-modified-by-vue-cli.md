---
layout: post
title:  "基于 Vue-cli 构建多页面应用（Multi-pages Application）脚手架"
date:   2017-5-6
categories: [Vue]
---

> 懂得工具的基础使用方法很重要

## TLDR

修改 Vue-cli 生成的 Single-page Application 项目配置，实现开发多页面的功能。

关键点: Webpack 多入口 及 webapck-html-plugin 的使用。

项目地址：[vue-multi-pages-application](https://github.com/zzuieliyaoli/vue-multi-pages-application)

## 详细

### Webpack 多入口

`build/entries.js`

```js
module.exports = {
  index: './src/index.entry.js',
  login: './src/login.entry.js',
};
```

每个入口代表一个页面，即一个 HTML。官方文档 [Entry and Context](https://webpack.js.org/configuration/entry-context/#entry)

### html-webpack-plugin

为每个入口实例化 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) ，就可满足多页面需求。

参见：[Generating Multiple HTML Files](https://github.com/jantimon/html-webpack-plugin#generating-multiple-html-files)
