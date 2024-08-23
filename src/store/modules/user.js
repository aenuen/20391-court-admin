import { userApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/libs/utils/token'
import router, { resetRouter } from '@/router/constant'
import { rolesAry } from '@/views/aConstant/account/modules/roles'
import { serveUrl } from '@/settings'

const state = {
  aid: '',
  token: getToken(),
  realName: '',
  cardNo: '',
  mobile: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_Aid: (state, aid) => {
    state.aid = aid
  },
  SET_Token: (state, token) => {
    state.token = token
  },
  SET_RealName: (state, realName) => {
    state.realName = realName
  },
  SET_CardNo: (state, cardNo) => {
    state.cardNo = cardNo
  },
  SET_Mobile: (state, mobile) => {
    state.mobile = mobile
  },
  SET_Avatar: (state, avatar) => {
    state.avatar = avatar
  },
  SET_Roles: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { telephone, password, code, codeId } = userInfo
    return new Promise((resolve, reject) => {
      userApi.login({
        telephone: telephone.trim(),
        password: password,
        code: code.trim(),
        codeId
      }).then(({
        code,
        data
      }) => {
        if (code === 200) {
          commit('SET_Token', data)
          setToken(data)
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
          const { cardNo, img, name, roleId, telephone, userId } = data
          const roles = []
          rolesAry.forEach((item) => {
            if (String(item.code) === String(roleId)) {
              roles.push(item.value)
            }
          })
          const newData = { roles, aid: userId, cardNo, realName: name, mobile: telephone, avatar: img === null ? serveUrl + '/images/default.png' : serveUrl + img }
          commit('SET_Roles', newData.roles)
          commit('SET_Aid', newData.aid)
          commit('SET_CardNo', newData.cardNo)
          commit('SET_RealName', newData.realName)
          commit('SET_Mobile', newData.mobile)
          commit('SET_Avatar', newData.avatar)
          resolve(newData)
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
        commit('SET_Token', '') // 清空token
        commit('SET_Roles', []) // 清空角色信息
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
      commit('SET_Token', '')
      commit('SET_Roles', [])
      removeToken()
      resolve()
    })
  },
  // 动态修改权限
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'
    commit('SET_Token', token)
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
