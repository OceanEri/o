---
title: 假如我来负责一家公司的前端体系
date: 2019-11-27 18:07:17
tags: ["项目管理", "技术视野"]
---

![how to build a building a building](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191127184203.png)

很长一段时间都在和 SRE、Infra 合作主要做的是一些比较基础的服务。 这篇文章主要记录工作中做过的和自己见过的重要的东西，想象如果自己有一天到了一家没有技术的公司自己都得做什么。


## 私服

在一个公司的前端开发中，理想情况是不同项目应当都使用公司提供的脚手架，并且由 infra 做统一维护。
但是做过开发的人都知道，做开发时不会每个组件都自己写，我们通常会引用一些外部文件（JavaScript -> node_modules, Java -> Maven）。
这个时候我们希望能把公司开发者使用的组件、包都放在自己的服务器上，因为主要有以下几点好处：

1. 节省自己的外网带宽

2. 加速Maven、npm的构建，提升构建速度。

3. 部署自己的第三方组件（公司的公共 node、 开发框架）

node_modules 依赖

使用工具：

[Nexus Repository Manager OSS 3.x](https://help.sonatype.com/repomanager3)

## 构建平台

## 通用脚手架

## 通用 CLI 工具

## 文档体系

## 前端项目管理体系

## 权限平台

