import Vue from 'vue'
import Router from 'vue-router'
import EditView from '@/views/EditView'
import BookcaseView from '@/views/BookcaseView'
import BooklistInfoView from '@/views/BooklistInfoView'
import DoulistView from '@/views/DoulistView'
import FollowingView from '@/views/FollowingView'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/edit' },
    // {
    //   path: '/view',
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/edit',
      name: 'EditView',
      component: EditView
    },
    {
      path: '/bookcase/:id',
      name: 'BookcaseView',
      component: BookcaseView
    },
    {
      path: '/booklist/:id',
      name: 'BooklistInfoView',
      component: BooklistInfoView
    },
    {
      path: '/doulist/:id',
      name: 'DoulistView',
      component: DoulistView
    },
    {
      path: '/following/:id',
      name: 'FollowingView',
      component: FollowingView
    },
    {
      path: '/my/bookcase',
      name: 'mybookcase',
      component: BookcaseView
    },
    {
      path: '/my/following',
      name: 'myfollowing',
      component: FollowingView
    },
  ]
})
