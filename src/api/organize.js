import request from '@/libs/axios/courtReq'

// 担保资料api
export const organizeApi = {
  // get
  getId: () => request({ url: '/organization/getOrgId', method: 'get' }), // 获取ID
  detail: () => request({ url: '/organization/getDetail', method: 'get' }), // 获取详情
  // put
  complete: (data) => request({ url: '/organization/completeInfo', method: 'put', data }), // 提交资料
  // post
  list: (data) => request({ url: '/organization/selectByPage', method: 'post', data })
}
