<template>
  <div id="user-settings">
    <BusinessSignUp/>

    <div v-if='messages.length' class="success-message" style="text-align:center;">
      <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
  </div>
</template>

<script>
import BusinessSignUp from "../components/BusinessSignUp.vue";
import { eventBus } from "../main";

export default {
  name: "BusinessAccount",

  components: {
      BusinessSignUp,
  },

  data() {
    return {
      isSignedIn: false,
      messages: []
    };
  },

  created: function() {

    eventBus.$on("business-signup-success", () => {
      this.messages.push("Signup completed successfully.");
      this.clearMessages();
    });
  },

  methods: {
    clearMessages: function() {
      setInterval(() => {
        this.messages = [];
      }, 5000);
    }
  }
};
</script>