<template>
  <button v-on:click='sendUpvote' class="btn btn-primary">
    <div v-if='upvoted'>
      Upvoted!
    </div>
    <div v-else>
      Upvote
    </div>
  </button>
</template>


<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
    name: 'upvote',
    props: ['author', 'id', 'upvoted'],
    watch: {
      upvoted: function (newVal){
        this.upvote = newVal;
      }
    },
    data() {
      return {
        upvote: this.$props.upvoted,
      }
    },
    methods: {
      sendUpvote: function() {
        const postBody = {author: this.$props.author, id: this.$props.id};
        axios.post('/api/freets/upvote/', postBody)
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