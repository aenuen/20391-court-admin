import request from '@/libs/axios/file'

export const fileApi = {
  template: data => request({ url: '/guaranteeFile/template', method: 'post', params: data, responseType: 'blob' }), // 模版
  list: params => request({ url: '/guaranteeFile/getAllFiles/' + params, method: 'get' }), // 列表
  remove: params => request({ url: '/guaranteeFile/delete/' + params, method: 'delete' }) // 列表
}
