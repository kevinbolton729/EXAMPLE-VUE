/*
 * @Author: Kevin Bolton
 * @Date: 2017-12-06 23:14:24
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2017-12-13 20:56:26
 */
import Vue from 'vue';
import md5 from 'js-md5';
import ajax from '@/http';

const FNSYU = {
  // [数据请求]
  // >> ajax请求
  ajax() {
    return ajax;
  },
  // [加密处理]
  // >> md5处理
  setMd5(str) {
    return md5(md5(str + Vue.CONSTSYU.SECRETKEY) + Vue.CONSTSYU.SECRETKEY);
  },
  // [交互布局]
  // >> 跳转
  // 跳转至登录页
  gotoLogin() {
    this.$router.push('/login');
  },
  // 跳转至系统首页
  gotoDefault() {
    this.$router.push('/table');
  },
  // >> 侧边栏
  // 侧边栏打开/关闭时右侧内容的位置
  toggleMarginLeft(node, status) {
    if (status) {
      $(node).css({
        'margin-left': Vue.CONSTSYU.MENUWIDTHUNFOLD + 'px'
      });
    } else {
      $(node).css({
        'margin-left': Vue.CONSTSYU.MENUWIDTHFOLD + 'px'
      });
    }
  },
  // 侧边栏打开/关闭时的宽度
  toggleWidth(node, status) {
    if (status) {
      $(node).css({
        width: Vue.CONSTSYU.MENUWIDTHUNFOLD + 'px'
      });
    } else {
      $(node).css({
        width: Vue.CONSTSYU.MENUWIDTHFOLD + 'px'
      });
    }
  },
  // 获取屏幕尺寸
  // 当屏幕分辨率（款）小于1280时，自动收起侧边栏
  autoCloseSilder() {
    let that = this;

    if (!window.innerWidth > 1280) {
      that.$store.commit('updateLayoutStatus');
    }
  },
  // >> 定位
  // 获取元素居中位置
  getPos(node) {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let objX = ($(window).width() - $(node).outerWidth()) / 2;
    let objY = ($(window).height() - $(node).outerHeight()) / 2;

    objY += scrollTop;

    $(node).css({
      position: 'absolute',
      top: objY,
      left: objX
    });

    return false;
  },
  // >> 左侧导航栏
  // 添加isChecked属性
  // 如果isChecked不存在，则添加
  addisChecked(arr) {
    let that = this;
    let fn = Vue.FNSYU;

    for (let i = 0; i < arr.length; i += 1) {
      if (typeof arr[i].isChecked === 'undefined') {
        that.$set(arr[i], 'isChecked', false);
      } else {
        arr[i].isChecked = false;
      }

      if (arr[i].child) {
        fn.addisChecked.apply(that, [arr[i].child]);
      }
    }
  },
  // 设置isChecked的默认值
  // i: 1级导航索引  n: 2级导航索引
  // 设置i 可激活该索引导航
  // 该方法 return { i, n }
  defaultisChecked(arr, i) {
    let n = 0;

    if (i > arr.length - 1) {
      i = arr.length - 1;
    }
    if (i < 0) {
      i = 0;
    }

    arr[i].isChecked = true;
    arr[i].child[n].isChecked = true;

    return {
      i,
      n
    };
  },
  // 切换导航
  // item: 1级导航项
  // index: 2级导航项索引
  toggleMenu({ item, index, params }) {
    let that = this;
    let fn = Vue.FNSYU;
    let status = item.child && true;
    let menulists = that.$store.getters.getChanneLists[0].extData;
    let isClose = that.$store.getters.getLayoutStatus.isClose;

    fn.toggleisChecked.apply(that, [menulists, status]);
    item.isChecked = !item.isChecked;

    // console.log(status);
    // console.log(isClose);

    if (!status) {
      fn.gotoMenu.apply(that, [
        {
          item,
          params: params || {}
        }
      ]);
    }
    if (isClose && status) {
      fn.gotoMenu.apply(that, [
        {
          item: item.child[index],
          params: params || {}
        }
      ]);
      fn.toggleisChecked.apply(that, [menulists, !status]);
      item.child[index].isChecked = !item.child[index].isChecked;
    }
  },
  // 切换isChecked的true/false
  toggleisChecked(arr, status) {
    let that = this;
    let fn = Vue.FNSYU;

    if (status) {
      arr.forEach(item => {
        item.isChecked = false;
      });
    } else {
      arr.forEach(item => {
        fn.toggleisChecked.apply(that, [item.child, !status]);
      });
    }
  },
  // 导航跳转
  // item: 导航项(1级/2级导航)  params: 路由跳转传递的参数
  gotoMenu({ item, params }) {
    let that = this;
    let name = item.url;
    let tolink = {
      name,
      params: params || {}
    };

    that.$store.commit('toggleCurrentChannel', item.name);
    that.$router.push(tolink);
  },
  // [表单]
  // >> 验证
  // 登录用户输入合法性
  validateLogin(username, password) {
    let pattrnName = /^([a-zA-Z0-9]|[._]){4,11}$/;
    let pattrnPwd = /^[a-zA-Z0-9]{4,16}$/;

    if (username === '' || username === null || (password === '' || password === null)) {
      return Vue.CONSTSYU.LOGINALLERROR;
    }
    if (!pattrnName.test(username)) {
      return Vue.CONSTSYU.LOGINACCOUNTERROR;
    }
    if (!pattrnPwd.test(password)) {
      return Vue.CONSTSYU.LOGINPWDERROR;
    }
    return false;
  },
  // 用户修改登录密码相关
  // 验证输入的密码（旧/新/再次输入）
  // TIPSOLDPWD           '请输入您的旧密码'
  // TIPSNEWPWD           '请输入您的新密码'
  // UPDATEPWDSECERROR    '两次输入的密码不一致'
  // LOGINPWDERROR        '输入的密码格式不正确'
  // UPDATEOLDNEWERROR    '请输入不一样的新旧密码'
  validatePwd({ oldpwd, newpwd, confirmpwd }) {
    let pattrnPwd = /^[a-zA-Z0-9]{4,16}$/;

    if (oldpwd === '') {
      return Vue.CONSTSYU.TIPSOLDPWD;
    }
    if (newpwd === '') {
      return Vue.CONSTSYU.TIPSNEWPWD;
    }
    if (newpwd === oldpwd) {
      return Vue.CONSTSYU.UPDATEOLDNEWERROR;
    }
    if (newpwd !== confirmpwd) {
      return Vue.CONSTSYU.UPDATEPWDSECERROR;
    }
    if (!pattrnPwd.test(newpwd) || !pattrnPwd.test(oldpwd)) {
      return Vue.CONSTSYU.LOGINPWDERROR;
    }

    return false;
  },
  // >> 键盘操作
  // 按下回车键 提交表单
  // fn 函数名
  onEnter(id, fn) {
    let div = document.getElementById(id);

    if (div) {
      div.addEventListener('keyup', e => {
        let val = document.getElementsByName(id)[0].value;

        if (parseInt(e.keyCode, 10) === 13 && val) {
          fn();
        }
      });
    }
  },
  // 按下Tab建使得下一个文本框获取焦点
  onTab(id) {
    let fn = Vue.FNSYU;
    let i = 0;
    let el = document.getElementById(id);
    let input = document.getElementsByTagName('input');
    let length = input.length;

    if (el) {
      el.addEventListener('keyup', e => {
        if (parseInt(e.keyCode, 10) === 9) {
          if (i < length - 1) {
            i += 1;
          } else {
            i = 0;
          }
          fn.getFocus(input[i]);
        }
      });
    }
  },
  // 获取焦点
  getFocus(obj) {
    obj.focus();
  },
  // [基本方法]
  // >> 分页
  // arr: 数组  cur: 当前页码  size: 当前页条数
  getCurArr(arr, cur, size) {
    let start = (cur - 1) * size; // 开始的索引
    let end = cur * size; // 结束的索引

    return arr.slice(start, end);
  },
  // [获取总条数]
  geTotal(arr) {
    return arr.length || 1;
  },
  // >> 判断
  // 是否已输入搜索关键字
  isInputSearchKey(str) {
    let that = this;
    let ret = false;

    if (!str) {
      that.$message({
        type: 'warning',
        message: Vue.CONSTSYU.NOINPUTSEARCHKEY,
        customClass: 'yu-message'
      });
    } else {
      ret = true;
    }

    return ret;
  },
  // 是否已选中列表项
  isSelectedItem(arr) {
    let that = this;
    if (arr.length === 0) {
      that.$message({
        type: 'warning',
        message: that.$CONSTSYU.NOSELECTEDITEM,
        customClass: 'yu-message'
      });
      return false;
    }
    return true;
  },
  // 是否是数组
  isArray(arr) {
    return (
      !!arr &&
      typeof arr === 'object' &&
      typeof arr.length === 'number' &&
      typeof arr.splice === 'function'
      // !arr.propertyIsEnumerable('length')
    );
  },
  // >> 格式化
  // 显示数字，保留小数点后两位
  // 返回值的类型为String
  twoDecimal(num) {
    let f = parseFloat(num);

    if (f) {
      return '0.00';
    }

    return (Math.floor(f * 100) / 100).toFixed(2);
  },
  // 判断数字是否为保留小数点后2位的格式
  checkTwoDecimal(num) {
    let reg = /^(?:[1-9]\d*(?:\.\d{1,2})?|0\.(?:\d[1-9]|[1-9]\d))$/;
    return reg.test(num);
  },
  // 注册全局格式化方法
  // 处理日期时间 -> 格式化日期 精确至时分秒
  dateTotime(time) {
    // 返回处理后的值
    let datetime = new Date(parseInt(time, 10));
    let date = '';
    let year = datetime.getFullYear();
    let month = datetime.getMonth() + 1;
    let day = datetime.getDate();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let second = datetime.getSeconds();

    date = year + '年';
    date += (month < 10 ? '0' + month : month) + '月';
    date += (day < 10 ? '0' + day : day) + '日 ';
    date += (hour < 10 ? '0' + hour : hour) + ':';
    date += (minute < 10 ? '0' + minute : minute) + ':';
    date += second < 10 ? '0' + second : second;

    return date;
  },
  // 处理日期时间 -> 格式化日期 精确至日
  dateTodate(time) {
    // 返回处理后的值
    let datetime = new Date(parseInt(time, 10));
    let year = datetime.getFullYear();
    let month = datetime.getMonth() + 1;
    let day = datetime.getDate();
    let date = year + '年';

    date += (month < 10 ? '0' + month : month) + '月';
    date += (day < 10 ? '0' + day : day) + '日 ';

    return date;
  },
  // 处理日期时间 -> 格式化日期 如: 2017-07-26
  dateTodateline(time) {
    // 返回处理后的值
    let datetime = new Date(parseInt(time, 10));
    let line = '-';
    let year = datetime.getFullYear();
    let month = datetime.getMonth() + 1;
    let day = datetime.getDate();
    let date = year + line;

    date += (month < 10 ? '0' + month : month) + line;
    date += day < 10 ? '0' + day : day;

    return date;
  },
  // >> 过滤
  // 全局过滤器: 格式化显示数据
  setFilters() {
    // 注册全局过滤器
    Vue.filter('formatDateTime', time => this.$FNSYU.dateTotime(time));
    Vue.filter('formatDate', time => this.$FNSYU.dateTodate(time));
    Vue.filter('formatDateLine', time => this.$FNSYU.dateTodateline(time));
    Vue.filter('formatAmount', amount => this.$FNSYU.getAmount(amount));
  },
  // >> 封装element-ui
  // [Message]
  // 普通
  messageInfo(message = Vue.CONSTSYU.DATAINFO) {
    this.$message({
      type: 'info',
      message,
      customClass: 'yu-message'
    });
  },
  // 错误
  messageError(message = Vue.CONSTSYU.DATAERROR) {
    this.$message({
      type: 'error',
      message,
      customClass: 'yu-message'
    });
  },
  // 警告
  messageWarn(message = Vue.CONSTSYU.DATAWARNING) {
    this.$message({
      type: 'warning',
      message,
      customClass: 'yu-message'
    });
  },
  // 成功
  messageSuccess(message = Vue.CONSTSYU.DATASUCCESS) {
    this.$message({
      type: 'success',
      message,
      customClass: 'yu-message'
    });
  },
  // [Confirm]
  // 成功
  // 参数: 配置 opt
  // 方法: 点击【确认】 successfn
  //      点击【取消】 errorfn
  // 注意: 确认或取消的方法内不必return值
  confirmSuccess(opt = {}, successfn = null, errorfn = null) {
    let that = this;
    that
      .$confirm(opt.msg || Vue.CONSTSYU.CONFIRMSG, opt.title || Vue.CONSTSYU.CONFIRMTITLE, {
        type: 'success',
        roundButton: false,
        confirmButtonText: opt.yes || Vue.CONSTSYU.BUTTONCONFIRM,
        cancelButtonText: opt.cancel || Vue.CONSTSYU.BUTTONCANCEL
      })
      .then(() => {
        Vue.FNSYU.messageSuccess.apply(that, [opt.successmsg || Vue.CONSTSYU.CONFIRMSUCCESSMSG]);

        // console.log(successfn);
        // 点击【确认】
        if (successfn) {
          successfn.apply(that);
        }
      })
      .catch(() => {
        // console.log(errorfn);
        // 点击【取消】
        if (errorfn) {
          errorfn.apply(that);
        }
      });
  },
  // 警告
  // 参数: 配置 opt
  // 方法: 点击【确认】 successfn
  //      点击【取消】 errorfn
  // 注意: 确认或取消的方法内不必return值
  confirmWarn(opt = {}, successfn = null, errorfn = null) {
    let that = this;
    that
      .$confirm(opt.msg || Vue.CONSTSYU.CONFIRMSG, opt.title || Vue.CONSTSYU.CONFIRMTITLE, {
        type: 'warning',
        roundButton: false,
        confirmButtonText: opt.yes || Vue.CONSTSYU.BUTTONCONFIRM,
        cancelButtonText: opt.cancel || Vue.CONSTSYU.BUTTONCANCEL
      })
      .then(() => {
        Vue.FNSYU.messageSuccess.apply(that, [opt.successmsg || Vue.CONSTSYU.CONFIRMSUCCESSMSG]);

        // console.log(successfn);
        // 点击【确认】
        if (successfn) {
          successfn.apply(that);
        }
      })
      .catch(() => {
        // console.log(errorfn);
        // 点击【取消】
        if (errorfn) {
          errorfn.apply(that);
        }
      });
  },
  // 错误
  // 参数: 配置 opt
  // 方法: 点击【确认】 successfn
  //      点击【取消】 errorfn
  // 注意: 确认或取消的方法内不必return值
  confirmError(opt = {}, successfn = null, errorfn = null) {
    let that = this;
    that
      .$confirm(opt.msg || Vue.CONSTSYU.CONFIRMSG, opt.title || Vue.CONSTSYU.CONFIRMTITLE, {
        type: 'error',
        roundButton: false,
        confirmButtonText: opt.yes || Vue.CONSTSYU.BUTTONCONFIRM,
        cancelButtonText: opt.cancel || Vue.CONSTSYU.BUTTONCANCEL
      })
      .then(() => {
        Vue.FNSYU.messageSuccess.apply(that, [opt.successmsg || Vue.CONSTSYU.CONFIRMSUCCESSMSG]);

        // console.log(successfn);
        // 点击【确认】
        if (successfn) {
          successfn.apply(that);
        }
      })
      .catch(() => {
        // console.log(errorfn);
        // 点击【取消】
        if (errorfn) {
          errorfn.apply(that);
        }
      });
  }
};

let install = () => {
  Vue.FNSYU = FNSYU;
  Vue.prototype.$FNSYU = FNSYU;
};

export default {
  install
};
