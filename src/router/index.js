import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * 重写路由的push方法
 */

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/afxmanage/material/afxCollectionList.vue')
    },
    {
      path: '/index/afxmanage',
      name: '/index/afxmanage',
      component: () => import('@/views/afxmanage/material/CollectionList1.vue'),
      children: [

      ]
    },
    {
      path: '/index/CollectionList',
      name: '/index/CollectionList',
      component: () => import('@/views/afxmanage/material/CollectionList.vue'),
      children: [

      ]
    },
    {
      path: '/index/Collection3d',
      name: '/index/Collection3d',
      component: () => import('@/views/afxmanage/material/Collection3d.vue'),
    },
    {
      path: '/index/VR',
      name: '/index/VR',
      component: () => import('@/views/afxmanage/VR/index.vue'),
    },

  ]

})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)

  if (to.path.startsWith('/login')) {
    //window.localStorage.removeItem('access-token')
    //window.localStorage.removeItem('access-user')
    next()

  } else if (to.path.startsWith('/index')) {
    next()
  }else if (to.path.startsWith('/myjshop')) {
    next()
  }
  else if (to.path.startsWith('/myexamonline')) {
    next()
  }
  else if (to.path.startsWith('/myblog')) {
    next()
  }
  else if (to.path.startsWith('/mytest')) {
    next()
  } else {
    //let user = window.localStorage.getItem('access-token');
    // if (!user) {
    //   next({path: '/login'})
    // } else {
      next()
    console.log("enter last")
    // }
  }
})

export default router
