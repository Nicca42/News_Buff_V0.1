<template>
  <div class="page-container" style="padding-left:20px; padding-right:20px">
    <div class="md-layout">
      <div class="md-layout">
        <div class="md-layout-item">
          <md-content style="padding: 20px;">
            <md-card-header>
              <div><h1>Post new content</h1></div>
            </md-card-header>

            <p>
              Add your content to the decentralized web to be stored forever.
            </p>
          </md-content>
        </div>
      </div>
    </div>

    <br />
    <form
      class="md-layout"
      novalidate
      @submit.prevent="$v.$touch()"
      style="padding-top:20px"
    >
      <div class="md-layout-item md-size-15 md-size-small-0" />
      <md-content class="md-layout-item md-size-70 md-small-size-100">
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getInputValidationClass('title')">
                <label for="title">Title</label>
                <md-input
                  name="title"
                  id="title"
                  autocomplete="given-name"
                  v-model="inputForm.title"
                />
                <span class="md-error" v-if="!$v.inputForm.title.required"
                  >The title is required</span
                >
                <span class="md-error" v-else-if="!$v.inputForm.title.minlength"
                  >Invalid title</span
                >
              </md-field>
              <md-field :class="getInputValidationClass('description')">
                <label for="description">Description</label>
                <md-input
                  name="description"
                  id="description"
                  autocomplete="given-name"
                  v-model="inputForm.description"
                />
                <span class="md-error" v-if="!$v.inputForm.description.required"
                  >The description is required</span
                >
                <span class="md-error" v-else-if="!$v.inputForm.description.minlength"
                  >Invalid description</span
                >
              </md-field>
              <label for="body">Body</label>
              <tinymce
                id="d1"
                :other_options="tinyOptions"
                v-model="inputForm.body"
              ></tinymce>
            </div>
          </div>

          <div class="md-layout md-gutter"></div>
        </md-card-content>

        <md-card-actions>
          <md-button
            type="submit"
            class="md-raised md-accent"
            @click="createPost"
            >Create Post</md-button
          >
        </md-card-actions>
      </md-content>

      <md-snackbar :md-active.sync="userPost"
        >The user post was saved with success!</md-snackbar
      >
    </form>

    <br />
    <br />
    <md-dialog :md-active.sync="newUser">
      <md-dialog-title>Create an account</md-dialog-title>
      <md-content style="padding:30px">
        <p>
          To use the News Buff platform you first need to create an account.
          This will add your information to the blockchain and be used to verify
          your identity when you add new publications.
        </p>
      </md-content>
    </md-dialog>
    <!-- <mining-transaction /> -->
  </div>
</template>

<script>
import MiningTransaction from "@/components/widgets/MiningTransaction";

import { mapActions, mapState } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import router from "@/router";
import { min } from "bn.js";

export default {
  name: "FormValidation",
  components: { MiningTransaction },
  mixins: [validationMixin],
  data: () => ({
    newUser: false,
    inputForm: {
      title: "",
      description: "",
      tags: [],
      body:
        '<h2 style="color: #8390C2;">Hi there from NewsBuff!</h2> <p>&nbsp;</p> <p><span>You can use this space to design and describe your news post 👯‍♂️</span></p>',
    },
    userPost: false,
    tinyOptions: {
      height: 300,
    },
  }),
  validations: {
    inputForm: {
      title: {
        required,
        minLength: minLength(3),
      },
      description: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(350),
      },
    },
  },
  mounted() {
    console.log("ListPost Mounted");
  },
  methods: {
    ...mapActions(["CREATE_POST"]),
    createPost() {
      console.log("create post clicked");
      if (this.canCreatePost) {
        console.log("Create User method");

        console.log("user create blob", this.inputForm);
        this.CREATE_POST(this.inputForm);
      }
    },

    getInputValidationClass(fieldName) {
      const field = this.$v.inputForm[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },

    clearForm() {
      this.$v.$reset();
      this.inputForm.title = "";
      this.inputForm.tags = [];
      this.inputForm.body = "";
    },
  },
  computed: {
    canCreatePost() {
      if (this.inputForm.title != "" && this.inputForm.body != "") {
        return true;
      }

      console.log("values not added correctly");
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
