<template>
  <div>
    <el-dialog :title="CONSTSYU.DIALOGDELIVERY" :modal-append-to-body="false" :visible.sync="dialogVisible" :before-close="closeBeforeDialog">
      <el-form :model="formDialog" ref="formDialog" label-width="120px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="选择公司">
              <el-select v-model="selectForm.select1" filterable clearable placeholder="请选择公司">
                <el-option v-for="item in selectForm.options1" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="MAC地址(开始)">
              <el-input :placeholder="CONSTSYU.DIALOGFIELDSMAC"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="MAC地址(结束)">
              <el-input :placeholder="CONSTSYU.DIALOGFIELDSMAC"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="设备数量(个)">
          <p class="yu-col-text yu-font-num" v-cloak>1</p>
          <!--<el-input-number v-model="numberForm.value" controls-position="right" :step="5" :min="1"></el-input-number>-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row>
          <el-col :span="24">
            <el-button type="primary" @click="editDialog" v-cloak>{{ CONSTSYU.BUTTONSAVE }}</el-button>
            <!--<el-button type="primary" disabled v-cloak>{{ CONSTSYU.BUTTONSAVE }}</el-button>-->
            <!--<el-button type="primary" v-show="!isHandler.isClick" disabled>{{ CONSTSYU.BUTTONHANDLELOADING }}</el-button>-->
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 编辑Dialog
      dialogVisible: false,
      // HTML中使用CONSTSYU
      CONSTSYU: this.$CONSTSYU,
      // inputNumber计数器
      numberForm: {
        value: 50
      },
      // Select选择器
      selectForm: {
        select1: '',
        options1: [
          {
            value: '常熟市天然气有限公司',
            label: '常熟市天然气有限公司'
          },
          {
            value: '成都市天然气有限公司',
            label: '成都市天然气有限公司'
          },
          {
            value: '宜宾市天然气有限公司',
            label: '宜宾市天然气有限公司'
          }
        ]
      },
      // 编辑表单
      formDialog: {},
      dialogLabelWidth: '80px'
    };
  },
  props: {
    // Dialog
    isDialog: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  components: {},
  watch: {
    // 是否显示Dialog
    isDialog: {
      handler() {
        let that = this;

        that.dialogVisible = that.isDialog;
      },
      deep: false
    }
  },
  methods: {
    // 编辑栏目
    // 关闭Dialog
    closeDialog() {
      this.$emit('close-dialog');
    },
    closeBeforeDialog(done) {
      this.closeDialog();
      done();
    },
    // 确认并关闭Dialog
    editDialog() {
      // 点击【确认】按钮
      this.$emit('edit-dialog');
    }
  }
};
</script>
