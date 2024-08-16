// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures

import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/libs/utils/token'
import { apiCourtUrl, successCode, tokenCode } from './settings'

const service = axios.create({ // 创建一个axios实例
  baseURL: apiCourtUrl,
  // withCredentials: true, // 跨域请求时发送cookies
  timeout: 5000 // 超时时间
})

// 请求拦截器 request interceptor
service.interceptors.request.use(
  config => {
    store.getters.token && (config.headers['authorization'] = `${getToken()}`)
    // store.getters.token && (config.headers['authorization'] = `Bearer ${getToken()}`)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器 response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    const { code, msg } = res
    if (code !== successCode) {
      const errMsg = msg || '请求失败！'
      Message({ message: errMsg, type: 'error', duration: 5000 })
      return Promise.reject(new Error(errMsg))
    } else {
      return res
    }
  },
  error => { // 状态非200才会到这里来
    if (String(error) === 'Error: Network Error') {
      Message({ message: '网络故障或服务器无响应', type: 'error', duration: 5000 })
    } else {
      const { status, data } = error.response
      const { msg } = data
      Message({ message: msg || '', type: 'error', duration: 5000 })
      if (status === tokenCode) {
        setTimeout(() => {
          location.reload()
        }, 1000)
      }
    }
    return Promise.reject(error)
  })

export default service
