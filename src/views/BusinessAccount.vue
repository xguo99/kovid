<template>
  <div id="user-settings">
    <div class="Map">
      <router-link to="/">Interactive Map</router-link>
    </div>

    <div class="signin-signup">
      <BusinessSignIn/>
      <BusinessSignUp/>
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
import { eventBus } from "../main";

export default {
  name: "BusinessAccount",

  components: {
      BusinessSignUp,
      BusinessSignIn
  },

  data() {
    return {
      isSignedIn: false,
      success: [],
      errors: []
    };
  },

  created: function() {
    eventBus.$on("business-signup-success", () => {
      this.success.push("Signup completed successfully.");
      this.clearMessages();
    });

    eventBus.$on("business-signup-error", (err) => {
      this.errors.push(err);
      this.clearMessages();
    });

    eventBus.$on("business-signin-success", () => {
      this.success.push("Signin completed successfully.");
      this.clearMessages();
    });

    eventBus.$on("business-signin-error", (err) => {
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