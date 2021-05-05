const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  login_name: state => state.user.login_name,
  account_name:state => state.user.account_name,
  id:state => state.user.id,
  department:state => state.user.department,
  // 添加菜单相关的状态
  init: state => state.menu.init,
  menuList: state => state.menu.menuList,
  buttonList: state => state.menu.buttonList
}
export default getters
