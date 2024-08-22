import request from '@/libs/axios/courtReq'

// 担保被申请人api
export const respondentApi = {
  // put
  create: data => request({ url: '/respondent/create', method: 'put', data }), // 创建担保
  // get
  details: params => request({ url: '/respondent/get/' + params, method: 'get' }), // 详情
  list: params => request({ url: '/respondent/getAllApply/' + params, method: 'get' }), // 列表
  // post
  update: data => request({ url: '/respondent/update', method: 'post', data }), // 更新
  remove: data => request({ url: '/respondent/delete/' + data, method: 'delete' }) // 删除
}
