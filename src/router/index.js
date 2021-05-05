import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页设置', icon: 'dashboard' }
    }]
  },

  {
    path: '/dangjianservice',
    component: Layout,
    redirect: '/dangjianservice/headimage',
    name: 'dangjianservice',
    meta: { title: '党建服务', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'headimage',
        name: 'dangjianserviceheadimage',
        component: () => import('@/views/dangjianservice/headimage/index'),
        meta: { title: '图片设置', icon: 'el-icon-picture' }
      },
      {
        path: 'content',
        name: 'dangjianservicecontent',
        component: () => import('@/views/dangjianservice/content/index'),
        meta: { title: '内容管理', icon: 'document' }
      }
    ]
  },


  {
    path: '/hurreybusiness',
    component: Layout,
    redirect:'/hurreybusiness/index',
    name: 'hurreybusiness',
    
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/hurreybusiness/index'),
        meta: { title: '兴百企', icon: 'el-icon-picture' }
      }
    ]
  },
  {
    path: '/investment',
    component: Layout,
    redirect:'/investment/index',
    name: 'investment',
    
    children: [
      {
        path: 'index',
        name: 'investmentindex',
        component: () => import('@/views/investment/index'),
        meta: { title: '百企招百商', icon: 'el-icon-picture' }
      }
    ]
  },

  
  {
    path: '/policy',
    component: Layout,
    redirect:'/policy/headimage',
    name: 'policy',
    meta: { title: '政策法规', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'headimage',
        name: 'policyheadimage',
        component: () => import('@/views/policy/headimage/index'),
        meta: { title: '图片设置', icon: 'el-icon-picture' }
      },
      {
        path: 'content',
        name: 'policyContent',
        component: () => import('@/views/policy/content/index'),
        meta: { title: '内容管理', icon: 'document' }
      }
    ]
  },

  
  {
    path: '/bridge',
    component: Layout,
    redirect:'/bridge/index',
    name: 'bridge',
    
    children: [
      {
        path: 'index',
        name: 'bridgeindex',
        component: () => import('@/views/bridge/index'),
        meta: { title: '金融服务', icon: 'el-icon-picture' }
      }
    ]
  },
  {
    path: '/talk',
    component: Layout,
    redirect: '/views/talk/nodistribute',
    name: 'talk',
    meta: {
      title: '政企恳谈',
      icon: 'nested'
    },
    children: [
      {
        path: 'nodistribute',
        name: 'nodistribute',
        component: () => import('@/views/talk/nodistribute/index'),
        meta: { title: '待分配工单', icon: 'el-icon-picture' }
      },
      {
        path: 'dobill',
        name: 'dobill',
        component: () => import('@/views/talk/dobill/index'),
        meta: { title: '工单处理', icon: 'document' }
      }
    ]
  },

  
  {
    path: '/leader',
    component: Layout,
    redirect:"/leader/index",
    name: 'leader',
    
    children: [
      {
        path: 'index',
        name: 'leaderindex',
        component: () => import('@/views/leader/index'),
        meta: { title: '领导构成', icon: 'el-icon-picture' }
      }
    ]
  },
  {
    path: '/analyse',
    component: Layout,
    redirect:'/analyse/index',
    name: 'analyse',
    
    children: [
      {
        path: 'index',
        name: 'analyseindex',
        component: () => import('@/views/analyse/index'),
        meta: { title: '分析统计', icon: 'el-icon-pie-chart' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/role',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/role/index'),
        meta: { title: '角色管理', icon: 'table' }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'tree' }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/menu/index'),
        meta: { title: '权限菜单管理', icon: 'tree' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
