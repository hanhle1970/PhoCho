import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//https://viblo.asia/p/vuex-va-nhung-kien-thuc-can-nam-duoc-1Je5EOqGZnL

export default new Vuex.Store({
  state: {
    isLogined: false,
    paths: [],
  },
  mutations: {
    login(state, res) {
      state.isLogined = res;
    },

    paths(state, res) {
      state.paths = res;
    }
  },
  actions: {
    login: ({commit}, payload) => commit('login', payload),
    paths: ({commit}, payload) => commit('paths', payload)
  },
  getters: {
    isLogined: (state) => state.isLogined,
    paths: (state) => state.paths,
  },
})

