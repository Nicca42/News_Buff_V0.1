<template>
  <md-card style="padding:30px">
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
        <md-button class="md-raised" @click="showTip = true"
          >Tip Journalist</md-button
        >
        <md-button class="md-raised md-primary" @click="navigateToPost"
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
        <md-button class="md-primary md-raised" @click="donate"
          >Donate</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </md-card>
</template>

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
    ...mapActions(["MAKE_TIP"]),

    donate() {
      console.log("making tip");
      this.MAKE_TIP({
        postId: this.postInformation.postId,
        value: this.offer,
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
