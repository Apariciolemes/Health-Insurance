import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingTrigger: false,
  },
  mutations: {
    handleLoading(state: any, loadingTrigger: any) {
      state.loadingTrigger = loadingTrigger;
    },
  },
});
