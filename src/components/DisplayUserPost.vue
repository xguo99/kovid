<template>
  <div>
    <div class='user-post-container'>
      <FreetContainer :freets="freets"/>

    </div>
  </div>
</template>

<script>
import FreetContainer from "../components/FreetContainer";
import { eventBus } from "../main";
import axios from "axios";

export default {
  name: "user-home",
  data() {
    return {
      username: this.$cookie.get('user-auth') ? this.$cookie.get('user-auth') : "",
      freets: [],
      errors: [],
    }
  },
  components: {
    FreetContainer,
    eventBus,
    axios
  },
  methods: {
    updateFeed: function() {
      // Populate the freet feed with all followed freets,
      // if user isn't following anyone, give all freets
    const postbody={author:this.$route.params.username}
    axios.post("/api/freets/author",postbody)
        .then((res) => {
          this.freets = res.data.message;
        })
        .catch((err) => {
          this.errors.push(err.response.data.error)
        }) 
      } 
  },
  created: function () {
    // Update dislay freed feed on load
    this.updateFeed();
    eventBus.$on("user-status-update", () => {
      this.username = this.$cookie.get('user-auth') ? this.$cookie.get('user-auth') : "";
      this.updateFeed();
    });
    eventBus.$on("freet-update", () => {
      this.updateFeed();
    });
  },
};
</script>

<style scoped>
  .user-post-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: left;
  }
</style>