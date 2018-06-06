/*
 * @Author: Kevin Bolton
 * @Date: 2017-12-06 23:17:22
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2017-12-13 20:55:28
 */
// 回调处理函数
// 模拟接口/loginon
function postLogin(res) {
  let data = res.body;
  let status = 1;
  let message = '登录系统成功';
  let count = 0;
  let resData = [];

  // console.log(data);

  if (data === 'username=kevin&pwd=45af75a8aa4bbbe57c814d9c93397d50') {
    count = 1;
  } else {
    message = '对不起！账号或密码错误';
  }

  return {
    status,
    message,
    extData: {
      count,
      data: resData
    }
  };
}

// 模块输出
export default {
  postLogin
};
