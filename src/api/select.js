import request from '@/libs/axios/courtReq'

export const selectApi = {
  list: () => request({ url: '/organization/getAll', method: 'get' }), // 列表
  create: data => request({ url: '/organization/create', method: 'put', data }) // 列表
}
