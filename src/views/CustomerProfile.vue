<template>
<div>
  <div class='button'>
    <div id='back'>
      <router-link 
      :to="{name: 'home'}" 
      tag = "button"
      class='btn btn-primary'>
      Back</router-link> 
    </div>  
    <div v-if="!this.$cookie.get('auth')">Not signed in view</div>
    <div id='signout' v-else-if="this.$cookie.get('account-type')==='customer'">
      <button class='btn btn-primary' v-on:click="signOut">Sign Out</button>
    </div>
  </div>
  <div class='info'>
    {{this.$cookie.get('auth')}}
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
.button{
  display: flex; 
  justify-content: space-between;
}

.info{
  margin-top: 20px;
  text-align: center;
  font: icon;
  font-weight: 900;
  font-size: 2.7em;
}
</style>
