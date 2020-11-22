<template>
  <div class="signin">
    <form id="sign-in" class='component' v-on:submit.prevent="signin" method="post">
      <div class="header">
        Sign In
      </div>
      <input id='username' v-model.trim='username' type='text' name='username' placeholder="User's name">
      <input id='password' v-model.trim='password' type='text' name='password' placeholder="User's password">
      <input id='address' v-model.trim='address' type='text' name='address' placeholder="Business address">
      <input type='submit' value='Sign In' class="button">
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "BusinessSignUp",

  data() {
    return {
      username: "",
      password: "",
      address: "",
    }
  },

  created: function() {
  },

  methods:{
    signin: function(){
      const bodyContent = { username: this.username,
                            password: this.password,
                            address: this.address
                          };
      axios
          .post("/api/business/signin", bodyContent)
          .then((res) => {
            // handle success
            eventBus.$emit('business-signin-success', res.data.businessname);
          })
          .catch(err => {
            // handle error
            eventBus.$emit('business-signin-error', err.response.data.error);
          })
          .then(() => {
            // always executed
            this.resetForm();
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
.signin{
  width: 50%;
  display: flex;
  justify-content: right;
  margin-top: 120px;
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
  padding-right: 50px;
  margin-left: 50%;
}

input[type="text"],
input[type="url"] {
  width: 15rem;
}
</style>