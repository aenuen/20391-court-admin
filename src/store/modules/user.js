import { userApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/libs/utils/token'
import router, { resetRouter } from '@/router/constant'

const state = {
  aid: '',
  token: getToken(),
  realName: '',
  petName: '',
  email: '',
  mobile: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_AID: (state, aid) => {
    state.aid = aid
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_RealNAME: (state, realName) => {
    state.realName = realName
  },
  SET_PetNAME: (state, petName) => {
    state.petName = petName
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { telephone, password, code } = userInfo
    return new Promise((resolve, reject) => {
      userApi.login({
        telephone: telephone.trim(),
        password: password,
        code: code.trim()
      }).then(({
        code,
        data: { token }
      }) => {
        if (code === 200) {
          console.log('aaaaaaa')
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        } else {
          reject('登录失败')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户注册
  register({ commit }, userInfo) {
    const { telephone, telCode, password, name, cardNo } = userInfo
    return new Promise((resolve, reject) => {
      userApi.register({
        telephone: telephone.trim(),
        telCode: telCode.trim(),
        password: password,
        name: name.trim(),
        cardNo: cardNo.trim()
      }).then(({
        code, msg
      }) => {
        if (code === 200) {
          resolve({ code, msg })
        } else {
          reject('登录失败')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      userApi.info(state.token).then(({ code, data }) => {
        if (code === 200) {
          data || reject('验证失败，请重新登录。')
          const { roles, id, petName, realName, email, mobile, avatar, introduction } = data
          if (!roles || roles.length <= 0) {
            reject('您的用户没有任务的权限')
          }
          commit('SET_ROLES', roles)
          commit('SET_AID', id)
          commit('SET_PetNAME', petName)
          commit('SET_RealNAME', realName)
          commit('SET_EMAIL', email)
          commit('SET_MOBILE', mobile)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          resolve(data)
        } else {
          reject('获取用户信息失败')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 刷新token
  refreshToken({ commit, state }) {
    return new Promise((resolve, reject) => {
      userApi.refreshToken({ id: state.aid }).then(({ code, data }) => {
        if (code === 200) {
          data || reject('验证失败，请重新登录。')
          const { roles, id, petName, realName, email, mobile, avatar, introduction } = data
          if (!roles || roles.length <= 0) {
            reject('您的用户没有任务的权限')
          }
          commit('SET_ROLES', roles)
          commit('SET_AID', id)
          commit('SET_PetNAME', petName)
          commit('SET_RealNAME', realName)
          commit('SET_EMAIL', email)
          commit('SET_MOBILE', mobile)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          resolve(data)
        } else {
          reject('获取用户信息失败')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户登出
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        commit('SET_TOKEN', '') // 清空token
        commit('SET_ROLES', []) // 清空角色信息
        removeToken() // 移除token
        resetRouter() // 清除所有路由
        dispatch('tagsView/delAllViews', null, { root: true }) // 删除所有tagsView，重置访问的视图和缓存的视图
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },
  // 移除token
  removeToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
  // 动态修改权限
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)
    const { roles } = await dispatch('getInfo')
    resetRouter()
    // 基于角色生成可访问路线图
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // 动态添加可访问路由
    router.addRoutes(accessRoutes)
    // 重置访问的视图和缓存的视图
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
