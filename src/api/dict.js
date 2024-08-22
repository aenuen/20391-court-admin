
import request from '@/libs/axios/request'

// 字典api
export const dictApi = {
  // get
  gain: params => request({ url: '/dict/get/' + params, method: 'get' }), // 详情
  list: () => request({ url: '/dict/refresh', method: 'get' }), // 列表
  nation: () => request({ url: '/dict/get/nation', method: 'get' }), // 民族

  // put
  create: data => request({ url: '/dict/create', method: 'put', data }), // 添加

  // post
  update: data => request({ url: '/dict/update', method: 'post', data }), // 添加

  // delete
  remove: params => request({ url: '/dict/delete/' + params, method: 'delete' }) // 删除
}
