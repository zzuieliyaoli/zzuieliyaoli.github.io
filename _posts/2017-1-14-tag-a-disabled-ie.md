---
layout: post
title:  "记 IE 上 disabled=true 的一个 Bug"
date:   2017-01-14
categories: [HTML]
---

## 正文

之前的项目写过出过这样的代码：

```html
<a href="javascript:;" disabled="true" ng-click="test()"></a>
```

结果是，在 IE 上 `test()` 函数根本不执行，即点击事件根本没有触发。

当然，这个 Bug 当然是被解决了。移除掉 `disabled="true"` 即可。 

相关资料如下：

- [disabled attribute - disabled property](https://msdn.microsoft.com/en-us/library/ms533732(v=vs.85).aspx)
- [Should the HTML Anchor Tag Honor the Disabled Attribute?](http://stackoverflow.com/questions/7000927/should-the-html-anchor-tag-honor-the-disabled-attribute)
- [Disable anchors in Chrome/WebKit/Safari](http://stackoverflow.com/questions/175205/disable-anchors-in-chrome-webkit-safari)

## 反思

如果老老实实得这样写：

```html
<a href="#" ng-click="test($event)"></a>
```

然后：

```js
$scope.test = function (event) {
  event.preventDefault()  
}
```

就不会有这样的 Bug 了。

我当时为啥会写出那样的 Bug 呢？

以上。