import { validateRequire, validateAllCn, validatePrice, validateAllNumber, validateMobile } from 'abbott-methods/import'
import { DetailFields, ApplicantFields, AgentFields, PropertyFields } from './fields'

// 基本资料
export const DetailCommon = {
  cCourt: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, DetailFields.gCourt, 2, 30) }],
  gMoney: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, DetailFields.gMoney, '填写', 1, 11) }],
  gIssueStatus: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, DetailFields.gIssueStatus, '选择') }]
}
export const DetailOne = {
  outLawsuitTime: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, DetailFields.outLawsuitTime, '选择') }]
}
export const DetailTwo = {
  gCaseNo: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, DetailFields.gCaseNo, '选择') }],
  gCaseYear: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, DetailFields.gCaseYear, '填写') }],
  gCaseCode: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, DetailFields.gCaseCode, '填写') }],
  gCaseZips: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, DetailFields.gCaseZips, '填写') }],
  gCodeOrder: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, DetailFields.gCodeOrder, '填写') }]
}

// 申请人、被申请人
export const ApplicantCommon = {
  name: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.name, '填写', 2, 20) }],
  area: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.area, '选择') }],
  certType: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.certType, '选择') }],
  certNo: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.certNo, '填写', 8, 18) }]
}

export const ApplicantOne = {
  birthday: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.birthday, '填写') }],
  age: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, ApplicantFields.age, '填写') }],
  sex: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.sex, '选择') }],
  nation: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.nation, '选择') }],
  dwellArea: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.dwellArea, '选择') }],
  dwellAddress: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.dwellAddress) }]
}

export const ApplicantTwo = {
  unitProperty: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.unitProperty, '选择') }],
  legalName: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, ApplicantFields.legalName, 2, 20) }],
  legalJob: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, ApplicantFields.legalJob, 2, 20) }],
  unitArea: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.unitArea, '选择') }],
  unitAddress: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.unitAddress) }],
  signArea: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.signArea, '选择') }],
  signAddress: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.signAddress) }]
}

export const ApplicantThree = {
  mobile: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }]
}

// 代理人
export const AgentRules = {
  agentType: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, AgentFields.agentType, '选择') }],
  agentName: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, AgentFields.agentName, 2, 20) }],
  sex: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, AgentFields.sex, '填写') }],
  practiceCertNo: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, AgentFields.practiceCertNo, '填写', 8, 18) }],
  certType: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, AgentFields.certType, '选择') }],
  certNo: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, AgentFields.certNo, '填写', 8, 18) }],
  dwellArea: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, AgentFields.dwellArea, '选择') }],
  dwellAddress: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, AgentFields.dwellAddress) }],
  mobile: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }]
}

export const PropertyRules = {
  money: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, PropertyFields.money, '填写', 1, 11) }],
  assetType: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, PropertyFields.assetType, '选择') }],
  asset_belong: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, PropertyFields.asset_belong, 2, 20) }],
  description: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, PropertyFields.description) }]
}
