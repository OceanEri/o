---
title: click-jacking
date: 2020-01-20 17:57:27
tags: [web安全]
---

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20200120182608.png)

## 什么是 Click Jacking

本质上是 UI 覆盖攻击的一种，

```
1. Flash 点击劫持
2. 图片覆盖攻击(XSIO)
3. 拖拽劫持，主要用于数据窃取
4. 触屏劫持(TapJacking)
```

## 手段

1. iframe 覆盖，覆盖层 opacity 调为0

2. 图片覆盖
 

## 解决方法

使用一个 Http Header X-Frame-Options。

它有三个可选值。

DENY：浏览器会拒绝当前页面加载任何frame页面；

SAMEORIGIN：frame页面的地址只能为同源域名下的页面；

ALLOW-FROM origin：允许frame加载的页面地址

