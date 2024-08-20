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

export const getTemplateFileName = (id) => {
  let name = ''
  switch (id) {
    case 1:
      name = '保全申请书'
      break
    case 2:
      name = '起诉状'
      break
    case 3:
      name = '立案受理通知书'
      break
    case 4:
      name = '身份证明材料'
      break
    case 5:
      name = '证据材料'
      break
    case 6:
      name = '其他材料'
      break
    default:
      break
  }
  return name + Date.now()
}
export const downloadSave = (fileName = 'log', type = 'doc', file) => {
  const blob = new Blob([file])
  const downloadElement = document.createElement('a')
  const href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  downloadElement.download = `${fileName}.${type}`
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
  window.URL.revokeObjectURL(href)
}
