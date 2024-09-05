import { validateRequire } from 'abbott-methods/import'
import { fields } from './fields'

// 基本资料
export const DetailCommon = {
  orgId: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.courtId) }],
  courtId: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.courtId) }]
}
