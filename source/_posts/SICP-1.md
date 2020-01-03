---
title: SICP-1
date: 2020-01-01 20:34:38
tags:
---

程序设计的基本元素

1. 基本表达形式， 用于表示语言所关心的最简单个体

2. 组合的方法，通过它们可以从比较简单的东西发出

3. 抽象的方法 复合过程

前缀表达式

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
```
(define (testCond x)
  (cond
    ((<= x 0) (- 0 x))
    ((> x 1) x)
  )
)
```
