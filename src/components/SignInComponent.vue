<template>
  <div>
    <form class="px-4 py-3" v-on:submit.prevent="signIn" >
        <h4>Sign In</h4>
        <div class="form-group">
            <label for="inputUsername">Username</label>
            <input type="text" class="form-control" id="inputUsername" placeholder="Username" v-model="signInUsername">
        </div>
        <div class="form-group">
            <label for="inputPassword">Password</label>
            <input type="password" 
            class="form-control" 
            id="inputPassword" 
            placeholder="Password" 
            v-model="signInPassword"
            >
        </div>
        <button type="submit" class="btn btn-primary">Sign in</button>
        <div v-if='errors.length' class="error-message">
            <br>
            <div v-for='error in errors' v-bind:key='error.id'>{{ error }}</div>
        </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: 'navbar',
  data() {
    return {
      signInUsername: "",
      signInPassword: "",
      errors: [],
    }
  },
  components: {
    axios,
    eventBus,
  },
  computed: {
  },
  methods: {
    // Function for when a user submits their login
    signIn: function() {
      this.clearMessages();
      const bodyContent = { username: this.signInUsername , password: this.signInPassword };
      axios
        .post("/api/users/signin", bodyContent)
        .then((res) => {
          // handle success
          eventBus.$emit('signin-success', res.data.username);
          // this.$router.push({name: "home"})
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
      this.signInUsername = "";
      this.signInPassword = "";
    },
    clearMessages: function() {
      this.errors = [];
    }
  }

}
</script>