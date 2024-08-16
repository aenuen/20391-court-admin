import request from '@/libs/axios/courtReq'

export const applicantApi = {
  // put
  create: data => request({ url: '/guarantee/create', method: 'put', data }), // 创建担保
  // get
  details: params => request({ url: '/guarantee/get/' + params, method: 'get' }), // 详情
  // post
  list: data => request({ url: '/guarantee/selectByPage', method: 'post', data }) // 列表
}
