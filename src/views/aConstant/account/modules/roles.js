/**
 * @description 定义角色数组
 * @type {{}}
 */
export const rolesAry = [
  { value: 'user', code: '0', label: '普通用户' },
  { value: 'judge', code: '1', label: '法官用户' },
  { value: 'shops', code: '2', label: '商家用户' },
  { value: 'admin', code: '9', label: '管理员' }
]

/**
 * @description 处理成object
 * @return {{}}
 */
const rolesHandle = () => {
  const object = {}
  rolesAry.forEach((item) => {
    object[item.value] = item.label
  })
  return object
}

/**
 * @description 定义角色对象
 * @type {{}}
 */
export const rolesObject = rolesHandle()

/**
 * @description 将英文角色转为中文角色
 * @param {string} roles
 * @return {string}
 */
export const rolesParse = (roles) => {
  const ary = []
  const array = roles.split(',')
  array.forEach((value) => {
    ary.push(rolesObject[value])
  })
  return ary.join(',')
}
