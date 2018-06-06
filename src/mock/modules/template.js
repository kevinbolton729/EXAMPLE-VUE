/*
 * @Author: Kevin Bolton
 * @Date: 2017-12-06 23:17:39
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2017-12-13 20:55:29
 */
// Mock返回template模板
// count = parseInt(Math.floor(Math.random()*500), 10) || 5
let count = 26;
let str = 'data|' + count;
let tableTemplate = {
  status: 1,
  message: '获取数据成功',
  extData: { count }
};

// 默认
tableTemplate.extData[str] = [
  {
    opt1: '@guid()',
    opt2: '@last()',
    opt3: '@province()/@city()',
    opt4: '@datetime()',
    opt5: '@cname()'
  }
];

// 模块输出
export default {
  tableTemplate
};
