---
title: 源码阅读计划
date: 2019-11-21 17:29:50
tags: ["编码"]
---

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191122111156.png)

一直以来受到技术论坛的“荼毒”，要阅读源码。我也就按照很多论坛中说的那样，git clone 一份代码就开始看，结局都不怎么好。主要还是因为以下几种原因：

> 技术方面说：

1. 语法特性掌握还不够

比如说看到 Reflect.defineProperty、Proxy 等一些日常业务开发中少见的用法时不能很好的理解其中的细节，频繁的中断会降低个人学习体验。

2. 对 JavaScript 这门语言的设计哲学认识还不够

原型链几乎每个前端都知道，要真的问也都能插上几句话。这个东西长时间不看确实会忘， 正如 [王福朋这篇经典的文章中提到](https://www.cnblogs.com/wangfupeng1988/p/3977924.html) 的他每次面试前都要看看。但个人认为原型链是 web 前端开发中不多的值得深刻记忆的东西。

3. 构建工具相关的体系

前端开发在最近几年发展迅速，工程化工具也伴随着剧烈变化通常都是 break changes，比如说第一份工作使用 webpack 2.0 进行打包 React，现在我的电脑里还留着一坨关于 webpack 2.0 配置的宝贝。但是第二份工作却是使用 vue 进行开发，有了 vue.config.js 这么好使的玩意儿对 webpack 4.0 生疏也是难免, 毕竟在业务开发中很够用。

再比如说 babel6.0 和 babel 7.0 的区别，按照官网来配置有时候也跑不通。

源代码中有许多工程性质的配置和针对运行时的特殊优化，对构建工具不清不楚看起来自然会很懵逼。

4. 数据结构与算法的缺失

比如 vue keep-alive 的实现方式，如果你不了解 LRU 的话，我想很难去看明白他在做什么。

> 学习方法和心理来说：

过去相当长的一段时间总有这么一种观点：沉浸在技术论坛有助于我的极速成长，我的技术视野得到了扩展但是针对现阶段的我造成的弊端也足够明显。

1. 持续性

看到新的技术或名词总想去试试，但浅尝辄止的尝试并不能给现阶段的自己带来过多的帮助甚至会带来迷茫，如果真的想把现在所做的事当作一辈子的事业来做的话这种做法显然有些浮躁了。

2. 自信心

看到各种名词、术语、理念、思想自己都不明白经常会给我带来一种深厚的挫败感。从自己走过来的两年再回头看：这些人出于扩展自己的技术影响力也好、分享也好、还是宣传自己也好，很多都是人为的造词或者新瓶装旧酒。

说到这，想起最近发生的一件事： 某司的人力资源领导被优化了，他曾在去年的年底在自媒上发过一篇文章 《行业寒冬之下，为什么被裁的总是你》。

总之作为一个互联网从业者应当具备很强的信息甄别能力。

# 第一阶段

首先从比较小的代码区块看起，比如:

[30 seconds of code](https://www.30secondsofcode.org/)

[ramdaJS](https://github.com/ramda/ramda)

之前看ramada的时候遇到一个问题，在 stackoverflow 上提问还收到了作者的回答，

# 第二阶段

第二步：找到了看源码的感觉后，再去看某个类库的源码，比如说redux、moment这种，功能专一同时也兼顾深度。

[完全理解 redux](https://github.com/brickspert/blog/issues/22)

[带着问题看React-Redux源码（一万四千字长文预警](https://zhuanlan.zhihu.com/p/80655889)

# 第三阶段

这时候自己有了一定的基础和感觉了，可以再去看现在mvvm框架实现的原理，也是从单一的功能开始，拆解mvvm框架的通用实现模式，如双向绑定、虚拟dom等，最后实现自己的mini mvvm。

[50行代码的MVVM，感受闭包的艺术](https://juejin.im/post/5b1fa77451882513ea5cc2ca)

[不好意思！耽误你的十分钟，让MVVM原理还给你](https://juejin.im/post/5abdd6f6f265da23793c4458)

# 第四阶段

这时候你具备了看react、vue这种框架的能力了，最好还是带着问题去看，比如看react fiber的原理、如何渲染的，setState怎么操作等等。

[[React技术内幕] setState的秘密](https://juejin.im/post/599b8f066fb9a0247637d61b)

[怎样学习React？当然是自己动手实现一个React啦](https://juejin.im/post/5ad81c24f265da504c168c85)

但是实际开发中没有这种造轮子的机会，大家的关注点更多还是放在业务上

> 多端秒开方案、性能优化相关

[移动 H5 首屏秒开优化方案探讨](http://blog.cnbang.net/tech/3477/)

> 工程化套件（脚手架、开发调试工具、发布管理）

[15分钟搭一个企业级脚手架](https://juejin.im/post/5d650613f265da03951a0364)

[前端自动化发布实战总结](https://juejin.im/post/5b23f18b6fb9a00e6433536d)

> 数据埋点/监控

[前端埋点的设计方案](https://juejin.im/post/5b62d68df265da0f9d1a1cd6)

> 多端融合

[多端统一方案 Taro](https://link.zhihu.com/?target=https%3A//aotu.io/notes/2018/06/07/Taro/)

[Awesome Flutter：带你从入门到进阶的 Flutter 指南](https://juejin.im/post/5b2869e66fb9a00e5f3e861f)

> 组件库

1. pre code
2. low code 

> 互动平台、直播

[直播原理与web直播实战](https://juejin.im/post/5ab851b6f265da23826df601)

> SSR 微前端

[一文吃透 React SSR 服务端渲染和同构原理](https://juejin.im/post/5d7deef6e51d453bb13b66cd)

> BFF、Serverless、BFF in Serverless

[BFF、Serverless、以及BFF in Serverless](https://juejin.im/post/5cdc3dc2e51d453b6c1d9d3a)

> 灰度平台/ABtest等等

[https://juejin.im/post/5da88d795188252f051e2b47](https://juejin.im/post/5da88d795188252f051e2b47)

> 软技能

[软技能-代码之外的生存指南1(职业篇)](https://juejin.im/post/5bf2382d6fb9a049d974ccb6)

[工程师如何在工作中提升自己?](https://juejin.im/post/5ad06fc851882555635ebc9c)