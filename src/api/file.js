import request from '@/libs/axios/file'

export const fileApi = {
  template: data => request({
    url: '/guaranteeFile/template', method: 'post', params: data, responseType: 'blob'
  }) // 模版
}
