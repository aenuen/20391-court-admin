import { validateRequire, validateMobile } from 'abbott-methods/import'
import { fields } from './fields'

// 基本资料
export const DetailRules = {
  telephone: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }],
  password: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.password, '填写', 6, 30) }]
}
