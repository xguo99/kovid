<template>
  <div class="signout">
    <button v-on:click="signOut">Sign Out</button>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
export default {
  name: "SignOut",
  
  methods: {
    signOut: function() {
      axios.post('/api/customers/signout',{})
        .then(() => {
          // handle success
          eventBus.$emit('customer-signout-success', {});
        })
        .catch((err) => {
          // Still sign User out so they have to sign in again.
          eventBus.$emit('customer-signout-error', err.response);
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