<template>
  <div class="handle-quote w3-container w3-section w3-leftbar w3-border-sand w3-justify">
    <el-form ref="formDatas" :model="formDatas" label-width="50px">
      <el-row>
        <el-col :xs="12" :sm="14" :md="17" :lg="19" :xl="21">
          <el-form-item class="w3-left" label="查询:">
            <el-input class="handle-input" :placeholder="CONSTSYU.TIPSEARCH" :autofocus="true" @focus="getFocus" v-model="formDatas.searchKey"></el-input>
          </el-form-item>
          <el-form-item class="w3-left" label="日期:">
            <el-date-picker v-model="formDatas.selectDatetime" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="w3-left">
            <el-button class="w3-left" type="primary" @click="dosearch">查询</el-button>
            <el-button class="w3-left" @click="setdefault">重置</el-button>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="10" :md="7" :lg="5" :xl="3">
          <el-form-item class="w3-right">
            <el-button class="w3-left">打印</el-button>
            <el-button class="w3-left" type="primary">添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // HTML中使用CONSTSYU
      CONSTSYU: this.$CONSTSYU,
      // 表单组件
      formDatas: {
        // 搜索关键字
        searchKey: '',
        // 日期组件
        selectDatetime: ''
      }
    };
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    dosearch() {
      this.$emit('do-search', this.formDatas);
    },
    setdefault() {
      this.formDatas.searchKey = '';
      this.formDatas.selectDatetime = '';
      this.$emit('set-default');
    },
    getFocus() {
      this.formDatas.searchKey = '';
    }
  }
};
</script>

<style scoped>
/*颜色*/
.handle-quote {
  background-color: #fff;
}

/*基本*/
.handle-quote {
  padding-top: 16px;
  line-height: 150%;
}
.handle-input {
  width: 200px;
}
</style>