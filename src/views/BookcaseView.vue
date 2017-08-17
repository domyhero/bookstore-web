<template>
  <div class="app-main">
    mybook
    <book-list :book-list="bookList"></book-list>
  </div>
</template>

<script>
import request from 'superagent'

import BookList from '../components/BookList'

export default {
  name: 'bookcase-view',
  components: {BookList},
  data() {
    return {
      bookList: null
    }
  },
  methods: {
    fetch(id) {
      request
        .get(`/api/proxy/douban_m_rexxvar/v2/user/${id}/reviews?type=book&start=0&count=50&for_mobile=1`)
        .end((err, {body})=>{
          this.bookList = body.reviews
        })
    }
  },
  watch: {
    '$route'(to, from) {
      const pId = to.params.id
      if(pId) {
        this.fetch(pId)
      } else {
        this.fetch('2699108')
      }
    }
  },
  mounted() {
    const pId = this.$route.params.id
    if(pId) {
      this.fetch(pId)
    } else {
      this.fetch('2699108')
    }
    // this.$root.$data.$on('doubaner-selected'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
