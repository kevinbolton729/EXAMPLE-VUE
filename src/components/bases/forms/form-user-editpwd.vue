<template>
  <div class="group-input">
    <div class="w3-section">
      <el-alert :title="message" :closable="false" v-show="!isCommit" type="error" show-icon>
      </el-alert>
    </div>
    <el-form id="securityForm" ref="securityForm" :model="securityForm">
      <el-form-item prop="oldpwd">
        <el-input name='oldpwd' type="password" :autofocus="true" v-model.trim="securityForm.oldpwd" :placeholder="CONSTSYU.TIPSOLDPWD">
          <el-button slot="prepend">
            <i class="iconfont yu-theme-icon">&#xe64a;</i>
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="newpwd">
        <el-input name='newpwd' type="password" v-model.trim="securityForm.newpwd" :placeholder="CONSTSYU.TIPSNEWPWD">
          <el-button slot="prepend">&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmpwd">
        <el-input id="confirmpwd" name='confirmpwd' type="password" v-model.trim="securityForm.confirmpwd" :placeholder="CONSTSYU.TIPSECONDPWD">
          <el-button slot="prepend">&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="border-bottom"></div>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('securityForm')" v-cloak>{{ CONSTSYU.BUTTONRESET }}</el-button>
        <el-button type="primary" @click="onSubmit" v-show="isClick" v-cloak>{{ CONSTSYU.BUTTONSAVE }}</el-button>
        <el-button type="primary" v-show="!isClick" :disabled="!isClick" v-cloak>{{ CONSTSYU.BUTTONSAVE }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      securityForm: {
        oldpwd: '',
        newpwd: '',
        confirmpwd: ''
      },
      // HTML中使用CONSTSYU
      CONSTSYU: this.$CONSTSYU,
      // 修改登录密码
      isCommit: true,
      message: this.$CONSTSYU.TIPSOLDPWD,
      isClick: true
    };
  },
  activated() {
    this.getFocus();
  },
  mounted() {
    this.$nextTick(() => {
      let that = this;
      let fn = that.$FNSYU;

      fn.onEnter.apply(that, ['confirmpwd', that.onSubmit]);
      fn.onTab.apply(that, ['securityForm']);
    });
  },
  methods: {
    onSubmit() {
      let that = this;
      let fn = that.$FNSYU;
      let oldpwd = document.getElementsByName('oldpwd')[0].value;
      let newpwd = document.getElementsByName('newpwd')[0].value;
      let confirmpwd = document.getElementsByName('confirmpwd')[0].value;
      let validater = fn.validatePwd({ oldpwd, newpwd, confirmpwd });

      that.isClick = false;
      that.securityForm.newpwd = '';
      that.securityForm.confirmpwd = '';

      if (!validater) {
        // 输入验证成功时
        // ……
        that.securityForm.oldpwd = '';
        fn.messageSuccess.apply(that, [that.CONSTSYU.SUCCESSEDITPWD]);

        // 处理结束后
        setTimeout(() => {
          that.isClick = true;
          that.isCommit = true;
          // 跳转至登录页
          fn.gotoLogin.apply(that);
        }, 3000);
      } else {
        that.message = validater;
        that.isCommit = false;

        setTimeout(() => {
          that.isClick = true;
          that.isCommit = true;
        }, 3000);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
/*基本*/
.group-input {
  padding-left: 30%;
  padding-right: 30%;
  padding-top: 32px;
}
</style>