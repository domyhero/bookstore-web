<template>
  <div class="app-main">
    myfollowing
    <doubaner-list :list="list"></doubaner-list>
  </div>
</template>

<script>
import request from 'superagent'

import DoubanerList from '../components/DoubanerList'

export default {
  name: 'following-view',
  components: {DoubanerList},
  data() {
    return {
      list: null
    }
  },
  methods: {
    fetch(id, start=0) {
      request
        .get(`/api/proxy/douban_m_rexxvar/v2/user/${id}/following?start=${start}&count=100&ck=76rJ&for_mobile=1`)
        .end((err, {body})=>{
          if(start > 0) {
            this.list = [...this.list, ...body.users]
          } else {
            this.list = body.users
          }
          if(body.total - 100 - body.start) {
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
