/**
 * @description 根据字典的值获取对应的名称
 * @param {Array} ary
 * @param {Number} value
 * @returns {String}
 */
export const dictGetNameByValue = (ary, value) => {
  let name = ''
  for (let i = 0; i < ary.length; i++) {
    const item = ary[i]
    if (+item.dictValue === +value) {
      name = item.name
      break
    }
  }
  return name || value
}
/**
 * @description 根据字典的名称获取对应的值
 * @param {Array} ary
 * @param {String} name
 * @returns {String}
 */
export const dictGetValueByName = (ary, name) => {
  if (typeof name === 'number') {
    return name
  } else {
    let value = ''
    for (let i = 0; i < ary.length; i++) {
      const item = ary[i]
      if (String(item.name) === String(name)) {
        value = item.dictValue
        break
      }
    }
    return value || name
  }
}

/**
 * @description 根据民族的值获取对应的名称
 * @param {Array} ary
 * @param {Number} value
 * @returns {String}
 */
export const dictGetNameByNationId = (ary, value) => {
  let name = ''
  for (let i = 0; i < ary.length; i++) {
    const item = ary[i]
    if (+item.nationId === +value) {
      name = item.name
      break
    }
  }
  return name || value
}
/**
 * @description 根据民族的名称获取对应的值
 * @param {Array} ary
 * @param {String} name
 * @returns {String}
 */
export const dictGetValueByNationName = (ary, name) => {
  if (typeof name === 'number') {
    return name
  } else {
    let value = ''
    for (let i = 0; i < ary.length; i++) {
      const item = ary[i]
      if (String(item.name) === String(name)) {
        value = item.nationId
        break
      }
    }
    return value || name
  }
}
