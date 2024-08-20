import request from '@/libs/axios/courtReq'

export const guaranteeApi = {
  // put
  create: data => request({ url: '/guarantee/create', method: 'put', data }), // 创建担保
  // get
  details: params => request({ url: '/guarantee/get/' + params, method: 'get' }), // 详情
  // post
  list: data => request({ url: '/guarantee/selectByPage', method: 'post', params: data }), // 列表
  update: data => request({ url: '/guarantee/update', method: 'post', data }) // 编辑
}
