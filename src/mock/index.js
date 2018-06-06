/*
 * @Author: Kevin Bolton
 * @Date: 2017-12-06 23:17:12
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2017-12-13 20:55:34
 */
import Vue from 'vue';
import Mock from 'mockjs';
// 加载接口处理模块
import api from '@/mock/modules/api';
// 加载接口处理模板
import tpl from '@/mock/modules/template';

// Mock配置
// 单位: 毫秒
Mock.setup({
  timeout: '50-1500'
});

// Method: POST
// 登录Login
Mock.mock(Vue.CONSTSYU.PREFIXURL + '/loginon', 'post', api.postLogin);

// Method: GET
// 获取表格数据
Mock.mock(Vue.CONSTSYU.PREFIXURL + '/table', 'get', tpl.tableTemplate);
