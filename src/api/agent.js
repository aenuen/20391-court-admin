import request from '@/libs/axios/courtReq'

// 申请原告代理人api
export const agentApi = {
  // put
  create: data => request({ url: '/agent/create', method: 'put', data }), // 创建担保
  // get
  details: params => request({ url: '/agent/get/' + params, method: 'get' }), // 详情
  list: params => request({ url: '/agent/getAllApply/' + params, method: 'get' }), // 列表
  // post
  update: data => request({ url: '/agent/update', method: 'post', data }), // 更新
  remove: data => request({ url: '/agent/delete/' + data, method: 'delete' }) // 删除
}
