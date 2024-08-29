import request from '@/libs/axios/courtReq'

export const preserveApi = {
  // put
  create: (data) => request({ url: '/litigation/create', method: 'put', data }), // 创建担保
  // post
  list: (data) => request({ url: '/litigation/selectByPage', method: 'post', params: data }), // 列表
  // delete
  remove: (data) => request({ url: '/litigation/delete/' + data, method: 'delete' }), // 删除
  // get
  details: (params) => request({ url: '/litigation/get/' + params, method: 'get' }) // 详情
}
