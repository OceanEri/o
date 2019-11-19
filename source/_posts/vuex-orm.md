---
title: 在前端项目中使用 vuex orm
date: 2019-11-20 00:36:02
tags:
---

## 什么是 ORM

### 网上抄的基本概念：

ORM全称是：Object Relational Mapping(对象关系映射)，其主要作用是在编程中，把面向对象的概念跟数据库中表的概念对应起来。举例来说就是，我定义一个对象，那就对应着一张表，这个对象的实例，就对应着表中的一条记录。 

### 为什么我要使用 Vuex ORM

之前一直在做公司内部的运维平台

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191120004847.png)

遇到了这几个问题：

1、 接口返回数据过大（最差的一种情况一个接口返回了 10M 的 JSON，需要前端再对这个 JSON 数据进行二次加工渲染图形 这个问题后来使用 web worder 解决）

2、 数据间的交流过多

理想化交互逻辑：

1. 点击左侧树 -> 获取到 集群、服务、机器
1. 选中机器 -> 获取到 metrics 项
1. 选中metrics项 -> 获取到对应指标的数据，通过 echarts 渲染

导致的问题：

1. 每一个获取下一级的接口都需要传递各处不同的参数
2. 该如何设计 Store 结构 ？ 是应当按照直觉 UI = f(state) 还是 应该把数据拍平。

其实按照这两种不同设计理念设计 Store 的话又会存在以下问题：

- Store 层级过深会不会对性能产生影响
- 把 Store 拍平的话又该如何去跨域对象层级去获取相关数据

最终还是硬着头皮做完了， 但樯橹灰飞烟灭还是留下了高昂的维护成本、for 循环漫天飞和无尽的心灵伤的伤害 😣。

![](https://raw.githubusercontent.com/EPSON-LEE/image-hosting/master/20191120010615.png)

### 为什么前端要使用 Vuex ORM

在了解了我司几个开发运营后台的同事开发的业务之后其实发现很多业务并不需要状态管理工具。“PS:此刻想起 Dan Abramov 那句名言 “如果你不知道你是否需要 Redux， 那么你一定不需要 Redux“。” 
而在需要使用状态管理工具的业务中又缺乏一定设计准则 [详见知乎讨论：前端开发应更多地使用多层嵌套对象的结构，还是拍平数组进行引用的结构。](https://www.zhihu.com/question/57402317/answer/152861036)

这个时候，Vuex ORM 提供一种工业标准可以大大提升代码的可维护性和开发效率，我认为也就是在业务层面上进行领域模型抽象。


## 优势

Vuex Orm 一方面让项目中的 Vuex 使用更加优雅（你不用再去写 this.$store.Home.xxx.xxx 这种链式调用代码）。另一方面前端对接口的承受能力会变得更高，比如说后端没有因为某些原因不能按照我们的想法来提供接口时，除了在 BFF 层做处理外我们可以直接在浏览器中建立数据模型提升开发效率。最后 Vuex Orm 中的数据模型提供了类型判断的能力（就像 TS 一样）降低代码出错率。

## 定义数据类型

模型字段的基本类型

|  Type   | 含义  |
|  ----  | ----  |
| this.attr("")  | 任意值 |
| this.string("")  | 字符串 |
| this.number("")  | 数字 |
| this.boolean("")  | 布尔值 |

特殊类型

|  Type   | 含义  |
| nullable  | 空值 |
| this.increment()  | 自增 |

关系类型

## 数据模型

### 模型间的关系

Vuex-Orm 定义了几种关系用来描述数据模型之间的关系

|  关系   | 写法  |  含义  |
|  ----  | ----  |  ----  |
| One to One | this.hasOne(Profile, 'user_id') | 一个数据对象拥有一个数据对象 |
| One to One Inverse | this.belongTo(User, 'user_id') | 一个数据模型中包含另一个数据对象 |
| One to One Inverse | this.belongTo(User, 'user_id') | 一个数据模型归属于一个数据对象 |
| One to Many | this.belongTo(User, 'user_id') | 一个数据对象属多种另一个类型的数据对象（归属方） |
| Has Many By | this.hasManyBy(Node, 'user_ids') | 一个数据对象属多种另一个类型的数据对象（被归属方） |
| Many To  Many | roles: this.belongsToMany(Role, RoleUser, 'user_id', 'role_id') | 角色和用户之间的关系：一个角色拥有多个用户，一个用户同样会拥有多种角色 |
| Has Many Through | posts: this.hasManyThrough(Post, User, 'country_id', 'user_id') | 一个村落拥有许多邮政局作为桥梁来互相沟通 |
| One To One (Polymorphic) | image: this.morphOne(Image, 'imageable_id', 'imageable_type') | 见下文解释|
| One To Many (Polymorphic) |  | 见下文解释|
| Many To Many (Polymorphic) |  | 见下文解释|


hasManyThrough 例子
```
this.hasManyThrough(
  Post,               // Final model we wish to access.
  User,               // Intermediate model.
  'country_id',       // Foreign key on User model.
  'user_id',          // Foreign key on Post model.
  'local_country_id', // Local key on Country model.
  'local_user_id'     // Local key on User model.
)
```

morphOne 一张图片可以属于一个用户，也可以属于一个评论。
```
class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.attr(null),
      name: this.string(''),
      image: this.morphOne(Image, 'imageable_id', 'imageable_type')
    }
  }
}

class Post extends Model {
  static entity = 'posts'

  static fields () {
    return {
      id: this.attr(null),
      title: this.string(''),
      image: this.morphOne(Image, 'imageable_id', 'imageable_type')
    }
  }
}

class Image extends Model {
  static entity = 'images'

  static fields () {
    return {
      id: this.attr(null),
      url: this.attr(''),
      imageable_id: this.attr(null),
      imageable_type: this.attr(null)
    }
  }
}

```


One To Many (Polymorphic)
```
class Post extends Model {
  static entity = 'posts'

  static fields () {
    return {
      id: this.attr(null),
      post_title: this.string(''),
      comments: this.morphMany(Comment, 'commentable_id', 'commentable_type')
    }
  }
}

class Video extends Model {
  static entity = 'videos'

  static fields () {
    return {
      id: this.attr(null),
      video_link: this.string(''),
      comments: this.morphMany(Comment, 'commentable_id', 'commentable_type')
    }
  }
}

class Comment extends Model {
  static entity = 'comments'

  static fields () {
    return {
      id: this.attr(null),
      body: this.attr(''),
      commentable_id: this.attr(null),
      commentable_type: this.attr(null)
    }
  }
}
```

Many To Many (Polymorphic)
```
class Post extends Model {
  static entity = 'posts'

  static fields () {
    return {
      id: this.attr(null),
      tags: this.morphToMany(Tag, Taggable, 'tag_id', 'taggable_id', 'taggable_type')
    }
  }
}

class Video extends Model {
  static entity = 'videos'

  static fields () {
    return {
      id: this.attr(null),
      tags: this.morphToMany(Tag, Taggable, 'tag_id', 'taggable_id', 'taggable_type')
    }
  }
}

class Tag extends Model {
  static entity = 'tags'

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr('')
    }
  }
}

class Taggable extends Model {
  static entity = 'taggables'

  static fields () {
    return {
      id: this.attr(null),
      tag_id: this.attr(null),
      taggable_id: this.attr(null),
      taggable_type: this.attr(null)
    }
  }
}
```

this.morphedByMany()
```
class Tag extends Model {
  static entity = 'tags'

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(''),
      posts: this.morphedByMany(
        Post, Taggable, 'tag_id', 'taggable_id', 'taggable_type'
      ),
      videos: this.morphedByMany(
        Video, Taggable, 'tag_id', 'taggable_id', 'taggable_type'
      )
    }
  }
}
```

### 继承


## 数据

在没有引入Vuex Orm 之前， 我们往往是通过操作 mutations 来对一个对象进行增、删、改、查，数据关系简单操作起来还行，但是一旦数据结构稍微复杂一些写起来就有些繁琐痛苦来
。Vuex Orm 会对 Store 中的数据进行持久化，通过已经定义好的数据模型使得 CURD 更加遍历写法更加优雅。

### 插入操作

视图
```
<script>
import User from '@/models/User'

export default {
  created () {
    User.insert({
      data: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Johnny' }
      ]
    })
  } 
}
</script>
```

Vuex Store 经过更新后

```
{
  entities: {
    users: {
      data: {
        1: { id: 1, name: 'John' },
        2: { id: 2, name: 'Jane' },
        3: { id: 3, name: 'Johnny' }
      }
    }
  }
}
```

create 方法和 insert 效果一致，他们的区别是 create 会清空之前的数据是一个全量更新

```
// Let's say this is the initial State.
{
  entities: {
    users: {
      data: {
        1: { id: 1, name: 'John' }
      }
    }
  }
}

// `insert` is going to insert a new record, and keep existing data.
User.insert({
  data: { id: 2, name: 'Jane' }
})

// State after `insert`.
{
  entities: {
    users: {
      data: {
        1: { id: 1, name: 'John' },
        2: { id: 2, name: 'Jane' }
      }
    }
  }
}

// `create` is going to replace all existing data with new data.
User.create({
  data: { id: 3, name: 'Johnny' }
})

// State after `create`.
{
  entities: {
    users: {
      data: {
        3: { id: 3, name: 'Johnny' }
      }
    }
  }
}
```

### 插入数据模型

数据模型
```
class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(''),
      posts: this.hasMany(Post, 'user_id')
    }
  }
}

class Post extends Model {
  static entity = 'posts'

  static fields () {
    return {
      id: this.attr(null),
      user_id: this.attr(null),
      title: this.attr('')
    }
  }
}
```

插入数据模型
```
// Create User data with its related Post data.
User.insert({
  data: {
    id: 1,
    name: 'John Doe ',
    posts: [
      { id: 1, user_id: 1, title: 'Post title 1' },
      { id: 2, user_id: 1, title: 'Post title 2' }
    ]
  }
})

// State after `insert`.
{
  entities: {
    posts: {
      data: {
        1: { id: 1, user_id: 1, title: 'Post title 1' }
        2: { id: 2, user_id: 1, title: 'Post title 2' }
      }
    },
    users: {
      data: {
        1: { id: 1, name: 'John Doe' }
      }
    }
  }
}
```

### 更新操作

根据 primary key 来更新
```
<template>
  <div>
    <label>Name</label>
    <input :value="user.name" @input="updateName">
  </div>
</template>

<script>
import User from '@/models/User'

export default {
  computed: {
    user () {
      return User.find(1)
    }
  },

  methods: {
    updateName (e) {
      User.update({
        where: 1,
        data: {
          name: e.target.value
        }
      })
    }
  }
}
</script>
```

根据条件来筛
```
// Initial State.
{
  entities: {
    users: {
      1: { id: 1, name: 'John', age: 20, active: false },
      2: { id: 2, name: 'Jane', age: 20, active: false },
      3: { id: 3, name: 'Johnny', age: 30, active: false }
    }
  }
}

// Update via function.
User.update({
  where: (user) => {
    return user.age === 20
  },

  data: { active: true }
})

// State after `update`.
{
  entities: {
    users: {
      1: { id: 1, name: 'John', age: 20, active: true },
      2: { id: 2, name: 'Jane', age: 20, active: true },
      3: { id: 3, name: 'Johnny', age: 30, active: false }
    }
  }
}
```