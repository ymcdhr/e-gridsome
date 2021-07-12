<template>
    <div class="open">
        <div class="header">
            <el-card class="box-card">
                <div class="text item">
                    {{ 'GitHub 我的项目' }}
                </div>
            </el-card>
        </div>
        <div class="cnt" >
            <g-link :to="`/project/${item.name}`" v-for="item in list" :key="item.id">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{ item.human_name || item.full_name }}</span>
                        <el-button style="float: right; padding: 3px 0" type="text">
                          <a @click="onClick($event,item.html_url)" target="new">前往 Git =></a>
                        </el-button>
                    </div>
                    <div class="text item">
                      <div class="update-time">最近更新：{{ date(item.updated_at) }} </div>
                      <div>
                        {{ item.description && item.description.substr(0,150) }}...
                      </div>
                      <div class="btns">
                        <el-button icon="el-icon-star-off" title="star">{{ item.stargazers_count }}</el-button>
                        <el-button icon="el-icon-view" title="watch">{{ item.watchers_count }}</el-button>
                        <el-button icon="el-icon-share" title="folk">{{ item.forks_count }}</el-button>
                      </div>
                    </div>
                </el-card>
            </g-link>
            <Pager :info="$page.data.pageInfo" />
        </div>
    </div>
</template>

<page-query>
 query MyQuery($page: Int)  {
  data: allReps(perPage: 5, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        name
        full_name
        html_url
        stargazers_count
        watchers_count
        forks_count
        description
        updated_at
        created_at
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
      username: com.user().username
,
      // loading: true,
      // list: [],
    }
  },
  components: {
    Pager
  },
  methods: {
    date(time) {
      return new Date(time).toLocaleDateString()
    },
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
  },
}
</script>

<style>

</style>