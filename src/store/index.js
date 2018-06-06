/*
 * @Author: Kevin Bolton
 * @Date: 2017-12-06 23:18:14
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2017-12-13 20:54:37
 */
import Vue from 'vue';
import Vuex from 'vuex';
import channelData from '@/store/modules/channelData';
import Consts from '@/common/consts';
// 加载自定义插件Consts: 自定义常量
Vue.use(Consts);

// 加载Vuex
Vue.use(Vuex);

export default new Vuex.Store({
  // 数据模型分组
  modules: {
    channelData
  },
  // 全局设置
  // 数据及参数
  state: {
    layoutstatus: {
      isClose: true
    },
    currentchannel: {
      name: Vue.CONSTSYU.DEFAULTINDEX,
      info: null
    }
  },
  // 取得数据
  getters: {
    getLayoutStatus: state => state.layoutstatus,
    getCurrentChannel: state => state.currentchannel
  },
  // 异步处理数据(不直接修改state)
  actions: {},
  // 同步处理数据
  mutations: {
    updateLayoutStatus(state) {
      state.layoutstatus.isClose = !state.layoutstatus.isClose;
    },
    toggleCurrentChannel(state, payload) {
      state.currentchannel.name = payload;
    }
  }
});
