import account from '@/api';

export const LOGIN = Symbol('login');
export const GET_USER_STATES = Symbol('get_user_states');

export default {
  state: {
    user: {},
  },
  mutations: {
    [LOGIN](state, Data) {
      if (!Data) return;
      Object.assign(state, {
        user: {
          ...Data,
        },
      });
    },
  },
  actions: {
    async [LOGIN]({ commit }, queryData) {
      const r = await account.login({
        user_name: queryData.username,
      });
      commit(LOGIN, r);
      return r;
    },
  },
  getters: {
    [GET_USER_STATES](state) {
      return state;
    },
  },
};
