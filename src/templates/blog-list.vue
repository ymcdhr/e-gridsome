<template>
    <div class="blogs">
        <div class="header">
            <el-card class="box-card">
                <div class="text item">
                    {{ '文章列表' }}
                </div>
            </el-card>
        </div>
        <div class="cnt">
            <g-link :to="`/blog/${blog.node.id}`" v-for="blog in blogs" :key="blog.node.id">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{ blog.node.title.length > 45 ? blog.node.title.substr(0,45) + '...' : blog.node.title }}</span>
                        <span class="user-logo" style="float: right;">
                            <el-avatar size="small" :src="api.strapi + blog.node.user.image.url" style="margin-right: 5px;"></el-avatar>
                            <span>{{ blog.node.user.name }}</span>
                        </span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                    </div>
                    <div class="text item">
                        <div class="update-time">最近更新：{{ date(blog.node.updated_at) }} </div>
                        {{ blog.node.content.substr(0,150) }}...
                    </div>
                </el-card>
            </g-link>

            <Pager :info="$page.data.pageInfo" />
        </div>
    </div>
</template>

<page-query>
 query MyQuery($page: Int)  {
    data: allStrapiBlogs(perPage: 5, page: $page) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          id
          title
          user {
            id
            username
            name
            image {
              url
            }
          }
          content
          published_at
          updated_at
        }
      }
    }
}
</page-query>

<script>
import { api, com } from "@/utils/api.js"
import { Pager } from 'gridsome'

export default {
    data () {
        console.log("api:",api)
        return {
            api,
            username: com.user().username 
        }
    },
    components: {
        Pager
    },
    computed: {
        blogs() {
            // 这个动态路由是在 gridsome.config.js 里面配置
            console.log("blogs $page",this.$page)
            return this.$page.data.edges.filter(edge=>edge.node.user.username === this.username)
        }
    },
    methods: {
        date(time) {
            return new Date(time).toLocaleDateString()
        },
    }
}
</script>

<style>

</style>