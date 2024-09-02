import request from '@/libs/axios/courtReq'

// 担保资料api
export const organizeApi = {
  // get
  getId: () => request({ url: '/organization/getOrgId', method: 'get' }), // 获取ID
  detail: () => request({ url: '/organization/getDetail', method: 'get' }), // 获取详情
  get: (params) => request({ url: '/organization/get/' + params, method: 'get' }), // 获取详情
  // put
  complete: (data) => request({ url: '/organization/completeInfo', method: 'put', data }), // 提交资料
  // post
  list: (data) => request({ url: '/organization/selectByPage', method: 'post', params: data }), // 列表
  approve: (data) => request({ url: '/organization/approve', method: 'post', params: data }), // 审核
  Update: (data) => request({ url: '/organization/recertification', method: 'post', params: data }), // 重新认证
  set: (data) => request({ url: '/organization/setShow', method: 'post', params: data }) // 设置可见，序号
}
