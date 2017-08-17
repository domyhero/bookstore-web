<template>
  <div class="x-annotion-list">
    <el-collapse>
      <el-collapse-item v-for="(item, index) in items" :key="item.id">
        <template slot="title">
          <!-- <i class="el-icon-menu" v-on:click="expandReviewView"></i> -->
          {{item.title}} / {{item.info}} <img class="author-avatar" :src="item.author">
        </template>
        <div class="info" v-if="!item.content">
          {{item.abstract}}
          <el-button v-if="!item.content" :plain="true" type="success"
            v-on:click="fetchReview(item, index)">查看全文</el-button>
        </div>
        <div class="info" v-if="item.content" >
          <i class="el-icon-menu" v-on:click="expandReviewView"></i>
          <div v-html="item.content">
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import request from 'superagent'

export default {
  name: 'douban-review-list',
  props: ['bookId'],
  data () {
    return {
      items: []
    }
  },
  methods: {
    fetchReview(item, idx) {
      const self = this
      console.log('getting book review by id..')
      request
      .get(`/api/douban/book/review/${item.id}`)
      .end((err, {body}) => {
        if(err) return console.log(err)
        item.content = body.content
        this.$set(this.items, idx, item)
      })
    },
    fetch(id) {
      console.log('getting book reviews..')
      request
      .get(`/api/douban/book/${id}/reviews`)
      .end((err, {body}) => {
        if(err) return console.log(err)
        this.items = body.data
      })
    },
    expandReviewView(e) {
      // .parentElement.querySelector('.info')
      e.target.parentElement.classList.add('is-expand')
    }
  },
  mounted(){
    // this.fetch(this.bookId)
  },
  watch: {
    bookId(val, oldVal) {
      if(!val) return
      this.fetch(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.x-annotion-list {
  max-height: 1200px;
  overflow: scroll;
}
.info {
  white-space: pre-line;
  max-height: 300px;
  overflow: auto;
  &.is-expand {
    max-height: 100vh;
  }
}
.author-avatar {
  width: 20px;
  vertical-align: middle;
}

</style>
