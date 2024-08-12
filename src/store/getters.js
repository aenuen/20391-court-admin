const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  aid: state => state.user.aid,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  realName: state => state.user.realName,
  cardNo: state => state.user.cardNo,
  mobile: state => state.user.mobile,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
