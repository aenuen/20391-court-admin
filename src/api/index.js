import request from '@/libs/axios/courtReq'

export const exchangeApi = {}
// 创建
exchangeApi.create = (data) => request({ url: '/expense/create', method: 'put', data })

// 编辑
exchangeApi.update = (data) => request({ url: '/expense/update', method: 'post', data })

// 删除
exchangeApi.remove = (data) => request({ url: '/expense/delete/' + data, method: 'delete' })

// 详情
exchangeApi.detail = (params) => request({ url: '/expense/getDetail/' + params, method: 'get' })

// 列表
exchangeApi.list = (params) => request({ url: '/expense/getByPage', method: 'get', params })
