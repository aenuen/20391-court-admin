export const toPages = (gId, status) => {
  let path = ''
  switch (status) {
    case 0:
      path = 'audit'
      break
    default:
      path = 'audit'
      break
  }
  return `/guarantee/${path}/${gId}`
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
    case 3:
      path = 'select'
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
  return `/guarantee/${path}/${gId}`
}
