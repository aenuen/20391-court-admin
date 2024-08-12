import request from '@/libs/axios/request'

export const userApi = {
  // put
  register: data => request({ url: '/user/register', method: 'put', data }), // 登录
  // get
  getRegSMS: params => request({ url: '/user/getRegSMS/' + params, method: 'get' }), // 注册短信验证码
  getUpdSMS: params => request({ url: '/user/getUpdSMS/' + params, method: 'get' }), // 注册短信验证码
  info: () => request({ url: '/user/getCurrent', method: 'get' }), // 用户信息
  authCode: () => request({ url: '/user/getCode', method: 'get' }), // 用户信息
  // post
  login: data => request({ url: '/user/login', method: 'post', data }), // 登录
  find: data => request({ url: '/user/modifyPwd', method: 'post', data }), // 登录
  logout: () => request({ url: '/user/logout', method: 'post' }), // 登出
  baseData: data => request({ url: '/user/baseData', method: 'post', data }), // 基本资料
  password: data => request({ url: '/user/password', method: 'post', data }), // 修改密码
  avatarUpload: data => request({ url: '/user/avatarUpload', method: 'post', data }) // 上传头像
}
