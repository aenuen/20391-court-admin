import { validateRequire, validateAllCn, validateIdCard, validateMobile } from 'abbott-methods/import'
import { fields } from './fields'

// 基本资料
export const BaseDataRule = {
  realName: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, fields.realName, 2, 20) }],
  cardNo: [{ validator: (rule, value, callback) => validateIdCard(rule, value, callback, fields.cardNo, '填写') }]
}

// 修改密码
export const PasswordRule = {
  telCode: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.telCode, '填写', 6, 6) }],
  newPwd: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.newPwd, '填写', 6, 20) }],
  conPwd: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.conPwd, '填写', 6, 20) }]
}

// 更换手机
export const MobileRule = {
  newMobile: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }],
  telCode: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.telCode, '填写', 6, 6) }]
}

// 登录验证
export const loginRule = {
  telephone: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }],
  password: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '登录密码', '填写', 6, 30) }],
  code: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, '验证码', '填写', 5, 5) }]
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
