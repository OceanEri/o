---
title: 浏览器概览
date: 2019-11-28 10:20:36
tags: [浏览器, 线程, browser]
---

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191128115319.png)

## 浏览器的组成结构

1. 用户界面

包括地址栏、前进、后退、书签栏。

2. 浏览器引擎

在用户界面和浏览器引擎之间传送指令。

3. 呈现引擎

负责呈现浏览器内容，负责解析 HTML 和 CSS 内容，并将解析后的内容现实在屏幕上。

4. 网络

用于网络调用。

5. 用户界面后台

用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。

6. JavaScript 解释器

解析执行 JavaScript 代码。

7. 数据存储

持久层，浏览器需要在硬盘上保存各种数据，例如 Cookie，新的 HTML 5 规范定义了网络数据库，这是一个完整轻便的网络数据库

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191128103147.png)

和大多浏览器不同，Chrome 的每个标签页分别对应一个呈现引擎实例，每个标签页都是一个独立的进程。

## 呈现引擎

呈现引擎，又称为渲染引擎也成为浏览器内核，在这方面又称为 UI 线程，这是由各大浏览器厂商根据 W3C 标准自行研发的， 常见的内核有四种 （Webkit (chrome, safari) Gecko(firefox)）。


### 呈现主流程

呈现引擎最大的作用是用于呈现，也就是在浏览器中显示请求的内容。一开始从网络层获取文档内容，内容大小限制一般在 8000 个块以内, 然后进行以下流程：

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191128104926.png)

使用 HTML 构建 DOM 结构，并将各个标记转换为 “内容树” 上的 DOM 节点。同时也会解析外部 CSS 文件以及样式文件中的样式数据。 HTML 中这些带有视觉指令的样式信息将用于创建另一个树结构： 呈现树。

呈现树包含多个带有视觉属性（如颜色和尺寸）的矩形。这些矩形的排列顺序就是它们将在屏幕上显示的顺序。

呈现树构建完毕之后，进入“布局”处理阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标。下一个阶段是绘制 - 呈现引擎会遍历呈现树，由用户界面后端层将每个节点绘制出来。

示例：webkit 主流程示例图

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191128105617.png)


示例：Mozila 的 Gecko 呈现主流程引擎


![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191128110700.png)

## JavaScript 解释器

什么是 JavaScript 解释器？简单地说，JavaScript 解释器就是能够“读懂” JavaScript 代码，并准确地给出代码运行结果的一段程序。

所以 JavaScript 解释器，又称为 JavaScript 解析引擎，又称为 JavaScript 引擎，也可以成为 JavaScript 内核，在线程方面又称为 JavaScript 引擎线程。比较有名的有 Chrome 的 V8 引擎（用 C/C++ 编写），除此外还有 IE9 的 Chakra、Firefox 的 TraceMonkey。它是基于事件驱动单线程执行的，JavaScript 引擎一直等待着任务队列中任务的到来，然后加以处理，浏览器无论什么时候都只有一个 JavaScript 线程在运行 JavaScript 程序。

学过编译原理的人都知道，对于静态语言来说（如Java、C++、C），处理上述这些事情的叫编译器（Compiler），相应地对于 JavaScript 这样的动态语言则叫解释器（Interpreter）。这两者的区别用一句话来概括就是：编译器是将源代码编译为另外一种代码（比如机器码，或者字节码），而解释器是直接解析并将代码运行结果输出。 比方说，firebug 的 console 就是一个 JavaScript 解释器。但我们无需过多在这些点上纠结。因为比如像 V8，它其实是为了提高 JavaScript 的运行性能，会在运行之前将 JavaScript 编译为本地的机器码然后再去执行，这样速度就快很多，相信大家对 JIT（Just In Time Compilation）一定不陌生吧。

JavaScript 解释器和我们平时讨论的 ECMAScript 有很大关系，标准的 JavaScript 解释器会根据 ECMAScript 标准去实现文档中对语言规定的方方面面，但由于这不是一个强制措施，所以也有不按照标准来实现的解释器，比如 IE6，这也是一直困扰前端开发的一个来由——兼容问题。有关 JavaScript 解释器的部分不做过于深入的介绍，但是由于我们对它有了部分的了解，接下来可以介绍一个新的部分——线程。

### JavaScript 与浏览器的线程机制

作为浏览器脚本语言，JavaScript 主要用于处理页面中用户交互，以及操作 DOM 树、CSS 样式树（当然也包括服务器逻辑的交互处理）。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？当然我们可以通过锁来解决上面的问题。但为了避免因为引入了锁而带来更大的复杂性，从一诞生，JavaScript 就是单线程，这已经成了这门语言的核心特征。

我们可以回顾一下最开始所提的一个问题：Web Worker 真的让 JavaScript 拥有了多线程的能力吗？

为了利用多核 CPU 的计算能力，在 HTML5 中引入的工作线程使得浏览器端的 JavaScript 引擎可以并发地执行 JavaScript 代码，从而实现了对浏览器端多线程编程的良好支持。Web Worker 允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM 。所以，这个新标准并没有改变 JavaScript 单线程的本质。

### 为什么页面会卡顿？

由于 JavaScript 是可操纵 DOM 的，如果在修改这些元素属性同时渲染界面（即 JavaScript 线程和 UI 线程同时运行），那么渲染线程前后获得的元素数据就可能不一致了。为了防止渲染出现不可预期的结果，浏览器设置 UI 渲染线程与 JavaScript 引擎线程为互斥的关系，当 JavaScript 引擎线程执行时 UI 渲染线程会被挂起，UI 更新会被保存在一个队列中等到 JavaScript 引擎线程空闲时立即被执行。

于是，我们便明白了：假设一个 JavaScript 代码执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染出现“加载阻塞”的现象。当然，针对 DOM 的大量操作也会造成页面出现卡顿现象，毕竟我们经常说：DOM 天生就很慢。

所以，当你需要考虑性能优化时就可以从如上的原因出发，大致有以下几个努力的方面：

- 减少 JavaScript 加载对 DOM 渲染的影响（将 JavaScript 代码的加载逻辑放在 HTML 文件的尾部，减少对渲染引擎呈现工作的影响）；
- 避免重排，减少重绘（避免白屏，或者交互过程中的卡顿）；
- 减少 DOM 的层级（可以减少渲染引擎工作过程中的计算量）；
- 使用 requestAnimationFrame 来实现视觉变化（一般来说我们会使用 setTimeout 或 setInterval 来执行动画之类的视觉变化，但这种做法的问题是，回调将在帧中的某个时点运行，可能刚好在末尾，而这可能经常会使我们丢失帧，导致卡顿）；

优化方面可以看 [优化 JavaScript 的执行](https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution
)

### 浏览器中的那些线程 

事实上我们在使用浏览器的时候都会涉及到网络工具、浏览器事件、定时器触发线程。事实上这些线程如果出现在主线程上的话工作效率会非常的低下（这里的工作效率指的是人能看到的渲染引擎渲染出的页面）所以浏览器为这些功能独立设计了其他的线程

- 浏览器事件触发线程：当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待 JavaScript 引擎的处理。这些事件可以是当前执行的代码块如定时任务、也可来自浏览器内核的其他线程如鼠标点击、AJAX 异步请求等，但由于 JavaScript 的单线程关系所有这些事件都得排队等待 JavaScript 引擎处理

- 定时器触发线程：浏览器定时计数器并不是由 JavaScript 引擎计数的, 因为 JavaScript 引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确, 因此通过单独线程来计时并触发定时是更为合理的方案

- 异步 HTTP 请求线程：在 XMLHttpRequest 在连接后是通过浏览器新开一个线程请求， 将检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件放到 JavaScript 引擎的处理队列中等待处理；


## 总结

这篇大部分基本摘抄 [聊聊 JavaScript 与浏览器的那些事 - 引擎与线程](https://zhuanlan.zhihu.com/p/32751855)和 [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)主要是自己对浏览器结构的一个简单梳理、也是为下一篇 Event Loop 的铺垫。

引用：
- [聊聊 JavaScript 与浏览器的那些事 - 引擎与线程](https://zhuanlan.zhihu.com/p/32751855)

- [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

- [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)