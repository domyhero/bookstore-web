<template>
<div class="bs-editor-wwrap">
  <h1 class="title" v-if="book">开始读 - {{book.title}}</h1>
  <!-- <input class="bs-input" type="text" v-model.trim="bookurl"> -->
  <douban-book-search></douban-book-search>
  <h2>目录大纲</h2>
  <div class="bs-contents-wrap">
  </div>

  <book-review-form></book-review-form>
</div>
</template>

<!--
  1 https://book.douban.com/subject/1911293/ 没有目录


  常见的formmater：
  去除后面的数字 https://book.douban.com/subject/10539126/



  加入豆瓣图书搜索功能？！！！api
  优化目录查找的匹配算法
  Todo: https://orhanveli.github.io/ 链接preview（title，缩略图，description等），图书支持，作者支持，维基百科支持？
-->

<script>
// import MediumEditor from ''
// Todo: $, MediumEditor
import MeMarkdown from 'medium-editor-markdown'

import DoubanBookSearch from '../components/DoubanBookSearch'
import BookReviewForm from '../components/BookReviewForm'

const DOUBAN_DIR_RE = /dir_\d*_full/gi
export default {
  name: 'work-table',
  components: {DoubanBookSearch, BookReviewForm},
  data() {
    return {
      bookId: '',
      book: null,
    }
  },
  watch: {
    bookId(val, oldVal) {
      if(!val) return
      // this.fetchBookContents(`https://book.douban.com/subject/${val}`)
    },
  },
  methods: {
    fetchBookContents(url) {
      var editor = this.editor
      $.get(url, (html)=>{
        let dom, chapters, chtml, dirId
        dom = $($.parseHTML(html))
        dirId = DOUBAN_DIR_RE.exec(html)
        if(!dirId) return // Todo noti user
        chapters = dom.find('#'+dirId[0]).html().split('<br>').map(function(i) {
          return i.trim().replace(/\/?\d*$/g, '').replace(/\/\s?$/g, '') // 清除结尾的页码等
        }).slice(0, -1)
        // Todo template for chtml
        chtml = chapters.map(function(i) {
          return '<h2>' + i + '</h2>'
        }).join('')
        editor.setContent(chtml, 0)
      })
    },
    useCatalog(catalog) {
      let chapters, chtml

      chapters = catalog.split('\n').map(function(i) {
        return i.trim().replace(/\/?\d*$/g, '') // 清除结尾的页码等
      })
      // Todo template for chtml
      chtml = chapters.map(function(i) {
        return '<h2>' + i + '</h2>'
      }).join('')
      this.editor.setContent(chtml, 0)
    }
  },
  mounted() {
    this.$root.$data.$on('book-selected', (id)=>{
      this.bookId = id
    })

    this.$root.$data.$on('book-fetched', (data)=>{
      this.useCatalog(data.catalog)
      this.book = data
    })

    let editorDom = this.$el.querySelector('.bs-contents-wrap')
    this.editor = new MediumEditor(editorDom, {
      // anchorPreview
      toolbar: {
        buttons: ['bold', 'h2', 'h3', 'h4', 'indent', 'outdent', 'quote'],
      },
      placeholder: {
        text: 'Type your text',
        hideOnClick: true,
      },
      paste: {
        forcePlainText: true,
        cleanPastedHTML: true,
      },
      autoLink: true,
      extensions: {
        markdown: new MeMarkdown((md)=>{
          console.log(md)
        })
      }
    });
    $(editorDom).mediumInsert({
      editor: this.editor,
      addons:{
        images: {
          fileUploadOptions: {
            url: 'https://vogue.is26.com/api/upyun_upload'
          }
        }
      }
    })
  },
  beforeDestroy() {
    this.editor.destroy();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bs-input {
  width: 500px;
}
</style>
