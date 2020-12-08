<template>
  <div id="user-settings">
    <div class="Map">
      <router-link id='link' to="/">Kovid</router-link>
    </div>

    <div class="header">
      Business Login Page
    </div>
    <div class="signin-signup">
      <BusinessSignIn/>
      <BusinessSignUp/>
    </div>
    <br>
    <div class="bot">
          <router-link to="/customer">Not a Business? SignIn as Customer</router-link>
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
      success: [],
      errors: []
    };
  },

  created: function() {
    eventBus.$on("business-signup-success", () => {
      this.clearMessages();
      this.success.push("Signup completed successfully.");
      //this.clearMessages();
    });

    eventBus.$on("business-signup-error", (err) => {
      this.clearMessages();
      this.errors.push(err);
      //this.clearMessages();
    });

    eventBus.$on("business-signin-success", (businessname,bName,bAdd) => {
      this.clearMessages();
      this.$cookie.set("auth",businessname);
      this.$cookie.set("account-type","business");   
      this.$cookie.set("bName",bName['businessname']); 
      this.$cookie.set("bAdd",bAdd['address']); 
      this.success.push(`Successfully signed in as ${businessname}.`);
      if(this.$router.path!='/'){
        this.$router.push('/').catch(()=>{});
      }
      //this.clearMessages();
    });

    eventBus.$on("business-signin-error", (err) => {
      this.clearMessages();
      this.errors.push(err);
      //this.clearMessages();
    });
    eventBus.$on("business-signout-error", (err) => {
      this.clearMessages();
      this.errors.push(err);
      //this.clearMessages();
    });
  },

  methods: {
    clearMessages: function() {   
        this.success = [];
        this.errors = [];
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
  .header{
    text-align: center;
    font-size: 30px;
  }
  .bot{
    text-align: center;
    font-size: 20px;
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