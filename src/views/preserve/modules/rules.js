import { validateRequire, validateAllCn, validatePrice, validateAllNumber } from 'abbott-methods/import'
import { fields } from './fields'

// 基本资料
export const DetailCommon = {
  gCourt: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, fields.gCourt, 2, 30) }],
  gMoney: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, fields.gMoney, '填写', 1, 11) }],
  gIssueStatus: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.gIssueStatus, '选择') }]
}
export const DetailOne = {
  outLawsuitTime: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.outLawsuitTime, '选择') }]
}
export const DetailTwo = {
  gCaseNo: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.gCaseNo, '选择') }],
  gCaseYear: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.gCaseYear, '填写') }],
  gCaseCode: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.gCaseCode, '填写') }],
  gCaseZips: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.gCaseZips, '填写') }],
  gCodeOrder: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, fields.gCodeOrder, '填写') }]
}
