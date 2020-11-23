<template>
  <div id="user-settings">
    <div class="Map">
      <router-link id='link' to="/">Kovid</router-link>
    </div>

    <div v-if="!isSignedIn" class="signin-signup">
      <CustomerSignIn/>
      <CustomerSignUp/>
    </div>
    <div v-else class="signout">
      <CustomerSignOut/>
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
import CustomerSignUp from "../components/CustomerSignUp.vue";
import CustomerSignIn from "../components/CustomerSignIn.vue";
import CustomerSignOut from "../components/CustomerSignOut.vue";
import { eventBus } from "../main";

export default {
  name: "CustomerAccount",

  components: {
      CustomerSignUp,
      CustomerSignIn,
      CustomerSignOut
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
    eventBus.$on("customer-signup-success", () => {
      this.success.push("Signup completed successfully.");
      this.clearMessages();
    });

    eventBus.$on("customer-signup-error", (err) => {
      this.errors.push(err);
      this.clearMessages();
    });

    eventBus.$on("customer-signin-success", (customername) => {
      this.$cookie.set("auth",customername);
      this.$cookie.set("account-type","customer");
      this.isSignedIn=true;
      this.success.push(`Successfully signed in as ${customername}.`);
      if(this.$router.path!='/'){
        this.$router.push('/').catch(()=>{});
      }
      this.clearMessages();
    });

    eventBus.$on("customer-signin-error", (err) => {
      this.errors.push(err);
      this.clearMessages();
    });
    eventBus.$on("customer-signout-success", () => {
      this.$cookie.set("auth",'');
      this.$cookie.set("account-type",'');
      this.isSignedIn=false;
      this.success.push(`Successfully signed out.`);
      this.clearMessages();
    });

    eventBus.$on("customer-signout-error", (err) => {
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
    display: flex;
      font-size: xx-large;
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
  #link{
    color: white;
    margin-left: 16px;
    margin-top: 20px;
  }
</style>