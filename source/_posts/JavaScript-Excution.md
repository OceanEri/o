---
title: How does the “this” keyword work?
date: 2019-12-26 10:23:19
tags: [JavaScript Exuction, stackoverflow]
---

最近在 stackoverflow 看到了一个问题: this 是如何工作的。要想解释这个问题，需要对 JavaScript Exuction 和 JavaScript Scope 有足够的了解。

按照 JavaScript Specification

1. Initial global execution context

2. Entering eval code

3. Entering function code 

4. Arrow function

> Arrow functions don't have their own this.... binding. Instead, those identifiers are  resolved in the lexical scope like any other variable. That means that inside an arrow function, this...refer(s) to the values of this in the environment the arrow function is defined in.

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191226112232.png)

[How does the “this” keyword work?](https://stackoverflow.com/questions/3127429/how-does-the-this-keyword-work/3127440#3127440)