---
layout: post
title:  "用 Vue1 做了个大项目"
date:   2016-11-06
categories: [Vue]
---

整个项目暂时的结构如下图所示：

<img src="/images/posts/2016-11-06-architecture.svg" alt="架构图">

之所以用上 `暂时`，是因为我也不知道以后会变成什么样子，现在来看还是比较满意。毕竟如果结构不适合或者有缺陷，进行修改是肯定的。

## 简单解释

### Vue-Router

1. 处理路由；
2. 页面比较复杂，所以会用上 `subRoutes`。

### Vuex

1. 管理应用状态；
2. 有一个缓存模块（如图 Vuex 部分的 `Module Cache` ），缓存非实时的数据。

### 布局和样式

`Flexbox` 配合 `BEM`。

曾经写过一篇：[Flexbox 解决 options 和 input 宽度和数量不定的布局问题](/2016-09-27/try-flex-box.html)

## 一些细节

### I18n

用的是 [vue-i18n](https://github.com/kazupon/vue-i18n) 插件来处理 i18n。简单的如下使用是可以的：

```html
<p v-text="$t('翻译')"></p>
```

但是，如果如下使用：

```js
export default {
  data() {
    return {
       options: [{
        name: this.$t('苹果'),
        index: 0,
      }, {
        name: this.$t('香蕉'),
        index: 1,
      }, {
        name: this.$t('葡萄'),
        index: 2,
      }]
    }
  }
}
```

在切换语言的时候，该插件无效。

可以通过一个 HACK 的手法来处理，即：

1. 切换语言时，通过 Vuex 的 `action` 触发 `mutation`；
2. 需要 i18n 处理的组件内，通过 `getter` 来获得要切换的语言；
3. `computed 属性` 来达到最终目的。

```html
<p v-text="i18nHack"></p>
```
```js

import getChosenLanguage from 'myVuex/modules/i18n'

export default {
  vuex: {
    getters: {
      getChosenLanguage,
    },
  },
  data() {
    return {
       options: [{
        name: this.$t('苹果'),
        index: 0,
      }, {
        name: this.$t('香蕉'),
        index: 1,
      }, {
        name: this.$t('葡萄'),
        index: 2,
      }]
    }
  },
  computed: {
    i18nHack() {
      const chosenLanguage = this.getChosenLanguage
      this.options = [
        Object.assign({}, this.options[0], {
          name: this.$t('苹果')
        }),
        // ...
      ];
      return chosenLanguage
    }
  },
}

```

### View 切分

主要是说对于 `表单` 的处理，应该有合理的切分与分层。

<img src="/images/posts/2016-11-06-form.svg" alt="表单">

`View Data` 只负责 `POST Data` 的逻辑，而 `Form Components` 则负责脏活累活，如：数据验证、状态管理、i18nHack 等。

### 组件

首先先说 `全局组件`。

这里全局组件是指：整个 APP 都会重复多次使用且不和某一组件耦合。比如：消息框、确认框。

知乎上早有讨论：[如何使用vue.js构造modal(弹窗)组件?](https://www.zhihu.com/question/35820643)

大约有以下几种处理方式：

> 另外一个情况是，我们可能需要在一个嵌套了很多层的子组件里面触发 modal。这种情况下，你应该把 modal 放在根组件里面，然后从子组件触发一个事件上去。 -- 尤雨溪

> this.$refs.modal.show() // -> returns a promise -- Jim Liu

> 对于 modal ，我倾向于一种做法，基于 redux-like 的机制，在 subscribe 里订阅 state change，然后检查 showModal 字段，在另一个 root 里专门渲染 modal -- 工业聚

> 来源：知乎 著作权归作者所有，转载请联系作者获得授权。

再来看视图中的组件嵌套。

组件间沟通是 `prop` 和 `event` 来处理的。在 Vue2 中这一块有挺大的变化的。[vue2-props](http://vuejs.org/v2/guide/migration.html#Props)

### 异步操作

由于对 `Generator` 、 `Async/Await` 不熟，就先用 `Promise` 。需要注意的是对 `Error` 的处理，我会单独写一篇文章来梳理。

### 事件绑定与解绑

每个 `View` 所需要的时间是不同的，注意事件绑定的范围与解绑的时机。

### Vue 的小坑

1. 善用 `Immutable.js` 、 `Object.assign()`；
2. `computed property` 不能通过 `this.computedProperty = 2` 修改；而 `prop property` 可以。

## 一些碎碎念

项目进行中的时候，恰逢 Vue2 发布，这就尴尬了，不过还是很积极乐观的。直到我使用了官方升级工具检查了一下代码。嗯，应该不算个事。

感觉 Vue 的生态还需要成长吧。和 React、Angular 相比，有时很难直接找到想要的问题答案。

在做这个项目的时候，还写过另外一篇文章：[多个下拉列表间的显隐切换](/2016-10-10/multi-dropdowns-toggle-display.html)

以上。

