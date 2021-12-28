---
layout: post
title:  "「译」JavaScript’s new #private class fields"
date:   2017-6-9
categories: [JavaScript]
---
> 它们（指类的私有字段）是什么，它们怎么工作，以及它们为什么是这样

> 译注：类的私有字段分为私有方法和私有属性，但原文没有明确区分。为了理解方便，本译文进行了明确区分。

这首歌 [“Noise Pollution” — Portugal. The Man](“Noise Pollution” — Portugal. The Man) 和本文更配哦！

## 正文

[类的私有字段](https://github.com/tc39/proposal-class-fields#private-fields)（private class fields，下同）
这个 JavaScript 语言新特性的提案已经处在第二阶段了（Stage 2）（译注：[JavaScript 语言新特性的演进流程](http://2ality.com/2015/11/tc39-process.html)）。
虽然这个提案还没完全确定下来，但是 JavaScript 标准委员会期望这个特性能够最终被加入到标准内。
也就是说，虽然该提案可能会被调整，但是极大可能不会被废弃。

## 类的私有属性

类的私有属性的语法看起来是这个样子的：

```js
class Point {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }
  equals(point) {
    return this.#x === point.#x && this.#y === point.#y;
  }
}
```

这个语法有两个重点：

- 定义私有属性
- 使用（referencing）私有属性

### 定义私有属性

定义私有属性和定义公共属性（defining public fields）几乎一样：

```js
class Foo {
  publicFieldName = 1;
  #privateFieldName = 2;
}
```

在使用私有属性的时候，你必须先定义它。可以只定义属性，不初始化属性的值。

```js
class Foo {
  #privateFieldName;
}
```

### 使用私有属性

除了有一点特别的语法外，使用私有属性和使用公共属性没有什么区别。

```js
class Foo {
  publicFieldName = 1;
  #privateFieldName = 2;
  add() {
    return this.publicFieldName + this.#privateFieldName;
  }
}
```

`this.#` 可以被简写为 `#`：

```js
method() {
  #privateFieldName;
}
```

等同于：

```js
method() {
  this.#privateFieldName;
}
```

### 使用实例的私有字段

使用私有字段不只局限于类中的 `this`。
你同样可以通过类的实例，在类的内部，来获得私有字段的值：

```js
class Foo {
  #privateValue = 42;
  static getPrivateValue(foo) {
    return foo.#privateValue;
  }
}
Foo.getPrivateValue(new Foo()); // >> 42
```

`foo` 是 `Foo` 的一个实例，所以我们可以在 `Foo` 内部内查找到 `#privateValue`。

## 类的私有方法

类的私有字段的提案作为 [类字段的提案](https://github.com/tc39/proposal-class-fields) 的一部分，目的只是完善类的相关特性，不会对现有类的语法做任何修改。
类的私有方法的提案会紧跟着 [类的私有字段提案](https://github.com/tc39/proposal-private-fields/blob/master/METHODS.md)，它的语法看起来是这样的：

```js
class Foo {
  constructor() {
    this.#method();
  }
  #method() {
    // ...
  }
}
```

同时，你也可以把函数赋值给私有属性：

```js
class Foo {
  constructor() {
    this.#method();
  }

  #method = () => {
    // ...
  };
}
```

### 封装（Encapsulation）

如果你声明了一个类的实例，你不能用实例去使用类的私有字段。你只能在类定义的内部去使用这些私有字段。

```js
class Foo {
  #bar;
  method() {
    this.#bar; // Works
  }
}
let foo = new Foo();
foo.#bar; // Invalid!
```

更进一步讲，为了达到真正的私有化（truly private），你甚至不能够检测一个私有字段是否存在。
为了达到这个目的，我们需要将 `#property` 和 `property` 认为是同一个属性名。

```js
class Foo {
  bar = 1; // public bar
  #bar = 2; // private bar
}
```

如果 `#property` 和 `property` 不是同一个字段名，你就可以通过 `给共有字段赋值` 来达到 `检验是否存在私有字段` 的目的。

如下所示：

```js
foo.bar = 1; // Error: `bar` is private! (boom... detected)
```

或者：

```js
foo.bar = 1;
console.log(foo.bar); // `undefined` (boom... detected again)
```

对于子类一样的。但是当子类具有和父类私有字段相同时，就不用担心这种情况的发生。

```js
class Foo {
  #fieldName = 1;
}

class Bar extends Foo {
  fieldName = 2; // Works!
}
```

> 了解更多可以读这个 [FAQ](https://github.com/tc39/proposal-private-fields/blob/master/FAQ.md#why-is-encapsulation-a-goal-of-this-proposal)

## 为什么用 `#hashtag`

有很多人会有疑惑，说：为什么不像其它语言一样，用 `private` 来当私有字段的关键字？

举例来说明来说明为什么用 `#hashtag` 这个语法：

```js
class Foo {
  private value;

  equals(foo) {
    return this.value === foo.value;
  }
}
```

我们分开来看：

### 为什么不用声明私有字段不使用 `private` ？

有很多其它的语言用 `private` 来声明类的私有字段。写出来的代码是这样的：

```js
class EnterpriseFoo {
  public bar;
  private baz;
  method() {
    this.bar;
    this.baz;
  }
}
```

这些用 `private` 来声明类私有字段的语言，对于公共字段和私有字段的存取方式是一样的。所以它们这样定义是没有任何问题的。

但是说到 JavaScript，我们不能把 `this.field` 这种获取公共字段的方式应用到私有字段上（接下来会讲到）。我们需要能够从语法层次上来解决共有和私有两者关系的方法。
而通过使用 `#` 就能够很清晰的解决。

### 为什么用 `#hashtag` ？

我们用 `this.#field` 取代 `this.field` 有以下几点原因：

- 因为封装性（encapsulation）的要求，我们不能允许私有字段和公共字段有一样的名字。所以获取私有属性不能用 `this.field` 这种方式。
- 获得公共属性可以通过 `this.field` 和 `this['field']` 这两种方式。
但是私有属性不支持第二种语法，不仅因为私有属性需要是静态的（need to be static）而且第二种语法也会造成误解。
- 需要更多的校验代价：

如下面的例子所示：

```js
class Point {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }
  equals(other) {
    return this.#x === other.#x && this.#y === other.#y;
  }
}
```

例子的重点是：我们怎么使用 `other.#x` 和 `other.#y`。通过例子里的这种方式来获取私有字段，我们可以很清楚的知道 `other` 是 `Point` 的实例。
因为我们用了 `#` 来告诉 JavaScript 编译器，我们正在从当前类中查找私有属性。

如果我们不用 `#hashtag` ，将会怎样呢？

```js
equals(otherPoint) {
  return this.x === otherPoint.x && this.y === otherPoint.y;
}
```

现在我们面对一个问题：`otherPoint` 是什么？

因为 JavaScript 没有静态类型系统，所以 `otherPoint` 可以是任何值。

这个问题细分来说：

- 函数的表现和参数值的类型有关：函数有时是获取私有属性，函数有时是查找公共属性
- 我们不得不重复的检验 `otherPoint` 的类型

```js
if (otherPoint instanceof Point && isNotSubClass(otherPoint, Point)) {
  return getPrivate(otherPoint, 'foo');
} else {
  return otherPoint.foo;
}
```

甚至，我们在使用类的每一个属性时，都要检查一下它是不是私有属性。

获取属性的值已经够慢了，就不要再拖累它了。

## TL;DR

我们需要 `#hashtag` 来处理私有字段，因为使用标准的属性获取方式会导致意外的情况，也会导致性能问题。

Private fields are an awesome addition to the language.
Thanks to all the wonderful hardworking people on TC39 who made/are making them happen!

原文地址：[https://medium.com/the-thinkmill/javascripts-new-private-class-fields-93106e37647a](https://medium.com/the-thinkmill/javascripts-new-private-class-fields-93106e37647a)

以上。
