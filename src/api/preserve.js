import request from '@/libs/axios/courtReq'

export const preserveApi = {
  // put
  create: (data) => request({ url: '/litigation/create', method: 'put', data }), // 创建担保
  createOrder: (data) => request({ url: '/LitigationOrder/create', method: 'put', data }), // 创建诉讼责任险
  // post
  list: (data) => request({ url: '/litigation/selectByPage', method: 'post', params: data }), // 列表
  step: (data) => request({ url: '/litigation/updateStep', method: 'post', params: data }), // 更新步骤
  // delete
  remove: (data) => request({ url: '/litigation/delete/' + data, method: 'delete' }), // 删除
  // get
  details: (params) => request({ url: '/litigation/get/' + params, method: 'get' }), // 详情
  //
  order: (params) => request({ url: '/LitigationOrder/get/' + params, method: 'get' }) // 获取诉讼责任险详情
}
