export const getAreaName = (ary, value) => {
  let area = ''
  if (value[1] != null && value[2] != null) {
    area = ary[value[0]] + '/' + ary[value[1]] + '/' + ary[value[2]]
  } else {
    if (value[1] != null) {
      area = ary[value[0]] + '/' + ary[value[1]]
    } else {
      area = ary[value[0]]
    }
  }
  return area
}

export const getAreaCode = (text, ary) => {
  const arr = []
  arr.push(text[ary[0]].code)
  arr.push(text[ary[0]][ary[1]].code)
  arr.push(text[ary[0]][ary[1]][ary[2]].code)
  return arr
}

export const getAddressArea = (str) => {
  if (str) {
    const ary = str.split('/') || ['', '']
    return ary[0].split(',')
  } else {
    return str
  }
}

export const getAddressText = (str) => {
  if (str) {
    const ary = str.split('/') || ['', '', '', '']
    return ary[1]
  } else {
    return str
  }
}
