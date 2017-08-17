<template>
  <div class="">
    <el-autocomplete
      popper-class="my-autocomplete"
      v-model="result"
      custom-item="book-search-item"
      placeholder="请输入书名，回车查询"
      @select="handleSelect"
      icon="search"
      :fetch-suggestions="querySearchAsync"
      :on-icon-click="querySearchAsync"
    ></el-autocomplete>
  <!-- :fetch-suggestions="querySearchAsync" -->
  </div>
</template>

<script>
import Vue from 'vue'

import request from '../utils/request'

Vue.component('book-search-item', {
  functional: true,
  render: function (h, ctx) {
    var item = ctx.props.item;

    return h('li', ctx.data, [
      h('img', {attrs: {src: item.images.small}}),
      h('div', { attrs: { class: 'name' } }, [item.title + item.author]),
      h('span', { attrs: { class: 'addr' } }, [item.publisher + item.pubdate])
    ]);
  },
  props: {
    item: { type: Object, required: true }
  }
});


export default {
  name: 'douban-book-search',
  data () {
    return {
      result: null,
    }
  },
  methods: {
    querySearchAsync(q, cb) {
      console.log('searching book..')
      request
      .get(`/api/proxy/douban_api/v2/book/search?q=${q}`)
      .end((err, {body}) => {
        if(err) return console.log(err)
        this.books = body.books
        cb(body.books)
      })
    },
    handleSelect(item) {
      this.result = item.title
      this.$root.$data.$emit('book-selected', item.id)
    }
  },
  mounted(){
    console.log('douban annotion list mounted', this.bookId)
    // this.fetch(this.bookId)
  },
  watch: {
    result(val, oldVal) {
      if(!val) return
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-autocomplete-suggestion__list li {
  display: flex;
}
.el-autocomplete {
  display: block;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
