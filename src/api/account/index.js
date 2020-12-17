import { request } from './config'

export function login (params) {
	return request({
		operationName: 'login',
		query: `mutation login($openid: String!, $password: String!) {
			login(openid: $openid, password: $password) {
				success
			}
		}`,
		variables: {
			...params
		}
	}, 'login')
}
