/*
 * @Author: Kevin Bolton
 * @Date: 2017-12-06 23:19:10
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2017-12-13 20:53:16
 */
// -- 第三方扩展组件(插件) --
import Vue from 'vue';
// 引入vue-cookies
import VueCookies from 'vue-cookies';

// 引入静态资源文件
import '../static/css/w3';
import '../static/css/fonts/iconfont';
import '../static/js/jquery-1.12.4.min';
// import '../static/js/jquery-1.12.4';

// 加载组件模块
// --> vue-cookies
Vue.use(VueCookies);
