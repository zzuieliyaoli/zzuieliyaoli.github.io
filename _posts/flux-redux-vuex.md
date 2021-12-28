对于单页面应用来说，管理组件以及应用的state是个难题。未解决这个问题，出现了Flux思想，那么主流的SPA框架也相应的有了自己的Flux实现。React的Redux，Vue的Vuex。

React我接触的不多，但是Vuex有用到Vuex来解决一些实际的问题。

在编写业务需求的时候，也是严格遵守使用Vuex来管理state，不管是Component Level State，还是Application State。

但是随着需求代码的编写，一个问题暴漏出来了：component的state频繁更新，引起Vuex store频繁的更新，那么订阅

其实这个问题的症结点在于：我这个组件的部分状态其实不需要vuex转手的，我内部的状态直接去触发view的变化，不需要通过vuex的getters来订阅store的变化，进而引起view的变化。其实是一种脱裤子放屁的感觉。

再把问题抽象一下，那就是：有必要将所有state都交给vuex来管理呢？

好在Vuex社区也有了讨论，但是根据@yyx的解释来说，这是一种不推荐的做法。

那么Redux社区其实也有相关的讨论

https://github.com/reactjs/redux/issues/1385


无可避免的是，该问题同样在stackoverflow上也有讨论：

http://stackoverflow.com/questions/35664594/redux-why-is-state-all-in-one-place-even-state-that-isnt-global

总结来说：

https://github.com/vuejs/vuex/issues/207
