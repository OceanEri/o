---
title: SICP-1
date: 2020-01-01 20:34:38
tags:
---

## Lisp 语言具有的特性之一

计算过程的 Lisp 描述 （又称为过程） 本身又可以作为 Lisp 的数据来表示和操作。

## 程序设计语言的基本元素

1. 基本表达形式， 用于表示语言所关心的最简单个体

2. 组合的方法，通过它们可以从比较简单的东西发出

3. 抽象的方法 复合过程

### 表达式

Lisp 中使用的是前缀表达书

### 命名和环境

变量：通过名字去使用变量的方式

```Lisp
( define size 2 )
```

环境：我们一般将值与符号进行关联，然后再去使用这个变量。这就意味着解释器必须维护某种存储的能力，以便保持有关名字的 「名字-值」的对偶的轨迹，这种存储叫做环境。在一个计算过程中会包许多个不同的环境。

### 复合过程

- 数和算术运算是基本的数据和过程
- 组合式的嵌套提供了一种组织多个操作的方法
- 定义是一种受限的抽象手段，它为名字相应的值

```
(
  define square (x)
    (* x x)
)
```

应用序和正则序

正则序：完全展开后而归约。
应用序列： 解释器中的，先求值参数而后应用的方式。

## 条件表达式和谓词

(
  define (abs x)
    (cond ((x > 0) x)
          ((x = 0) 0)
          ((x < -) (-x))
    )
)

## 练习

### 练习 1.2

```scheme
(/ 
  (+ 5 4 (- 2 ( - 3 ( + 6 (/ 4 5) ))))
  (* 3 (- 6 2) (- 2 7))
)
```

### 练习 1.3

```scheme
(
  define (max a b)
    (
      cond ((a > b) a)
            ((a = b) a)
            ((a < b) b)
    )
)
```
### 练习 1.5

### 牛顿法求平方根

## 练习 1.6

## 练习 1.7

## 练习 1.8



scheme 使用前缀表达式来写

When $a \ne 0$, there are two solutions to \\(ax^2 + bx + c = 0\\) and they are
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

使用 scheme 写一个递归

```scheme
(define (fact n)
  (if (= n 1)
    1
    (* n (fact (- n 1)))
  )
)
(fact 3)
```

scheme 中的 cond 
```scheme
(define (testCond x)
  (cond
    ((<= x 0) (- 0 x))
    ((> x 1) x)
  )
)
```

scheme 中定义函数的两种形式

第一种

```scheme
(define Hello
  (
    lambda (a b c)
      (+ a b c)
  )
)

(Hello 1 2 3)
```

第二种

```scheme
(
  define 
    ( Hello a b c)
      (+ a b c)
)
```

参考
- [如何理解计算机中的谓词 Predicate](https://www.zhihu.com/question/28698429)

- [因为比较懒所以没有在本地搭建开发环境,直接使用的是 repl.it 这样一个 web scheme enviroment ](https://repl.it/repls/DistinctOnlyOrganization)