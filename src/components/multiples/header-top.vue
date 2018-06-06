<template>
  <div>
    <div class="header-bg"></div>
    <div class="w3-container w3-border-bottom header-top-bg">
      <div class="header-top header-close w3-left">
        <a href="javascript:;" class="w3-tiny" @click="toggleClose('.menu')" v-show="getLayoutStatus.isClose" v-cloak>
          <i class="iconfont w3-tiny">&#xe60b;</i>{{ CONSTSYU.BUTTONCLOSESIDEBAR }}</a>
      </div>
      <div class="header-top header-nav w3-right">
        <a href="javascript:;" v-cloak>
          <i class="iconfont">&#xe642;</i>{{ nickname }}</a>
        <a href="javascript:;" @click="confirmLogout" v-cloak>
          <i class="iconfont">&#xe615;</i>{{ CONSTSYU.BUTTONLOGOUT }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // DOM初始化赋值
      headertop: '.header-top',
      // HTML中使用CONSTSYU
      CONSTSYU: this.$CONSTSYU
    };
  },
  props: {
    nickname: {
      type: [String],
      default() {
        return this.$CONSTSYU.DATADEFAULTUSER;
      }
    }
  },
  computed: {
    getLayoutStatus() {
      return this.$store.getters.getLayoutStatus;
    }
  },
  watch: {
    getLayoutStatus: {
      handler() {
        let that = this;
        let fn = that.$FNSYU;
        fn.toggleMarginLeft($(that.headertop), that.getLayoutStatus.isClose);
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      let that = this;
      let fn = that.$FNSYU;
      fn.toggleMarginLeft($(that.headertop), that.getLayoutStatus.isClose);
    });
  },
  methods: {
    toggleClose(node) {
      let that = this;
      let fn = that.$FNSYU;

      that.$store.commit('updateLayoutStatus');
      fn.toggleWidth(node, that.getLayoutStatus.isClose);
    },
    confirmLogout() {
      let that = this;
      let fn = that.$FNSYU;
      let opts = {
        // 确认标题
        title: that.$CONSTSYU.CONFIRMTITLE,
        // 提示信息内容
        msg: that.$CONSTSYU.CONFIRMSGLOGOUT,
        // 点击【确认】后的Message内容
        successmsg: that.$CONSTSYU.SUCCESSLOGOUT,
        // 【确认】按钮文本
        yes: that.$CONSTSYU.BUTTONCONFIRMLOGOUT,
        // 【取消】按钮文本
        cancel: that.$CONSTSYU.BUTTONCANCEL
      };

      // 确认退出
      fn.confirmWarn.apply(that, [
        opts,
        function warnFn() {
          // that.$cookies.remove(that.$CONSTSYU.COOKIEUSERNAME);
          setTimeout(() => {
            // 跳转至登录页
            fn.gotoLogin.apply(that);
          }, 3000);
        }
      ]);
    }
  }
};
</script>

<style scoped>
/*颜色*/
.header-bg {
  background-color: #fff;
}
.header-top a:hover {
  color: #666;
}

/*字体*/
.header-top a i {
  font-size: 16px;
}

/*基本*/
.header-top {
  margin-left: 36px;
  display: block;
  overflow: hidden;
}
.header-bg,
.header-top-bg {
  min-width: 600px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.header-bg {
  height: 32px;
  line-height: 32px;
  opacity: 0.9;
  z-index: 997;
}
.header-top-bg {
  z-index: 998;
}
.header-close a {
  padding-left: 12px;
}
.header-nav a {
  padding-left: 20px;
}
.header-top a {
  padding-right: 12px;
  height: 32px;
  line-height: 32px;
  display: inline-block;
  position: relative;
}
.header-top a:hover {
  opacity: 0.7;
}
.header-top a i {
  position: absolute;
  left: 0px;
}
.header-nav a i {
  top: 0px;
}
.header-close a i {
  top: 1px;
}
</style>