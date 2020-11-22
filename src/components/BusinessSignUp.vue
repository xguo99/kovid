<template>
  <div>
    <form id="sign-up" class='component' v-on:submit.prevent="validate" method="post">
      <input id='username' v-model.trim='username' type='text' name='username' placeholder="User's name">
      <input id='password' v-model.trim='password' type='text' name='password' placeholder="User's password">
      <input id='businessName' v-model.trim='businessName' type='text' name='businessName' placeholder="Business name">      
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
      businessName: "",
      address: "",
    }
  },

  created: function() {
      eventBus.$on("validate-success", () => {
        const bodyContent = { username: this.username, password: this.password, businessName: this.businessName, address: this.address};
          axios
            .post("/api/business", bodyContent)
            .then(() => {
              // handle success
              eventBus.$emit('business-signup-success', true);
            })
            .catch(err => {
              // handle error
              this.errors.push(err.response.data.error);
            });
      });
  },

  methods:{
    validate: function() {
      axios
      .get(`https://data.cambridgema.gov/resource/9q33-qjp4.json?name=${this.businessName}&$$app_token=ERObVliHkBTapyjk2U0736EEU`)
      .then((response)=>{
        if (response.data.length === 0){ 
          this.errors.push(`According to the government database, the entered business does not exist.`);
        } else {
          if (response.data.map(b => b.phone).filter(e => e === this.address).length > 0){
            eventBus.$emit("validate-success");
          } else{
            this.errors.push(`According to the government database, the entered address does not match the business.`);
          }
        }
      })
      .catch(() => {
        this.errors.push(`trouble connecting to Cambridge government database.`);
      })
      .then(() => {
        this.resetForm();
        this.clearMessages();
      });
    },

    resetForm: function() {
      this.username = "";
      this.password = "";
      this.businessName = "",
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