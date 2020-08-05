// Onboard JS stuff
import Onboard from "bnc-onboard";
import Notify from "bnc-notify";
// Ethers
import ethers from "ethers";
// 3Box things
const Box = require("3box");
// Needed vue things
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
import MockTokenABI from "../../build/MockToken.json";

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
      tokenContractAddress: null,
    },
    userTokenInfo: {
      userName: null,
      threadId: null,
      created: null,
      contentIds: null,
    },
    mockToken: {
      mockContractInstance: null,
      mockContractAddress: null,
    },
    ethers: null,
    provider: null,
    signer: null,
    contentIdCounter: 2,
    loadedContent: null,
    account: null,
    userAddress: null,
    userProfile: { firstName: null, lastName: null },
    currentNetwork: null,
    posts: [
      {
        id: 0,
        title:
          "Black Lives Matter Protests create real change despite drop in coverage",
        authorName: "Nicolas Cage",
        contentAuthorAddress: "0xd4Fa489Eacc52BA59438993f37Be9fcC20090E39",
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
        contentAuthorAddress: "0xd4Fa489Eacc52BA59438993f37Be9fcC20090E39",
        publisher: "News Buff weekly",
        abstract:
          "The U.N termed Yeman 'the world’s worst humanitarian crisis' before the pandemic hit. 80% of the population requires humanitarian aid. The U.N was unable to fundraise the required amounts, and as a result the vunrabile population have now been put on half rations. 20% of Yemans districts are without a medical doctor. This situation has only been made worse by the drop of funding provided by the UAE.",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        image: "https://www.dw.com/image/47689419_101.jpg",
        tags: ["Moderated (x6)", "Verified sources", "Verified sources"],
      },
    ],
    authorsPosts: [],
    notify: null,
    onboard: null,
    wallet: null,
    box: null,
    userProfileBox: null,
    userNeedsAccount: false,
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
      console.log("user address set to:");
      console.log(state.userAddress);
    },
    [mutations.SET_USER_UNIQUE_TOKEN](state, tokenInfo) {
      state.userTokenInfo = tokenInfo;
      console.log("user token set to:");
      console.log(state.userTokenInfo);
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
    [mutations.SET_MOCK_CONTRACT_INSTANCE](state, instance) {
      state.mockToken.mockContractInstance = instance;
      console.log("mock contract instance set to: ");
      console.log(state.mockToken.mockContractInstance);
    },
    [mutations.SET_CONTRACT_ADDRESS](state, address) {
      state.tokenInfo.tokenContractAddress = address;
      console.log("contract address set to: ");
      console.log(state.tokenInfo.tokenContractAddress);
    },
    [mutations.SET_MOCK_CONTRACT_ADDRESS](state, address) {
      state.mockToken.mockContractAddress = address;
      console.log("mock contract address set to: ");
      console.log(state.mockToken.mockContractAddress);
    },
    /**
     * @notice Setting the users name
     */
    [mutations.SET_USER_FIRST_NAME](state, firstName) {
      state.userProfile.firstName = firstName;
      console.log("User last name set to: ");
      console.log(state.userProfile.firstName);
    },
    [mutations.SET_USER_LAST_NAME](state, lastName) {
      state.userProfile.lastName = lastName;
      console.log("User first name set to: ");
      console.log(state.userProfile.lastName);
    },
    /**
     * @notice The following mutations are for 3Box and oboard
     */
    [mutations.SET_BOX](state, box) {
      console.log("box set to: ");
      state.box = box;
      console.log(state.box);
    },
    [mutations.SET_USER_NEEDS_ACCOUNT](state, userNeedsAccount) {
      console.log("in mutation");
      state.userNeedsAccount = userNeedsAccount;
      console.log("userNeedsAccount set to: ");
      console.log(state.userNeedsAccount);
    },
    [mutations.SET_USER_PROFILE](state, userProfileBox) {
      console.log("profile mutation");
      state.userProfileBox = userProfileBox;
      console.log("userProfileBox set to: ");
      console.log(state.userProfileBox);
    },
    /**
     * @notice Oboard js mutations
     */
    [mutations.SET_ONBOARD](state, onboard) {
      state.onboard = onboard;
      console.log("onboard set to: ");
      console.log(state.onboard);
    },
    [mutations.SET_WALLET](state, wallet) {
      state.wallet = wallet;
      console.log("wallet set to: ");
      console.log(state.wallet);
    },
    // [mutations.SET_NOTIFIER](state, notifier) {
    //   state.notifier = notifier;
    //   console.log("notifier set to: ");
    //   console.log(state.notifier);
    // },
  },
  actions: {
    [actions.SET_ETHERS]: function({ commit }, ethers) {
      commit(mutations.SET_ETHERS, ethers);
    },
    [actions.SET_UP]: async function({ commit, dispatch, state }) {
      try {
        // Setting up Onboard.js
        await dispatch(actions.SET_UP_ONBOARD);
        // Setting up 3Box
        await dispatch(actions.SET_UP_3BOX);
        // Setting up the Smart contracts
        await dispatch(actions.SET_UP_CONTRACTS);
  
        // Getting the users token
        await dispatch(actions.GET_USER_TOKEN);
      } catch (error) {
        throw new Error("Failed to set up application", error);
      }

      if (!state.userTokenInfo.created) {
        // Sets up the user with a token
        await dispatch(actions.CREATE_USER_THREAD);
        /**
         * @notice If the user does have a token they are already registered in
         * the system, so their threadID is loaded.
         */
      } else {
        await dispatch(actions.LOAD_USER_THREAD);
      }

      await dispatch(actions.LOAD_USER_NAMES_FROM_BOX);

      window.ethereum.enable();
    },
    /**
     * @notice Setting up onboard.js
     * @dev Getting a Metamask internal RPC error here? TODO
     */
    [actions.SET_UP_ONBOARD]: async function({ commit, state }) {
      console.log("Onboard.js flow...");

      const apiKey = process.env.REACT_APP_ONBOARD_API_KEY
        ? process.env.REACT_APP_ONBOARD_API_KEY
        : "12153f55-f29e-4f11-aa07-90f10da5d778";
      const infuraId =
        process.env.REACT_APP_INFURA_ID || "d5e29c9b9a9d4116a7348113f57770a8";
      const infuraRpc = `https://${state.network?.name}.infura.io/v3/${infuraId}`;

      const onboard = await Onboard({
        dappId: apiKey,
        hideBranding: true,
        networkId: 1, // Default to main net. If on a different network will change with the subscription.
        subscriptions: {
          address: (address) => {
            commit(mutations.SET_USER_ADDRESS, address);
          },
          network: async (networkId) => {
            onboard.config({ networkId: networkId });
          },
          wallet: async (wallet, networkId) => {
            if (wallet.provider) {
              commit(mutations.SET_WALLET, wallet);
              const ethersProvider = new ethers.providers.Web3Provider(
                wallet.provider
              );
              commit(mutations.SET_PROVIDER, ethersProvider);
              // Converts the network ID into human readable label
              let network = await getNetIdString(networkId);

              commit(mutations.SET_CURRENT_NETWORK, network);

              // Gets the signer from the ethersProvider
              let signer = await ethersProvider.getSigner();

              commit(mutations.SET_SIGNER, signer);

              // Requests the address to connect to from the user
              await state.provider.send("eth_requestAccounts", []);
              const address = await state.signer.getAddress();

              commit(mutations.SET_USER_ADDRESS, address);
              
            } else {
              commit(mutations.SET_PROVIDER, null);
              commit(mutations.SET_CURRENT_NETWORK, null);
              commit(mutations.SET_SIGNER, null);
              commit(mutations.SET_USER_ADDRESS, null);
            }
          },
        },
        walletSelect: {
          wallets: [
            { walletName: "metamask", preferred: true },
            {
              walletName: "imToken",
              rpcUrl:
                !!state.network && state.network.chainId === 1
                  ? "https://mainnet-eth.token.im"
                  : "https://eth-testnet.tokenlon.im",
              preferred: true,
            },
            { walletName: "coinbase", preferred: true },
            {
              walletName: "portis",
              apiKey: process.env.REACT_APP_PORTIS_API_KEY,
            },
            { walletName: "trust", rpcUrl: infuraRpc },
            { walletName: "dapper" },
            {
              walletName: "walletConnect",
              rpc: { [state.network?.chainId || 1]: infuraRpc },
            },
            { walletName: "walletLink", rpcUrl: infuraRpc },
            { walletName: "opera" },
            { walletName: "operaTouch" },
            { walletName: "torus" },
            { walletName: "status" },
            { walletName: "unilogin" },
            {
              walletName: "ledger",
              rpcUrl: infuraRpc,
            },
          ],
        },
        walletCheck: [
          { checkName: "connect" },
          { checkName: "accounts" },
          { checkName: "network" },
          { checkName: "balance", minimumBalance: "0" },
        ],
      });

      await onboard.walletSelect();

      commit(mutations.SET_ONBOARD, onboard);

      await onboard.walletCheck();

      console.log("> Successfully run onboard.js");
    },
    /**
     * @notice Connecting to a users 3Box profile. If they do not have one,
     * it will create one for the user.
     */
    [actions.SET_UP_3BOX]: async function({ commit, state }) {
      console.log("Setting up 3Box...");

      const profile = await Box.getProfile(state.userAddress);
      console.log(profile.proof_did);
      commit(mutations.SET_USER_PROFILE, profile);

      if (profile.proof_did == undefined) {
        console.log(
          "User does not have 3Box account.\nSetting up user account..."
        );
        commit(mutations.SET_USER_NEEDS_ACCOUNT, true);
      }
      const box = await Box.openBox(state.userAddress, state.wallet.provider);

      commit(mutations.SET_BOX, box);

      console.log("> Successfully set up 3Box");
    },
    /**
     * @notice Sets up the instances of the smart contracts.
     */
    [actions.SET_UP_CONTRACTS]: async function({ commit, state }) {
      console.log("Setting up Smart Contract instances...");
      // Setting up contract info
      let tokensAddress = await ContractHelper.getTokenAddress(
        state.currentNetwork
      );
      commit(mutations.SET_CONTRACT_ADDRESS, tokensAddress.unique);
      commit(mutations.SET_MOCK_CONTRACT_ADDRESS, tokensAddress.mock);
      // Getting the contract instance
      let tokenContractInstance = await ContractHelper.getContractInstance(
        state.tokenInfo.tokenContractAddress,
        state.ethers,
        state.signer,
        UniqueUserTokensABI.abi
      );
      commit(mutations.SET_CONTRACT_INSTANCE, tokenContractInstance);

      let mockInstance = await ContractHelper.getContractInstance(
        state.mockToken.mockContractAddress,
        state.ethers,
        state.signer,
        MockTokenABI.abi
      );
      commit(mutations.SET_MOCK_CONTRACT_INSTANCE, mockInstance);

      console.log("> Successfully set up Smart Contract instances");
    },
    /**
     * @notice If the user does not have a token, then they are not registered
     * in the system. A thread ID is created for them, followed by a token.
     * They are also loaded with mock DAI tokens in order to play around
     * on the site.
     */
    [actions.CREATE_USER_THREAD]: async function({ commit, state }) {
      console.log("User has no existing thread ID\nCreating Thread ID...");

      let helper = await bucketHelper.init(
        "",
        state.keyInfo.key,
        state.keyInfo.secret,
        state.keyInfo.type
      );
      console.log("> Token created for user");
      commit(mutations.SET_USER_ID, helper[0]);
      commit(mutations.SET_USER_LIBP2P_ID, helper[1]);
      console.log("User has no existing token\nCreating token...");
      // A token is created for the user
      let results = await ContractHelper.createUserToken(
        state.tokenInfo.tokenContractInstance,
        "User Name", //TODO concat user first + last name
        helper[1]
      );
      console.log("> Token created for user");

      console.log("Loading user with mock tokens...");
      let txResults = await ContractHelper.mintUserToken(
        state.ethers,
        state.mockToken.mockContractInstance,
        state.userAddress,
        100
      );
      console.log(txResults);

      console.log("> Successfuly loaded user with mock tokens");
    },
    /**
     * @notice If the user has a token, then the token is loaded.
     */
    [actions.LOAD_USER_THREAD]: async function({ commit, state }) {
      console.log("User has existing Thread ID\nLoading Thread ID...");

      let helper = await bucketHelper.init(
        state.userTokenInfo.threadId ? state.userTokenInfo.threadId : '',
        state.keyInfo.key,
        state.keyInfo.secret,
        state.keyInfo.type
      );
      commit(mutations.SET_USER_ID, helper[0]);
      commit(mutations.SET_USER_LIBP2P_ID, helper[1]);

      console.log("> Thread ID loaded");
    },
    /**
     * @notice Getting the users token. This will get any pre-existing token
     * that the user has, as well as their user name.
     */
    [actions.GET_USER_TOKEN]: async function({ commit, state }) {
      let userToken = await ContractHelper.getUserToken(
        state.tokenInfo.tokenContractInstance,
        state.userAddress
      );

      commit(mutations.SET_USER_UNIQUE_TOKEN, userToken);
    },
    /**
     * @notice Stores a users profile in their 3Box account
     */
    [actions.CREATE_USER]: async function({ dispatch, state }, params) {
      console.log("setting prfofile info", params);
      await state.box.public.set("profileObject", JSON.stringify(params));

      let userName = {
        firstName: params.firstName,
        lastName: params.lastName,
      };

      dispatch(actions.SET_USER_NAME, userName);
    },
    /**
     * @notice Sets the user names as passed in against the state.
     */
    [actions.SET_USER_NAME]: function({ commit }, params) {
      commit(mutations.SET_USER_FIRST_NAME, params.firstName);
      commit(mutations.SET_USER_LAST_NAME, params.lastName);
    },
    /**
     * @notice Gets the user name from their 3 Box account and then saves it
     */
    [actions.LOAD_USER_NAMES_FROM_BOX]: async function({ dispatch, state }) {
      const profileAfter = await state.box.public.all();
      console.log(profileAfter.profileObject);
      let userInfoFromBox = JSON.parse(profileAfter.profileObject);

      dispatch(actions.SET_USER_NAME, userInfoFromBox);
    },
    /**
     * @notice Allows a user to create a post
     */
    [actions.CREATE_POST]: async function({ state }, params) {
      console.log("Creating post...");

      await bucketHelper.createContent(
        state.contentIdCounter.toString(),
        state.userAddress,
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
     * @notice This allows a user to tip an author
     */
    [actions.MAKE_TIP]: async function({ state }, params) {
      console.log("Tipping creator...");
      await ContractHelper.tipCreator(
        state.ethers,
        state.mockToken.mockContractInstance,
        params.address,
        params.value
      );
    },
    /**
     * @notice Pulls all the authors posts from the ThreadDB and adds any posts
     * that the state does not have.
     */
    [actions.GET_ALL_AUTHOR_POSTS]: async function({ commit, state }) {
      // Gets all the authors posts from the ThreadDB
      let posts = await bucketHelper.loadAuthorsContent(state.userAddress);
      // Checks if any of these posts are not in the store and adds them
      posts.instancesList.forEach(function(post) {
        if (state.authorsPosts.length > 0) {
          // Checks if the post is not in the existing posts array
          let result = state.authorsPosts.findIndex(function(element) {
            return element.id == post._id;
          });
          // If the post is unique it formats and adds it
          if (result == -1) {
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
      posts.instancesList.forEach(function(post) {
        // Checking if the array is empty
        if (state.posts.length > 0) {
          // Checks if the post is not in the existing posts array
          let result = state.posts.findIndex(function(element) {
            return element.id == post._id;
          });
          // If the post is unique it formats and adds it
          if (result == -1) {
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
