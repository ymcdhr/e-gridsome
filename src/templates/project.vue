<template>
  <div class="rep" v-loading="loading">
    <div class="markdown-title">
      <div class="title">
        <span>{{ repData.human_name || repData.full_name }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <a :href="repData.html_url" target="new">前往 Git =></a>
        </el-button>
      </div>
      <el-divider></el-divider>
      <div class="time">
        <div class="updated">更新时间：{{ date(repData.updated_at) }}</div>
        <div class="published">发布时间：{{ date(repData.created_at) }}</div>
      </div>
      <el-divider></el-divider>
      <div>{{ repData.description }}</div>

      <div class="btns">
        <el-button icon="el-icon-star-off" title="star">{{ repData.stargazers_count }}</el-button>
        <el-button icon="el-icon-view" title="watch">{{ repData.watchers_count }}</el-button>
        <el-button icon="el-icon-share" title="folk">{{ repData.forks_count }}</el-button>
      </div>
    </div>
    <div class="markdown-cnt">
      <div class="markdown-cnt-title">README.md</div>
      <div class="markdown-here-wrapper" v-html="mdHtml"></div>
    </div>
  </div>
</template>


<script>
import { api, com, request } from "@/utils/api.js"

export default {
    data() {
      const { username } = com.user()
      const { rep } = this.$route.params
      return {
        rep,
        username,
        repData: {},
        mdHtml: "",
        loading: true
      }
    },
    methods:{
      date(time) {
        return new Date(time).toLocaleDateString()
      },
    },
    async mounted() {
        // console.log("mounted:",this.$route)

      try{
        // 兼容github、gitee、strapi等接口
        const { rep, username } = this
        const replace = {
          rep,
          username
        }

        const url = com.setUrl(api.githubRepo, replace)
        const mdUrl = com.setUrl(api.githubMd, replace)

        const [ userData, mdData ] = await Promise.all([
          request({ url, cache: true }),
          request({ url: mdUrl, cache: true })
        ])
        const { data } = userData;

        this.repData = Array.isArray(data) ? data[0] : data // 仓库数据
        this.mdHtml = com.mdToHtml(mdData.data) // markdown文件内容
        this.loading = false
      }
      catch(e){
        console.error("error:", e)
        this.loading = false
        this.$message.error('网络错误，GitHub 你懂的~~');
      }
    }
}
</script>

<style>

</style>