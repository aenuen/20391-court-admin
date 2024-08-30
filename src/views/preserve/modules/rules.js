import { validateRequire, validatePrice, validateAllNumber } from 'abbott-methods/import'
import { DetailFields as fields } from './fields'

// 基本资料
export const DetailCommon = {
  cCourt: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.cCourt) }],
  cMoney: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, fields.cMoney, '填写', 1, 11) }],
  cIssueStatus: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.cIssueStatus) }]
}

export const DetailOne = {
  cCaseType: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.cCaseType) }],
  caseYear: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.caseYear) }],
  caseCode: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.caseCode) }],
  caseZips: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.caseZips) }],
  codeOrder: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, fields.codeOrder) }]
}

export const DetailTwo = {
  cCaseReason: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.cCaseReason) }]
}

export const DetailThree = {
  cCaseReasonMain: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.cCaseReasonMain) }],
  cCaseReasonAction: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.cCaseReasonAction) }]
}

// 选择资料
export const selectCommon = {
  purchaseStatus: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.purchaseStatus) }],
  purchasePlat: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.purchasePlat) }]
}

export const selectOne = {
  gId: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.gId) }]
}

export const selectTwo = {
  guaranteeType: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.guaranteeType) }],
  orgId: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.orgId) }],
  guaranteeValue: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, fields.guaranteeValue, '填写', 1, 11) }]
}
