import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: localStorage.getItem("theme") === 'true' ? true : false ,
  },
  mutations: {
    TOGGLE_THEME: (state) => {
      state.theme = !state.theme;
    },
  },
  getters: {
    theme: state => {
      return state.theme;
    },
  },
  actions: {
    toggleTheme: ({ commit, state }) => {
      localStorage.setItem("theme", !state.theme);
      commit("TOGGLE_THEME");
    },
  }
})