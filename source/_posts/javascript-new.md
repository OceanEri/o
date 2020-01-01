---
title: 实现 JavaScript 中的 new 关键字
date: 2019-12-29 01:23:40
tags: [JavaScript]
---

众所周知 JavaScript 是一门基于原型、函数先行的多范式语言，它已经由ECMA（欧洲电脑制造商协会）通过ECMAScript实现语言的标准化。

想要知道如何实现 new 关键字我们就得搞清楚 new 做了什么。

## JavaScript 中的 new 做了什么 ?

按照 [spec](https://es5.github.io/#x13.2.2) ,new 依次做了以下 4 件事情：

1. 创建一个对象 new Object
2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
3. 将步骤 1 新创建的对象作为 this 的上下文；
4. 如果构造函数没有返回对象则返回 this

最终实现代码

```
function objFactory() {
  var Constructor = [].shift.call(arguments)
  var obj = Object.create(Constructor.prototype)
  var ret = Constructor.apply(obj, arguments)
  return (typeof ret instanceof Object || ret === null) ? ret : obj
}
```