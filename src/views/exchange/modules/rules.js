import { validateRequire, validatePrice } from 'abbott-methods/import'
import { fields } from './fields'

// 基本资料
export const DetailCommon = {
  orgId: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.courtId) }],
  courtId: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.courtId) }]
}
export const DetailOne = {
  expenseLow: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, fields.expenseLow) }],
  costLow: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, fields.costLow) }],
  expenseHigh: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, fields.expenseHigh) }]
}
export const DetailTwo = {
  chargeLow: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, fields.chargeLow) }],
  chargeHigh: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, fields.chargeHigh) }],
  costLows: [{ validator: (rule, value, callback) => validatePrice(rule, value, callback, fields.costLows) }]
}
