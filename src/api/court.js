import request from '@/libs/axios/courtReq'

// 担保资料api
export const courtApi = {
  getId: () => request({ url: '/court/getCourtId', method: 'get' }), // 获取详情
  detail: () => request({ url: '/court/getDetail', method: 'get' }), // 获取详情
  create: (data) => request({ url: '/court/completeInfo', method: 'put', data }), // 列表
  update: (data) => request({ url: '/court/recertification', method: 'post', params: data }) // 重新认证
}
