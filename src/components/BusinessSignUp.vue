<template>
  <div>
    <form id="sign-up" class='component' v-on:submit.prevent="signUp" method="post">
      <input id='username' v-model.trim='username' type='text' name='username' placeholder="User's name">
      <input id='password' v-model.trim='password' type='text' name='password' placeholder="User's password">
      <input id='address' v-model.trim='address' type='text' name='address' placeholder="Business address">
      <input type='submit' value='Sign Up' class="button">
    </form>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "BusinessSignUp",

  data() {
    return {
      errors: [],
      username: "",
      password: "",
      address: "",
    }
  },

  methods: {
    signUp: function() {
      const bodyContent = { username: this.username, password: this.password, address: this.address};
        axios
          .post("/account/business", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('business-signup-success', true);
          })
          .catch(err => {
            // handle error
            this.errors.push(err.response.data.error);
          })
          .then(() => {
            // always executed
            this.resetForm();
            this.clearMessages();
          });
    },

    resetForm: function() {
      this.username = "";
      this.password = "";
      this.address = "";
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
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
}

input[type="text"],
input[type="url"] {
  width: 15rem;
}
</style>