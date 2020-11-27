<template>
  <div class="subcontainer">
    <div v-if='success' class="success-message">
    {{ success }}
    </div>
    <div v-if='error' class="error-message">
    {{ error }}
    </div>

    <div class="reviews-container">
        <div v-if="reviews.length">
        <ReviewListItem
            v-for="review in reviews"
            v-bind:key="review.id"
            v-bind:review="review"
        />
        </div>
        <div v-else>
        <p style="text-align: center;">There are no reviews to display.</p>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ReviewListItem from "./ReviewListItem";

import { eventBus } from "../main";

export default {
  name: "CustomerReplyList",

  components: { ReviewListItem },

  data() {
    return {
      error: "",
      success: "",
      reviews: [],
    };
  },

  created: function() {
    
    
    eventBus.$on("create-review-success", () => {
      this.loadReviews();
    });

    eventBus.$on("reply-customer-success", () => {
      this.success = `Reply posted succesfully`;
      this.clearMessages();
      this.loadReviews();
    });

    eventBus.$on("reply-customer-error", res => {
      this.error = `${res.response.data.error}`;
      this.clearMessages();
      this.loadReviews();
    });

  },

  mounted: function() {
    this.loadReviews();
  },

  methods: {
    loadReviews: function() {
      axios.get(`/api/reply/customer/${this.$cookie.get('auth')}`)
      .then(response => {
        this.reviews = response.data.reviews;
        /*eslint-disable no-console*/
        console.log(this.reviews);
        /*eslint-enable no-console*/
      });
    },

    clearMessages: function() {
      setInterval(() => {
        this.success = "";
        this.error = "";
      }, 5000);
    }
  }
};
</script>
<style scoped>
.subcontainer{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.reviews-container{
  display:flex;
  flex-direction: column;
  padding: 10px;
  width: 760px;
}
.reviews-container *{
  margin-bottom: 10px;
}
</style>