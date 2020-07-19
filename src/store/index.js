import Vue from "vue";
import Vuex from "vuex";

import { ThreadsDbHelper } from "!awesome-typescript-loader!../utils/ThreadsDbHelper.ts";
const bucketHelper = new ThreadsDbHelper();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keyInfo: {
      key: process.env.HUB_KEY,
      secret: '',
      // @ts-ignore
      type: 1, 
    },
  },
  mutations: {},
  actions: {},
  modules: {}
});
