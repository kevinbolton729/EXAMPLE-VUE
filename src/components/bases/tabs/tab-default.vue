<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="tab.label" :name="tab.value" v-for="tab in handlerData" :key="tab.value"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      // 当前激活的tab项
      activeName: this.tabsArr[0].value,
      // 渲染的tab项
      handlerData: []
    };
  },
  props: {
    tabsArr: {
      type: [Array],
      default() {
        return [
          {
            label: '全部',
            value: 'all'
          },
          {
            label: '收入',
            value: 'income'
          },
          {
            label: '支出',
            value: 'outlay'
          }
        ];
      }
    },
    tabsType: {
      type: [Number],
      default() {
        return -1;
      }
    },
    setInit: {
      type: [Boolean],
      default() {
        return false;
      }
    }
  },
  watch: {
    setInit: {
      // 根据setInit的值，初始化pageMenu
      handler() {
        this.initMenu();
      },
      deep: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMenu();
    });
  },
  methods: {
    // 初始化pageMenu
    initMenu() {
      let that = this;
      let n = 0;

      that.handlerData = [];

      if (that.tabsType === -1) {
        that.handlerData = that.tabsArr;
      } else {
        n = that.tabsType;
        that.handlerData.push(that.tabsArr[n]);
      }

      that.activeName = that.tabsArr[n].value;
      that.$emit('init-tabs', that.activeName);
    },
    handleClick(tab) {
      let that = this;
      let date = new Date();
      let params = {
        label: tab.label,
        value: tab.name,
        date: that.$FNSYU.dateTodateline(date.getTime())
      };

      that.$emit('toggle-tabs', params);
    }
  }
};
</script>
