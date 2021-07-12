# 项目说明

怎么样速度快？
1. 1部分服务端渲染
2. 1部分使用本地缓存

# 项目使用
#### 安装
```
> npm config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"
> npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"

> npm install
```

#### 本地调试
1. 启动 Strapi

2. 启动 Gridsome
```
> npm run develop
> npm run explore
> npm run build
```

#### 正式部署

# 静态网站

#### 常见的静态网站生成器（JAMStack）
```
JAM：javascript、api、markup
```
1. JekyII Ruby
2. Hexo Node
3. Hugo Golang
4. Gatsby Node + Reat
5. Gridsome Node + Vue
6. Nuxt.js、Next.js 也能生成静态网站

#### 静态网站的使用场景
1. 没有大量路由，没有大量动态内容的网站。
2. 纯展示页面很多的网站，例如：公司官网、个人博客等。

# Gridsome
Gridsome 也是基于 Vue 的服务端渲染，其中集合了 Vue、Vue-Router、VueX、Vue SSR 等功能

#### 安装与测试
1. 安装：
- gridsome 创建项目过程中会依赖一个安装包 sharp ，这个 sharp 很难安装；使用淘宝镜像源可以安装；
```bash
// sharp 官网：https://sharp.pixelplumbing.com/install#chinese-mirror
// 可能会报错：pngquant failed to build, make sure that libpng-dev is installed

> npm config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"
> npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"
```
- 安装插件 node-gyp 之前，还需要准备 C++ 的编译环境：On Unix、On macOS、On Windows三种系统安装见文档（之前还都需要安装：python，Windows可用应用商店搜索）
- 然后安装 node-gyp（提供编辑环境）：https://www.npmjs.com/package/node-gyp
```
> npm install -g node-gyp
```

- 安装 Gridsome 
```
> npm install --global @gridsome/cli
```
- 创建 Gridsome 项目
```
> gridsome create my-gridsome-site
> cd my-gridsome-site
> gridsome develop => 启动页面：http://localhost:8080
```

2. 本地测试工具，默认访问：http://localhost:5000
```
> npm i -g serve
> serve 目录名称
```

#### 目录结构
1. 基础目录结构

![输入图片说明](https://images.gitee.com/uploads/images/2021/0708/215857_1a35a96b_9130428.png "屏幕截图.png")

2. Gridsome 创建的项目示例：https://gitee.com/ymcdhr/e-vue/tree/master/my-gridsome-test

#### 集合添加数据与查询数据

官方文档：https://www.gridsome.cn/docs/data-layer/

1. 添加数据到集合
- 例如在 gridsome.server.js 中添加数据到集合
- 集合中的数据可以在 GraphQL 中查询到
```
  api.loadSource(async ({ addCollection }) => {

    // 每个集合collection会将数据添加到GraphQL表中，使用GraphQL来查询数据
    const collection = addCollection('Post')

    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')

    for (const item of data) {
      collection.addNode({
        id: item.id,
        title: item.title,
        content: item.body
      })
    }
  })
```
2. 使用 GraphQL 查询数据
- GraphQL 网站：http://localhost:8080/___explore
- 输入查询语句，点击按钮执行，如下：
```
query {
  post (id: 1) {
    id
    title
    content
  }
}
```

3. 在页面中查询 GraphQL 数据
- 非页面，组件中使用 <static-query> 标签


# 遗留问题：
#### 如何在服务端渲染的时候预取数据
1. 开发模式下，看不出来是服务端渲染；需要build之后才能看得出来；
http://localhost:8080/my-page

![输入图片说明](https://images.gitee.com/uploads/images/2021/0709/145200_d934fab0_9130428.png "屏幕截图.png")

2. 服务端数据预取：gridsome.server.js
- 测试数据：https://jsonplaceholder.typicode.com/posts
- 将获取到的数据添加到集合中
- 使用 GraphQL 查询数据
```
  api.loadSource(async ({ addCollection }) => {

    // 每个集合collection会将数据添加到GraphQL表中，使用GraphQL来查询数据
    const collection = addCollection('Post')

    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')

    console.log("Data:",data);
    
    for (const item of data) {
      collection.addNode({
        userId: item.userId,
        id: item.id,
        title: item.title,
        content: item.body
      })
    }
  })

```

3. GraphQL 的查询：http://localhost:8080/___explore
- 查询所有数据
```
query {
  allPost {
    edges {
      node {
        id
        title
      }
    }
  }
}
```
- 查询单个数据
```
query  {
  post(id: 1) {
  	id
    userId
    title
    content
  }
}
```

- 查询数据时使用变量??怎样通过路由url 拿到变量，在 <page-query /> 中使用？？
1. pages 目录下的页面跟路由进行匹配
2. template 模板在 gridsome.config.js 中配置 path
```
  templates: {
    // 1. StrapiBlogs 必须对应 GraphQL 集合的名称
    // 2. 这个地方 path 还不能跟已有的路由名称冲突
    "StrapiBlogs": [
      {
        path: '/articles/:id',
        component: './src/templates/article.vue'
      }
    ]
  }
```
3. 如果遇到获取不到参数的问题，先在___explore中手动查询 GraphQL 看是否有数据，在尝试把 <static-query /> 改成 <page-query />

![输入图片说明](https://images.gitee.com/uploads/images/2021/0710/164723_73c33a7f_9130428.png "屏幕截图.png")

4. 在页面中使用数据：

- 通过 this.$page.XXXX 获取集合数据，XXXX 为集合名称；也可以重命名，例如：

- 在页面中的<page-query></page-query>标签里面查询数据：
```
<page-query>
  query {
    posts: allPost {
      edges {
        node {
          id
          title
        }
      }
    }
  }
</page-query>
```


5. 优化SEO：
- 在 Gridsome 中也可以使用 metaInfo 配置 head
- metaInfo 有两种形式：1是返回对象，2是一个函数返回对象（如果要拿到集合中的数据，就需要使用函数返回对象）

```
  metaInfo () {
    return {
      title: this.$page.post.title // $page 为 GraphQL 查询出来的数据
    }
  }
```


6. 将数据里面的 markdown 内容展示到页面上，然后使用v-html渲染即可

- 安装插件：
```bash
> npm install markdown-it --save
```
- 使用插件：
```js
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

//...

methods: {
  mdToHtml(markdown){
    return md.render(markdown)
  }
}
```


# 个人博客 todolist
1. PC端UI组件：element
2. 移动端UI组件：Vant
3. 是否需要图标？
4. 接口哪儿来？
5. Gridsome 怎么读取本地 markdown 数据到 GraphQL 中？gridsome.config.js 中配置



```
module.exports = {
  siteName: '托泥羊的博客', // 对应 head => title
  siteDescription: 'Grdsome 博客示例',   // 对应 head => meta
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName:'BlogPost',
        path: './content/blog/**/*.md' // md 文件路径
      }
    }
  ]
}
```



# strapi 通用的 CMS 系统（需要写一个完整的部署、使用文档）
1. 使用场景：
- 可以把它部署到内网，用于前端自定义模拟API接口

2. strapi 的基本功能有哪些？
- 支持生成 restful api、Mock 的作用
- 支持通过 GraphQL 访问
- 可以创建角色，管理权限等，生成受保护的 api
- 支持富文本内容，支持输入 markdown 内容

3. strapi 的搭建

- 安装 strapi，创建基本项目
```
> npm install -g create-strapi-app
> npx create-strapi-app my-strapi --quickstart // quickstart 会默认使用SQL Lite，正式部署建议使用 MangoDB
```

- 访问本地环境，自动打开浏览器： http://localhost:1337/admin
```
> npm run develop
```

- 先创建好数据结构（创建一个 Content Type），然后添加数据（注意：在创建关联字段时选择引用类型，这样在新增数据时可以选择被关联的数据；例如：Blogs 的 user_id 关联了 Users 表中的 blogs，且 user_id 对 blogs 是一对多）

![输入图片说明](https://images.gitee.com/uploads/images/2021/0709/205726_0662cf17_9130428.png "屏幕截图.png")

![输入图片说明](https://images.gitee.com/uploads/images/2021/0709/205746_e0b6fd33_9130428.png "屏幕截图.png")

- 开放接口查询权限：设置 => 角色和权限 => Public => 选择对应的接口 => 选中 find、findone（放开查询权限）

![输入图片说明](https://images.gitee.com/uploads/images/2021/0709/201134_5c344b81_9130428.png "屏幕截图.png")

- 开发接口修改权限：设置 => 角色和权限 => Authenticated => 选择对应的接口 => 选中所有（接口带了token就有所有权限）=> 找到用户（创建一个用户，例如：tonyyoung） => 关联角色 ；注意：strapi 支持用户注册和登录，登陆过后返回一个 token，也可以在后台直接创建一个用户。具体参考：https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#login

- 访问接口：https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#api-endpoints
```
例如，浏览器访问：http://localhost:1337/blogs

```


4. Gridsome 访问 strapi 的数据
- 方法1：通过 ajax 直接访问 api，但是不能服务端渲染
- 方法2：通过服务端渲染前预取数据，安装插件，然后配置插件：gridsome.config.js 中配置，然后通过 GraphQL 取数据；注意 strapi 修改数据后需要重启 Gridsome 服务。

https://www.gridsome.cn/plugins/@gridsome/source-strapi
```
npm install @gridsome/source-strapi
```

```
module.exports = {
  siteName: '托泥羊的博客', // 对应 head => title
  siteDescription: 'Grdsome 博客示例',   // 对应 head => meta
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: 'http://localhost:1337',// 接口地址，本地调试时是localhost
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['post'], // 数据名称
        // singleTypes: ['impressum'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        // loginData: {
        //   identifier: '',
        //   password: ''
        // }
      }
    }
  ]
}
```

![输入图片说明](https://images.gitee.com/uploads/images/2021/0709/192206_33bd13f1_9130428.png "屏幕截图.png")




# 在Gridsome中配置webpack

https://gridsome.org/docs/config/#configurewebpack

# 在Gridsome中使用插件（例如：element ui）

1. 基础使用 element ui

```
import DefaultLayout from '~/layouts/Default.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default function (Vue, { router, head, isClient }) {

  // 注册全部组件：在此位置注册插件
  Vue.use(ElementUI);

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
```

2. 按需加载 element ui，不知道行不行，待研究！！按照官方文档并没有生效。

原先放在 .babelrc 中的配置是否需要挪到webpack中去？


```
import { Button, Select } from 'element-ui'

// 按需注册组件：暂不生效？
Vue.use(Button);
Vue.use(Select);

```



1. 常见的 css 布局？那些事最常用的布局方式？



# GraphQ
1. GraphQL 过滤语句，可以查询单条数据（根据文档来）：https://gridsome.org/docs/filtering-data/

![输入图片说明](https://images.gitee.com/uploads/images/2021/0710/001744_9bf8ea05_9130428.png "屏幕截图.png")


2. 在页面中使用过滤查询：http://localhost:8080/tonyyoung
```
<page-query>
  query ($username: String) {
    pages: allStrapiPages(filter:{user:{username:{eq: $username}}}) {
      edges {
        node {
          id
          user {
            id
            username
            name
            image {
              url
            }
          }
        }
      }
    }
  }
</page-query>

```


3. Gridsome 有两种路由方式：
- 1是根据目录生成路由、动态路由（目前不支持 children 嵌套子路由）
- 2是自定义创建页面，gridsome.server.js 中

- 因为 Gridsome 嵌套路由不是很灵活，适合用服务端渲染做个人博客；生成对应的静态页面；登录页面适合使用独立的单点登录系统；或者复杂的嵌套路由不合适使用 Gridsome 。

4. Gridsome 中使用默认的 layouts 不好用客户端路由，只能用 <slot />，但是插槽又会整个刷新页面；所以在src下定义App.vue文件，可以使用 <router-view /> 来进行路由。






markdown-it + highlight.js => markdown 编辑器



$nextTick 使用场景


部署过后，stiapi 更新数据之后自动更新 gridsome 数据

使用插件 vercel 