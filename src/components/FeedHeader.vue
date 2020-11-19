<template>
  <div class="header-container">
    <br>
    <h1> Your Fritter Feed</h1>
    <form v-if='isSignedIn' v-on:submit.prevent='postFreet'>
      <input class="textField" type='text' v-model="freetContent"/>
      <button class="submit-button btn-primary" type='submit' >Post Freet</button>
    </form>
  </div>
</template>


<script>

import axios from "axios";
import { eventBus } from "../main";


export default {
  name: "feedHeader",
  data() {
    return {
      isSignedIn: false,
      freetContent: "",
    }
  },
  components: {
    axios,
    eventBus,
  },
  created: function() {
    this.checkStatus();
    eventBus.$on("user-status-update", () => {
      this.checkStatus();
    });
  },
  methods: {
    checkStatus: function() {
      if (this.$cookie.get('user-auth')){
        this.isSignedIn = true;
      } else {
        this.isSignedIn = false;
      }
    },

    postFreet: function() {
      const freetBody = {content: this.freetContent}
      axios.post("/api/freets/create", freetBody)
        .then(() => {
          this.clearField();
          eventBus.$emit('freet-update');
        })
        .catch((err) => {
          alert(err.response.data.error)
        })

    },

    clearField: function() {
      this.freetContent = "";
    }
  }
}
</script>


<style scoped>
.header-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  width: 500px;
}
.textField{
  width: 80%;
}
.submit-button {
  width: 20%;
}
</style>