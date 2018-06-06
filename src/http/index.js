/**
 * @Author: Kevin Bolton
 * @Date: 2017-12-06 23:16:54
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2017-12-13 20:55:40
 */
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

// axios 全局默认配置
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 30000;

// axios 拦截设置
// 拦截请求
export function reqInterceptor() {
  let that = this;
  // 验证用户的登录状态的白名单，白名单内的请求接口不验证
  // nocheck = [Vue.CONSTSYU.PREFIXURL + "/loginon"],
  // isCheck = true;

  axios.interceptors.request.use(
    config => {
      // 判断请求的地址是否在白名单内
      // nocheck.map((item) => {
      //     if (item === config.url) {
      //         isCheck = false;
      //     }
      // });

      // if (isCheck) {
      //     // 验证用户的登录状态，如未登录给出登录提示
      //     Vue.FNSYU.checkUserCookie.apply(that);
      // }

      // POST 请求时，传参序列化
      if (config.method === 'post') {
        config.data = qs.stringify(config.data);
        // console.log(config.data);
      }

      return config;
    },
    error => {
      setTimeout(() => {
        // 请求出错时
        // Vue.FNSYU.messageError.apply(that);
        Vue.FNSYU.messageError.apply(that);
      }, parseInt('1500', 10));
      return Promise.reject(error);
    }
  );
}

// 拦截响应
export function resInterceptor() {
  let that = this;

  axios.interceptors.response.use(
    res => {
      let dt = res.data;
      let restatus = res.status;
      let datastatus = dt.status;
      let message = dt.message;

      if (restatus !== parseInt('200', 10) || datastatus !== 1) {
        // 未成功获取数据时
        Vue.FNSYU.messageError.apply(that, [message]);
      }

      return res;
    },
    error => {
      setTimeout(() => {
        // 响应出错时
        Vue.FNSYU.messageError.apply(that);
      }, parseInt('1500', 10));
      return Promise.reject(error);
    }
  );
}

// axios 封装设置
const AXIOS_METHOD = {
  // GET 请求
  get(url, params) {
    return new Promise((resolve, reject) => {
      if (url === '') {
        reject(Vue.CONSTSYU.ERRORREQNOURL);
      } else {
        axios({
          url,
          params,
          method: 'GET',
          responseType: 'json'
        })
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  },
  // POST 请求
  post(url, data) {
    return new Promise((resolve, reject) => {
      if (url === '') {
        reject(Vue.CONSTSYU.ERRORREQNOURL);
      } else {
        axios({
          url,
          data,
          method: 'POST',
          responseType: 'json'
        })
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  },
  // 并发请求
  // axios.all
  all(reqs) {
    return new Promise((resolve, reject) => {
      if (!Vue.FNSYU.isArray(reqs) || !reqs.length) {
        reject(Vue.CONSTSYU.ERRORREQNOARRAY);
      } else {
        axios
          .all(reqs)
          .then(axios.spread((...res) => {
            resolve(res);
          }))
          .catch(error => {
            reject(error);
          });
      }
    });
  }
};

export default {
  // ALL 并发请求
  // axios.all
  httpAll(arr = []) {
    return AXIOS_METHOD.all(arr);
  },
  // GET 请求
  // GET操作(须传入请求url)
  // 根据url，获取数据
  getHandler(url = '', params = {}) {
    return AXIOS_METHOD.get(Vue.CONSTSYU.PREFIXURL + url, params);
  },
  // 根据传递的params（日期）
  // 获取表格数据
  getTables(params = {}) {
    return AXIOS_METHOD.get(Vue.CONSTSYU.PREFIXURL + '/table', params);
  },
  // POST 请求
  // POST操作(须传入请求url)
  fetchHandler(url = '', data = {}) {
    return AXIOS_METHOD.post(Vue.CONSTSYU.PREFIXURL + url, data);
  },
  // 登录
  fetchLogin(data = {}) {
    return AXIOS_METHOD.post(Vue.CONSTSYU.PREFIXURL + '/loginon', data);
  }
};
