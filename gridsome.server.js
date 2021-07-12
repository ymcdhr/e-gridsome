// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// 该文件的功能：处理服务端渲染的数据，创建路由页面
// 该文件的规范：因为 js 是使用 nodejs 运行，所以使用 CommonJS 规范
const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {

    // 每个集合collection会将数据添加到GraphQL表中，使用GraphQL来查询数据
    const foCollection = addCollection('Followings')
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const { data } = await axios.get('https://api.github.com/users/ymcdhr/following')
    console.log("Followings:",data);
    
    for (const item of data) {
      foCollection.addNode({
        id: item.id,
        login: item.login,
        avatar_url: item.avatar_url,
        html_url: item.html_url,
        html_url: item.html_url
      })
    }

    const repsCollection = addCollection('Reps')
    const { data: Reps } = await axios.get('https://api.github.com/users/ymcdhr/repos')
    console.log("Reps:",Reps);
    
    for (const item of Reps) {
      repsCollection.addNode({
        id: item.id,
        name: item.name,
        human_name: item.human_name,
        full_name: item.full_name,
        html_url: item.html_url,
        stargazers_count: item.stargazers_count,
        watchers_count: item.watchers_count,
        forks_count: item.forks_count,
        description: item.description,
        updated_at: item.updated_at,
        created_at: item.created_at
      })
    }
  })



  // 服务端渲染的列表页
  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    // 通过代码的方式创建路由页面
    // 服务端渲染，列表页
    createPage({
      path: '/social',
      component: './src/templates/social.vue'
    })
    // 服务端渲染，列表页
    createPage({
      path: '/project-list',
      component: './src/templates/project-list.vue'
    })

    // 客户端渲染，详情页
    createPage({
      path: '/project/:rep',
      component: './src/templates/project.vue'
    })

    // 服务端渲染，列表页
    createPage({
      path: '/blog-list',
      component: './src/templates/blog-list.vue'
    })

    // createPage({
    //   path: '/blog/:id',
    //   component: './src/templates/blog.vue'
    // })    
    
    // 服务端渲染，列表数据
    createPage({
      path: '/new',
      component: './src/templates/new.vue'
    })
  })
}
