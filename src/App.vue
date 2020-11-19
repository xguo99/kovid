<template>
  <div id="app">

    <router-view/>
  </div>
</template>


<script>
import { eventBus } from "./main";

export default {
  name: "app",
  data() {
    return {
        messages: [],
        isSignedIn: false,
    }  
  },
  beforeCreate: function() {
    let authenticated = this.$cookie.get('user-auth');
    if (!authenticated) {
      this.$router.push("");
    }
  },
  created: function() {
    eventBus.$on("signin-success", (userName) => {
      this.$cookie.set('user-auth', userName);
      this.isSignedIn = true;
      eventBus.$emit('user-status-update');
      this.$router.push({name: 'home'});
    });
    
    eventBus.$on("signout-success", () => {
      this.$cookie.set('user-auth', '');
      this.isSignedIn = false;
      eventBus.$emit('user-status-update');
      this.$router.push({name: 'home'});
    });
  },
  components: {
      eventBus
  }
};
</script>

<!-- global styles -->
<style>
* {
  box-sizing: border-box;
}
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #292b2c;
  color: rgb(240, 240, 240);
}
.success-message {
  color: green;
  margin: auto;
}
.error-message {
  color: red;
  margin: auto;
}
</style>