---
layout: post
title:  "Angular 的初始化 - 触发"
date:   2016-4-2
categories: [Angular]
---

Angular 的初始化包含触发、注入、编译等几个过程。

官方文档的一个图片很清晰的展现了整个过程：

![Angular Startup](https://docs.angularjs.org/img/guide/concepts-startup.png)

https://docs.angularjs.org/img/guide/concepts-startup.png

## Angular 的初始化 - 触发

```js
function angularInit(element, bootstrap) {
  var appElement,
      module,
      config = {};

  // 如果存在 ng-app 那么 appElement 的布尔值就会为 true
  // 紧接着就会调用 bootstrap 函数
  forEach(ngAttrPrefixes, function(prefix) {
    var name = prefix + 'app';

    if (!appElement && element.hasAttribute && element.hasAttribute(name)) {
      appElement = element;
      module = element.getAttribute(name);
    }
  });
  forEach(ngAttrPrefixes, function(prefix) {
    var name = prefix + 'app';
    var candidate;

    if (!appElement && (candidate = element.querySelector('[' + name.replace(':', '\\:') + ']'))) {
      appElement = candidate;
      module = candidate.getAttribute(name);
    }
  });
  if (appElement) {
    config.strictDi = getNgAttribute(appElement, "strict-di") !== null;
    bootstrap(appElement, module ? [module] : [], config);
  }
}
```

触发初始化进程 Angular 的（Initialization Process）方式有两种：自动（automatic）、手动（manual）。
两种方式的区别在于是否在HTML标签上设置了 `ng-app` 指令。

## Automatic

如果设置了 `ng-app` 指令，即 `Automatic Initialization`。那么 Angular 会在 `DOMContentLoaded` 触发或者 `document.readyState` 的值变为 `complete` 时，自动开始初始化。


## Manual

如果是 `Manual Initialization` ，可以对 Angular 的初始化进程有一个更好的控制。

### General

看下面的 Demo:

 <a class="jsbin-embed" href="https://jsbin.com/natido/embed">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.35.12"></script>

点击按钮就可以直接触发 Angular 的初始化进程。


### Deferred

使用这种方式，是可以为即将进行初始化的 Angular 添加更多需要的模块。

```js
angular.resumeBootstrap = function(extraModules) {
  forEach(extraModules, function(module) {
    modules.push(module);
  });
  return doBootstrap();
};
```

看 Demo:

<a class="jsbin-embed" href="https://jsbin.com/husupo/embed?html,js,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?3.35.12"></script>

## Reference

- [Angular-Bootstrap](https://docs.angularjs.org/guide/bootstrap)
