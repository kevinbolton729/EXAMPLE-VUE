/*
 * @Author: Kevin Bolton
 * @Date: 2017-12-06 23:19:03
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2017-12-13 20:53:51
 */
import Vue from 'vue';
import store from './store';
import router from './router';
import App from './App';
import Fns from './common/fns';
import Consts from './common/consts/';
// 引入封装的axios模块
import { reqInterceptor, resInterceptor } from '@/http';

// [测试数据]
// 引入Mock.js
import '@/mock';

// 加载组件模块
// --> Fns
Vue.use(Fns);
// --> Consts
Vue.use(Consts);

// 生成环境下，是否关闭提示Tip
Vue.productionTip = false;

let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

// 注册全局日期格式化方法
Vue.FNSYU.setFilters.apply(vm);
// 全局拦截HTTP请求
reqInterceptor.apply(vm);
// 全局拦截HTTP响应
resInterceptor.apply(vm);
