<template>
  <div class="page-container">
    <div class="md-layout">
      <div class="md-layout">
        <div class="md-layout-item">
          <md-content style="padding: 20px;">
            <md-card-header>
              <div class="md-title">
                <h1>Posts</h1>
              </div>
            </md-card-header>
            <md-content style="padding:20px" class="text-center">
              <p>
                Here you can see all the posts on the platform. Please do note that
                this is still the POC release and as such we cannot assess the 
                quaility of content on the platform. This will be coming in the 
                V2 launch. You can sign up to be notified for V2 through our 
                quick <a href="https://docs.google.com/forms/d/e/1FAIpQLSeX797wqs6qzLN_To0s8Ib3dGwSrhdtGbs5YhsX6GlZPMHOsg/viewform?usp=sf_link" target="_blank"> user survey form here.</a>
              </p>
            </md-content>
          </md-content>

          <transition-group name="fadeUp" tag="ul">
            <post-row-item
              v-for="post in posts"
              :postInformation="post"
              style="margin:20px"
              :key="post.id"
            />
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import PostRowItem from "@/components/iterable/PostRowItem.vue";

export default {
  name: "manage",
  components: { PostRowItem },
  data: () => ({}),
  methods: {
    ...mapActions(["LOAD_ALL_POSTS"]),
  },
  mounted() {
    this.LOAD_ALL_POSTS();
  },
  computed: {
    ...mapState(["posts"]),
  },
};
</script>
