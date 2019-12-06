---
title: Promise 碎片 （等待整理）
date: 2019-12-06 14:43:38
tags: [JavaScirpt, Promise]
---

> 我所做的一切，不过是在取悦一个影子

### 什么是 Promise ?

1. 定义：Promise 是一个对象，他会在未来的某个时刻生成一个值，已完成 （resolved）的值或者一个没有完成的理由。
2. 特性：Promise 存在三个状态  FULLFILLED （已完成）、REJECTED （已拒绝）、PENDING （等待中）
3. 回调：Promise 的使用者可以附上回调函数来处理已完成的值或者拒绝的原因

Promise 是热切的，一旦 promise 的构造函数被调用，它就会开始执行你交给它的任务。如果你需要一个懒惰的，请看 [observables](https://github.com/Reactive-Extensions/RxJS) 或者 [task](https://github.com/rpominov/fun-task)。


![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/WeChat6f9e35474509f44dc8831b91563615d0.png)


### Promise 用法


```javaScript

const promise = new Promise(function(resolve, reject) {
  // Your code
  if (/* 异步操作成功 */) {
    resolve(value)
  } else {
    reject(value)
  }
})

promise.then(function(value) {
  // success
}, function (error) {
  // error
})

```

![Promise Polifil](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191206182531.png)

### Promise API

Promise 规范有很多，Promise A、 Promise B、 Promise A+、Promise D

目前 ES6 的 Promise 是基于 Promise A+ 实现的

我们知道 Promise 是一个构造函数，需要用 new 调用，并有以下几个 api：( 从哪里知道？ 怎么知道？)

API: 

```javaScript

function Promise(resolver) {}

Promise.prototype.then = function(onResolved) {}
Promise.prototype.catch = function(onRejected) {}

Promise.resolve = function() {}
Promise.reject = function() {}
Promise.race = function() {}
Promise.all = function() {}

```



同步任务（存放在执行栈）



异步任务 （存放在异步队列） 异步任务又分为宏任务和微任务

Chrome: 

> 宏任务 Task: setTimeout setInterval setImmediate(IE专用) messageChannel

等待执行栈和微任务队列都执行完毕才会执行，并且在执行完每一个宏任务之后，会去看看微任务队列有没有新添加的任务，如果有，会先将微任务队列中的任务清空，才会继续执行下一个宏任务


> 微任务 microTask：promise MutationObserver...

当执行栈中的代码执行完毕，会在执行宏任务队列之前先看看微任务队列中有没有任务，如果有会先将微任务队列中的任务清空才会去执行宏任务队列

Node: 

> 宏任务 Task: setTimeout setInterval...

> 微任务 microTask: process.nextTric promise setImmediate

``` js
var isFulfilled = false;

var d = new Promise(function (resolve, reject) {

  setTimeout(function () {

    resolve(2);

    isFulfilled = true;

  }, 50);

});

d.then(function onFulfilled() {

  console.log(isFulfilled == true)

});


```


Promise 的零碎实现： 

```JavaScript
const PENDING = "PENDING"
const RESOLVED = "RESOLVED"
const REJECTED = "REJECTED"

// 值穿透

// 构造函数
class MyPromise {

  constructor(exexutor) {

    this.status = PENDING
    this.value = undefined

    // 回调函数
    this.onResolvedCallback = []
    this.onRejectedCallback = []

    // inner resolve
    let _resolved = (value) => {
      setTimeout(() => {
        if (this.status === PENDING) {
          this.status = RESOLVED
          this.value = value
          // 针对非链式调用
          /**
           * P = new Promise()
           * 
           * P.then()
           * 
           * P.then()
           */
          this.onResolvedCallback.forEach(cb => cb(value))
        }
      })
    }

    // inner reject
    let _rejected = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.value = reason
          // 针对非链式调用
        this.onRejectedCallback.forEach(cb => cb(reason))
      }
    }

    try {
      exexutor(_resolved, _rejected)
    } catch (err) {
      _rejected(err)
    }
  }

  // 原型链表
  then(onResolved, onRejected) {
    let promise2
    let self = this

    // 根据标准规定, 如果 then 的参数不是一个函数那么, 就抛出
    onResolved = typeof onResolved === 'function' ? onResolved : function (value) { return value }
    onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { return reason }

    if (this.status === PENDING) {
      // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
      // 只能等到Promise的状态确定后，才能确实如何处理。
      // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
      // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
      return promise2 = new MyPromise(function (resolve, reject) {
        self.onResolvedCallback.push(function (value) {
          try {
            var x = onResolved(self.value)
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
            }
            resolve(x)
          } catch (e) {
            reject(e)
          }
        })

        self.onRejectedCallback.push(function (reason) {
          try {
            var x = onRejected(self.value)
            if (x instanceof Promise) {
              x.then(resolve, reject)
            }
          } catch (e) {
            reject(e)
          }
        })
      })
    }

    if (this.status === RESOLVED) {
      return promise2 = new MyPromise(function (resolve, rejected) {
        try {
          x = onResolved(self.value)
          if (x instanceof MyPromise) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
            x.then(resolve, rejected)
          }
          resolve(x) // 否则，以它的返回值做为promise2的结果
        } catch (err) {
          rejected(err)
        }
      })
    }

    if (this.status === REJECTED) {
      return promise2 = new MyPromise(function (resolve, rejected) {
        try {
          x = onRejected(self.value)
          if (x instanceof MyPromise) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
            x.then(resolve, rejected)
          }
        } catch (err) {
          rejected(err)
        }
      })
    }

  }
}

// then 方法


var isFulfilled = false;

var d = new MyPromise(function (resolve, reject) {

  setTimeout(function () {

    resolve(2);

    isFulfilled = true;

  }, 50);

});

d.then(function onFulfilled() {

  console.log(isFulfilled == true)

});


// 测试

let promise = new MyPromise(function (resolve, rejected) {
  setTimeout(() => {
    console.log('pending')
    resolve()
  }, 1000);
}).then(() => {
  console.log(2)
})


let promise2 = new Promise(function (resolve, rejected) {
  setTimeout(() => {
    console.log('pending')
    resolve()
  }, 1000);
}).then(() => {
  console.log(2)
})

```





参考

- [从零一步一步实现一个完整版的Promise](https://juejin.im/post/5d59757f6fb9a06ae76405c6)
- [https://juejin.im/post/5aa7868b6fb9a028dd4de672](https://juejin.im/post/5aa7868b6fb9a028dd4de672)


- [Promise A+ 规范](https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/)
- [史上最易读懂的 Promise/A+ 完全实现](https://zhuanlan.zhihu.com/p/21834559)
- [剖析Promise内部结构，一步一步实现一个完整的、能通过所有Test case的Promise类](https://github.com/xieranmaya/blog/issues/3)

后续

- [从如何停掉 promise 链说起](https://github.com/xieranmaya/blog/issues/5)

拓展

- [评论区：Monald 实现Promise](https://zhuanlan.zhihu.com/p/21834559)


