<template>
  <div>
    <channel-top></channel-top>
    <div class="w3-section">
      <tab-default></tab-default>
    </div>
    <div class="w3-section">
      页面内容...
    </div>
  </div>
</template>

<script>
import channelTop from '@/components/bases/others/channel-top';
import tabDefault from '@/components/bases/tabs/tab-default';

export default {
  data() {
    return {
      // HTML中使用CONSTSYU
      CONSTSYU: this.$CONSTSYU,
      // 局部加载状态
      loading: true,
      // 数据
      originalData: [], // 存储原始数组
      handlerData: [] // 存储待操作的数组
    };
  },
  components: {
    channelTop,
    tabDefault
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    next(vm => {
      // 通过 `vm` 访问组件实例
      // 初始化

      // 通过cookie判断用户登录状态
      // 未登录时，跳转至登录页
      //                vm.$FNSYU.checkUserCookie.apply(vm);
      // 获取页面初始数据，并存储至变量originalData
      vm.getOriginalData.apply(vm);
    });
  },
  methods: {
    // 通过ajax请求，获取数据
    getOriginalData() {
      let that = this;

      that.loading = true;

      //                setTimeout(() => {
      //                    that.loading = false;
      //                    console.log('page-default: 获取数据');
      //                }, 1500);

      // 获取用户数据
      //                fnAjax.getTables()
      //                    .then((res) => {
      //                        let dt = res.data;
      //
      //                        if (dt.status === 1) {
      //                            // console.log(dt.extData.data);
      //                            that.originalData =  dt.extData.data;
      //                        }else {
      //                            fn.messageWarn.apply(that, [dt.message]);
      //                        }
      //
      //                        that.loading = false;
      //                    })
      //                    .catch((err) => {
      //                        let dt = err.data;
      //                        fn.messageError.apply(that, [that.$CONSTSYU.DATAERROR]);
      //                        that.loading = false;
      //                    })
    }
  }
};
</script>