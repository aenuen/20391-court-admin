import request from '@/libs/axios/courtReq'

const agent = {}
// 创建担保
agent.create = (data) =>
  request({
    url: '/agent/create',
    method: 'put',
    data
  })

agent.details = (params) =>
  request({
    url: '/agent/get/' + params,
    method: 'get'
  }) // 详情

agent.list = (params) => request({ url: '/agent/getAllApply/' + params, method: 'get' }) // 列表
agent.update = (data) => request({ url: '/agent/update', method: 'post', data }) // 更新
agent.remove = (data) => request({ url: '/agent/delete/' + data, method: 'delete' }) // 删除

export const api = {
  agent
}
