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
    <div id='signout' v-if="this.$cookie.get('account-type')==='customer'">
      <button class='btn btn-primary' v-on:click="signOut">Sign Out</button>
    </div>
  </div>

  <div class='info'>
    {{customername}}
  </div>


  <div class>
    <b-card no-body class="tab">
      <b-tabs pills card vertical end>
        <b-tab title="Reviews I gave" active><b-card-text><CustomerReviewList/></b-card-text></b-tab>
        <b-tab title="Replies I received"><b-card-text><CustomerReplyList/></b-card-text></b-tab>
        <b-tab title="Manage My Account"><b-card-text><ManageAccount/></b-card-text></b-tab>
      </b-tabs>
    </b-card>
  </div>


</div>
</template>
<script>
import axios from "axios";
import { eventBus } from "../main";
import CustomerReviewList from "../components/CustomerReviewList.vue";
import CustomerReplyList from "../components/CustomerReplyList.vue";
import ManageAccount from "../components/ManageAccount.vue";

export default {
  name: "SignOut",

  data() {
    return {
      customername: this.$cookie.get('auth'),
    };
  },
  components:{
    CustomerReviewList,
    CustomerReplyList,
    ManageAccount,
  },

  created:function(){
    eventBus.$on("customer-signout-success", () => {
      this.$cookie.set("auth",'');
      this.$cookie.set("account-type",'');
      this.$router.push('/').catch(()=>{});
    });
    
    eventBus.$on("customer-changeusername-success", (newname) => {
      this.$cookie.set("auth", newname);
      this.customername = newname;
    });
  },
  methods: {
    signOut: function() {
      axios.post('/api/customers/signout',{})
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

<style>
.tab {
  background-color: #404040;
}  
</style>