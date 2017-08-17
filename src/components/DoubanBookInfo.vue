<template>
  <div class="x-book-info">
    <div class="subject-card"  v-if="subject">
      <!-- <h1 class="title">{{subject.title}}</h1> -->
      <div class="subject-info">
        <img v-if="subject.images" :src="subject.images.medium" alt="cover">
        <span v-if="subject.rating">{{subject.rating.numRaters}}人评价 {{subject.rating.average}}</span>
        <a :href="subject.alt" target="_blank"><i class="el-icon-information"></i></a>
        <a @click="dialogVisible = true" v-if="subject.ebook_url"><i class="el-icon-information"></i></a>
        <p>
          <template v-if="subject.summary">
            {{isExpand ? subject.summary : subject.summary.slice(0, 100)}}……
          </template>
          <a href="javascript:;" v-show="isShowExpand" v-on:click="toggleExpand">
            ({{isExpand ? '折叠' : '展开'}})
          </a>
        </p>
      </div>
      <div class="genres">
        <el-tag v-if="subject.tags" type="success" v-for="item in subject.tags">
          {{item.name}}/{{item.count}}
        </el-tag>
      </div>
    </div>

    <el-dialog
    title="豆瓣阅读"
    :visible.sync="dialogVisible"
    size="small"
    :modal="false"
    :lock-scroll="true"
    custom-class="douban-ebook-reader-dialog">
    <div v-if="subject.ebook_url">
      <iframe :src="subject.ebook_url.replace('/ebook/', '/reader/ebook/')" width="680px" height="600px"></iframe>
    </div>
  </el-dialog>
  </div>

</template>

<script>
import request from '../utils/request'

// Todo: 添加切换下一页等在list header 上
// Todo: 添加edit mode，扩长和可以highlight

export default {
  name: 'douban-book-info',
  props: ['bookId'],
  data () {
    return {
      dialogVisible: false, // Todo
      isExpand: false,
      subject: null
    }
  },
  computed: {
    isShowExpand() {
      return this.subject && (this.subject.summary.length > 100)
    }
  },
  methods: {
    toggleExpand: function (event) {
      this.isExpand = !this.isExpand
    },
    fetch(id) {
      console.log('getting book basic info..')
      request
      .get(`/api/proxy/douban_api/v2/book/${id}`)
      // .use(jsonp)
      .end((err, {body}) => {
        if(err) return console.log(err)
        this.subject = body

        this.$root.$data.$emit('book-fetched', body)
      })
    }
  },
  mounted(){
    console.log('douban info', this.bookId)
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
.subject-info {
  img {
    float: left;
    margin: 0 5px 5px 0;
  }
}
.genres .el-tag {
  margin: 2px 5px;
}
</style>
