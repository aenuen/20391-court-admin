export const baseData = (obj) => {
  return [
    { label: '申请法院', value: obj.gCourt },
    { label: '保全类别', value: obj.guaranteeCategory },
    { label: '非诉期间', value: obj.outLawsuitTime || '--' },
    { label: '案件类型', value: obj.gCaseType || '--' },
    { label: '案号', value: obj.gCaseNo.split('|').join('') || '--' },
    { label: '申请保全额', value: obj.gMoney },
    { label: '建议保全费', value: obj.guaranteeMoney },
    { label: '提交人身份', value: obj.gIssueStatus },
    { label: '提交时间', value: (obj.createTime.split(' ')[0]) || '--' },
    { label: '备注', value: obj.gDesc || '--' }
  ]
}
