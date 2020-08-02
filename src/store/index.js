import Vue from "vue";
import Vuex from "vuex";
// Importing constants
import * as actions from "./actions";
import * as mutations from "./mutation-types";
// Importing helper tools
import { ThreadsDbHelper } from "!awesome-typescript-loader!../utils/ThreadsDbHelper.ts";
const bucketHelper = new ThreadsDbHelper(process.env.VUE_APP_THREAD_ID);
import { getNetIdString } from "@/utils/ToolsHelper";
import * as ContractHelper from "@/utils/ContractHelper";
import UniqueUserTokensABI from "../../build/UniqueUserTokens.json";

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
      userLibp2pId: null,
    },
    tokenInfo: {
      tokenContractInstance: null,
      tokenContractAddress: null
    },
    ethers: null,
    provider: null,
    signer: null,
    contentIdCounter: 2,
    loadedContent: null,
    account: null,
    userAddress: null,
    userProfile: { firstName: "John", lastName: "snow" },
    currentNetwork: null,
    posts: [
      {
        id: 0,
        title:
          "Black Lives Matter Protests create real change despite drop in coverage",
        authorName: "Nicolas Cage",
        publisher: "Cage the Times",
        abstract:
          "Weeks of protests that where met with the same police brutality they where protesting have started seeing the fruits of their efforts. A bill was introduced to hold police accountable for their actions, Minneapolis pledges to disband their police department, and all of this desplite main stream news outlets dropping coverage of the protests after the few inceidence of looting stopped, and thus made coverage harder to sensationalise.",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <h1>incididunt</h1> <br>ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/5d/Black_Lives_Matter_logo.svg",
        tags: ["Relavant sources", "Opinions present", "Moderated (x3)"],
      },
      {
        id: 1,
        title: "Yeman humanitarian crisis pushed over the edge by Covid-19",
        authorName: "Veronica Coutts",
        publisher: "News Buff weekly",
        abstract:
          "The U.N termed Yeman the “world’s worst humanitarian crisis” before the pandemic hit. 80% of the population requires humanitarian aid. The U.N was unable to fundraise the required amounts, and as a result the vunrabile population have now been put on half rations. 20% of Yemans districts are without a medical doctor. This situation has only been made worse by the drop of funding provided by the UAE.",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        image: "https://www.dw.com/image/47689419_101.jpg",
        tags: ["Moderated (x6)", "Verified sources", "Verified sources"],
      },
		],
		authorsPosts: [],
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
    [mutations.SET_CURRENT_NETWORK](state, network) {
      console.log("network set to: ");
      state.currentNetwork = network;
      console.log(state.currentNetwork);
    },
    [mutations.SET_LOADED_CONTENT](state, loadedContent) {
      console.log("loaded content set to: ");
      state.loadedContent = loadedContent;
      console.log(state.loadedContent);
		},
    [mutations.ADD_AUTHOR_POST](state, authorPost) {
      console.log("Author post added: ");
      state.authorsPosts.push(authorPost);
      console.log(state.authorsPosts);
		},
    [mutations.ADD_POST](state, post) {
      console.log("Posts post added: ");
      state.posts.push(post);
      console.log(state.posts);
		},
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
    [mutations.SET_CONTRACT_INSTANCE](state, instance) {
      state.tokenInfo.tokenContractInstance = instance;
      console.log("contract instance set to: ");
      console.log(state.tokenInfo.tokenContractInstance);
    },
    [mutations.SET_CONTRACT_ADDRESS](state, address) {
      state.tokenInfo.tokenContractAddress = address;
      console.log("contract address set to: ");
      console.log(state.tokenInfo.tokenContractAddress);
    }
  },
  actions: {
		[actions.SET_ETHERS]: function({commit}, ethers) {
      commit(mutations.SET_ETHERS, ethers);
    },
    [actions.SET_UP]: async function({ commit, state }, provider) {
      // Setting up Textile info
			commit(mutations.SET_PROVIDER, provider);
			// Converts the network ID into human readable label
			let network = await getNetIdString(provider);
			commit(mutations.SET_CURRENT_NETWORK, network);
			// Gets the signer from the provider
			let signer = await provider.getSigner();
			commit(mutations.SET_SIGNER, signer);
			// Requests the address to connect to from the user
      await state.provider.send("eth_requestAccounts", []);
      const address = await state.signer.getAddress();
      commit(mutations.SET_USER_ADDRESS, address);
      
      // Setting up contract info
      let tokenAddress = await ContractHelper.getTokenAddress(state.provider);
      commit(mutations.SET_CONTRACT_ADDRESS, tokenAddress);
      // Getting the contract instance
      let tokenContractInstance = await ContractHelper.getContractInstance(
        state.provider,
        state.ethers,
        state.signer,
        UniqueUserTokensABI.abi
      );
      commit(mutations.SET_CONTRACT_INSTANCE, tokenContractInstance);
      /**
       * Getting the users token. This will get any pre-existing token that the
       * user has, as well as their user name. If then do not have a token,
       * the user will be prompted to make one TODO
       */
      let userToken = await ContractHelper.getUserToken(
        state.tokenInfo.tokenContractInstance,
        state.userAddress
      );

      if(!userToken.created) {
        console.log("User has no existing thread ID\nCreating Thread ID...");
        let helper = await bucketHelper.init(
          "",
          state.keyInfo.key,
          state.keyInfo.secret,
          state.keyInfo.type
        );
        console.log("> Token created for user");
        commit(mutations.SET_USER_ID, helper[1]);
        commit(mutations.SET_USER_LIBP2P_ID, helper[2]);
        console.log("User has no existing token\nCreating token...");
        // A token is created for the user
        let results = await ContractHelper.createUserToken(
          state.tokenInfo.tokenContractInstance,
          "User Name",
          helper[1]
        );
        console.log("> Token created for user");
      } else {
        console.log("User has existing Thread ID\nLoading Thread ID...");
        let helper = await bucketHelper.init(
          userToken.threadId,
          state.keyInfo.key,
          state.keyInfo.secret,
          state.keyInfo.type
        );
        console.log("> Thread ID loaded");
        commit(mutations.SET_USER_ID, helper[1]);
        commit(mutations.SET_USER_LIBP2P_ID, helper[2]);
      }

      console.log(userToken);

			// Sets up the needed IDs for Textile interactions
      

      // commit(mutations.SET_USER_ID, helper[0]);
      
			
      window.ethereum.enable();
    },
    [actions.CREATE_CONTENT]: async function({ commit, state }, params) {
      console.log("in action");
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
      console.log("\nLoading...\n");
      let content = await bucketHelper.loadContent();

      commit(mutations.SET_LOADED_CONTENT, content);
      console.log(content);
    },
    [actions.LOAD_AUTHORS_CONTENT]: async function({ commit, state }, author) {
      console.log("\nLoading...\n");
      let content = await bucketHelper.loadAuthorsContent(author);
			console.log(content);
      // commit(mutations.SET_LOADED_CONTENT, content);
      // console.log(content);
    },
    [actions.CREATE_POST]: async function({ commit, dispatch, state }, params) {
      console.log("Creating post...");
			
			await bucketHelper.createContent(
        state.contentIdCounter.toString(),
        state.userAddress,
        params.title,
        params.description,
        params.body
      );
      console.log("Adding post to token...");
      
      await ContractHelper.addContent(
        state.tokenInfo.tokenContractInstance,
        state.contentIdCounter.toString()
      );

      state.contentIdCounter += 1;
    },
    /**
     * @notice Pulls all the authors posts from the ThreadDB and adds any posts
     * that the state does not have.
     */
    [actions.GET_ALL_AUTHOR_POSTS]: async function({ commit, state }) {
      // Gets all the authors posts from the ThreadDB
      let posts = await bucketHelper.loadAuthorsContent(state.userAddress);
      // Checks if any of these posts are not in the store and adds them
      posts.instancesList.forEach(
        function (post) {
          if(state.authorsPosts.length > 0) {
            // Checks if the post is not in the existing posts array
            let result = state.authorsPosts.findIndex(function (element) {
              return element.id == post._id;
            });
            // If the post is unique it formats and adds it
            if(result == -1) {
              let formatPost = {
                id: post._id,
                title: post.contentTitle,
                authorName: "Blank for now",
                publisher: post.contentAuthor,
                abstract: post.contentDescription,
                body: post.contentBody,
                image: null,
                tags: [],
              };
              // Adds each unique post to the state
              commit(mutations.ADD_AUTHOR_POST, formatPost);
            }
          } else {
            let formatPost = {
              id: post._id,
              title: post.contentTitle,
              authorName: "Blank for now",
              publisher: post.contentAuthor,
              abstract: post.contentDescription,
              body: post.contentBody,
              image: null,
              tags: [],
            };
            // Adds each unique post to the state
            commit(mutations.ADD_AUTHOR_POST, formatPost);
          }
      });
    },
    /**
     * @notice Pulls all the posts from the ThreadDB and adds any posts that the
     * state does not currently have.
     */
    [actions.GET_ALL_POSTS]: async function({ commit, state }) {
      // Gets all the posts from the ThreadDB
      let posts = await bucketHelper.loadContent();
      // Checks if any of these posts are not in the store and adds them
      posts.instancesList.forEach(
        function (post) {
          // Checking if the array is empty
          if(state.posts.length > 0) {
            // Checks if the post is not in the existing posts array
            let result = state.posts.findIndex(function (element) {
              return element.id == post._id;
            });
            // If the post is unique it formats and adds it
            if(result == -1) {
              let formatPost = {
                id: post._id,
                title: post.contentTitle,
                authorName: "Blank for now",
                publisher: post.contentAuthor,
                abstract: post.contentDescription,
                body: post.contentBody,
                image: null,
                tags: [],
              };
              // Adds each unique post to the state
              commit(mutations.ADD_POST, formatPost);
            }
          } else {
            let formatPost = {
              id: post._id,
              title: post.contentTitle,
              authorName: "Blank for now",
              publisher: post.contentAuthor,
              abstract: post.contentDescription,
              body: post.contentBody,
              image: null,
              tags: [],
            };
            // Adds each unique post to the state
            commit(mutations.ADD_POST, formatPost);
          }
      });
    },
  },
  modules: {},
});
