import {
  onRequest, onResponse, onError, getRequest,
} from './common';

export function generateRequest(fly, baseURL, headerList = false) {
  let tHeader = headerList;
  if (!tHeader) {
    tHeader = {
      openid: {
        errorHint: '未登陆',
        errorTo: '/pages/login/login',
      },
    };
  }
  // 添加请求拦截器
  fly.interceptors.request.use((config) => onRequest(config, headerList), (error) => {
    Promise.reject(error);
  });
  // 添加res拦截器
  fly.interceptors.response.use(onResponse, onError);
  // 创建request
  // 非graphql请求，格式为：await request({ ...data }, '', '/auth/login');
  // 代表payload，dataPath，请求子路径，后两者默认为空
  const request = getRequest(fly, baseURL);
  return request;
}

export default {
  generateRequest,
};
