---
title: 如何理解函数式编程
date: 2019-12-10 21:09:49
tags: [函数式 计算机]
---

要回答这个问题，需要知道什么是编程范式。


## 编程范式

函数式编程范式是一种 **编程范式**。
我们通常见到的编程范式有 **命令式编程(Imperative programming)**、**函数式编程** 和 **逻辑式编程**，面向对象编程也属于命令式编程的一种。

### 命令式编程

命令式编程是面向**计算机硬件**的抽象，有**变量**（对应着存储单元）、**赋值语句（获取指令和存储指令）**，**表达式（内存引用）**和**控制语句（跳转指令）**。总而言之，命令式编程就是一个**冯诺伊曼机**的**指令序列**。

### 函数式编程的本质

而函数式编程是面向数学的抽象，将计算描述为一种**表达式值**，可以这么说：一个函数就是一个**表达式值**

函数式编程中的函数这个术语不是说计算机中的函数（实际上为 Subroutine，而是指数学中的函数，也就是自变量的映射。也就是说一个函数的值仅决定于函数参数的值，不依赖其他状态。比如 sqrt(x)函数计算x的平方根，只要 x 不变，无论何时调用，调用几次值都是不变的。

在函数式语言中，**函数作为一等公民**，可以在任何地方定义，在函数内或函数外，可以作为函数的参数和返回值，可以对函数进行组合。

纯函数式编程中的**变量**也不是命令式编程中的变量，即存储状态状态的单元，而是代数中的变量，即一个值的名称。变量的值是不可变的（immutable），也就是说不允许像命令式编程语言中的那样多次给一个变量赋值。 例如 在命令式编程语言中我们写的“x = x + 1”，这依赖可变状态的事实，拿给程序看是正确的，但是拿给数学家看，却被认为这个等式为假。

函数式语言的如条件语句，循环语句也不是命令式编程语言中的**控制语句**，而是函数式编程中的语法糖。

严格意思上的函数式编程意味着不使用可变的变量，赋值，循环和其他命令式结构进行编程。

从理论上说，函数式语言也不是通过**冯诺伊曼**体系结构的机器上运行的，而是通过**λ演算**来运行的，就是通过**变量替换**的方式进行，变量替换为其值或表达式，函数也替换为其表达式，并根据运算符进行计算。λ演算是**图灵完全（Turing completeness）**的，但是大多数情况，函数式程序还是被编译成（冯诺依曼机的）机器语言的指令执行的。

### 函数式编程的好处

由于命令式编程语言也可以通过类似函数指针的方式来实现高阶函数，函数式的最主要的好处主要是不可变性带来的。没有可变的状态，函数就是引用透明（Referential transparency）的和没有副作用（No Side Effect）。

一个好处是，函数即不依赖外部的状态也不修改外部的状态，函数调用的结果不依赖调用的时间和位置，这样写的代码容易进行推理，不容易出错。这使得单元测试和调试都更容易。

由于函数是引用透明的，以及函数式编程不像命令式编程那样关注执行步骤，这个系统提供了优化函数式程序的空间，包括惰性求值和并性处理。

还有一个好处是，由于函数式语言是面向数学的抽象，更接近人的语言，而不是机器语言，代码会比较简洁，也更容易被理解。

### 函数式编程的特性

由于变量值是不可变的，对于值的操作并不是修改原来的值，而是修改新产生的值，原来的值保持不便。例如一个Point类，其moveBy方法不是改变已有Point实例的x和y坐标值，而是返回一个新的Point实例。

```scala
class Point(x: Int, y: Int){
  override def toString() = "Point (" + x + ", " + y + ")" 

  def moveBy(deltaX: Int, deltaY: Int) = {
    new Point(x +   deltaX, y + deltaY)
  }
}
```
（示例来源：Anders Hejlsberg在echDays 2010上的演讲）

同样由于变量不可变，纯函数编程语言无法实现循环，这是因为**for循环**使用可变的状态作为计数器，而**While**循环或**DoWhile**循环需要可变的状态作为跳出循环的条件。因此在函数式语言里就只能使用递归来解决迭代问题，这使得函数式编程严重依赖递归。

通常来说，算法都有 **递推 (iterative)** 和 **递归（recursive)** 两种定义，以阶乘为例，阶乘的递推定义为：

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20200110235529.png)

阶乘的定义为

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20200110235647.png)

递推定义的计算时需要使用一个累积器保存每个迭代的中间计算结果，Java代码如下：

```Java
public static int fact(int n){
  int acc = 1;
  for(int k = 1; k <= n; k++){
    acc = acc * k;
  }
  return acc;
}
```
而递归定义的计算的Scala代码如下：

```Scala
def fact(n: Int):Int= {
  if(n == 0) return 1
  n * fact(n-1)
}
```

我们可以看到，没有使用循环，没有使用可变的状态，函数更短小，不需要显示地使用累积器保存中间计算结果，而是使用参数n（在栈上分配）来保存中间计算结果。

当然，这样的递归调用有更高的开销和局限（调用栈深度），那么尽量把递归写成尾递归的方式，编译器会自动优化为循环。

一般来说，递归这种方式于循环相比被认为是更符合人的思维的，即告诉机器做什么，而不是告诉机器怎么做。递归还是有很强大的表现力的。

### 函数式语言中的特性

- 高阶函数（High-order function）
- 偏函数（Particial Applied function）
- Currying
- 闭包 （closure）
- 惰性求值 （Lazy evaluation）、（call by need）

1. 高阶函数

```javaScript
function sum(funcA, funcB, value) {
  return funcA(value) + funcB(value)
}
```

2. 偏函数

偏函数则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数

偏函数和 currying 有一定的联系

引用 [functional-programming-jargon](https://github.com/hemanth/functional-programming-jargon#partial-application) 的话来说就是：
> Curried functions are automatically partially applied.

```javaScript
function add(a, b) {
  return a + b
}

// 计算 a、b 的和
add(a, b)

// 使用偏函数
var addOne = partial(add, 1)

addOne(2)
```

3. Currying

```javaScript
function add(a, b) {
    return a + b;
}

// 执行 add 函数，一次传入两个参数即可
add(1, 2) // 3

// 假设有一个 curry 函数可以做到柯里化
var addCurry = curry(add);
addCurry(1)(2) // 3
```

4.惰性求值

```javascript
var a = function (b) {
  return b
}
a(3)
```

### 总结

函数式编程是给软件开发者提供的另一套工具箱，为我们提供了另外一种抽象和思考的方式。 函数式编程也有不太擅长的场合，比如处理可变状态和处理IO，要么引入可变变量，要么通过**Monad**来进行封装（如State Monad和IO Monad）

参考资料

- [本文大部分都参考了这篇文章：如何理解函数式编程 中「用心阁」的回答](https://www.zhihu.com/question/28292740)

- []

- [知乎 17点的回答](https://www.zhihu.com/question/19635359/answer/172074046)
- [JavaScript专题之函数柯里化](https://github.com/mqyqingfeng/Blog/issues/42)

- [掘金翻译：Functor 与 Category （软件编写）（第六部分）](https://github.com/xitu/gold-miner/blob/master/TODO/functors-categories.md)


其他等待理解的

- 图灵机完备
- lamda 演算
- SICP
- Haskell
- Monald