---
layout: post
title:  "JavaScript 的表达式语句和表达式"
date:   2016-09-25
categories: [JavaScript]
---

[ECMAScript2015](http://www.ecma-international.org/ecma-262/6.0/index.html) 的上下文无关文法 [\[1\]](https://zh.wikipedia.org/wiki/%E4%B8%8A%E4%B8%8B%E6%96%87%E6%97%A0%E5%85%B3%E6%96%87%E6%B3%95) [\[2\]](https://www.zhihu.com/question/21833944) 如下所示：

```
Program :
    SourceElements

SouceElements :
    SouceElement
    SouceElements SourceElement

SouceElement :
    Statement
    FunctionDeclaration

Statement :
    Block
    DeclarationsStatement
    VariableStatement
    EmptyStatement
    ExpressionStatement
    IfStatement
    IterationStatement
    ContinueStatement
    BreakStatement
    ReturnStatement
    WithStatement
    LabelledStatement
    SwitchStatement
    ThrowStatement
    TryStatement
    DebuggerStatement
ExpressionStatement :
    [lookahead ∉ \{\{, function, class, let [\}] Expression ;

FunctionDeclaration :
    function Identifier ( FormalParameterList[opt] ) { FunctionBody }
```


[ECMAScript2015 规范](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-expression-statement) 提示说：

> An `ExpressionStatement` cannot start with *a U+007B (LEFT CURLY BRACKET)* because that might make it ambiguous with a `Block`. Also, an `ExpressionStatement` cannot start with the *function* or *class* keywords because that would make it ambiguous with a `FunctionDeclaration`, a *GeneratorDeclaration*, or a *ClassDeclaration*. An ExpressionStatement cannot start with the two token sequence *let [* because that would make it ambiguous with a *let* LexicalDeclaration whose first LexicalBinding was an ArrayBindingPattern.

## Statement

>  《你不知道的JavaScript（中卷）》P92


拿英语语法打个比方：“句子”（sentence）是完整表达某个意思的一组词，由一个或多个“短语”（phrase）组成，它们之间由标点符号或连接词（and 和 or 等）连接起来。短语可以由更小的短语组成。有些短语是不完整的，不能独立表达意思；有些短语则相对完整，并且能够独立表达某个意思。

JavaScript 的语法也是如此。JavaScript 的 statement 相当于 sentence，表达式（expression）相当于短语（phrase），运算符（operator）相当于标点符号和连接词。

## Expression

> An expression is a sequence of operators and their operands, that specifies a computation. Expression evaluation may produce a result and may generate side-effects.

> [Expressions and operators - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

## For Example

```js
var a = 1 + 2       // Declarations Statement
var b = a           // Declarations Statement
b = a               // Assignment Expression
a = 3 * 6           // Assignment Expression
b;                  // Expression Statement
```

## Reference

- [JavaScript 匿名函数有哪几种执行方式?](https://www.zhihu.com/question/20249179)


