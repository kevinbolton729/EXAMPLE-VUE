<template>
  <div>
    <handle-default @do-search="doSearch" @set-default="setDefault"></handle-default>
    <el-table :data="tableData" :default-sort="{
                    prop: 'opt4',
                    order: 'descending'
                }" :element-loading-text="CONSTSYU.DATALOADING" :empty-text="CONSTSYU.DATANOGET" v-loading="loading" style="width: 100%" ref="multipleTable" stripe tooltip-effect="dark" @selection-change="handleSelectionChange">
      <el-table-column prop="opt1" :label="tableOptins[0].label" show-overflow-tooltip label-class-name="yu-col-label-channel">
        <template slot-scope="scope">
          <p class="yu-col-text" v-cloak>{{ scope.row.opt1 }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="opt2" :label="tableOptins[1].label" show-overflow-tooltip label-class-name="yu-col-label-channel">
        <template slot-scope="scope">
          <p class="yu-col-text" v-cloak>{{ scope.row.opt2 + '(' + scope.row.opt5 + ')' }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="opt3" :label="tableOptins[2].label" show-overflow-tooltip label-class-name="yu-col-label-channel">
        <template slot-scope="scope">
          <p class="yu-col-text" v-cloak>{{ scope.row.opt3 }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="opt4" :label="tableOptins[3].label" width="150" show-overflow-tooltip label-class-name="yu-col-label-channel" sortable>
        <template slot-scope="scope">
          <p class="yu-col-text" v-cloak>{{ scope.row.opt4 }}</p>
        </template>
      </el-table-column>
      <el-table-column :label="CONSTSYU.TABLEHANDLER" width="200" show-overflow-tooltip label-class-name="yu-col-label-channel">
        <template slot-scope="scope">
          <el-button size="mini">
            <span class="yu-btn-edit" v-cloak>{{ CONSTSYU.BUTTONEDIT }}</span>
          </el-button>
          <el-button size="mini" type="danger">
            <span class="yu-btn-edit" v-cloak>{{ CONSTSYU.BUTTONRESETPWD }}</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="w3-section">
      <div class="w3-right">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="pageSelcetSizes" :page-size="pageSizes" layout="sizes, prev, pager, next" :total="totalNum">
        </el-pagination>
      </div>
    </div>
    <div class="w3-section lineSpac"></div>
  </div>
</template>

<script>
import handleDefault from '@/components/bases/others/handle-default';

export default {
  data() {
    return {
      // HTML中使用CONSTSYU
      CONSTSYU: this.$CONSTSYU,
      // 表格
      currentPage: this.$CONSTSYU.PAGINATIONDEFAULTCUR, // 当前页
      pageSizes: this.$CONSTSYU.PAGINATIONDEFAULTSIZES, // 当前页显示的条数
      pageSelcetSizes: this.$CONSTSYU.PAGINATIONDEFAULTSELECTSIZES, // 可选择的当前页条数，其中1项须等于pageSizes的值
      totalNum: this.$CONSTSYU.PAGINATIONDEFAULTTOTALNUM, // 总条数
      tableData: [], // 显示的表格数据的数组
      handlerData: [], // 存储待操作的数组
      filterData: [], // 存储筛选/查找前的数组
      multipleSelection: [] // 存储已选中的项的数组
    };
  },
  props: {
    // 存储待操作的数组
    originalData: {
      type: [Array],
      default() {
        return [];
      }
    },
    // 存储表格列表项的数组
    tableOptins: {
      type: [Array],
      default() {
        return [];
      }
    },
    // 表格局部加载状态
    loading: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  watch: {
    // 监听originalData
    // 初始化
    originalData: {
      handler() {
        this.handlerData = this.originalData;
        this.gotoPage(this.currentPage);
      },
      deep: false
    }
  },
  components: { handleDefault },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSizes = val;
      this.gotoPage(this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.gotoPage(this.currentPage);
    },
    gotoPage(currentPage) {
      let that = this;
      let fn = that.$FNSYU;

      that.tableData = fn.getCurArr(
        that.handlerData,
        currentPage,
        that.pageSizes
      );
      that.totalNum = fn.geTotal(that.handlerData);
    },
    // 根据关键字key，搜索数组
    searchArr(key) {
      let that = this;
      let fn = that.$FNSYU;

      // 搜索关键字
      if (fn.isInputSearchKey.apply(that, [key])) {
        key = key.toUpperCase();
        // 筛选出匹配输入框字符串的结果,并传至新数组
        if (key !== '') {
          // 每次搜索前，先初始化handlerData数组的值
          that.setInit();

          that.filterData = that.handlerData;
          that.handlerData = that.handlerData.filter(function filteRun(item) {
            return (
              item.opt2.toUpperCase().indexOf(key) !== -1 ||
              item.opt5.toUpperCase().indexOf(key) !== -1
            );
          });
          that.gotoPage(that.currentPage);
        }
      }
    },
    // 初始化table-default.vue
    setInit() {
      let that = this;

      that.filterData = [];
      that.tableData = [];
      that.multipleSelection = [];
      that.handlerData = that.originalData;
    },
    // 将相关数组设为初始值，并返回至当前页
    setDefault() {
      let that = this;

      that.setInit();
      that.gotoPage(that.currentPage);
    },
    // 触发搜索事件
    doSearch(val) {
      let that = this;

      //                console.log(val);
      that.searchArr(val.searchKey);
    }
  }
};
</script>