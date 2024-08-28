import request from '@/libs/axios/courtReq'

// 担保资料api
export const courtApi = {
  getId: () => request({ url: '/court/getCourtId', method: 'get' }), // 获取ID
  detail: () => request({ url: '/court/getDetail', method: 'get' }), // 获取详情
  get: (params) => request({ url: '/court/get/' + params, method: 'get' }), // 根据ID查看详情
  create: (data) => request({ url: '/court/completeInfo', method: 'put', data }), // 列表
  update: (data) => request({ url: '/court/recertification', method: 'post', params: data }), // 重新认证
  list: (data) => request({ url: '/court/selectByPage', method: 'post', params: data }), // 重新认证
  all: () => request({ url: '/court/getAll', method: 'get' }) // 全部
}
