import { showToast } from '@/utils/tool'; // eslint-disable-line import/no-unresolved

function isCurrent(aurl) {
  const pages = uni.getCurrentPages(); // eslint-disable-line no-undef
  let url = pages && pages[pages.length - 1] && pages[pages.length - 1].route;
  if (window && window.location && window.location.href) url = window.location.href;
  return !url || url.indexOf(aurl) !== -1;
}

export function jumpError(url) {
  // 如果是当前页就无需跳转
  const flag = isCurrent(url);
  if (!flag) {
    uni.reLaunch({ // eslint-disable-line no-undef
      url,
    });
  }
}

export function onRequest(config, headerList = false) {
  // 如果是登陆请求就无需验证openid与token
  const reqH = {};
  if (headerList && typeof headerList === 'object') {
    const keys = Object.keys(headerList);
    for (const i of keys) {
      const t = uni.getStorageSync(i);
      if (!t) {
        showToast(headerList[i].errorHint);
        setTimeout(() => {
          jumpError(headerList[i].errorTo);
        }, 2000);
      }
      reqH[i] = t;
    }
  }
  const reqHeader = {
    'Content-Type': 'application/json',
    ...reqH,
  };
  Object.assign(config.headers, reqHeader);
  return config;
}

export function onError(err) {
  if (err.code === '401' || err.code === '404') {
    jumpError('/pages/login/login');
  }
  return Promise.resolve(err);
}

export function onResponse(response) {
  if (response.data && (response.data.code === 401 || response.data.code === 404)) {
    jumpError('/pages/login/login');
  }
  return response;
}

/**
 * @Author: ironknt
 * @param {*} fly 请求对象
 * @param {*} baseURL 请求基地址
 * @return {*} 返回request请求函数
 */
export function getRequest(fly, baseURL) {
  /**
   * @param {Object} params 请求payload
   * @param {String} dataPath 请求解析器，如返回data:{a: {b: {}}}, 则dataPath为: 'a.b'
   * @param {String} aUrl 子路径
   */
  // eslint-disable-next-line func-names
  return function (params, resoveDataPath = '', aUrl = '') {
    return new Promise((reslove, reject) => {
      const url = `${baseURL}${aUrl}`;
      let payload = params;
      let dataPath = resoveDataPath;
      if (params.dataPath && params.payload) {
        payload = params.payload;
        dataPath = params.dataPath;
      }
      fly.post(url, payload).then((response) => {
        if (!response || !response.data || !response.data.data) {
          showToast('服务器似乎出现了问题');
          return;
        }
        let obj = response.data.data;
        if (!dataPath) {
          reslove(obj);
        }
        const c = dataPath.split('.');
        for (let i = 0; i < c.length; i++) {
          obj = obj[c[i]];
        }
        reslove(obj);
      }).catch((error) => {
        let err = '服务器似乎出现了问题';
        const response = error && error.response;
        if (!response) {
          showToast((error && error.message) || err);
          reject(error);
          return;
        }
        if (response && response.data && response.data.errors) {
          err = response.data && response.data.errors;
        }
        if (err instanceof Array) {
          err = err && err[0] && err[0].message;
        }
        showToast(err);
        reject(err);
      });
    });
  };
}
