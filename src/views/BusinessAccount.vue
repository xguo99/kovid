<template>
  <div id="user-settings">
    <div class="Map">
      <router-link to="/">Interactive Map</router-link>
    </div>

    <div v-if="!isSignedIn" class="signin-signup">
      <BusinessSignIn/>
      <BusinessSignUp/>
    </div>
    <div v-else class="signout">
      <BusinessSignOut/>
    </div>

    <div v-if='success.length' class="success-message" style="text-align:center;">
      <div v-for='success_message in success' v-bind:key='success_message.id'>{{ success_message }}</div>
    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BusinessSignUp from "../components/BusinessSignUp.vue";
import BusinessSignIn from "../components/BusinessSignIn.vue";
import BusinessSignOut from "../components/BusinessSignOut.vue";
import { eventBus } from "../main";

export default {
  name: "BusinessAccount",

  components: {
      BusinessSignUp,
      BusinessSignIn,
      BusinessSignOut
  },

  data() {
    return {
      isSignedIn: false,
      success: [],
      errors: []
    };
  },

  created: function() {
    let authenticated = this.$cookie.get("auth");
    if (authenticated){
      this.isSignedIn=true;
    }
    eventBus.$on("business-signup-success", () => {
      this.success.push("Signup completed successfully.");
      this.clearMessages();
    });

    eventBus.$on("business-signup-error", (err) => {
      this.errors.push(err);
      this.clearMessages();
    });

    eventBus.$on("business-signin-success", (businessname) => {
      this.$cookie.set("auth",businessname);
      this.$cookie.set("account-type","business");
      this.isSignedIn=true;
      this.success.push(`Successfully signed in as ${businessname}.`);
      this.clearMessages();
    });

    eventBus.$on("business-signin-error", (err) => {
      this.errors.push(err);
      this.clearMessages();
    });

    eventBus.$on("business-signout-success", () => {
      this.$cookie.set("auth",'');
      this.$cookie.set("account-type",'');
      this.isSignedIn=false;
      this.success.push(`Successfully signed out.`);
      this.clearMessages();
    });

    eventBus.$on("business-signout-error", (err) => {
      this.errors.push(err);
      this.clearMessages();
    });

  },

  methods: {
    clearMessages: function() {
      setInterval(() => {
        this.success = [];
        this.errors = [];
      }, 5000);
    }
  }
};
</script>

<style scoped>

  .Map{
      font-size: x-large;
  }
  .signin-signup{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

  .error-message{
    margin-top: 10px;
  }
  .success-message{
    margin-top: 10px;
  }
</style>