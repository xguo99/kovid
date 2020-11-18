<template>
  <div class = "signup">
    <div class = "signup-container">
      <form class="px-4 py-3" v-on:submit.prevent="signIn" >
        <h1>Welcome to Fritter</h1>
        <h2>Free Speech, Forever.</h2>
        <hr>
            <h4>Create Account</h4>
            <div class="form-group">
                <label for="inputUsername">Username</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="inputUsername" 
                  placeholder="Username" 
                  v-model="signUpUsername"
                >
            </div>
            <div class="form-group">
                <label for="inputPassword">Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="inputPassword" 
                  placeholder="Password" 
                  v-model="signUpPassword"
                >
            </div>
            <button type="submit" class="btn btn-primary">Create Account</button>
            <div v-if='errors.length' class="error-message">
                <br>
                <div v-for='error in errors' v-bind:key='error.id'>{{ error }}</div>
            </div>
        </form>
    </div>
  </div>
    
</template>

<script>

import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "SignUp",
  data() {
    return {
      errors: [],
      signUpUsername: "",
      signUpPassword: ""
    }
  },
  methods: {
    // Function for when a user submits their login
    signIn: function() {
      this.clearMessages();
      const bodyContent = { username: this.signUpUsername , password: this.signUpPassword };
      axios
        .post("/api/users/user", bodyContent)
        .then((res) => {
          // handle success          
          eventBus.$emit('signin-success', res.data.username);
        })
        .catch(err => {
          // handle error
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          this.resetForm();
        });
    },
    resetForm: function() {
      this.signUpUsername = "";
      this.signUpPassword = "";
    },
    clearMessages: function() {
      this.errors = [];
    }
  }
}
</script>

<style scoped>
.signup {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-container {
  width: 500px;
}
hr{
  border: 2px solid #0275d8;
}

</style>