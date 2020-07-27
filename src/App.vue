<template>
  <md-app id="app" md-mode="reveal" style="min-height: 100vh;">
    <md-app-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">{{ $route.name }}</span>

      <!-- <logo style="margin-left:600px"/> -->

      <div class="md-toolbar-section-end">
        <div
          class="md-layout md-gutter md-alignment-center-right"
          style="text-align:right; width:500px"
        >
          <div class="md-layout-item">
            <div class="md-subheading">
              {{ userProfile.firstName }} {{ userProfile.lastName }}
            </div>
          </div>
          <div class="md-layout-item">
            <div class="md-subheading">
              <clickable-address :light="true" :eth-address="account" />
            </div>
          </div>
        </div>
      </div>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible">
      <md-list>
        <md-list-item>
          <md-icon>home</md-icon>
          <span class="md-list-item-text">
            <router-link to="/">Home</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>account_box</md-icon>
          <span class="md-list-item-text">
            <router-link to="/Profile">Profile</router-link>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>search</md-icon>
          <span class="md-list-item-text">
            <router-link to="/BrowsePosts">Browse Posts</router-link>
          </span>
        </md-list-item>

        <md-divider></md-divider>

        <md-list-item>
          <md-icon>create</md-icon>
          <span class="md-list-item-text">
            <router-link to="/ListPost">List New Post</router-link>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>format_list_bulleted</md-icon>
          <span class="md-list-item-text">
            <router-link to="/ManagePosts">Manage Posts</router-link>
          </span>
        </md-list-item>

        <md-divider></md-divider>

        <md-list-item>
          <md-icon>code</md-icon>
          <span class="md-list-item-text">
            <a
              href="https://github.com/Nicca42/News_Buff_V0.1"
              target="__blank"
              >Github</a
            >
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>chat</md-icon>
          <span class="md-list-item-text">
            <a
              href="https://github.com/Nicca42/News_Buff_V0.1/blob/trunk/README.md"
              target="__blank"
              >Documentation</a
            >
          </span>
        </md-list-item>

        <md-divider></md-divider>

        <md-list-item>
          <md-icon>chat</md-icon>
          <span class="md-list-item-text">
            <router-link to="/ContactUs">Contact</router-link>
          </span>
        </md-list-item>
        <md-divider></md-divider>
      </md-list>
    </md-app-drawer>

    <md-app-content
      style="background-color: #F5F9F9; padding-left:0px; padding-right:0px"
    >
      <!-- <mining-transaction /> -->
      <router-view />
      <div style="padding-top:20px;padding-left:20px; padding-right:20px">
        <span class="md-subheading" style="float: left;">
          <a href="/TermsOfService">Terms Of Service</a>
        </span>
        <span>
          Censorship resistant news made with ❤️ by
          <a href="https://github.com/Nicca42/News_Buff_V0.1"
            >News Buff</a
          >
          📰
        </span>
        <span class="md-caption" style="float: right;">
          {{ currentNetwork }}
        </span>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
import MiningTransaction from "@/components/widgets/MiningTransaction";
import ClickableAddress from "@/components/widgets/ClickableAddress";

import * as actions from "@/store/actions";
import * as mutations from "@/store/mutation-types";
import { mapActions, mapState } from "vuex";
import router from "@/router";

export default {
  name: "app",
  components: { ClickableAddress, MiningTransaction },
  data() {
    return {
      ethers: null,
      provider: null,
      signer: null,
      menuVisible: false,
    };
  },
  methods: {
    ...mapActions(["SET_UP"]),
    // redirect(_path) {
    //   router.push({ name: _path });
    // },
  },
  async mounted() {
    this.SET_UP();
  },
  computed: {
    ...mapState(["currentNetwork", "account", "userProfile"]),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Space+Mono");
@import url("https://fonts.googleapis.com/css?family=Coiny|Rubik");
// @import "/styles/variables.scss";
@import "~vue-material/dist/theme/engine"; // Import the theme engine
@include md-register-theme(
  "default",
  (
    primary: #828ec6,
    // The primary color of your brand
      accent: #dd688c
      // The secondary color of your brand,,,,,,,,,,,,,,,,,,,,,,,,,,
  )
);
@import "~vue-material/dist/theme/all"; // Apply the theme

html,
body {
  font-family: "Space Mono", sans-serif;
}

#app {
  text-align: center;
  color: #454a50;
}

#app {
  font-family: "Space Mono", sans-serif;
}

nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: indianred;
  cursor: pointer;
}

.text-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
