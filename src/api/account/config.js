const Fly = require('flyio/dist/npm/wx');
const fly = new Fly();
// 设置超时
fly.config.timeout = 15000;

import { generateRequest } from '../configWraper';

const baseUrl = '';

export const request = generateRequest (fly, baseUrl, true);

export default request;
