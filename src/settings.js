
const servePort = 20390
const adminPort = 20391
const title = '诉讼保函-智慧法院电子管理平台'
const isDevMode = process.env.NODE_ENV === 'development'
module.exports = {
  port: adminPort, // 项目端口
  title, // 项目名称
  showSettings: false, // 是否显示 showSettings
  tagsView: true, // 是否使用 tagsView
  fixedHeader: false, // 是否启用 fixedHeader
  sidebarLogo: false, // 是否使用 sidebarLog
  errorLog: 'development', // 使用errorLog的模式(可使用数组,如:['development','production'])
  cryptoJsSecretKey: 'SecretKey', // CryptoJs加密Key
  isDevMode,
  apiBaseUrl: isDevMode ? `http://localhost:${servePort}` : `http://localhost:${servePort}`
}
