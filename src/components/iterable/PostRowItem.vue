<template>
  <md-card style="padding:30px">
    <div class="md-layout">
      <div 
        class="md-layout-item md-size-20"
        style="padding-top:20px; padding-left:25px;"
      >
        <img :src="postInformation.image" />
      </div>
      <div class="md-layout-item">
        <h2
          style="padding-left:50px; padding-right:25px;"
          class="box-text"
        >
          {{ postInformation.title }}
        </h2>
        <p>
          <b>Published by: </b>
          <b>
            <i> {{ postInformation.authorName }}</i> </b
          >, {{ postInformation.publisher }}.
        </p>

        <p
          style="padding-left:50px; padding-right:25px;"
          class="box-text"
        >
          {{ postInformation.abstract }}
        </p>
        <md-button class="md-raised md-primary" @click="showTip = true"
          >Tip Journalist</md-button
        >
        <md-button class="md-raised md-accent" @click="navigateToPost"
          >View Post</md-button
        >
      </div>
    </div>
    <md-dialog :md-active.sync="showTip">
      <md-tabs md-dynamic-height>
        <md-tab md-label="Make tip">
          <p>Thank you for supporting the open news community.</p>
          <p>
            Your funding will support this reporter,
            {{ postInformation.authorName }}.
          </p>
          <p>Please specify the tip amount below.</p>
        </md-tab>
      </md-tabs>

      <md-field style="padding-left:20px">
        <label style="padding-left:20px">tip amount (USD)</label>
        <md-input style="padding:20px" v-model="offer" type="number"></md-input>
      </md-field>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showTip = false">Close</md-button>
        <md-button class="md-accent md-primary" @click="donate"
          >Donate</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </md-card>
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
import router from "../../router";

export default {
  name: "PostRowItem",
  components: {},
  data: () => ({ showTip: false, offer: 0 }),
  props: {
    postInformation: {
      type: Object,
      required: true,
    },
  },
  computed: {
    pageUrl() {
      return window.location.href;
    },
  },
  methods: {
    ...mapActions(["CREATE_TIP"]),

    donate() {
      console.log("making tip");
      this.CREATE_TIP({
        postId: this.postInformation.postId,
        value: this.offer,
        address: this.postInformation.contentAuthorAddress,
      });
    },
    navigateToPost() {
      router.push({
        path: "post/" + this.postInformation.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog {
  max-width: 768px;
}
</style>
