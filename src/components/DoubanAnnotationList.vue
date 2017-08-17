<template>
  <div class="x-annotion-list">
    <!-- <ul>
      <li v-for="item in items">
        <h3>{{item.chapter}}</h3>
        <div class="info">{{item.summary}}</div>
      </li>
    </ul> -->
    <el-collapse>
      <el-collapse-item v-for="item in items" :key="item.id" v-bind:title="fixChapterTitle(item)">
        <div class="info">
          <!-- Todo replace photos -->
          {{item.content | santizeAnnotationContent}}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import request from '../utils/request'

import Vue from 'vue'

// Todo: 添加切换下一页等在list header 上
// Todo: 添加edit mode，扩长和可以highlight

export default {
  name: 'douban-annotion-list',
  props: ['bookId'],
  data () {
    //
    return {
      items: []
    }
  },
  methods: {
    fixChapterTitle(item) {
      if(item.chapter && (item.chapter.length > 6)) {
        return item.chapter
      } else {
        return '--' + item.chapter + Vue.filter('santizeAnnotationContent')(item.content).slice(0,10)
      }
    },
    fetch(id) {
      console.log('getting book reviews..')
      request
      .get(`/api/proxy/douban_api/v2/book/${id}/annotations`)
      .end((err, {body}) => {
        if(err) return console.log(err)
        this.items = body.annotations
      })
    }
  },
  mounted(){
    console.log('douban annotion list mounted', this.bookId)
    this.fetch(this.bookId)
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
}
</style>
