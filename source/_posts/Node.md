---
title: Node 中的一些核心 API
date: 2019-11-19 23:56:03
tags: [Node, JavaScript]
---


## 背景

一直以来有从 Web 开发领域切入到 Server 开发领域的打算， 作为一名前端开发人员最熟悉的 Server 端技术那肯定就数 JS 啦。所以自然而然的就会想到 Node。 长期以来在业务中只是使用 Node 作为构建工具（webpack）。今年好了很多，在自己负责的业务中使用 Node 去 server 一个站点，搭建了业务中简单的 BFF 层、在自己的业余开发中也能去写一一些简单的 Node 服务，按图索骥的仿照着公司基础架构部门写的一些 Node 服务进行练习。

我认为的学会并不只是搭建一些基本的功能服务那么简单，所以还是觉得陌生。我想一来来是因为在自己日常的业务开发中使用频次还是过少熟练度上不去，二来自己缺乏服务端开发（操作系统：文件系统、线程、进程）的相关知识（eg Event-Loop 下半年在和 SRE 合作后觉得有了一定的提升）导致看不懂 Node 的文档，每一个单词都明白但还是缺乏一种熟悉感。

在今天看到梨 uglee 写的 tesla.js 后产生了那么一丢丢感觉，又看了美团技术团队关于 stream 的介绍后有种鼻塞忽然通了的感觉。我打算把这些文章记录下来。

## 文章

[全面了解 Stream - Stream handlebook](https://github.com/jabez128/stream-handbook)

[Node.js Stream 基础篇](https://tech.meituan.com/2016/07/08/stream-basics.html)
