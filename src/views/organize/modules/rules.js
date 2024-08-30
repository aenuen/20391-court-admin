import { validateRequire, validateAllCn, validateAllNumber, validateEmail, validateMobile } from 'abbott-methods/import'
import { fields } from './fields'

// 基本资料
export const rulesForm = {
  name: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.name, '填写', 2, 30) }],
  orgCode: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, fields.orgCode, '填写', 18, 18) }],
  orgEmail: [{ validator: (rule, value, callback) => validateEmail(rule, value, callback, 5, 30) }],
  orgTelephone: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.orgTelephone, '填写') }],
  dwellArea: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.dwellArea, '选择') }],
  dwellAddress: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.dwellAddress, '填写', 4, 30) }],
  orgLegal: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, fields.orgLegal, 2, 10) }],
  legalCertNo: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, fields.legalCertNo, '填写', 18, 18) }],
  legalTelephone: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback, '填写') }],
  orgAgent: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, fields.orgAgent, 2, 10) }],
  agentCertNo: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, fields.agentCertNo, '填写', 18, 18) }],
  agentTelephone: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback, '填写') }],
  bank: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, fields.bank, 2, 20) }],
  accountName: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, fields.accountName, 3, 30) }],
  orgAccount: [{ validator: (rule, value, callback) => validateAllNumber(rule, value, callback, fields.orgAccount, '填写', 6, 19) }]
}
