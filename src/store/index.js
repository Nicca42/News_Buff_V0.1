import Vue from 'vue';
import Vuex from 'vuex';
import ethers from 'ethers';

// Importing constants
import * as actions from "./actions";
import * as mutations from "./mutation-types";

// Importing helper tools
import { getNetIdString } from "@/utils/HelperTools";

// Importing contract ABIs
import LimeFactoryABI from "../../build/LimeFactory.json";

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
    provider: null,
    signer: null,
    userAddress: null,
    currentNetwork: null,
    daiAddress: null,
    userDaiBalance: null,
    limeFactory: null
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
    [mutations.SET_PROVIDER](state, provider) {
      state.provider = provider;
      console.log("provider set to: ");
      console.log(state.provider);
    },
    [mutations.SET_USER_DAI_BALANCE](state, balance) {
      state.userDaiBalance = balance;
      console.log("user dai balance set to: ");
      console.log(state.userDaiBalance);
    },
    [mutations.SET_DAI_ADDRESS](state, address) {
      state.daiAddress = address;
      console.log("dai address set to: ");
      console.log(state.daiAddress);
    },
    [mutations.SET_LIME_FACTORY](state, instance) {
      state.limeFactory = instance;
      console.log("contract instance set to: ");
      console.log(state.limeFactory);
    }
  },
  actions: {
    [actions.SET_UP_INFO]: async function({commit, state}, provider) {
      let network = await getNetIdString(provider);
      let signer = await provider.getSigner();
      let address = await signer.getAddress();

      // Committing to state
      commit(mutations.SET_PROVIDER, provider);
      commit(mutations.SET_CURRENT_NETWORK, network);
      commit(mutations.SET_SIGNER, signer);
      commit(mutations.SET_USER_ADDRESS, address);
      window.ethereum.enable();

      let limeFactory = new state.ethers.Contract(
        "0x9eD274314f0fB37837346C425D3cF28d89ca9599",
        LimeFactoryABI.abi,
        state.signer
      );
      commit(mutations.SET_LIME_FACTORY, limeFactory);
    },
    [actions.SET_ETHERS]: function({commit}, ethers) {
      commit(mutations.SET_ETHERS, ethers);
    },
    [actions.INTERACT_CONTRACT]: async function({commit, state}, params) {
      console.log(params);
      let tx = await state.limeFactory.createLime(
        params.name,
        params.carbs,
        params.fat,
        params.protein,
      );
      console.log("done")

      let topic = state.ethers.utils.id("FreshLime(uint8)");
      let blockNumber = await state.provider.getBlockNumber();

      let filter = {
        address: "0x9eD274314f0fB37837346C425D3cF28d89ca9599",
        fromBlock: blockNumber - 100,
        toBlock: blockNumber,
        topics: [ topic ]
      };

      let results = await state.provider.getLogs(filter);
      // The emitted event data will be under [index].data
      console.log(results);
    },
  },
  modules: {
  }
});
