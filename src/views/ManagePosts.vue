<template>
  <div class="page-container">
    <div class="md-layout">
      <div class="md-layout">
        <div class="md-layout-item">
          <md-content style="padding: 20px;">
            <md-card-header>
              <div class="md-title">
                <h1>View your posts</h1>
              </div>
            </md-card-header>
            <md-content style="padding:40px" class="text-center" v-if="!this.userPost">
              <h2>
                Here is the content you have posted so far:
              </h2>
            </md-content>
            <md-content style="padding:40px" class="text-center" v-if="this.userPost">
              <h2>
                You haven't posted anything yet!
              </h2>
              <p>
                Head over to the Create New Post page to contribute.
              </p>
              <md-button class="md-raised md-accent" @click="authorCreate"
              >Make a post</md-button
            >
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
import PostRowItem from "@/components/iterable/PostRowItem.vue";

import { mapActions, mapState } from "vuex";
import router from "@/router";

export default {
  name: "manageProfile",
  components: { PostRowItem },
  data: () => ({ userPost: false }),
  methods: {
    ...mapActions(["GET_ALL_AUTHOR_POSTS"]),
    authorCreate() {
      router.push({ path: "/ListPost" });
    }
  },
  mounted() {
    this.userPost = this.GET_ALL_AUTHOR_POSTS();
    console.log(this.userPost);
    // this.postId = this.$route.params.id;
  },
  computed: {
    ...mapState(["userProfile", "authorsPosts"]),
  },
};
</script>

<style lang="scss" scoped></style>
