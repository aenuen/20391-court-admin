
const servePort = 8000
const current = 1
const serveUrl = current === 1 ? 'http://121.41.65.226' : 'http://192.168.2.53'
const adminPort = 20391
const title = '诉讼保函-智慧法院电子管理平台'
const isDevMode = process.env.NODE_ENV === 'development'
module.exports = {
  port: adminPort, // 项目端口
  title, // 项目名称
  showSettings: false, // 是否显示 showSettings
  tagsView: true, // 是否使用 tagsView
  fixedHeader: false, // 是否启用 fixedHeader
  sidebarLogo: true, // 是否使用 sidebarLog
  errorLog: 'development', // 使用errorLog的模式(可使用数组,如:['development','production'])
  cryptoJsSecretKey: 'SecretKey', // CryptoJs加密Key
  isDevMode,
  serveUrl,
  apiBaseUrl: isDevMode ? `${serveUrl}:${servePort}/wc/sys` : `${serveUrl}:${servePort}/wc/sys`,
  apiCourtUrl: isDevMode ? `${serveUrl}:${servePort}/wc/court` : `${serveUrl}:${servePort}/wc/court`
}
