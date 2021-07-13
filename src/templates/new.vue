<template>
  <div>
      <Article v-if="article" :article="article" :isEdit="isEdit" />
  </div>
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
      try{
        const blogs = this.$page.data.edges

        let max = blogs[0]
        blogs.forEach(item => {
            const time = this.unixTime(item.node.updated_at)
            max = time > this.unixTime(max.node.updated_at) ? item : max
        })
        return max && max.node
      }
      catch(e){
        console.error("new:",e)
      }
    }
  }
}
</script>

<style>
</style>
