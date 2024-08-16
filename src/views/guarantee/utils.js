const ary = {
  gId: 'id',
  gCourt: 'court',
  guaranteeType: 'type',
  guaranteeCategory: 'category',
  outLawsuitTime: 'period',
  gMoney: 'preserve',
  guaranteeMoney: 'assurance',
  gIssueStatus: 'submitter',
  gDesc: 'remark',
  gCaseType: 'caseType',
  gCaseNo: 'caseNumber'
}

export const baseData = (obj) => {
  return [
    { label: '申请法院', value: obj.gCourt },
    { label: '保全类别', value: obj.guaranteeCategory },
    { label: '非诉期间', value: obj.outLawsuitTime || '--' },
    { label: '案件类型', value: obj.gCaseType || '--' },
    { label: '案号', value: obj.gCaseNo || '--' },
    { label: '申请保全额', value: obj.gMoney },
    { label: '建议保全费', value: obj.guaranteeMoney },
    { label: '提交人身份', value: obj.gIssueStatus },
    { label: '提交时间', value: (obj.createTime.split(' ')[0]) || '--' },
    { label: '备注', value: obj.gDesc || '--' }
  ]
}

export const fieldsReplace = (obj) => {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    if (ary[key]) {
      newObj[ary[key]] = obj[key]
    }
  })
  return newObj
}

/**
 * @description 根据key找value
 * @param {@} obj
 * @param {*} value
 * @returns {*}
 */
export const findKeyByValue = (obj, value) => {
  for (const key in obj) {
    if (obj[key] === value) {
      return key
    }
  }
  return null
}
