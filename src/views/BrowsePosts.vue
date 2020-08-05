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
              TODO something about this
                All posts on News Buff are free to read, assuming you like adds.
                Otyherwise, pay us monwey and we weill take away the adds for
                you becuase we are coolio like dis.
              </h2>
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
    ...mapActions(["GET_ALL_POSTS"]),
  },
  mounted() {
    this.GET_ALL_POSTS();
  },
  computed: {
    ...mapState(["posts"]),
  },
};
</script>
