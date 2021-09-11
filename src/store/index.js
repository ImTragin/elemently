import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routes: [],
  },
  mutations: {
    setRoutes: (state, data) => {
      state.routes = data;
    },
  },
  actions: {
    addRoutes({ commit }, routes) {
      commit("setRoutes", routes);
    },
  },
  modules: {},
});
