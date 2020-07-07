<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="light" varient="info">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
        <h5>Network: {{ currentNetwork }} | Address: {{ userAddress }}</h5> 
        <b-navbar-nav class="ml-auto">
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
// <button type="button" v-bind:id="connect">Connect your wallet</button>
import ethers from "ethers";
// import * as actions from "@/store/actions";
// import * as mutations from "@/store/mutation-types";
import { mapActions, mapState } from "vuex";


export default {
  data() {
    return {
      ethers: null,
      signer: null
    }
  },
  methods: {
    ...mapActions(["SET_ETHERS", "SET_UP_INFO"])
  },
  async mounted() {
    if(window.ethereum) {
      this.ethers = new ethers.providers.Web3Provider(window.ethereum)
      this.SET_ETHERS(this.ethers);
      this.SET_UP_INFO(this.ethers);
    }
  },
  computed: {
    ...mapState(["currentNetwork", "userAddress"])
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
