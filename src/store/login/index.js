import * as account from '@/api/account/tool';

export const LOGIN = Symbol();
export const GET_USER_STATES = Symbol();

export default {
  state: {
    user: {}
  },
  mutations: {
		[LOGIN] (state, Data) {
		  if (!Data) return
		  Object.assign(state, {
		    user: {
          ...Data
        }
		  })
		}
  },
  actions: {
		async [LOGIN] ({commit}, queryData) {
      let r = await account.login({
      	user_name: queryData.username
      })
			commit(LOGIN, r)
      return r
		}
  },
  getters: {
    [GET_USER_STATES] (state) {
      return state
    }
  }
}
