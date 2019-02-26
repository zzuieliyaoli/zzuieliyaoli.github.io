---
layout: post
title:  "写出更好的 JavaScript 代码（四）——《Clean Code》笔记"
date:   2017-9-2
categories: [JavaScript]
---

在本文是关于 `写出更好的 JavaScript 代码` 的第四篇文章，也是 《Clean Code》第六章与第七章的笔记，也做了 Java 到 JavaScript 的转换。

## 对象和数据结构

- 将变量设置为私有（Private）有一个理由：我们不想其他人依赖这些变量。我们还想在心血来潮时能够自由修改其类型或实现。
那么，为什么还是有那么多程序员给对象自动添加赋值器（setter）和取值器（getter），将私有变量公之于众、如同它们根本就是公共变量一般呢？

- 隐藏实现并非只是在变量之间放上一个函数层那么简单。隐藏实现关乎抽象！类并不简单地用取值器和赋值器将其变量推向外间，
而是暴露抽象接口，以便用户无需了解数据的实现就能操作数据本体。

  ```js
  // bad
  class Vehicle {
    getFuelTankCapacityInGallons() {}
    getGallOnsOfFasoline() {}
  }

  // good
  class Vehicle {
    getPercentFuelRemaining() {}
  }
  ```

  前者使用具象手段与机动车的燃料层通信，而后者则采用百分比抽象。你能确定前者里面都是些变量存取器，而却无法得知后者中的数据形态。

  我们不愿意暴露数据细节，更愿意以抽象形态表述数据。这并不是用接口/或赋值器、取值器就万事大吉。
  要以最好的方式呈现某个对象包含的数据，需要做严肃的思考。傻乐着乱加取值器和赋值器，是最坏的选择。


- 对象把数据隐藏于抽象，暴露操作数据的函数。数据结构暴露其数据，没有提供有意义的函数。
留意这两种定义的本质。它们是对立的。这种差异貌似微小，但却有深远的含义。

  ```js
  // 过程式形状代码
  // Geometry 类操作三个形状类。形状类都是简单的数据结构，没有任何行为。
  // 行为都在 Geometry 类中
  class Square {
    topLest;
    side;
  }

  class Rectangle {
    topLeft;
    height;
    width;
  }

  class Circle {
    center;
    radius;
  }

  class Geometry {
    static PI = 3.141592653589793;
    area(shape) {
      if (shape instanceof Square) {
        const s = Shape;
        return (s.side ** 2);
      } else if (shape instanceof Rectangle) {
        const r = shape;
        return (r.height * r.width);
      } else if (shape instanceof Circle) {
        const c = shape;
        return (Geometry.PI * (c.radius ** 2));
      }
    }
  }
  ```

  如果给 Geometry 添加一个 Primeter() 函数会怎样。那些性状类根本不会因此而受到影响！
  另一方面，如果给 Geometry 添加一个新形状，就得修改 Geometry 中的所有函数来处理它；

  ```js
  // 多态式形状
  class Square extends Shape {
    #TopLeft;
    #side;

    area() {
      return (this.#side ** 2);
    }
  }

  class Rectangle extends Square {
    #TopLeft;
    #height;
    #width;

    area() {
      return (this.#height * this.#width);
    }
  }

  class Circle extends Shape {
    #center;
    #radius;
    static PI = 3.141592653589793;

    area() {
      return (Circle.PI * (this.#radius ** 2));
    }
  }
  ```

  这里，area() 方法是多态的。不需要有 Geometry 类。所以，如果添加一个新形状，现有的 `函数` 一个也不会受到影响，
  而当添加新函数时所有的 `形状` 都得做修改！

- 对象与数据结构之间的二分原理

  过程式代码（使用数据结构的代码）便于在不改动既有数据结构的前提下添加新函数。
  面向对象代码便于在不改动既有函数的前提下添加新类。

  反过来讲也说得通：过程式代码难以添加新数据结构，因为必须修改所有函数。面向对象代码难以添加新函数，因为必须修改所有类。

## 错误处理

- 错误处理很重要，但如果它搞乱了代码逻辑，就是错误的做法。

- 使用异常而非返回码

  > TODO

- 异常的妙处之一是，它们在程序中定义了一个范围。执行 try-catch-finally 语句中 try 部分代码时，
你是在表明可随时取消执行，并在 catch 语句中接续。

- 在编写可能抛出异常的代码时，最好先写出 try-catch-finally 语句。这能帮你定义代码的用户应该期待什么，
不论 try 代码块中执行的代码出什么错都一样。

- 你抛出的每个异常，都应当提供足够的环境说明，以便判断错误的来源和处所。

  ```js
  (async () => {
    try {
      const userInfo = await getUserInfoPromise();
    } catch (e) {
      const error = {
        message: JSON.stringify(e),
        api: '',
        ua: '',
      }
      reportError(error);
    }
  })();
  ```

- 创建一个类或配置一个对象，用来处理特例。你来处理特例，客户代码就不用应付异常行为了。异常行为被封装到特例对象中。

  ```java
  // 如果消耗了餐食，则计入总额中。如果没有消耗，则员工得到当日餐食补贴。
  // bad
  try {
    MealExpenses expenses = expenseReportDao.getMeals(employee.getId());
    m_total += expenses.getTotal();
  } catch(MealExpensesNotFound e) {
    total += getMealPerDiem();
  }
  ```

  异常打断了业务逻辑。不去处理特殊情况就会好一些。

  ```java
  // good
  MealExpenses expenses = expenseReportDao.getMeals(employee.getId());
  m_total += expenses.getTotal();
  ```

  但是需要修改 expenseReportDao 是其总是返回 MealExpense 对象。
  如果没有餐食消耗，就返回一个返回餐食补贴的 MealExpense 对象。

  ```java
  public class PerDiemMealExpenses implements MealExpenses {
    public int getTotal() {
      // return the per diem default
    }
  }
  ```

- 别返回 null 值。只要有一处没检查 null 值，应用程序就会失控。如果你打算在方法中返回 null 值，不如抛出异常，或是返回特例对象。

- 别传递 null 值，除非 API 要求你向它传递 null 值。

以上。
