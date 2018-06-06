/*
 * @Author: Kevin Bolton
 * @Date: 2017-12-06 23:14:55
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2017-12-13 20:56:22
 */
import Vue from 'vue';

const CONSTSYU = {
  // ------------------------- //
  // 开发版和生成版数据请求设置相关
  // 开发版 PREFIXURL = '/api'
  // 生成版 PREFIXURL = '/api'
  // 开发版配置
  PREFIXURL: '/api',
  PREFIXROUTER: '',
  // 生成版配置
  // PREFIXURL: '/api',
  // PREFIXROUTER: '',
  // ------------------------- //

  // (测试项)上线后，可删
  TESTID: 'TEST_0001',
  // COOKIE
  COOKIEUSERNAME: 'USERCID',
  COOKIEMAXAGE: 60 * 60 * 12, // 基本单位: 1s
  // 界面显示
  DEFAULTSYSNAME: '原型设计组件',
  DEFAULTVOLNUM: '1.0',
  DEFAULTINFO: '欢迎使用本系统！',
  DEFAULTVOL: 'Vol ',
  DEFAULTINDEX: '我的桌面',
  MENUWIDTHUNFOLD: 180, // 菜单（侧边）展开的宽度
  MENUWIDTHFOLD: 36, // 菜单（侧边）收起的宽度
  CURRENTVOL: ' 当前版本号为 ',
  TABLEHANDLER: '操作',
  NOCONTENT: '--',
  // 提示和占位符
  TIPSOLDPWD: '请输入旧密码',
  TIPSNEWPWD: '请输入新密码',
  TIPSECONDPWD: '请再次输入新密码',
  TIPSEARCH: '想搜索在这里',
  TIPSLOGINPWD: '登录密码',
  TIPSLOGINACCOUNT: '登录账号',
  // 未输入或未选中提示
  NOINPUTSEARCHKEY: '请输入搜索关键字',
  NOSELECTEDITEM: '对不起！您什么都没有选',
  // 数据请求
  DATANOGET: '什么也没有',
  DATALOADING: '努力加载中...',
  DATAERROR: '数据获取失败',
  DATADEFAULTUSER: '...',
  DATATIMEOUT: 30000, // 请求超时的时间(毫秒)
  // 分页
  PAGINATIONDEFAULTCUR: 1, // 默认当前页
  PAGINATIONDEFAULTSIZES: 20, // 默认每页显示的条数
  PAGINATIONDEFAULTSELECTSIZES: [10, 20, 50], // 默认可选择的当前页条数，其中1项须等于PAGINATIONDEFAULTSIZES的值
  PAGINATIONDEFAULTTOTALNUM: 0, // 默认总条数
  // 登录
  LOGINNOLOG: '您还未登录，请先登录',
  LOGINALLERROR: '请输入账户名和密码',
  LOGINACCOUNTERROR: '请输入正确的账号',
  LOGINPWDERROR: '输入的密码格式错误',
  LOGINDEFAULTERROR: '对不起！登录失败',
  // 修改登录密码
  UPDATEPWDSECERROR: '两次输入的密码不一致',
  UPDATEOLDNEWERROR: '请输入不一样的新旧密码',
  // 密钥
  SECRETKEY: 'SECRETKEY-BOLTON',
  // Dialog
  // Dialog字段
  DIALOGFIELDSMAC: '请输入MAC地址',
  // localStorage相关
  STORAGEKEYDEFAULT: 'ACCOUNT_STORE',
  // 封装axios
  // 错误
  ERRORREQNOURL: '缺失POST请求地址!',
  ERRORREQNOARRAY: '必须传递数组，且length不等于0!',
  // 组件Element-UI
  // 按钮
  BUTTONCONFIRM: '确认',
  BUTTONCANCEL: '取消',
  BUTTONSAVE: '保存',
  BUTTONEDIT: '编辑',
  BUTTONRESETPWD: '重置密码',
  BUTTONDELETE: '删除',
  BUTTONADD: '添加',
  BUTTONLOGOUT: '安全退出',
  BUTTONCONFIRMLOGOUT: '确认退出',
  BUTTONCLOSESIDEBAR: '关闭侧边栏',
  BUTTONRESET: '重置',
  BUTTONLOGIN: '登录',
  BUTTONLOGINLOADING: '登录中...',
  BUTTONCANCELEDIT: '取消',
  BUTTONHANDLELOADING: '处理中...',
  // Confirm
  CONFIRMTITLE: '确认提示',
  CONFIRMSG: '您将进行该操作，是否继续',
  CONFIRMBTNTEXT: '确认',
  CONFIRMSUCCESSMSG: '操作成功',
  CONFIRMSGLOGOUT: '您将退出此登录账户，是否继续',
  // Message
  SUCCESSLOGOUT: '你将安全退出本系统',
  SUCCESSEDITPWD: '您的登录密码已更新'
};

let install = () => {
  Vue.CONSTSYU = CONSTSYU;
  Vue.prototype.$CONSTSYU = CONSTSYU;
};

export default { install };
