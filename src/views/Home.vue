<template>
  <div>
    <div class='home-container'>
      <FeedHeader/>

      <div v-if='username' >
        <br>
        <div class="btn-group" role="group" aria-label="Account Setting">
          <button type="button" class="btn btn-secondary"
          v-on:click='toggleFollowing'>Following Freets
          </button>
          <button type="button" class="btn btn-secondary"
          v-on:click='toggleAll'>All Freets
          </button>
        </div>
        <br>
      </div>

      <div v-if='showFollowing'>
        <div v-if='following.length'>
          <FreetContainer :freets="followingFreets"/>
        </div>
        <div v-else class='centered'>
          <br>
          <h6>You are not currently following anyone.</h6>
          <h6>Showing All Freets</h6>
          <FreetContainer :freets="allFreets"/>
        </div>
      </div>
      <div v-else-if="showAll">
        <FreetContainer :freets="allFreets"/>
      </div>

    </div>
  </div>
</template>

<script>
import FreetContainer from "../components/FreetContainer";
import FeedHeader from "../components/FeedHeader";
import { eventBus } from "../main";
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      username: this.$cookie.get('user-auth') ? this.$cookie.get('user-auth') : "",
      feedToggle: 1,
      followingFreets: [],
      following: [],
      allFreets: [],
      errors: [],
    }
  },
  computed: {
    showFollowing: function(){
      return this.feedToggle == 0;
    },
    showAll: function(){
      return this.feedToggle == 1;
    }
  },
  components: {
    FreetContainer,
    FeedHeader,
    eventBus,
    axios
  },
  methods: {
    updateFeed: function() {
      // Populate the freet feed with all followed freets,
      // if user isn't following anyone, give all freets
      this.username = this.$cookie.get('user-auth') ? this.$cookie.get('user-auth') : "";
      if (this.username !== "") {
        axios.get("/api/freets/myFeed")
        .then((res) => {
          this.followingFreets = res.data.freets;
        })
        .catch((err) => {
          this.errors.push(err.response.data.error)
        })
        .then(() => {
          axios.get('/api/users/following')
          .then((res) => {
            this.following = res.data.following;
          })
        })
      } else {
        this.followingFreets = []
      }

      axios.get("/api/freets/allFreets")
        .then((res) => {
          this.allFreets = res.data.freets;
        })
        .catch((err) => {
          this.errors.push(err.response.data.error)
        })
    },
    toggleFollowing: function() {
      this.feedToggle = 0;
    },
    toggleAll: function() {
      this.feedToggle = 1;
    }

  },
  created: function () {
    // Update dislay freed feed on load
    this.updateFeed();
    eventBus.$on("user-status-update", () => {
      this.username = this.$cookie.get('user-auth') ? this.$cookie.get('user-auth') : "";
      this.updateFeed();
      this.toggleAll();
    });
    eventBus.$on("freet-update", () => {
      this.updateFeed();
    });
  },
};
</script>

<style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: left;
  }
  hr{
    border: 2px solid #0275d8;
  }
  .centered{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>