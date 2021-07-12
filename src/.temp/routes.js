const c1 = () => import(/* webpackChunkName: "page--src-templates-social-vue" */ "D:\\Tony‘sDocument\\documents\\e-vue\\my-gridsome-test\\src\\templates\\social.vue")
const c2 = () => import(/* webpackChunkName: "page--src-templates-project-list-vue" */ "D:\\Tony‘sDocument\\documents\\e-vue\\my-gridsome-test\\src\\templates\\project-list.vue")
const c3 = () => import(/* webpackChunkName: "page--src-templates-project-vue" */ "D:\\Tony‘sDocument\\documents\\e-vue\\my-gridsome-test\\src\\templates\\project.vue")
const c4 = () => import(/* webpackChunkName: "page--src-templates-blog-list-vue" */ "D:\\Tony‘sDocument\\documents\\e-vue\\my-gridsome-test\\src\\templates\\blog-list.vue")
const c5 = () => import(/* webpackChunkName: "page--src-templates-blog-vue" */ "D:\\Tony‘sDocument\\documents\\e-vue\\my-gridsome-test\\src\\templates\\blog.vue")
const c6 = () => import(/* webpackChunkName: "page--src-templates-new-vue" */ "D:\\Tony‘sDocument\\documents\\e-vue\\my-gridsome-test\\src\\templates\\new.vue")
const c7 = () => import(/* webpackChunkName: "page--node-modules-gridsome-app-pages-404-vue" */ "D:\\Tony‘sDocument\\documents\\e-vue\\my-gridsome-test\\node_modules\\gridsome\\app\\pages\\404.vue")

export default [
  {
    path: "/social/:page(\\d+)?/",
    component: c1
  },
  {
    path: "/project-list/:page(\\d+)?/",
    component: c2
  },
  {
    name: "__project_rep",
    path: "/project/:rep",
    component: c3,
    meta: {
      dataPath: "/project/_rep.json",
      dynamic: true
    }
  },
  {
    path: "/blog-list/:page(\\d+)?/",
    component: c4
  },
  {
    path: "/blog/:id/",
    component: c5
  },
  {
    path: "/new/",
    component: c6
  },
  {
    name: "404",
    path: "/404/",
    component: c7
  },
  {
    name: "*",
    path: "*",
    component: c7
  }
]
