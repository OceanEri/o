---
title: 什么是浅比较
date: 2020-01-08 11:40:07
tags: [javaScript]
---

最近在看一个组件的时候看到了 React.pureComponent,官方文档中对他的描述是

```
由于PureComponent的shouldeComponentUpdate里，实际是对props/state进行了一个浅对比，所以对于嵌套的对象不适用，没办法比较出来。
```

## shallowCopy

在 React 中，shouldComponentUpdate的实现方式为

```
if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate = !shallowEqual(prevProps, nextProps) || ! shallowEqual(inst.state, nextState);
}
```
可以看到 PureComponent 就是对 props 和 state 的前后状态做的一个浅比较。
