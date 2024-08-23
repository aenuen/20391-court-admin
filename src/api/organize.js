import request from '@/libs/axios/courtReq'

// 担保资料api
export const organizeApi = {
  // get
  getId: () => request({ url: '/organization/getOrgId', method: 'get' }), // 获取ID
  detail: () => request({ url: '/organization/getDetail', method: 'get' }) // 获取详情
}
