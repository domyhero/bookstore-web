<template>
  <div class="x-table-side">
    <douban-book-info :book-id="bookId"></douban-book-info>
    <douban-review-list :book-id="bookId"></douban-review-list>
    <douban-annotation-list :book-id="bookId"></douban-annotation-list>
  </div>
</template>

<script>
import DoubanAnnotationList from '../components/DoubanAnnotationList' // why need go back import
import DoubanBookInfo from '../components/DoubanBookInfo'
import DoubanReviewList from '../components/DoubanReviewList'

export default {
  name: 'table-side',
  components: {DoubanBookInfo, DoubanAnnotationList, DoubanReviewList},
  data () {
    return {
      bookId: ''
    }
  },
  mounted() {
    this.$root.$data.$on('book-selected', (id)=>{
      this.bookId = id
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
