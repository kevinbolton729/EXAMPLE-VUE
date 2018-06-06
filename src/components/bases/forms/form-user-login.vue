<template>
  <div>
    <div class="yu-mask"></div>
    <div class="yu-login">
      <div class="yu-theme yu-logo">
        <span class="iconfont">&#xe642;</span>
      </div>
      <div class="yu-theme-color yu-theme-borderbottom-color yu-log-tab">
        <span class="yu-theme-color yu-theme-borderbottom-color yu-log-on" v-cloak>{{ CONSTSYU.BUTTONLOGIN }}</span>
      </div>
      <div class="w3-section">
        <el-alert v-show="!isCommit" :title="message" :closable="false" type="error" show-icon>
        </el-alert>
      </div>
      <div class="w3-section">
        <el-form id="loginForm" ref="loginForm" :model="loginForm">
          <el-form-item prop="useraccount">
            <el-input name="account" type="text" :autofocus="true" size="large" :placeholder="CONSTSYU.TIPSLOGINACCOUNT" v-model="loginForm.useraccount">
            </el-input>
          </el-form-item>
          <el-form-item prop="userpwd">
            <el-input id="password" name="password" type="password" size="large" :placeholder="CONSTSYU.TIPSLOGINPWD" v-model="loginForm.userpwd">
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="yu-theme-bgcolor yu-login-confirm" @click="loginOn" v-show="isClick">
              <span v-cloak>{{ CONSTSYU.BUTTONLOGIN }}</span>
            </div>
            <div class="yu-no-click" v-show="!isClick">
              <span v-cloak>{{ CONSTSYU.BUTTONLOGINLOADING }}</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // DOM初始化赋值
      login: '.yu-login',
      // HTML渲染时，使用常量
      CONSTSYU: this.$CONSTSYU,
      loginForm: {
        useraccount: '',
        userpwd: ''
      },
      key: this.$CONSTSYU.COOKIEUSERNAME,
      isCommit: true,
      isClick: true,
      message: this.$CONSTSYU.LOGINDEFAULTERROR
    };
  },
  activated() {
    this.getFocus();
  },
  mounted() {
    this.$nextTick(() => {
      let that = this;
      let fn = this.$FNSYU;

      fn.getPos(that.login);

      // 浏览器窗口大小发生改变时，重新获取元素对象位置，并在屏幕居中
      $(window).resize(() => {
        fn.getPos(that.login);
      });

      that.getFocus();
      fn.onEnter.apply(that, ['password', that.loginOn]);
      fn.onTab.apply(that, ['loginForm']);
    });
  },
  methods: {
    loginOn() {
      let that = this;
      let fn = this.$FNSYU;
      let menulists = that.$store.getters.getChanneLists[0].extData;
      let item = menulists[0].child[0];
      let index = 0;
      let fnAjax = fn.ajax();
      let account = document.getElementsByName('account')[0].value;
      let password = document.getElementsByName('password')[0].value;
      let validater = fn.validateLogin(account, password);
      let data = {
        username: account,
        pwd: fn.setMd5(password)
      };

      that.isClick = false;
      that.loginForm.userpwd = '';

      if (!validater) {
        fnAjax
          .fetchLogin(data)
          .then(res => {
            let dt = res.data;
            //                            console.log(dt);

            // 判断是否成功登陆
            if (dt.extData.count) {
              // 登录成功
              fn.messageSuccess.apply(that, [dt.message]);

              setTimeout(() => {
                that.isClick = true;
                // 跳转至系统首页
                fn.gotoDefault.apply(that);
                fn.toggleMenu.apply(that, [{ item, index }]);
              }, 3000);
            } else {
              // 账号或密码错误
              fn.messageWarn.apply(that, [dt.message]);

              setTimeout(() => {
                that.isClick = true;
              }, 3000);
            }
          })
          .catch(() => {
            fn.messageError.apply(that, [that.$CONSTSYU.DATAERROR]);
            that.isClick = true;
          });
      } else {
        that.message = validater;
        that.isCommit = false;

        setTimeout(() => {
          that.isClick = true;
          that.isCommit = true;
        }, 3000);
      }
    },
    getFocus() {
      let that = this;
      let fn = that.$FNSYU;
      let input = document.getElementsByTagName('input');

      fn.getFocus(input[0]);
    }
  }
};
</script>

<style scoped>
/*字体*/
.yu-log-tab span,
.yu-login-confirm span,
.yu-no-click span {
  font-size: 18px;
}
.yu-logo span {
  font-size: 42px;
}

/*颜色*/
.yu-log-tab {
  border-bottom: 1px solid #efefef;
}
.yu-log-tab span {
  color: #999;
}
.yu-login-confirm span {
  color: #fff;
}
.yu-no-click {
  border: 1px solid #dfdfdf;
  background-color: #efefef;
}
.yu-no-click span {
  color: #bfbfbf;
}
.yu-mask {
  background: #fafafa center bottom repeat-y;
}

/*基本*/
.yu-mask {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
.yu-log-tab {
  text-align: center;
  margin-top: -18px;
  margin-bottom: 24px;
  padding: 12px 0px;
  display: block;
}
.yu-log-tab span {
  padding: 0px 36px 12px 36px;
  cursor: pointer;
}
.yu-login {
  width: 360px;
  height: 360px;
  display: block;
}
.yu-login-confirm {
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
  display: block;
  cursor: pointer;
}
.yu-login-confirm:hover {
  opacity: 0.8;
}
.yu-no-click {
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
  display: block;
}
.yu-logo {
  text-align: center;
  display: block;
}
</style>