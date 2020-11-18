<template>
  <div class="update-password-container">
    <form class="updatePassword" v-on:submit.prevent="update" >
        <div class="form-group">
            <label for="inputPassword">New Password:</label>
            <br>
            <input type="text" id="inputPassword" 
                  placeholder="Password" v-model="newPassword">
        </div>
    
        <button type="submit" class="btn btn-primary">Change Password</button>
        <br>
        <br>

        <div v-if='errors.length' class="error-message">
            <div v-for='error in errors' v-bind:key='error.id'>{{ error }}</div>
        </div>
       
      <div v-if='success' class="success-message">
        {{success}}
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: 'updatePassword',
  data() {
    return {
      newPassword: "",
      errors: [],
      success: false
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
      const bodyContent = { password: this.newPassword };
      axios
        .put('/api/users/updatePassword', bodyContent)
        .then(res =>{
            this.success=res.data.message;
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
      this.newPassword = "";
    },
    clearMessages: function() {
      this.errors = [];
      this.success = "";
    }
  }

}
</script>
<style scoped>
.update-password-container{
  text-align: center;
}
.updatePassword {
  height: 30vh;
  display:block;
  justify-content: center;
  align-items: center;
}
.form-group{
  justify-content: center;
  align-items: center;
}
.form-control{
  width:300px;
  justify-content: center;
  align-items: center;
}

</style>