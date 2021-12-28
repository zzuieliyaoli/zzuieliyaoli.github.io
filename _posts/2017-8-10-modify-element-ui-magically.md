---
layout: post
title:  "魔改 ElementUI 小记"
date:   2017-8-10
categories: [Vue]
---

因为公司项目的原因，接触了 [ElementUI](http://element.eleme.io/#/zh-CN) 这个非常优秀的组件库。

官方提供了 [深层次自定义主题](http://element.eleme.io/#/zh-CN/component/custom-theme) 的功能，适合将 ElementUI 作为 `dependencies` 的情况。得益于 ElementUI 样式与组件分离的模式，通过这种方式，可以很方便的将 ElementUI `换皮`。

如果是需要 fork 然后定制 ElementUI 的情况下，可以直接修改 `https://github.com/ElemeFE/element/tree/dev/packages/theme-default` 相关样式文件。

也可以参照官方文档，将 `element-theme-default` fork 后，作为一个 `dependence` 来单独维护。但是需要修改配置文件：

```json
{
  "plugins": ["transform-runtime", ["component",
    {
      "libraryName": "element-ui",
      "styleLibraryName": "~./node_modules/element-theme-default/lib"
    }
  ]]
}
```

以上。
