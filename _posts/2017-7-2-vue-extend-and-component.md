---
layout: post
title:  "Vue.extend and Vue.component"
date:   2017-7-2
categories: [Vue]
---

## 笔记

`Vue.component` 注册全局组件：

<a class="jsbin-embed" href="https://jsbin.com/yahocel/1/embed?html,js,output">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?4.1.8"></script>

其实内部调用了 `Vue.extend`：

<a class="jsbin-embed" href="https://jsbin.com/huxogih/1/embed?html,js,output">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?4.1.8"></script>

`Vue.component` 作用是告诉 `Vue` 在处理 `template` 时，将 `<test-component></test-component>` 替换为相应的组件。

而 `Vue.extend` 却不能，因为生成的对象`没有名字`，得这样：

<a class="jsbin-embed" href="https://jsbin.com/lavavas/embed?js,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?4.0.4"></script>

`Vue.component` 也可以通过组件的 `components` 属性使用其他组件。

<a class="jsbin-embed" href="https://jsbin.com/bimamut/embed?js,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?4.0.4"></script>

对于 `Vue.component` 和 `Vue.extend` 返回的都是 `组件的构造器（constructor）`，而且这些构造器是 `Vue 构造器` 的子类。
这也意味着，这些构造器的实例将会继承了 `Vue` 实例的属性和方法，比如 `$mount`。

利用 `$mount` 方法，可以将组件实例 `mount` 在某一节点上或者触发组件接下来的生命周期，利用这个方式可以比较方便的编写组件的单元测试。

<a class="jsbin-embed" href="https://jsbin.com/gaxokax/embed?html,js,output">JS Bin on jsbin.com</a><script src="//static.jsbin.com/js/embed.min.js?4.0.4"></script>


测试 Demo：

```js
import Button from 'components/Button'

describe('button', () => {
  it('should init correctly', () => {
    const vm = Vue.extend(Button).$mount('#app');
    expect(vm.$el.querySelector('button').to.exist);
  });
});
```

之所以 `Vue.extend(Button)` ，是因为 `import Button` 是 `Object` 即 `Button` 组件的 `options`，
需要 `Vue.extend` 去创建 `Button constructor`。
如果导入的是 `Button constructor`，那么就不需要 `Vue.extend` 了。

以上。

## 参考

- [Composing Components](http://optimizely.github.io/vuejs.org/guide/composition.html)
- [What is Vue.extend for?](https://stackoverflow.com/questions/40719200/what-is-vue-extend-for#)
- [vue.extend, vue.component 区别](https://segmentfault.com/q/1010000007312426)
- [单元测试](https://cn.vuejs.org/v2/guide/unit-testing.html)
- [ELEMENT-UI unit test util](https://github.com/ElemeFE/element/blob/dev/test/unit/util.js)
