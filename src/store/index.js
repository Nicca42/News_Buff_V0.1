import Vue from 'vue';
import Vuex from 'vuex';

// Importing constants
import * as actions from "./actions";
import * as mutations from "./mutation-types";

// Importing helper tools
import { getNetIdString } from "@/utils/HelperTools";

// Importing contract ABIs

import { BNavbar, BNavbarNav, BNavbarBrand } from 'bootstrap-vue'
Vue.component('b-navbar', BNavbar);
Vue.component('b-navbar-brand', BNavbarBrand);
Vue.component('b-navbar-nav', BNavbarNav);

// Setting Vue up to use Vuex
Vue.use(Vuex)

// The state of the application
export default new Vuex.Store({
  state: {
    connected: false,
    ethers: null,
    signer: null,
    userAddress: null,
    currentNetwork: null,
    daiAddress: null,
    userDaiBalance: null,
  },
  mutations: {
    // ethers/blockchain stuff
    [mutations.SET_SIGNER](state, signer) {
      console.log("signer set to: ");
      state.signer = signer;
      console.log(state.signer);
    },
    [mutations.SET_USER_ADDRESS](state, address) {
      state.userAddress = address;
      console.log("user address set to:")
      console.log(state.userAddress)
    },
    [mutations.SET_CURRENT_NETWORK](state, network) {
      state.currentNetwork = network;
      console.log("network set to: " + state.currentNetwork);
    },
    [mutations.SET_ETHERS](state, ethers) {
      state.ethers = ethers;
      console.log("ethers set to: ");
      console.log(state.ethers);
    },
    [mutations.SET_USER_DAI_BALANCE](state, balance) {
      console.log("user dai balance set to: " + balance);
      state.userDaiBalance = balance;
    },
    [mutations.SET_DAI_ADDRESS](state, address) {
      console.log("dai address set to: " + address);
      state.daiAddress = address;
    }
  },
  actions: {
    [actions.SET_UP_INFO]: async function({commit}, ethers) {
      let network = await getNetIdString(ethers);
      let signer = await ethers.getSigner();
      let address = await signer.getAddress();

      console.log(network)
      // Committing to state
      commit(mutations.SET_CURRENT_NETWORK, network);
      commit(mutations.SET_SIGNER, signer);
      commit(mutations.SET_USER_ADDRESS, address);
      window.ethereum.enable();
    },
    [actions.SET_ETHERS]: function({commit}, ethers) {
      commit(mutations.SET_ETHERS, ethers);
    }
  },
  modules: {
  }
});
