import request from '@/libs/axios/courtReq'

// 担保审批api
export const approveApi = {
  // post
  approve: (data) => request({ url: '/approve/submitApprove', method: 'post', params: data }), // 提交审批
  list: (data) => request({ url: '/approve/getApproveList', method: 'post', params: data }), // 列表
  approval: (data) => request({ url: '/approve/approve', method: 'post', params: data }) // 审核
}
