import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

/**
 * 1. 从cookie获取token（导入cookie.js）
 * 2. 如果有token, 再访问/login,则跳转到首页，如果访问其他路由，从cookie中获取用户信息，然后跳转目标路由
 * 3. 如果没有token, 则从白名单中查看是否包含了目标路由，如果包含，则直接放行。如果不包含，则跳转到登录页面
 */
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()
  // 从cookie中获取访问令牌
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      //如果已经有令牌的用户请求的不是登录页，是其他页面
      //就从Vuex里拿到用户的信息，这里也证明用户不是第一次登录了
      const hasGetUserInfo = store.getters.id
      // console.log('userinfo:',hasGetUserInfo,store.getters.id)
      if (hasGetUserInfo) {
        //信息拿到后，用户请求哪就跳转哪
        // 如果有用户信息，则通过用户id来获取当前用户所拥有的菜单和按钮权限
       if (store.getters.init === false) {

          // 还未查询用户权限信息，下面则触发 action 来进行查询
          store.dispatch('menu/GetUserMenu').then(() => {
            next();
            // 继续访问目标路由且不会留下history记录
            console.log(to)
            console.log('init',store.getters.init)
            // next({ ...to, replace: true })

          }).catch(error => {
            Message({ message: '获取用户权限信息失败', type: 'error' })
          })

          

        } else {
          //跳转到目标路由
          // next(`/login?redirect=${to.path}`)
          // console.log('3333',to);
          // next({path:to.path})
          next();
        }
        //暂时先用一下
        // next()
        // NProgress.done()
      } else {
        // 如果有令牌，但是没有用户信息，证明用户是第一次登录，通过Vuex设置用户信息
        // console.log('else')
        // try {
          
        //   let data=await store.dispatch('user/getInfo')
        //   console.log('1111')
        //   //设置好了之后，依然可以请求哪就跳转哪
        //   next({ ...to, replace: true })
        // } catch (error) {
        //   // 如果出错了，把令牌去掉，并让用户重新去到登录页面
        //   console.log('2222')
        //   await store.dispatch('user/resetToken')
        //   Message.error(error || 'Has Error')
        //   next(`/login?redirect=${to.path}`)
        //   NProgress.done()
        // }
        console.log('1111',to);
        await store.dispatch('user/resetToken')
        // Message.error(error || 'Has Error')
                    
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    //这里是没有令牌的情况
    //如果请求地址在白名单，则跳到请求地址
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      // 如果这个页面不在白名单里，直接跳转到登录页面
      next(`/login?redirect=${to.path}`)
      //关闭进度条
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  //每次请求结束后都需要关闭进度条
  NProgress.done()
})
