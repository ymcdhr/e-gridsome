<template>
  <div id="app" class="layout">
    <header class="header" :style="{backgroundImage: `url(${api.backend + page.background.url})`}">
      <div class="cover"></div>
      <div class="nav">
        
      </div>
      <div class="user">
        <g-image alt="Example image" :src="api.backend + user.image.url" width="135" />
        <div class="name">{{ user.name }}</div>
      </div>
    </header>

    <content class="content">
      <el-container class="box">
        <el-header class="header">
            header
        </el-header>
        
        <el-container class="cnt">
          <el-aside class="aside" style="width: 200px">
            <el-menu class="menu">
              <el-menu-item>
                <g-link to="/tonyyoung">
                  <i class="el-icon-menu"></i>
                  <span slot="title">最新动态</span>  
                </g-link>
              </el-menu-item>
              <el-menu-item>
                <g-link to="/tonyyoung/social">
                  <i class="el-icon-bangzhu"></i>
                  <span slot="title">社交圈子</span>
                </g-link>
              </el-menu-item>
              <el-menu-item>
                <g-link to="/tonyyoung/blogs">
                  <i class="el-icon-notebook-2"></i>
                  <span slot="title">文章列表</span>
                </g-link>
              </el-menu-item>
              <el-menu-item>
                <i class="el-icon-orange"></i>
                <span slot="title">开源项目</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main class="main">
            <slot />
            <!-- <router-view /> -->
          </el-main>
        </el-container>
      </el-container>
    </content>

    <footer class="footer">
      footer footer
    </footer>
  </div>
</template>

<static-query>
  query($username: String) {
    data: allStrapiPages(filter:{user:{username:{eq: $username}}}) {
      edges {
        node {
          id
          github
          user {
            id
            username
            name
            image {
              url
            }
          }
          background {
            url
          }
        }
      }
    }
  }
</static-query>

<script>
import { api } from "@/utils/api.js"

export default {
  metaInfo: {
    title: '首页'
  },
  data () {
    return {
      api
    }
  },
  computed: {
    page () {
      return this.$static.data.edges[0].node
    },

    user() {
      return this.$static.data.edges[0].node.user
    }
  }
}
</script>

<style>

</style>