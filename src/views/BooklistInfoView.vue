<template>
  <div class="app-main">
    <book-list :book-list="list"></book-list>
    <table-side></table-side>
  </div>
</template>

<script>
import request from 'superagent'

import BookList from '../components/BookList'
import TableSide from '../components/TableSide'

export default {
  name: 'booklist-info-view',
  components: {BookList, TableSide},
  data() {
    return {
      list: null
    }
  },
  methods: {
    fetch(id, start=0) {
      request
        .get(`/api/proxy/douban_m_rexxvar/v2/user/${id}/reviews?type=book&start=${start}&count=50&for_mobile=1`)
        .end((err, {body})=>{
          if(start > 0) {
            this.list = [...this.list, ...body.reviews]
          } else {
            this.list = body.reviews
          }
          if((body.total - 100 - body.start) > 0) {
            this.fetch(id, body.start + body.count)
          }
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
.app-main {
  display: flex;
}
.x-flex-list {
  flex: 1;
  max-height: 100vh;
overflow: auto;
}
.x-table-side {
  flex-basis: 400px;
  height: 100vh;
  overflow: auto;
}
</style>
