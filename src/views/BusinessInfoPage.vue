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
    <div v-else-if="this.$cookie.get('account-type')==='customer'">Signed in customer view</div>
    <div id='signout' v-else>
        <div v-if="this.$cookie.get('bAdd')==this.$route.params.businessAddress">
        <button class='btn btn-primary' v-on:click="signOut">Sign Out</button>
        </div>
    </div>
</div>
  <div class='info'>
      <div class='bName'>
      {{this.$route.params.businessName}}
      </div>
      <div class='bAddr'>
      {{this.$route.params.businessAddress}}
      </div>
  </div>

  <div>
    <Description/>
    <OperatingStatus/>
    <Rating/>
    <Review/>
  </div>

  <div v-if="this.$cookie.get('auth') && this.$cookie.get('account-type')==='customer'">
    <ReviewBox/>
  </div>
</div>

</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import Description from "../components/Description.vue";
import OperatingStatus from "../components/OperatingStatus.vue";

import ReviewBox from "../components/ReviewBox.vue";
import Rating from "../components/Rating.vue";
import Review from "../components/Review.vue";


export default {
  name: "InfoPage",
  components: {
     Description,
     OperatingStatus,
     ReviewBox,
     Rating,
     Review
  },
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
.info{
    margin-top: 20px;
    text-align: center;
}
.bName{
  font: icon;
  font-weight: 900;
  font-size: 2.7em;
}
.bAddr{
  margin-top: 5px;
  font-size: 1.4em;
  font-weight: 300;
}
.button{
  display: flex; 
  justify-content: space-between;
}
  
</style>

