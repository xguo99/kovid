<template>
  <div class="update-name-container">
    <form class="updateName" v-on:submit.prevent="update" >
        <div class="form-group">
            <label for="inputUsername">New Username:</label>
            <br>
            <input type="text"  id="inputUsername" 
                  placeholder="Username" v-model="newUsername">
        </div>
    
        <button type="submit" class="btn btn-primary">Change Username</button>
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
  name: 'updateName',
  data() {
    return {
      newUsername: "",
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
    update: function() {
      this.clearMessages();
      const bodyContent = { username: this.newUsername };
      axios
        .put('/api/users/updateUsername', bodyContent)
        .then((res) => {
          // handle success
          this.$cookie.set('user-auth', this.newUsername);
          this.$router.push({name: 'user', params: { username: this.newUsername }})
          eventBus.$emit('user-status-update', res.data.username);
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
      this.newUsername = "";
    },
    clearMessages: function() {
      this.errors = [];
    }
  }

}
</script>
<style scoped>
.update-name-container{
  text-align: center;
}
.updateName {
  height: 30vh;
  justify-content: center;
  align-items: center;
}
.form-group{
  justify-content: center;
  align-items: center;
}

</style>