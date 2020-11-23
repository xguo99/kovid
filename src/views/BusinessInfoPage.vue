<template>
<div>
  <div class='back'>
      <router-link 
      :to="{name: 'home'}" 
      tag = "button"
      class='btn btn-primary'>
      Back</router-link>   
  </div>
  <div>
    <div v-if="!this.$cookie.get('auth')">Not signed in view</div>
    <div v-else-if="this.$cookie.get('account-type')==='customer'">Signed in customer view</div>
    <div v-else>
        <div v-if="this.$cookie.get('bAdd')==this.$route.params.businessAddress">
        Signed in business view
        <button v-on:click="signOut">Sign Out</button>
        </div>
    </div>
</div>
  <div class='info'>
      Welcome!
      <br>
      {{this.$route.params.businessName}}
      <br>
      {{this.$route.params.businessAddress}}
  </div>
</div>

</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "SignOut",
  created:function(){
    eventBus.$on("business-signout-success", () => {
      this.$cookie.set("auth",'');
      this.$cookie.set("account-type",'');
      this.$cookie.set("bName",'');
      this.$cookie.set("bAdd",'');
      this.$router.push('/').catch(()=>{});
    });

  },
  methods: {
    signOut: function() {
      axios.post('/api/business/signout',{})
        .then(() => {
          // handle success
          eventBus.$emit('business-signout-success', {});
        })
        .catch((err) => {
          // Still sign User out so they have to sign in again.
          eventBus.$emit('business-signout-error', err.response.data.error);
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
*{
    justify-content: flex;
  }
  .info{
      font-size: x-large;
      text-align: center;
  }
</style>

