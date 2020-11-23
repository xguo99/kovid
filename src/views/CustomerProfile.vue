<template>
<div>
    <router-link to="/">Kovid</router-link>
    <div v-if="!this.$cookie.get('auth')">Not signed in view</div>
    <div v-else-if="this.$cookie.get('account-type')==='customer'">
      Signed in customer view
      <button v-on:click="signOut">Sign Out</button>
    </div>
    <div v-else>
        Signed in business view
        <button v-on:click="signOut">Sign Out</button>
    </div>
</div>
</template>
<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "SignOut",
  created:function(){
    eventBus.$on("customer-signout-success", () => {
      this.$cookie.set("auth",'');
      this.$cookie.set("account-type",'');
      this.$router.push('/').catch(()=>{});
    });
    
  },
  methods: {
    signOut: function() {
      axios.post('/api/customer/signout',{})
        .then(() => {
          // handle success
          eventBus.$emit('customer-signout-success', {});
        })
        .catch((err) => {
          // Still sign User out so they have to sign in again.
          eventBus.$emit('customer-signout-error', err.response.data.error);
        })
    }
  }
}
</script>
<style scoped>
.signout{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 120px;
}
</style>
