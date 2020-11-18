<template>
  <button v-on:click='sendRefreet' class="btn btn-primary">
    Refreet
  </button>
</template>


<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
    name: 'refreet',
    props: ['author', 'id'],
    methods: {
      sendRefreet: function() {
        const postBody = {author: this.$props.author, id: this.$props.id};
        axios.post('/api/freets/refreet', postBody)
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