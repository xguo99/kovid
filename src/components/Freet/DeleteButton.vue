<template>
  <button v-on:click='deleteFreet' class="btn btn-danger">
    Delete
  </button>
</template>


<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
    name: 'delete',
    props: ['id'],
    methods: {
      deleteFreet: function() {
        // const postBody = {id: this.$props.id};
        axios.delete('/api/freets/' + this.$props.id)
          .then(()=>{
            eventBus.$emit('freet-update');
          })
          .catch((err) => {
            alert(err.response.data.error);
          })
      }
    },
    components: {
      axios,
      eventBus
    }
}
</script>