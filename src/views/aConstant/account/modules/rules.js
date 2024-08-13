import { validateRequire, validateAllCn, validateIdCard, validateMobile } from 'abbott-methods/import'
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

// 登录验证
export const loginRule = {
  telephone: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }],
  password: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '登录密码', '填写', 6, 30) }]
}

// 注册验证
export const registerRule = {
  telephone: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }],
  telCode: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '短信验证码', '填写', 6, 6) }],
  password: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '登录密码', '填写', 6, 30) }],
  name: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, '姓名') }],
  cardNo: [{ validator: (rule, value, callback) => validateIdCard(rule, value, callback) }]
}

// 找回密码验证
export const findRule = {
  telephone: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }],
  telCode: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '短信验证码', '填写', 6, 6) }],
  newPwd: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '新的密码', '填写', 6, 30) }],
  conPwd: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '确认密码', '填写', 6, 30) }]
}
