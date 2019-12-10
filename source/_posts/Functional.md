---
title: 函数式编程
date: 2019-12-10 21:09:49
tags: [JavaScript]
---



 > 一个自函子范畴上的幺半群

```JavaScript
//  reduce 非常强大 map、filter、forEach 函数都可以使用 reduce 实现


// 使用 reduce 模拟 map 函数

/**
 * map 的使用方法
 * [1,2,3,4].map(item => {
 *  console.log(item)
 * })
 */

const map = (fn, arr) => arr.reduce((acc, item, index, arr) => {
    return acc.concat(fn(item, index, arr))
  }, [])


// 使用 reduce 实现 filter

/**
 * filter 的使用方法
 * [1,2,3,4].filter(item => {
 *  return item > 2
 * })
 * 
 * > 3, 4
 */


//  filter 中的判断函数称为 predicate function

const filter = (fn, arr) => (newArr, item) => {
  return fn(item) ? newArr.concat(item) : newArr // predicate function
}

// 使用 reduce 实现 forEach



// 使用 reduce 实现 reduceRight


// 使用 reduce 实现 compose

/**
 * compose(f, g, h)
 * f, g, h => f(g(h(x)))
 */

const compose = (...fn) => x => fn.reduceRight((v, f) => f(v), x)


// 使用 reduce 实现 pipe 函数

/**
 * pipe(h, g, f)
 * f(g(h(x)))
 */
 const pipe = (...fn) => fn.reduce((v, f) => f(v), x)

/**
 * 同一性
 * f.map(x => x) == f
 */

 /**
  * 组合性
  * const r1 = u.map(x => f(g(x)));
  * const r2 = u.map(g).map(f);
  * 
  * r1.map(trace); // 5
  * r2.map(trace); // 5
  */

  //  Maybe Functor

  class Maybe {
    constructor(value) {
      this.value
    }
    map(fn) {
      return this.value ? Maybe.of(fn(this.value)) : Maybe.of(null)
    }
    join() {
      return this.value
    }
    chain(fn) {
      return this.map(fn).join()
    }
    static of(value) {
      return new Maybe(value)
    }
  }

class Maybe {
  constructor (value) {
    this.value = value ;
  }      
  map (fn) {
    return this.value ? Maybe.of(fn(this.value)) : Maybe.of(null);
  }
  join ( ) {
    return this.value;
  }
  chain(fn) {
    return this.map(fn).join()
  }
  static of(value) {
    return new Maybe(value);
  }
}

// let toUpperCase = (str) => str.toUpperCase()

// var  a = Maybe.of( Maybe.of('str') ) 
// console.log(a.join().map(toUpperCase))


  a = Maybe.of(Maybe.of(Maybe.of('str')))
```


参考资料


- [知乎 17点的回答](https://www.zhihu.com/question/19635359/answer/172074046)
- [掘金翻译：sFunctor 与 Category （软件编写）（第六部分）](https://github.com/xitu/gold-miner/blob/master/TODO/functors-categories.md)

扩展

- [迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)

有空补充

- [如何学习范畴论](https://www.zhihu.com/question/20448295)