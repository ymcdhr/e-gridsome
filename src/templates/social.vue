<template>
    <div class="social">
        <div class="header">
            <el-card class="box-card">
                <div class="text item">
                    {{ 'GitHub 关注列表' }}
                </div>
            </el-card>
        </div>
        <div class="cnt">
            <el-card class="box-card" v-for="item in list" :key="item.id">
                <div slot="header" class="clearfix">
                  <span>{{ item.login }}</span>
                </div>
                <div class="text item">
                  <div class="img">
                    <el-image :src="item.avatar_url" class="image" >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </div>
                  <el-button icon="el-icon-share" @click="onClick($event,item.html_url)" style="float: right; padding: 3px 0" type="text">
                    访问主页
                  </el-button>                      
                  <!-- <div>
                    {{ item.description && item.description.substr(0,150) }}...
                  </div> -->
                </div>
            </el-card>

            <Pager :info="$page.data.pageInfo" />
        </div>
    </div>
</template>

<page-query>
query MyQuery ($page: Int) {
  data: allFollowings(perPage: 9, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        login
        avatar_url
        html_url
      }
    }
  }
}
</page-query>

<script>
import { com } from "@/utils/api.js"
import { Pager } from 'gridsome'

export default {
  data() {
    return {
      username: com.user().username,
      total: 0
    }
  },
  components: {
    Pager
  },
  methods: {
    onClick(e,url) {
      e.preventDefault()
      e.stopPropagation()

      window && window.open(url)
    }
  },
  computed: {
      list() {
        return this.$page.data.edges.map(item => item.node)
      }
  }
}
</script>

<style>

</style>