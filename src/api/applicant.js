import request from '@/libs/axios/courtReq'

export const applicantApi = {
  // put
  create: data => request({ url: '/applicant/create', method: 'put', data }), // 创建担保
  // get
  details: params => request({ url: '/applicant/get/' + params, method: 'get' }), // 详情
  list: params => request({ url: '/applicant/getAllApply/' + params, method: 'get' }), // 列表
  // post
  update: data => request({ url: '/applicant/update', method: 'post', data }), // 更新
  remove: data => request({ url: '/applicant/delete/' + data, method: 'delete' }) // 删除
}
