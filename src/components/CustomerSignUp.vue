<template>
  <div class="signup">
    <form id="sign-up" class='component' v-on:submit.prevent="signup" method="post">
      <div class="header">
        Sign Up
      </div>
      <input id='username' v-model.trim='username' type='text' name='username' placeholder="User's name">
      <input id='password' v-model.trim='password' type='text' name='password' placeholder="User's password">
      <input type='submit' value='Sign Up' class="button">
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "CustomerSignUp",

  data() {
    return {
      username: "",
      password: "",
    }
  },

  created: function() {
  },

  methods:{
    signup: function(){
        const bodyContent = { username: this.username, password: this.password};
        axios
          .post("/api/customers", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('customer-signup-success', true);
          })
          .catch(err => {
            // handle error
            eventBus.$emit('customer-signup-error', err.response.data.error);
          })
          .then(() => { this.resetForm(); });
    },

    resetForm: function() {
      this.username = "";
      this.password = "";
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
  }
}
</script>

<style scoped>
.signup{
  width: 50%;
  display: flex;
  justify-content: left;
  margin-top: 70px;
}
.header{
  margin-bottom: 10px;
  font-size: 2em;
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
  padding-left: 50px;
}

input[type="text"],
input[type="url"] {
  width: 15rem;
}
</style>