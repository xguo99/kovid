<template>
  <div class="freet-body-container rounded border-primary">
    <div class="top">
    <router-link 
      :to="{name: 'user', params: { username: freet.author }}" 
      tag = "div"
      class='author' 
    >
    Author: {{freet.author}}
    </router-link>
    <div>Date/Time: {{(new Date(freet.time)).toLocaleString()}}</div>

    </div>

    <div class="mid">
      <h4>Content: {{freet.content}}</h4>
    </div>

    <div class="bot">
    <div>Edited: {{freet.edited}}</div>
    <div>Refreet: {{freet.reFreet}}</div>
    <div>Upvotes: {{freet.upvotes}}</div>
    </div>

    <hr>

    <div class='actions'>
      <Upvote :author='freet.author' :id='freet.userFreetID' :upvoted='upvoted'/>
      <Refreet :author='freet.author' :id='freet.userFreetID'/>
      <Delete v-if='myFreet' :id='freet.userFreetID'/>
      <Edit v-if='myFreet' :id='freet.userFreetID' :content='freet.content'/>
    </div>    
  </div>
</template>


<script>
import axios from "axios";
import { eventBus } from "../../main";
import Upvote from "./UpvoteButton";
import Refreet from "./RefreetButton";
import Delete from "./DeleteButton";
import Edit from "./EditButton";

export default {
  name: "freet",
  props:['freet'], 
  watch: {
    freet: function(){
      this.hasBeenUpvoted();
    }
  },
  data() {
    return{
      upvoted: false,
      username: "",
    }
  },
  computed: {
    myFreet: function() {
      return this.username === this.$props.freet.author
    }
  },
  methods: {
    hasBeenUpvoted: function() {
      this.upvoted = (this.$props.freet.upvoters.indexOf(this.$cookie.get('user-auth')) >= 0);
    }
  },
  components: {
    axios, 
    eventBus,
    Upvote,
    Refreet,
    Delete,
    Edit
  }, 
  created: function(){
    this.hasBeenUpvoted();
    this.username = this.$cookie.get('user-auth') ? this.$cookie.get('user-auth') : "";
    eventBus.$on("user-status-update", () => {
      this.username = this.$cookie.get('user-auth') ? this.$cookie.get('user-auth') : "";
    });
  },
}
</script>

<style scoped>
  h4 {
    word-break: break-all;
  }
  .freet-body-container {
    margin: 20px;
    padding: 10px;
    width: 100%;
    border: 5px solid;
  }
  .top{
    display: flex;
    justify-content: space-between;
  }
  .mid{
    display: flex;
    justify-content: space-between;
  }
  .bot{
    display: flex;
    justify-content: space-between;
  }
  .actions {
    display: flex;
    justify-content: space-around;
  }
  .author{
    cursor: pointer;
  }
  hr{
    border: 0.5px solid #0275d8;
  }
</style>