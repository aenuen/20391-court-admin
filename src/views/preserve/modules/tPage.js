export const toPages = (gId, status) => {
  let path = ''
  switch (status) {
    case 0:
      path = 'audit'
      break
    case 1:
      path = 'preview'
      break
    case 2:
      path = 'details'
      break
    case 3:
      path = 'details'
      break
    case 4:
      path = 'pay'
      break
    case 5:
      path = 'fees'
      break
    case 6:
      path = 'sweat'
      break
  }
  return `/preserve/${path}/${gId}`
}

export const toUpdate = (step, gId) => {
  let path = ''
  switch (step) {
    case 1:
      path = 'details'
      break
    case 2:
      path = 'upload'
      break
    case 4:
      path = 'preview'
      break
    case 5:
      path = 'audit'
      break
    default:
      path = 'details'
      break
  }
  return `/preserve/${path}/${gId}`
}
