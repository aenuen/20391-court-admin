import request from '@/libs/axios/courtReq'

export const guaranteeApi = {
  // put
  create: data => request({ url: '/guarantee/create', method: 'put', data }), // 创建担保
  // get
  // list: params => request({ url: '/guarantee/selectByPage/' + params, method: 'get' }), // 注册短信验证码
  // post
  list: data => request({ url: '/guarantee/selectByPage', method: 'post', data }) // 登录
}
