import request from '@/libs/axios/courtReq'

// 担保审批api
export const approveApi = {
  // post
  approve: data => request({ url: '/approve/submitApprove', method: 'post', params: data })
}
