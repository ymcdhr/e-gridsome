<template>
    <Article :article="article" :isEdit="isEdit" />
</template>


<page-query>
query MyQuery($id: ID) {
  data: strapiBlogs(id: $id) {
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
</page-query>

<script>
import Article from '@/components/article.vue'

export default {
    props: {
      isEdit: false
    },
    components: {
        Article
    },
    computed: {
        article() {
            return this.$page.data
        }
    }
}
</script>

<style>

</style>