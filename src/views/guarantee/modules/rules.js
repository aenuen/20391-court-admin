import { validateRequire, validateAllCn, validatePrice, validateAllNumber, validateMobile } from 'abbott-methods/import'
import { DetailFields, ApplicantFields } from './fields'

// 基本资料
export const DetailCommon = {
  court: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, DetailFields.court, 2, 30) }],
  preserve: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, DetailFields.preserve, '填写', 1, 11) }],
  submitter: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, DetailFields.submitter, '选择') }]
}
export const DetailOne = {
  period: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, DetailFields.period, '选择') }]
}
export const DetailTwo = {
  caseType: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, DetailFields.caseType, '选择') }],
  caseYear: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, DetailFields.caseYear, '填写') }],
  caseCode: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, DetailFields.caseCode, '填写') }],
  caseZips: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, DetailFields.caseZips, '填写') }],
  codeOrder: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, DetailFields.codeOrder, '填写') }]
}

// 申请人、被申请人
export const ApplicantCommon = {
  name: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, ApplicantFields.name, 2, 20) }],
  country: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.country, '选择') }],
  idType: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.idType, '选择') }],
  idNumber: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.idNumber, '填写', 8, 18) }],
  areaNumber: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, ApplicantFields.areaNumber, '填写', 3, 4) }],
  mobile: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }],
  telephone: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, ApplicantFields.telephone, '填写', 7, 8) }],
  runNumber: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, ApplicantFields.runNumber, '填写', 1, 4) }]
}

export const ApplicantOne = {
  birthday: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.birthday, '填写') }],
  old: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, ApplicantFields.old, '填写') }],
  sex: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.sex, '选择') }],
  nation: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.nation, '选择') }],
  area: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.area, '选择') }],
  address: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.address) }]
}

export const ApplicantTwo = {
  unitNature: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.unitNature, '选择') }],
  legalPerson: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, ApplicantFields.legalPerson, 2, 20) }],
  legalJob: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, ApplicantFields.legalJob, 2, 20) }],
  unitArea: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.unitArea, '选择') }],
  unitAddress: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.unitAddress) }],
  signArea: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.signArea, '选择') }],
  signAddress: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, ApplicantFields.signAddress) }]
}
