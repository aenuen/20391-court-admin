import request from '@/libs/axios/courtReq'

// 担保财产线索api
export const propertyApi = {
  // put
  create: data => request({ url: '/assetClue/create', method: 'put', data }), // 创建担保
  // get
  details: params => request({ url: '/assetClue/get/' + params, method: 'get' }), // 详情
  list: params => request({ url: '/assetClue/getAllApply/' + params, method: 'get' }), // 列表
  // post
  update: data => request({ url: '/assetClue/update', method: 'post', data }), // 更新
  remove: data => request({ url: '/assetClue/delete/' + data, method: 'delete' }) // 删除
}
