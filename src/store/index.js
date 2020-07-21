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
      key: process.env.VUE_APP_HUB_KEY,
      secret: process.env.VUE_APP_HUB_KEY_SECRET,
      // @ts-ignore
      type: 1,
		},
		threadInfo: {
			threadId: null,
			userId: null,
			userLibp2pId: null
		},
		contentIdCounter: 1,
		loadedContent: null
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
		[mutations.SET_LOADED_CONTENT](state, loadedContent) {
      console.log("loaded content set to: ");
      state.loadedContent = loadedContent;
      console.log(state.loadedContent);
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
			
			// commit(mutations.SET_USER_ID, helper[0]);
			commit(mutations.SET_USER_ID, helper[1]);
			commit(mutations.SET_USER_LIBP2P_ID, helper[2]);
		},
		[actions.CREATE_CONTENT]: async function({ commit, state }, params) {
			console.log("in action")
      await bucketHelper.createContent(
				state.contentIdCounter.toString(),
				params.author,
				params.title,
				params.description,
				params.content
			);
			
			state.contentIdCounter += 1;
			console.log("\nFinished creating content");
		},
		[actions.LOAD_CONTENT]: async function({ commit, state }) {
			console.log("\nLoading...\n")
			let content = await bucketHelper.loadContent();

			commit(mutations.SET_LOADED_CONTENT, content);
			console.log(content);
		},
  },
  modules: {},
});
