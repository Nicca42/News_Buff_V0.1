<template>
  <div class="page-container">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-5 md-medium-hide" />
      <div class="md-layout-item" style="padding-top:40px; padding-left:150px; padding-right:200px;">
        <md-content 
          style="padding-top: 50px; padding-left:50px; padding-right:50px;" 
          v-if="postInformation"
        >
          <div class="md-layout">
            <div 
              class="md-layout-item md-size-20"
              style="padding-top:20px; padding-left:25px;"
            >
              <img :src="postInformation.image" />
            </div>
            <div 
              class="md-layout-item"
              style="padding-right:20px; padding-left:25px;"
            >
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
              <p
                 class="box-text"
                style="padding-right:20px; padding-left:25px;"
              >
                {{ postInformation.abstract }}
              </p>
            </div>
          </div>
          <br />
          <hr />
          <div class="md-layout">
            <div 
              class="md-layout-item;"
              style="padding-right:30px; padding-left:30px;"
            >
              <p 
                v-html="postInformation.body"
              >
              </p>
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
<style lang="scss" scoped>
  .card-expansion {
    height: 480px;
  }
  .md-card {
    width: 1000px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .box-text {
    text-align: justify;
    text-justify: inter-word;
  }


  // Link styling
  .a:link {
    color: #af0404;
    text-decoration: none;
  }

  /* visited link */
  .a:visited {
    color: #FC6161;
    text-decoration: underline;
  }

  /* mouse over link */
  .a:hover {
    color: #FC6161;
  }

  /* selected link */
  .a:active {
    color: #FC6161;
    text-decoration: underline;
  }
</style>
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
