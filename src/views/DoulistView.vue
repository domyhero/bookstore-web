<template>
  <div class="app-main">
    <book-list :book-list="list" v-on:fetch="onFetch" :hasLoaded="hasLoaded"></book-list>
    <table-side></table-side>
  </div>
</template>

<script>
import request from 'superagent'

import BookList from '../components/BookList'
import TableSide from '../components/TableSide'

export default {
  name: 'doulist-view',
  components: {BookList, TableSide},
  data() {
    return {
      list: null,
      hasLoaded: false,
      id: null,
      start: 0,
      loadedFinish: false
    }
  },
  methods: {
    onFetch(e) {
      console.log('loadding'),
      this.fetch()
    },
    fetch() {
      if(this.loadedFinish) return;
      // var {id, start} = this  not work
      var id = this.id
      var start = this.start
      this.hasLoaded = false
      request
        .get(`/api/douban/doulist/${id}/${start/25+1}`)
        .end((err, {body})=>{
          if(start > 0) {
            this.list = [...this.list, ...body.items]
          } else {
            this.list = body.items
          }
          this.hasLoaded = true
          if(body.total && (body.total - 25 - body.start) > 0) {
            // this.fetch(id, body.start + body.count)
            this.start = this.start + 25
          } else {
            this.loadedFinish = true
          }
        })
    }
  },
  watch: {
    '$route'(to, from) {
      // const pId = to.params.id
      this.id = to.params.id || '42736792'
      this.fetch()
    },
  },
  mounted() {
    this.id = this.$route.params.id || '42736792'
    this.fetch()
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
