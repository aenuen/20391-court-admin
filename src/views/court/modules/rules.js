import { validateRequire, validateAllCn, validateLicense, validateMobile } from 'abbott-methods/import'
import { fields } from './fields'

// 基本资料
export const rulesForm = {
  courtName: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.courtName, '填写', 2, 30) }],
  courtCode: [{ validator: (rule, value, callback) => validateLicense(rule, value, callback, fields.courtCode) }],
  courtCharge: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, fields.courtCharge, 2, 10) }],
  telephone: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback, '填写') }],
  courtAddress: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.courtAddress, '选择') }]
}
