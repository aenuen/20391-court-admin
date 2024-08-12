import { validateRequire, validateAllCn, validateIdCard } from 'abbott-methods/import'
import { fields } from './fields'

export const BaseDataRule = {
  realName: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, fields.realName, 2, 20) }],
  cardNo: [{ validator: (rule, value, callback) => validateIdCard(rule, value, callback, fields.cardNo, '填写') }]
}

export const PasswordRule = {
  passwordOld: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, `旧${fields.password}`, '填写', 6, 20) }],
  passwordNew: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, `新${fields.password}`, '填写', 6, 20) }],
  passwordRep: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, `确认${fields.password}`, '填写', 6, 20) }]
}
