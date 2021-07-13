<template>
  <div id="app" class="layout">
    <header class="header" :style="{backgroundImage: backgroundImage}">
      <div class="cover"></div>
      <div class="user">
        <el-image alt="Example image" :src="userImage" width="135" />
        <div class="name">{{ user.name }}</div>
        <div class="description">{{ user.description }}</div>
      </div>
    </header>

    <content class="content">
      <el-container class="box">
        <el-header class="header">
            <el-row>
              <el-col :span="24">
                <a @click="changeButton($event, 1)">
                  <el-button :icon="canEdit?'el-icon-edit':'el-icon-s-promotion'">{{canEdit ? (isEdit ? '提交' : '修改文章') : '发布文章'}}</el-button>
                </a>
                
              </el-col>
            </el-row>
        </el-header>
        
        <el-container class="cnt">
          <el-aside class="aside" style="width: 200px">
            <el-menu class="menu">
              <g-link :to="`/new?username=${user.username}`">
                <el-menu-item>
                  <i class="el-icon-menu"></i>
                  <span slot="title">最新动态</span>  
                </el-menu-item>
              </g-link>
              <g-link :to="`/blog-list`">
                <el-menu-item>
                  <i class="el-icon-notebook-2"></i>
                  <span slot="title">博客列表</span>
                </el-menu-item>
              </g-link>
              <g-link :to="`/social`">
                <el-menu-item>
                  <i class="el-icon-bangzhu"></i>
                  <span slot="title">关注账号</span>
                </el-menu-item>
              </g-link>
              <g-link :to="`/project-list`">
                <el-menu-item>
                  <i class="el-icon-orange"></i>
                  <span slot="title">我的项目</span>
                </el-menu-item>
              </g-link>
            </el-menu>
          </el-aside>
          <el-main class="main">
            <!-- <slot /> -->
            <router-view :is-edit="isEdit"/>
          </el-main>
        </el-container>
      </el-container>
    </content>

    <footer class="footer">
      <el-row class="el-row">
        <el-col :span="10">
          <div>
            © 2021 Tony Young&emsp;&emsp;
            <a href="https://github.com/ymcdhr" target="_blank">Profile</a>&emsp;&emsp;
            <a href="https://segmentfault.com/u/tonyyoung" target="_blank">Blog</a>
          </div>
        </el-col> 
        
        <el-col :span="4">
          <div style="text-align: center; font-size: 12px;">
            <a href="" target="_blank">托泥羊技术有限公司</a>&emsp;&emsp;
          </div>
        </el-col>
        <el-col :span="10">
          <div style="float: right;">
          <a href="https://developer.github.com" target="_blank">GitHub-API</a>&emsp;&emsp;
          <a href="https://cn.vuejs.org/" target="_blank">Vue.js</a>&emsp;&emsp;
          <a href="http://element.eleme.io/" target="_blank">Element</a>
          </div>
        </el-col>
      </el-row>
    </footer>

    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { api, com, request } from "@/utils/api.js"
import login from "@/user.config.js"
import Cookie from "js-cookie"

export default {
  metaInfo: {
    title: '首页'
  },
  data () {
    return {
      api,
      isEdit: false,
      page: {},
      user: {
        username: com.user().username
      },
      backgroundImage: '',
      userImage: ''
    }
  },

  computed: {
    canEdit() {
      const { path } = this.$route
      return /\/new$/g.test(path) || /\/blog\/[0-9]+/g.test(path)
    }
  },
  methods: {
    changeButton(e, flag){
      // location.href = flag?'https://www.baidu.com/':`${location.origin}/new/${this.login.username}`

      // this.$message({
      //   message: '开发中！不合适放在 GridSome 里面~',
      //   type: 'warning'
      // });

      if(this.canEdit){
        this.isEdit = !this.isEdit;
        return 
      }

      this.$message({
        message: '开发中！敬请期待~',
        type: 'warning'
      });
    },

    async getCurrentPage(){
      const { data } = await request({
        method: "GET",
        url: com.setUrl(api.strapiPage,{username: this.user.username}),
        cache: true
      })

      const page = Array.isArray(data) ? data[0] : data
      if(page){
        this.page = page
        this.user = page.user
        this.backgroundImage = `url(${api.strapi + (page.background ? page.background.url : '') })`
        this.userImage = api.strapi + page.user.image.url 
      }

      console.log("App page",this.page)
      console.log("App user",this.user)

    }
  },
  async beforeMount() {
    // 当前访问的用户，理论上应该通过url或者其他方式传递；但是gridsomeurl不是很自由，先简单处理
    if(this.user.username){
      Cookie.set("user", this.user)
      await this.getCurrentPage()
    }
    else{
      this.$message({
        message: '请输入正确的url~~',
        type: 'error'
      })

      if(typeof location !== "undefined")
        location.href = location.origin + "/new?username=ymcdhr"
    }

    // 当前登录的用户
    Cookie.set("login", login)
  }
}
</script>

<style>

</style>
