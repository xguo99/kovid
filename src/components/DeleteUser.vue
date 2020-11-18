<template>
    <div class='box'>
        <div class="delete-user-container">
            <div class='content'>
            Do you wish to delete your account?
            <br>
            <div class='actions'>
                <button type="button" class="btn btn-danger btn-lg"
                v-on:click='yes'>Yes, Delete My Account
                </button>
            </div> 
            </div> 
        </div>
    </div>
</template>


<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: 'updatePassword',
  data() {
    return {
        
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
    yes: function() {
      axios
        .delete('/api/users/delete')
        .then(() =>{
           eventBus.$emit('signout-success', true);
        })
        .catch(() => {
          // handle error
          eventBus.$emit('signout-success', true);
        })
    },
  }

}
</script>
<style scoped>
.box{
    width: 100%;
    text-align: center;
}
.delete-user-container{
  margin: 5%;
    text-align: center;
    padding: 20px;
    width: 90%;
    border: 5px solid;
    align-items: center;
}
.content{
    margin: 0;
    font-size: 50px;
    width:100%;
}
.actions {
    display: flex;

    justify-content: space-around;
}


</style>