<template>
  <div>
    <div class="w3-container w3-center yu-error">
      <p class="iconfont yu-error-icon">&#xe6b2;</p>
      <p class="yu-theme-color yu-error-span">页面是被外星人拐跑了吗？</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // HTML中使用CONSTSYU
      CONSTSYU: this.$CONSTSYU
    };
  }
};
</script>

<style scoped>
/* 颜色 */
.yu-error {
  color: #cbcbcb;
}

/* 字体 */
.yu-error-icon {
  font-size: 64px;
}
.yu-error-span {
  font-size: 16px;
}

/* 基础 */
.yu-error {
  padding-top: 15%;
}
.yu-error p {
  line-height: 160%;
}
</style>