---
title: 如何去撤销一个已提交的 commit 节点
date: 2019-12-11 17:51:37
tags: [git]
---


## 撤销某一个具体的节点

```git

git revert a7d8dcaa4e25667c9aaaf2a0809aca7fe1a27b6d

```

但是当这个节点是一个 merge 节点的时候， 你根本无法去 revert 这个节点，因为你不知道 merge 的哪一条分支应该作为主线，哪个分支作为他撤销后的主分支，因此git 会输出错误信息:

```git
error: commit cae5381823aad7c285d017e5cf7e8bc4b7b12240 is a merge but no -m option was given.
```

让我们来看看这个 m 参数代表什么

> Usually you cannot revert a merge because you do not know which side of the merge should be considered the mainline. This option specifies the parent number (starting from 1) of the mainline and allows revert to reverse the change relative to the specified parent.


> Reverting a merge commit declares that you will never want the tree changes brought in by the merge. As a result, later merges will only bring in tree changes introduced by commits that are not ancestors of the previously reverted merge. This may or may not be what you want

翻译过来就是

> 通常情况下，你无法 revert 一个 merge，因为你不知道 merge 的哪一条线应该被视为主线。这个选项（-m）指定了主线的 parent 的代号（从1开始），并允许以相对于指定的 parent 的进行 revert。

> revert 一个 merge commit 意味着你将完全不想要来自 merge commit 带来的 tree change。 因此，之后的 merge 只会引入那些不是之前被 revert 的那个 merge 的祖先引入的 tree change，这可能是也可能不是你想要的。

如同下图所示，revert 到 'thumbup-feature' 的时候不知道 到底是 revert 到绿色的线还是紫色的线。

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191211184947.png)

也可以使用 git show 命令查看相关信息 

```
git show

输出内容：

commit cae5381823aad7c285d017e5cf7e8bc4b7b12240
Merge: edf99ca 125cfdd
Date:   Thu Apr 12 18:27:21 2018 +0800

    Merge tag 'thumbup-feature'
```
如下图标示的 parent1 对应

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191211185856.png)

## 执行 git revert cae5381 -m 1

```
git revert cae5381 -m 1

输出：

Revert "Merge tag 'thumbup-feature'"

This reverts commit cae5381823aad7c285d017e5cf7e8bc4b7b12240, reversing
changes made to edf99ca31755a27b0a43b290263ed810833a95c4.

[master f0aac26] Revert "Merge tag 'thumbup-feature'"
 2 files changed, 2 deletions(-)
 delete mode 100644 file3
 delete mode 100644 file4
```

复制代码file3 和 file4 是 feature branch 上的 commit 引入的文件，被正确地删掉了

## 执行 git revert cae5381 -m 2

```
git reset --hard d208cba 
git revert cae5381 -m 2

输出

[master 2c5a0ee] Revert "Merge tag 'thumbup-feature'"
 2 files changed, 2 deletions(-)
 delete mode 100644 file5  
 delete mode 100644 file6
```

这种 revert 把 master 在 feature branch 期间进行的 commit 都给干掉了。


本文绝大部分的内容和数据都引用自 ULIVZ 的文章:

- [当你决定去 revert 一个merge commit](https://juejin.im/post/5acf4db8f265da239148822d)