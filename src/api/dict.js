
import request from '@/libs/axios/request'

export const dictApi = {
  // get
  detail: params => request({ url: '/dict/get/' + params, method: 'get' }), // 详情
  list: params => request({ url: '/dict/refresh', method: 'get' }), // 列表
  // pu
  create: data => request({ url: '/dict/create', method: 'put', data }), // 添加
  // post
  update: data => request({ url: '/dict/update', method: 'post', data }), // 添加
  // delete
  remove: params => request({ url: '/dict/delete/' + params, method: 'delete' }) // 删除
}
