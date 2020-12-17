import {
  generateRequest,
} from '../configWraper';

const Fly = require('flyio/dist/npm/wx');

const fly = new Fly();

// 设置超时
fly.config.timeout = 15000;
const baseUrl = '';

export const request = generateRequest(fly, baseUrl, true);

export default request;
