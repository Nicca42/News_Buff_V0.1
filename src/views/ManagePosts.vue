<template>
  <div class="page-container">
    <div class="md-layout">
      <div class="md-layout">
        <div class="md-layout-item">
          <md-content style="padding: 20px;">
            <md-card-header>
              <div class="md-title">
                <h1>View all posts on newsbuff🦄</h1>
              </div>
            </md-card-header>
            <md-content style="padding:40px" class="text-center">
              <h2>
                Here is the content you have posted so far:
              </h2>
            </md-content>
          </md-content>
          <transition-group name="fadeUp" tag="ul">
            <post-row-item
              v-for="post in authorsPosts"
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
  name: "manageProfile",
  components: { PostRowItem },
  data: () => ({}),
  methods: {
    ...mapActions(["GET_ALL_AUTHOR_POSTS"]),
  },
  mounted() {
    this.GET_ALL_AUTHOR_POSTS();
    // this.postId = this.$route.params.id;
  },
  computed: {
    ...mapState(["userProfile", "authorsPosts"]),
  },
};
</script>

<style lang="scss" scoped></style>
