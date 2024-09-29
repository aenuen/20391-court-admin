import request from '@/libs/axios/request'

// 用户api
export const userApi = {
  // put
  register: (data) => request({ url: '/user/register', method: 'put', data }), // 登录
  create: (data) => request({ url: '/user/create', method: 'put', data }), // 登录
  // get
  getRegSMS: (params) => request({ url: '/user/getRegSMS/' + params, method: 'get' }), // 注册短信验证码
  getUpdSMS: (params) => request({ url: '/user/getUpdSMS/' + params, method: 'get' }), // 注册短信验证码
  getTelSMS: (params) => request({ url: '/user/getTelSMS/' + params, method: 'get' }), // 注册短信验证码
  info: () => request({ url: '/user/getCurrent', method: 'get' }), // 用户信息
  authCode: () => request({ url: '/user/getCode', method: 'get' }), // 用户信息
  // post
  login: (data) => request({ url: '/user/login', method: 'post', data }), // 登录
  find: (data) => request({ url: '/user/modifyPwd', method: 'post', data }), // 找回密码
  logout: () => request({ url: '/user/logout', method: 'post' }), // 登出
  baseData: (data) => request({ url: '/user/modify', method: 'post', data }), // 基本资料
  password: (data) => request({ url: '/user/password', method: 'post', data }), // 修改密码
  upload: (data) => request({ url: '/user/upload', method: 'post', data }), // 上传头像
  list: (data) => request({ url: '/user/selectByPage', method: 'post', params: data }), // 列表
  status: (data) => request({ url: '/user/change', method: 'post', params: data }), // 列表
  // delete
  remove: (params) => request({ url: '/user/del/' + params, method: 'delete' }) // 注册短信验证码
}
