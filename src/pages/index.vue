<template>
  <div>
    <menu-lists :left="true" :right="false"></menu-lists>
    <header-top :nickname="nickname"></header-top>
    <div class="w3-container page-width">
      <div class="index">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import menuLists from '@/components/multiples/menu-lists';
import headerTop from '@/components/multiples/header-top';

export default {
  data() {
    return {
      // DOM初始化赋值
      index: '.index',
      // 用户昵称
      nickname: ''
    };
  },
  computed: {
    getLayoutStatus() {
      return this.$store.getters.getLayoutStatus;
    }
  },
  components: {
    menuLists,
    headerTop
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    next(vm => {
      // 通过 `vm` 访问组件实例
      // 通过cookie判断用户登录状态
      // 未登录时，跳转至登录页
      // 登录时，从cookie中获取登录用户的nickname
      //                let cookie = vm.$FNSYU.checkUserCookie.apply(vm);
      //                vm.$data.nickname = cookie && cookie.nickname;
      vm.$data.nickname = '鱼子酱';
      // 初始化数据
      //                vm.m_initData();
    });
  },
  watch: {
    getLayoutStatus: {
      handler() {
        let that = this;
        let fn = that.$FNSYU;
        fn.toggleMarginLeft(that.index, that.getLayoutStatus.isClose);
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      let that = this;
      let fn = that.$FNSYU;
      fn.toggleMarginLeft(that.index, that.getLayoutStatus.isClose);
    });
  }
};
</script>

<style scoped>
/*基本*/
.page-width {
  min-width: 600px;
  padding-top: 48px;
}
.index {
  margin-left: 36px;
  display: block;
  overflow: hidden;
}
.index {
  /*过渡效果*/
  -webkit-transition: margin-left 500ms ease-out;
  -moz-transition: margin-left 500ms ease-out;
  -ms-transition: margin-left 500ms ease-out;
  -o-transition: margin-left 500ms ease-out;
  transition: margin-left 500ms ease-out;
}
</style>