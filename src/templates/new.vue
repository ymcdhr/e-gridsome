<template>
    <Article :article="article" :isEdit="isEdit" />
</template>
<page-query>
query{
    data: allStrapiBlogs {
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
import { com } from "@/utils/api.js"
import Article from '@/components/article.vue'

export default {
  props: {
    isEdit: false
  },
  methods: {
    unixTime(time) {
        return new Date(time).getTime()
    }
  },
  components: {
    Article
  },
  computed: {
    article() {
        const { username } = com.user()

        const blogs = this.$page.data.edges.filter(edge=>edge.node.user.username === username)
        console.log("new blogs:",blogs);
        
        let max = blogs[0]

        blogs.forEach(item => {
            const time = this.unixTime(item.node.updated_at)
            max = time > this.unixTime(max.node.updated_at) ? item : max
        })
        return max.node
    }
  }
}
</script>

<style>
</style>