---
title: 升级 Node 遇到的一些问题
date: 2019-11-29 12:17:07
tags: [Linux, Node]
---

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191129143017.png)

今天在将 node 从 8.6.0 升级到 node 12.0.4 时候遇到这么一个问题:

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191129142559.png)

这是因为 gnulib glib 和 glibc 的版本过低导致的，那么问题来了 gnulib glib 和 glibc 分别指的什么呢 ？

> 答： glibc 是一个 C 语言 运行时库, 例如 printf(3) fopen(3)

> 答： glib 是一个基于 C 语言的工具库，同时也是一个面向对象的事件循环

> 答： gnulib 是一个适配 POSIX API 和 native API 的库。

那么问题又来了，到底什么是 runtime library 呢？

> 答: 运行时库就是程序运行的时候所需要依赖的库。运行时库就是程序运行的时候所需要依赖的库。  
运行的时候指的是指令加载到内存并由CPU执行的时候。
C代码编译成可执行文件的时候，指令没有被CPU执行，这个时候算是编译时，就是编译的时候。


参考：

- [glibc, glib and gnulib](https://stackoverflow.com/questions/2240120/glibc-glib-and-gnulib)
- [c runtime libray 是什么](https://stackoverflow.com/questions/2766233/what-is-the-c-runtime-library)
- [什么是 runtime library](https://en.wikipedia.org/wiki/Runtime_library)
- [运行时（runtime）是什么意思？应该怎样深入且直观地理解？](https://www.zhihu.com/question/20607178)