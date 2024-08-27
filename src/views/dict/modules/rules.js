import { validateRequire } from 'abbott-methods/import'
import { fields } from './fields'

// 修改密码
export const detailRules = {
  name: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.name, '填写') }],
  dictKey: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.dictKey, '填写') }]
}
