import { request } from './config';

function login(params) {
  return request({
    operationName: 'login',
    query: `mutation login($openid: String!, $password: String!) {
      login(openid: $openid, password: $password) {
        success
      }
    }`,
    variables: {
      ...params,
    },
  }, 'login');
}

export default {
  login,
};
