<template>
  <div class="x-flex-list x-book-list">
    <el-card :body-style="{ padding: '0px' }"
      v-for="item in bookList" :key="item.id" v-on:click="goBookDetail('fds')">
      <img :src="item.subject.pic.normal" class="image">
      <div style="padding: 14px;">
        <span>{{item.subject.title}}</span>
        <div class="bottom clearfix">
          <!-- <time class="time">{{ item.title }}</time> -->
          <span>{{item.subject.rating.count}}人评价{{item.subject.rating.value}}分</span>
          <el-button type="text" class="button" v-on:click="goBookDetail(item)">开始阅读</el-button>
        </div>
      </div>
    </el-card>
    <el-card>
      <infinite-loading v-if="bookList" :on-infinite="onInfinite" ref="list"></infinite-loading>
    </el-card>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: 'book-list',
  props: ['bookList', 'hasLoaded'],
  components: {
    InfiniteLoading,
  },
  data() {
    return {
    }
  },
  methods: {
    onInfinite() {
      this.$emit('fetch')
    },
    goBookDetail(item) {
      // this.$router.push('/edit')
      setTimeout(()=>{
        console.log(this)
        this.$root.$data.$emit('book-selected', item.subject.id)
      }, 1000)
    }
  },
  watch: {
    hasLoaded(val) {
      if(val && this.$refs.list) {
        this.$refs.list.$emit('$InfiniteLoading:loaded');
      }
    }
  },
  mounted(){
    this.$root.$data.$on('booklist-fetched', (data)=>{
      this.bookList = data
    })
  },
}
</script>

<style lang="scss" scoped>
.x-book-list .el-card {
  width: 200px;
  img {
    width: 200px;
  }
}
</style>
