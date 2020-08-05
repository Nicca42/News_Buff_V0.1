<template>
  <div class="page-container" style="padding-left:20px; padding-right:20px">
    <div class="md-layout">
      <div class="md-layout">
        <div class="md-layout-item">
          <md-content style="padding: 20px;">
            <md-card-header v-if="!this.userProfile.set">
              <div class="md-title">Welcome to News Buff!</div>
              <div class="md-body">You will need to sign 2 transactions to create your 3Box profile.
                Once that is complete, please fill in your name and email below. 
                Clicking create will not generate another transaction.
              </div>
            </md-card-header>
            <md-card-header v-if="this.userProfile.set">
              <div><h1>Your Profile</h1></div>
              <div class="md-body">You can update your user profile here.
              </div>
            </md-card-header>
            <br />
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
        <md-card-header>
          <div class="md-title" v-if="!this.userProfile.set">
            To verify your profile ...
          </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getInputValidationClass('firstName')">
                <label for="first-name">First Name</label>
                <md-input
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  v-model="inputForm.firstName"
                />
                <span class="md-error" v-if="!$v.inputForm.firstName.required"
                  >The first name is required</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.inputForm.firstName.minlength"
                  >Invalid first name</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getInputValidationClass('lastName')">
                <label for="last-name">Last Name</label>
                <md-input
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  v-model="inputForm.lastName"
                />
                <span class="md-error" v-if="!$v.inputForm.lastName.required"
                  >The last name is required</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.inputForm.lastName.minlength"
                  >Invalid last name</span
                >
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter"></div>

          <md-field :class="getInputValidationClass('email')">
            <label for="email">Email</label>
            <md-input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="inputForm.email"
            />
            <span class="md-error" v-if="!$v.inputForm.email.required"
              >The email is required</span
            >
            <span class="md-error" v-else-if="!$v.inputForm.email.email"
              >Invalid email</span
            >
          </md-field>
        </md-card-content>

        <md-card-actions v-if="!this.userProfile.set">
          <md-button
            type="submit"
            class="md-raised md-accent"
            @click="createUser"
            >Create user</md-button
          >
        </md-card-actions v-if="this.userProfile.set">
        <md-card-actions>
          <md-button
            type="submit"
            class="md-raised md-accent"
            @click="createUser"
            >Udate profile</md-button
          >
        </md-card-actions>
      </md-content>

      <md-snackbar :md-active.sync="userSaved"
        >The user {{ lastUser }} was saved with success!</md-snackbar
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
      firstName: "",
      lastName: "",
      email: "",
      university: "",
    },

    userSaved: false,
    lastUser: "",
  }),
  validations: {
    inputForm: {
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(3),
      },

      email: {
        required,
        minLength: minLength(3),
      },
    },
  },
  mounted() {
    console.log("CreateProfile Mounted");
  },
  methods: {
    ...mapActions(["CREATE_USER"]),
    createUser() {
      console.log("user button clicked");
      if (this.canCreateUser) {
        console.log("Create User method");
        const submitBlob = {
          timestamp: new Date(),
          firstName: this.inputForm.firstName,
          lastName: this.inputForm.lastName,
          email: this.inputForm.email,
        };

        console.log("user create blob", submitBlob);
        this.CREATE_USER(submitBlob);
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
      this.inputForm.firstName = "";
      this.inputForm.lastName = "";

      this.inputForm.email = "";
    },
  },
  computed: {
    ...mapState(["posts", "userProfile"]),
    canCreateUser() {
      if (
        this.inputForm.firstName != "" &&
        this.inputForm.lastName != "" &&
        this.inputForm.email != ""
      ) {
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
