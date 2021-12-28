---
layout: post
title:  "将之前的 Vue1+ 项目迁移到 Vue 2.4+"
date:   2017-9-20
categories: [Vue]
---

项目是之前文章 [用 Vue1 做了个大项目](/2016-11-06/recent-vue-project.html) 提到的，
在该文章的结尾，我以比较乐观的态度看待 Vue 由 1 到 2 的大版本升级：

> 项目进行中的时候，恰逢 Vue2 发布，这就尴尬了，不过还是很积极乐观的。直到我使用了官方升级工具检查了一下代码。嗯，应该不算个事。

天道好轮回，苍天绕过谁！话虽然是这么说，但整体的升级感受是比较愉快的，虽然会有一些问题。

## 迁移思路

1. 旧项目先 Checkout 一个新的分支；
1. 用最新的 Vue-cli 初始化一个新的空项目，将新项目中的所有脚手架配置文件 Copy 到旧项目中。
在 Copy 的过程中，如果有定制化的配置，别给覆盖了。
1. Copy 新项目中的 package.json，然后把旧项目的 dependencies 一个一个下载下来；
1. 借助 [vue-migration-helper](https://github.com/vuejs/vue-migration-helper) 以及各个库的 Migration Guide 逐个修改代码；
1. 测试，然后继续改代码。

这样做的好处：

- 渐进修改，方便回滚。这个没啥好说的，通过 Git 来管理 Commits 和 Features。
- 无痛享受最新的构建工具。Webpack 与 Babel 都有超大大版本的更新，如果自己去跟进 Breaking Changes 修改配置文件，事倍功半。
直接 Copy Vue-cli 生成的配置文件，简直不要太轻松。

## Dependencies

主要更新的依赖如下所示，当然真实的项目中肯定不止这么多。

```diff
- "vue": "^1.0.21"
+ "vue": "^2.4.2"
- "vue-resource": "^1.0.3"
+ "axios": "^0.16.2"
+ "vue-axios": "^2.0.2"
- "vue-i18n": "^4.6.0"
+ "vue-i18n": "^7.2.0"
- "vue-router": "^0.7.13"
+ "vue-router": "^2.7.0"
- "vuex": "^1.0.0"
+ "vuex": "^2.4.0"
- "webpack": "^1.12.2"
+ "webpack": "^3.5.6"
```

## 工具和指南

> 得夸一下 Vue 以及相关库的官方迁移指南和工具，简直棒极

- [vue-migration-helper](https://github.com/vuejs/vue-migration-helper)
- [从 Vue 1.x 迁移](https://cn.vuejs.org/v2/guide/migration.html)
- [从 Vue Router 0.7.x 迁移](https://cn.vuejs.org/v2/guide/migration-vue-router.html)
- [从 Vuex 0.6.x 迁移到 1.0](https://cn.vuejs.org/v2/guide/migration-vuex.html)
- [Vue I18n Migrations](https://kazupon.github.io/vue-i18n/en/migrations.html)

## 遇到的问题

### Vue

- [`.sync` 修饰符](https://cn.vuejs.org/v2/guide/components.html#sync-修饰符)

  Vue2.3.0 把在 Vue2.0 移除的 `.sync` 修饰符重新添加进来。不过通过 vue-migration-helper 还是可以扫出来相关报错的。
  这个可以理解，因为是用来帮助 Vue1+ 迁移到 Vue2.0 的，而不是 Vue2.4+ 。

  个人感觉，在 Vue2.3+ 中还是慎用 `.sync`，尤其是在多级组件传递 prop 时。所以，下一步就会继续重构这些旧有的代码。

### Vue Router

[嵌套路由](https://router.vuejs.org/zh-cn/essentials/nested-routes.html) 里面讲：

> **以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**

也就是说，如果你有 `/home` 路由，那么子路由 `/home/user` 的 `path` 得写成这样 `path: 'user'`，而不是 `path: '/user'`。
如代码所示：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'user',
          component: User,
        },
      ],
    },
  ],
})
```

### Vue Resouce

```diff
- Vue.http.get
+ Vue.axios.get
```

### Vuex

有时会在代码中 subscribe 各个 mutation 的变动。在组件 destroy 时，如果不能 unsubscribe，那么再组件重新 created 时，响应逻辑就会重复执行。
如代码所示：

```js
export default {
  created() {
    this.unsubscribe = this.$store.subscribe(({ mutation, payload }) => {
      // do something
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
};
```

## 总结

没啥好说的，Vue 的生态圈越来越棒，各种指南和工具也很贴心。React 正逢多事之秋，希望前端圈的风波少一些，多搞一些正事。唉。

以上。
