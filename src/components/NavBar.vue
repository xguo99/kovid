<template>
  <div class="nav-bar-container">
    <div class="nav-bar">
        <span class="logo-container" >
          <router-link 
            :to="{name: 'home'}" 
            tag = "h2" 
          >
            <img src="./logo.png" class="logo-icon">
            Fritter
          </router-link>
        </span>

        <div class = "dropdown">
          <div v-if="username">
            <div aria-haspopup="true" aria-expanded="false" data-toggle="dropdown">
              <img src="./favicon.png" class="user-icon">
              {{username}}
            </div>
            <div class="dropdown-menu dropdown-menu-right hide" aria-labelledby="dropdownMenuLink" >
              <router-link 
                :to="{name: 'user', params: { username: this.username }}" 
                tag = "a" 
                class = "user-profile dropdown-item"
              >
              My Profile
              </router-link>
              <a v-on:click="signOut" class="dropdown-item">Sign Out</a>
            </div>
          </div>
        
          <div v-else>
            <button 
              class="btn btn-primary"
              aria-haspopup="true" 
              aria-expanded="false" 
              data-toggle="dropdown"
            >
              Sign In
            </button>

            <div class="dropdown-menu dropdown-menu-right">
              <SignInComponent/>
              <div class="dropdown-divider"></div>
              <router-link :to="{name: 'signup'}"  class="dropdown-item" href="#">New around here? Sign up</router-link>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import { eventBus } from "../main";
import SignInComponent from "./SignInComponent";

export default {
  name: "navbar",
  data() {
    return {
      username: this.$cookie.get('user-auth') ? this.$cookie.get('user-auth') : "",
    }
  },
  components: {
    axios,
    eventBus,
    SignInComponent
  },
  created: function () {
    eventBus.$on("user-status-update", () => {
      this.username = this.$cookie.get('user-auth') ? this.$cookie.get('user-auth') : "";
    });
  },
  methods: {
    signOut: function() {
      axios.delete('/api/users/session')
        .then(() => {
          eventBus.$emit('signout-success', true);
        })
        .catch(() => {
          eventBus.$emit('signout-success', true);
        })
    }
  }
};
</script>

<style scoped>
  .nav-bar-container {
    padding: 10px;
    background: rgb(0, 153, 255);
    color: black;
  }

  .nav-bar {
    display : flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-container {
    cursor: pointer;
  }

  .logo-icon {
    width: 65px;
    height: 65px;
  }

  .user-icon {
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
</style>
