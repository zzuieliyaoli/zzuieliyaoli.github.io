---
layout: post
title:  "写出更好的 JavaScript 代码（二）——《Clean Code》笔记"
date:   2017-8-20
categories: [JavaScript]
---

《代码整洁之道》是一本非常好的书。虽然是以 Java 代码为例，但是 `编写 Clean Code 的原则` 是一样的。
本文是前 3 章的笔记，并且代码也做了 Java 到 JavaScript 的转换。

## 有意义的命名

- 注意命名，而且一旦发现有更好的名称，就替换掉旧的。

- 变量、函数或类的名称应该已经答复了所有的大问题。它应该告诉你，它为什么会存在，它做什么事，应该怎么用。
如果名称需要注释来补充，那就不算是名副其实。

  ```js
  // bad
  const d; // 消逝的时间，以日记

  // good
  const elapsedTimeInDays;
  const daysSinceCreation;
  const daysSinceModification;
  const fileAgeInDays;
  ```

- 提防使用不同之处较小的名称。

  ```js
  // bad
  const XYZControllerForEfficientHandlingOfStrings;
  const XYZControllerForEfficientStorageOfStrings;
  ```

- 废话都是冗余。 `Variable` 一词用于不应当出现在变量中。`Table` 一词永远不应当出现在表名中。
`NameString` 会比 `Name` 好吗？难道 `Name` 会是一个浮点数不成？

- 如果缺少明确约定，变量 `moneyAmount` 就与 `money` 没区别，`customerInfo` 与 `customer` 没区别，
`accountData` 与 `account` 没区别，`theMessage` 与 `messsage` 没区别。

- 单字母名称和数字常量有个问题，就是难以在一大篇文字中找出来。找 `MAX_CLASSES_PER_STUDENT` 就很容易，但是想找数字 `7` 就麻烦了。

- 不应当让读者在脑中把你的名称翻译为他们熟知的名称。

  ```js
  // bad
  const redBtn;
  const runtimeOpt;

  // good
  const redButton;
  const runtimeOption;
  ```

- 类名和对象应该是名词或是名词短语。

  ```js
  // bad
  class Manager {}
  class Processor {}
  class Data {}
  class Info {}

  // good
  class Customer {}
  class WikiPage {}
  class Account {}
  class AddressParser {}
  ```

- 给每个抽象概念选一个词，并且一以贯之。例如，使用 `fetch`、`retrieve`、`get` 来给在多个类中的同种方法命名。

  ```js
  // bad
  class Order {
    getList() {}
  }
  class Accound {
    fetchInfo() {}
  }

  // good
  class Order {
    getList() {}
  }
  class Accound {
    getInfo() {}
  }
  ```

- 别用双关语。

  ```js
  // bad
  function addNumbers(number1, number2) {
    return number1 + number2;
  }
  function addStrings(string1, string2) {
    return string1 + string2;
  }

  // good
  function addNumbers(number1, number2) {
    return number1 + number2;
  }
  function concatenateStrings(string1, string2) {
    return string1 + string2;
  }
  ```

- 添加有意义的语境。

  ```js
  // bad
  const addrFirstName;
  const addrLastName;
  const addrState;

  // good
  const address = {
    firstName: '',
    lastName: '',
    state: '',
  };
  ```

## 函数

- 函数的第一规则是要更短小。第二条规则是还要更短小。

- 只做一件事。如果函数只是做了该函数名下同一抽象层上的步骤，则函数还只是只做了一件事。
编写函数毕竟是为了把大一些的概念（换言之，函数的名称）拆分为另一抽象层上的一些列步骤。

  ```js
  // bad
  function submitFormData() {
    // 获得 data
    const data = $('#input').value();
    // 校验 data
    if (value === '') {
      return false;
    } else {
      $.post('/test/url', data)
    }
  }

  // good
  function submitFormData() {
    const data = getFormData();
    const validData = validateFormData();
    $.post('/test/url', validData)
  }
  ```

- 向函数传入布尔值简直就是骇人听闻的做法。这样做，方法签名立刻变得复杂起来，大声宣布本函数不止做一件事。

  ```js
  // bad
  const result = false;
  turnOrFalsefun(result);

  // good
  if (result === true) {
    trueFun();
  } else {
    falseFun();
  }
  ```

- 函数要么做什么事，要么回答什么事，但二者不可得兼。
函数应该修改某对书的状态，或是返回该对象的有关信息。两样都干常会导致混乱。

  ```js
  // 设置某个属性，如果成功就返回 true，如果不存在那个属性就返回 false

  // bad
  const obj;
  function set(attribute, value) {
    if (attribute in obj) {
      obj.attribute = value
      return true;
    } else {
      return false;
    }
  }

  // 会出现
  if (set('username', 'jane'))
  ```

  上面的代码是什么意思呢？它是在问 `username` 属性值是否之前已设置为 `janm` 吗？
  或者它是在问 `username` 属性值是否成功设置为 `jane` 呢？

  ```js
  // good
  if (attributeExists('username')) {
    setAttribute('username', 'jane');
  }
  ```

- 使用异常替代返回错误码

  当返回错误码时，就是在要求调用者立刻处理错误。

  ```js
  if (deletePage(page) === E_OK) {
    if (configKeys.deleteKey(page.name.makeKey() === E_OK)) {
      logger.log('page deleted');
    } else {
      logger.log('configKey not deleted');
    }
  } else {
    logger.log('delete failed');
    return E_ERROR;
  }
  ```

  如果使用异常替代返回错误码，错误处理代码就能从主路径代码中分离出来，得到简化。

  ```js
  try {
    deletePage(page);
    configKeys.deleteKey(page.name.makeKey();
  } catch (e) {
    logger.log(e);
  }
  ```

## 感受

- 知错就改，不要怕重构代码。
- 好代码是烂代码改出来的。

以上。
