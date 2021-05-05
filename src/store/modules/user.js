import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    login_name: '',
    account_name:'',
    department:'',
    expiresIn:0,
    avatar: '',
    id:'',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_LOGIN_NAME: (state, name) => {
    state.login_name = name
  },
  SET_ACCOUNT_NAME: (state, name) => {
    state.account_name = name
  },
  SET_DEPARTMENT: (state, name) => {
    state.department = name
  },
  SET_ID: (state, name) => {
    state.id = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log('store:user',response)
        const { data } = response
        //在store中保存token
        commit('SET_TOKEN', data.token)
        
        commit('SET_LOGIN_NAME',data.login_name)
        
        commit('SET_ACCOUNT_NAME',data.account_name)
        
        commit('SET_DEPARTMENT',data.department)
        
        commit('SET_AVATAR',data.avatar)
        
        commit('SET_ID',data.id)
        
        //在cookie中保存token
        setToken(data.token,data.expiresIn)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  //根据token获取用户信息get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('校验失败，请重新登录.')
        }

        // const { name, avatar } = data
        

        // commit('SET_TOKEN', data.token)
        commit('SET_LOGIN_NAME',data.login_name)
        commit('SET_ACCOUNT_NAME',data.account_name)
        commit('SET_DEPARTMENT',data.department)
        commit('SET_AVATAR',data.avatar)
        commit('SET_ID',data.id)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

