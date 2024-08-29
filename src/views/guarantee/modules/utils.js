import { ApplicantFields, AgentFields, PropertyFields } from './fields'
import { codeToText } from 'element-china-area-data'
import { getAddressArea, getAddressText, getAreaName } from '@/libs/utils/area'

export const baseData = (obj) => {
  return [
    { label: '申请法院', value: obj.courtName },
    { label: '保全类别', value: obj.guaranteeCategory },
    { label: '非诉期间', value: obj.outLawsuitTime || '--' },
    { label: '案件类型', value: obj.gCaseType || '--' },
    { label: '案号', value: obj.gCaseNo.split('|').join('') || '--' },
    { label: '申请保全额', value: obj.gMoney },
    { label: '建议保全费', value: obj.guaranteeMoney },
    { label: '提交人身份', value: obj.gIssueStatus },
    { label: '提交时间', value: obj.createTime.split(' ')[0] || '--' },
    { label: '备注', value: obj.gDesc || '--' }
  ]
}

export const baseGain = (obj) => {
  const arr = []
  arr.push({ label: '申请法院', value: obj.courtName || '--' })
  arr.push({ label: '保全类别', value: obj.courtCategory })
  arr.push({ label: '案件类型', value: obj.cCaseType || '--' })
  arr.push({ label: '案号', value: (obj.cCaseNo || '').split('|').join('') || '--' })
  if (obj.cCaseType && +obj.cCaseType === 13) {
    arr.push({ label: '主体案由', value: obj.cCaseReason || '--' })
    arr.push({ label: '行为案由', value: obj.cCaseReason2 || '--' })
  } else {
    arr.push({ label: '案由', value: obj.cCaseReason || '--' })
  }
  arr.push({ label: '保全金额', value: obj.cMoney || '--' })
  arr.push({ label: '担保情况', value: obj.guaranteeCase || '--' })
  if (obj.cCaseType && +obj.guaranteeCase === 2) {
    arr.push({ label: '无需担保原因', value: obj.noGuaranteeReason || '--' })
  }
  arr.push({ label: '提交人身份', value: obj.cIssueStatus || '--' })
  arr.push({ label: '提交时间', value: (obj.createTime || '').split(' ')[0] || '--' })
  arr.push({ label: '备注', value: obj.cDesc || '--' })
  return arr

  // return [
  //   { label: '申请法院', value: obj.courtName },
  //   { label: '保全类别', value: obj.courtCategory },
  //   { label: '案件类型', value: obj.cCaseType || '--' },
  //   { label: '案号', value: obj.cCaseNo.split('|').join('') || '--' },
  //   { label: '申请保全额', value: obj.gMoney },
  //   { label: '建议保全费', value: obj.guaranteeMoney },
  //   { label: '提交人身份', value: obj.gIssueStatus },
  //   { label: '提交时间', value: obj.createTime.split(' ')[0] || '--' },
  //   { label: '备注', value: obj.gDesc || '--' }
  // ]
}

export const applicantData = (ary) => {
  const arr = []
  ary.forEach((item) => {
    const array = []
    array.push({ label: ApplicantFields.applyType, value: item.applyType })
    array.push({ label: item.applyType === '自然人' ? '姓名' : '企业名称', value: item.name })
    array.push({ label: ApplicantFields.area, value: item.area })
    array.push({ label: ApplicantFields.certType, value: item.certType })
    array.push({ label: ApplicantFields.certNo, value: item.certNo })
    if (item.unitProperty) {
      array.push({ label: ApplicantFields.unitProperty, value: item.unitProperty })
    }
    if (item.legalName) {
      array.push({ label: ApplicantFields.legalName, value: item.legalName })
    }
    if (item.legalJob) {
      array.push({ label: ApplicantFields.legalJob, value: item.legalJob })
    }
    if (item.unitAddress) {
      const area = getAreaName(codeToText, getAddressArea(item.unitAddress)).split('/').join('')
      const text = getAddressText(item.unitAddress)
      array.push({ label: ApplicantFields.unitAddress, value: area + text, tip: true })
    }
    if (item.signAddress) {
      const area = getAreaName(codeToText, getAddressArea(item.signAddress)).split('/').join('')
      const text = getAddressText(item.signAddress)
      array.push({ label: ApplicantFields.signAddress, value: area + text, tip: true })
    }
    if (item.birthday) {
      array.push({ label: ApplicantFields.birthday, value: item.birthday })
    }
    if (item.age) {
      array.push({ label: ApplicantFields.age, value: item.age + '岁' })
    }
    if (item.sex) {
      array.push({ label: ApplicantFields.sex, value: +item.sex === 0 ? '男' : '女' })
    }
    if (item.nation) {
      array.push({ label: ApplicantFields.nation, value: item.nation })
    }
    if (item.address) {
      const area = getAreaName(codeToText, getAddressArea(item.address)).split('/').join('')
      const text = getAddressText(item.address)
      array.push({ label: ApplicantFields.dwellAddress, value: area + text, tip: true })
    }
    array.push({ label: ApplicantFields.mobile, value: item.telephone })
    const telAry = item.fixedTelephone.split('|')
    const areaNumber = telAry[0] ? `(${telAry[0]})` : ''
    const telephone = telAry[1]
    const runNumber = telAry[2] ? `转${telAry[2]}` : ''
    array.push({ label: ApplicantFields.telephone, value: areaNumber + telephone + runNumber })
    arr.push(array)
  })
  return arr
}

export const agentData = (ary) => {
  const arr = []
  ary.forEach((item) => {
    const array = []
    array.push({ label: AgentFields.agentType, value: item.agentType })
    array.push({ label: AgentFields.agentName, value: item.agentName })
    array.push({ label: AgentFields.sex, value: +item.sex === 0 ? '男' : '女' })
    array.push({ label: AgentFields.practiceCertNo, value: item.practiceCertNo })
    array.push({ label: AgentFields.certType, value: item.certType })
    array.push({ label: AgentFields.certNo, value: item.certNo })
    if (item.address) {
      const area = getAreaName(codeToText, getAddressArea(item.address)).split('/').join('')
      const text = getAddressText(item.address)
      array.push({ label: AgentFields.dwellAddress, value: area + text, tip: true })
    }
    array.push({ label: AgentFields.mobile, value: item.telephone })
    const telAry = item.fixedTelephone.split('|')
    const areaNumber = telAry[0] ? `(${telAry[0]})` : ''
    const telephone = telAry[1]
    const runNumber = telAry[2] ? `转${telAry[2]}` : ''
    array.push({ label: AgentFields.telephone, value: areaNumber + telephone + runNumber })
    arr.push(array)
  })
  return arr
}

export const propertyData = (ary) => {
  const arr = []
  ary.forEach((item) => {
    const array = []
    array.push({ label: PropertyFields.money, value: item.money })
    array.push({ label: PropertyFields.assetType, value: item.assetType })
    array.push({ label: PropertyFields.assetBelong, value: item.assetBelong })
    if (item.address) {
      const area = getAreaName(codeToText, getAddressArea(item.address)).split('/').join('')
      const text = getAddressText(item.address)
      array.push({ label: PropertyFields.dwellAddress, value: area + text, tip: true })
    }
    array.push({ label: PropertyFields.description, value: item.description, tip: true, need: true })
    arr.push(array)
  })
  return arr
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
