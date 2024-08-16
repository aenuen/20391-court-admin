/**
 * @description 获取字典的中文名称name
 * @param {Array} ary
 * @param {String} {dictValue} key
 * @param {Number} value
 * @returns {String}
 */
export const getValue = (ary, key = 'dictValue', value) => {
  let a = ''
  for (let i = 0; i < ary.length; i++) {
    const item = ary[i]
    if (+item[key] === +value) {
      a = item.name
      break
    }
  }
  return a
}
