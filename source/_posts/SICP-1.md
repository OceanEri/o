---
title: SICP-1
date: 2020-01-01 20:34:38
tags:
---

程序设计的基本元素

1. 基本表达形式， 用于表示语言所关心的最简单个体

2. 组合的方法，通过它们可以从比较简单的东西发出

3. 抽象的方法 复合过程

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