export const getFullTel = (area, phone, num) => {
  let str = ''
  if (phone) {
    str = phone
    if (area) {
      str = `(${area})${str}`
    }
    if (num) {
      str = `${str}转${num}`
    }
  }
  return str
}
