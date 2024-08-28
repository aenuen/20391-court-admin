import request from '@/libs/axios/courtReq'

export const preserveApi = {
  // put
  create: (data) => request({ url: '/litigation/create', method: 'put', data }) // 创建担保
}
