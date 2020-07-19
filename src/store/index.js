import Vue from "vue";
import Vuex from "vuex";
// Importing constants
import * as actions from "./actions";
import * as mutations from "./mutation-types";
// Importing constance
import { ThreadsDbHelper } from "!awesome-typescript-loader!../utils/ThreadsDbHelper.ts";
const bucketHelper = new ThreadsDbHelper();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keyInfo: {
      key: process.env.HUB_KEY,
      secret: "",
      // @ts-ignore
      type: 1,
		},
		threadInfo: {
			userId: null,
			userLibp2pId: null
		}
  },
  mutations: {
		[mutations.SET_USER_ID](state, identity) {
      console.log("identity set to: ");
      state.threadInfo.userId = identity;
      console.log(state.threadInfo.userId);
    },
    [mutations.SET_USER_LIBP2P_ID](state, libp2pId) {
      console.log("identity (libp2p) set to: ");
      state.threadInfo.userLibp2pId = libp2pId;
      console.log(state.threadInfo.userLibp2pId);
    },
	},
  actions: {
    [actions.SET_UP]: async function({ commit, state }, provider) {
      let helper = await bucketHelper.init(
        "",
        state.keyInfo.key,
        state.keyInfo.secret,
        state.keyInfo.type
      );
			
			commit(mutations.SET_USER_ID, helper[0]);
			commit(mutations.SET_USER_LIBP2P_ID, helper[1]);
		},
		[actions.CREATE_CONTENT]: async function({ commit, state }, info) {
      
      console.log("creating");
    },
  },
  modules: {},
});
