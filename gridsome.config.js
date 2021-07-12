// This is where project configuration and plugin options are located.
// 更多配置参考: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Grdsome 博客', // 对应 head => title
  siteDescription: 'Grdsome 博客示例',   // 对应 head => meta
  plugins: [
    // 读取本地 md 文件到 GraphQL
    // {
    //   use: '@gridsome/source-filesystem',
    //   options: {
    //     typeName:'BlogPost',
    //     path: './content/blog/**/*.md' // md 文件路径
    //   }
    // }
    // 从 strapi 接口获取数据存到 GraphQL
    {
      use: '@gridsome/source-strapi',
      options: {
        // apiURL: 'http://localhost:1337',// 接口地址，本地调试时是localhost
        apiURL: process.env.GRIDSOME_API_URL,//'http://106.75.93.71:1337',// 线上环境
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['pages','blogs'], // 数据集合名称，相当于从 api 取数据：http://localhost:1337/blogs
        typeName: 'Strapi',  // 默认的名字
        // singleTypes: ['impressum'],// 单利数据名称
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        // loginData: {
        //   identifier: '',
        //   password: ''
        // }
      }
    }
  ],
  templates: {
    // 1. StrapiBlogs 必须对应 GraphQL 集合的名称
    // 2. 这个地方 path 还不能跟已有的路由名称冲突
    StrapiBlogs: [
      // {
      //   path: '/blog-list',
      //   component: './src/templates/Blogs.vue'
      // },
      // 服务端渲染，详情页
      {
        // name: 'id',// 坑：必须要有个name
        path: '/blog/:id',
        component: './src/templates/blog.vue'
      }
    ],
  }
}
