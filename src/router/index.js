/*
 * @Author: Kevin Bolton
 * @Date: 2017-12-06 23:18:02
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2017-12-13 20:54:53
 */
import Vue from 'vue';
import Router from 'vue-router';
// 引入页面(.vue)
const MINDEX = require('@/pages/index');
const MLOGIN = require('@/pages/login');
const MPAGETABLES = require('@/pages/page-tables');
const MPAGEFORMS = require('@/pages/page-forms');
const MUSERSECURITY = require('@/pages/user-security');
const M404 = require('@/pages/404');
// 按需加载异步(页面)组件
// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
let index = resolve => {
  require.ensure(
    [],
    () => {
      resolve(MINDEX);
    },
    'Group-1'
  );
};
let login = resolve => {
  require.ensure(
    [],
    () => {
      resolve(MLOGIN);
    },
    'Group-1'
  );
};
let pageTables = resolve => {
  require.ensure(
    [],
    () => {
      resolve(MPAGETABLES);
    },
    'Group-2'
  );
};
let pageForms = resolve => {
  require.ensure(
    [],
    () => {
      resolve(MPAGEFORMS);
    },
    'Group-3'
  );
};
let userSecurity = resolve => {
  require.ensure(
    [],
    () => {
      resolve(MUSERSECURITY);
    },
    'Group-3'
  );
};
let error404 = resolve => {
  require.ensure(
    [],
    () => {
      resolve(M404);
    },
    'Group-4'
  );
};

Vue.use(Router);

let router = new Router({
  // mode: 'history',
  mode: 'hash',
  routes: [
    {
      // 捕获404错误，并跳转至404页面
      path: '*',
      redirect: { name: '404' }
    },
    {
      path: Vue.CONSTSYU.PREFIXROUTER + '/',
      component: index,
      children: [
        {
          // 定义404页面路由
          name: '404',
          path: '404',
          component: error404
        },
        {
          name: 'table',
          path: 'table',
          component: pageTables
        },
        {
          name: 'form',
          path: 'form',
          component: pageForms
        },
        {
          name: 'user-security',
          path: 'user-security',
          component: userSecurity
        }
      ]
    },
    {
      path: Vue.CONSTSYU.PREFIXROUTER + '/login',
      component: login
    }
  ],
  scrollBehavior: (to, from, savePosition) => savePosition || { x: 0, y: 0 }
});

router.beforeEach((to, from, next) => {
  // 全局导航钩子
  // ...
  next();
});

export default router;
