<template>
  <div class="page-container">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-5 md-medium-hide" />
      <div class="md-layout-item" style="padding-top:40px;">
        <md-content style="padding: 40px" v-if="postInformation">
          <div class="md-layout">
            <div class="md-layout-item md-size-20">
              <img :src="postInformation.image" />
            </div>
            <div class="md-layout-item">
              <h2>{{ postInformation.title }}</h2>
              <p>
                <b>Published by: </b>
                <b>
                  <i> {{ postInformation.authorName }}</i> </b
                >, {{ postInformation.publisher }}.
              </p>

              <p>
                <b>tags:</b>
                {{ postInformation.tags.toString() }}
              </p>
              <p>{{ postInformation.abstract }}</p>
            </div>
          </div>
          <br />
          <hr />
          <div class="md-layout">
            <div class="md-layout-item">
              <p v-html="postInformation.body"></p>
            </div>
          </div>
        </md-content>
        <md-content style="padding: 40px" v-if="!postInformation">
          <h3>Post not found!</h3>
        </md-content>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "manageProfile",
  data: () => ({ postId: null }),
  computed: {
    ...mapState(["userProfile", "posts"]),
    postInformation() {
      if (this.posts[this.postId]) {
        return this.posts[this.postId];
      }
      return null;
    },
  },
  methods: {
    // ...mapActions(["GET_POST"]),
  },
  mounted() {
    this.postId = this.$route.params.id;
    // this.GET_POST();
  },
};
</script>

<style lang="scss" scoped></style>
