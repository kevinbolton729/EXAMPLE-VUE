/*
 * @Author: Kevin Bolton
 * @Date: 2017-12-06 23:18:31
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2017-12-13 20:54:42
 */
import Vue from 'vue';
import Fns from '@/common/fns';
import Consts from '@/common/consts/';

// 加载自定义插件Fn: 自定义公共方法
Vue.use(Fns);
// 加载自定义插件Consts: 自定义常量
Vue.use(Consts);

// 定义YUCHANNELDATA
const YUCHANNELDATA = {
  // 数据及参数
  state: {
    channelists: [
      {
        status: true,
        message: '',
        extData: [
          {
            name: '组件',
            child: [{ name: '表格 Table', url: 'table' }, { name: '表单 Form', url: 'form' }],
            icon: '\ue67f'
          },
          {
            name: '用户中心',
            child: [{ name: '修改密码', url: 'user-security' }],
            icon: '\ue625'
          }
        ]
      }
    ]
  },
  // 取得数据
  getters: {
    getChanneLists: state => state.channelists
  },
  // 异步处理数据(不直接操作state)
  // {commit,state}为结构赋值，其实是Vuex整体的属性context对象里面的commit和state
  actions: {},
  // 同步处理数据
  mutations: {}
};

export default YUCHANNELDATA;
