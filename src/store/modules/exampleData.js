/*
 * @Author: Kevin Bolton
 * @Date: 2017-12-06 23:18:43
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2017-12-13 20:54:43
 */
import Vue from 'vue';
import Fns from '@/common/fns';
import Consts from '@/common/consts/';

// 加载自定义插件Fn: 自定义公共方法
Vue.use(Fns);
// 加载自定义插件CONSTSYU: 自定义常量
Vue.use(Consts);

// 定义YUEXAMPLEDATA
const YUEXAMPLEDATA = {
  // 数据及参数
  state: {
    exampleurl: 'api/getExampleLists',
    examplelists: [],
    exampleparams: {}
  },
  // 取得数据
  getters: {
    getExampleLists: state => state.examplelists
  },
  // 异步处理数据(不直接操作state)
  // {commit,state}为结构赋值，其实是Vuex整体的属性context对象里面的commit和state
  actions: {},
  // 同步处理数据
  mutations: {}
};

export default YUEXAMPLEDATA;
