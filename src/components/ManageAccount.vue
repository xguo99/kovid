<template>
  <div class="manage-account">
    <div class="header">
        Manage My Account
    </div>
    <form id="change-username" class='component' v-on:submit.prevent="changeUsername" method="put">
      <input id='username' v-model.trim='username' type='text' name='username' placeholder="new username">
      <input type='submit' value='Change Username' class="button">
    </form>

    <form id="change-password" class='component' v-on:submit.prevent="changePassword" method="put">
      <input id='password' v-model.trim='password' type='text' name='password' placeholder="new password">
      <input type='submit' value='Change Password' class="button">
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "ManageAccount",

  data() {
    return {
      username: "",
      password: "",

    }
  },

  created: function() {
  },

  methods:{
    changeUsername: function(){
      const bodyContent = { username: this.username };
      axios
          .put("/api/customers/username", bodyContent)
          .then((res) => {
            // handle success
            eventBus.$emit('customer-changeusername-success', res.data.name);
          })
          .catch(err => {
            // handle error
            eventBus.$emit('customer-changeusername-error', err.response.data.error);
          })
          .then(() => {
            // always executed
            this.resetForm();
          });
    },

    changePassword: function(){
      const bodyContent = { password: this.password };
      axios
          .put("/api/customers/password", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('customer-changepassword-success');
          })
          .catch(err => {
            // handle error
            eventBus.$emit('customer-changepassword-error', err.response.data.error);
          })
          .then(() => {
            // always executed
            this.resetForm();
          });
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
.header{
  font-size: 2em;
  margin-left: 20%;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
  padding-right: 50px;
  margin-left: 20%;
}

input[type="text"],
input[type="url"] {
  width: 15rem;
}
</style>