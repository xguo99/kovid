<template>
  <div class="subcontainer">
    <div class="review-form-container">
      <form id='create-review' v-on:submit.prevent='createReview' method='post'>

        service rating: <star-rating v-model="serviceRating"></star-rating>
        covid rating: <star-rating v-model="covidRating"></star-rating>
        <input id='content' v-model.trim='content' type='text' name='content'  placeholder="How do you like our service? Enter here...">

        <input type='submit' value="Post Review" id="createReview" class="button">

        <div v-if='success' class="success-message">
          {{ success }}
        </div>

        <div v-if='errors.length' class="error-message">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import StarRating from 'vue-star-rating'

export default {
  name: "ReviewBox",

  components: {
      StarRating
  },

  data() {
    return {
      errors: [],
      success: "",
      content: "",
      covidRating: 0,
      serviceRating: 0
    };
  },

  methods: {
    setServiceRating: function(serviceRating){
        this.serviceRating = serviceRating;
    },

    setCovidRating: function(covidRating){
        this.covidRating = covidRating;
    },

    createReview: function() {
      this.errors = [];

      if (this.content === "") {
        this.errors.push("Review cannot be empty.");
        this.clearMessages();
      } else {
        const bodyContent = { service: this.serviceRating, covid: this.covidRating, comment: this.content,
        username: this.$cookie.get('auth'), business: this.$route.params.businessName, address: this.$route.params.businessAddress};
        axios
          .post("/api/review/", bodyContent)
          .then(review => {
            // handle success
            this.success = "Review created successfully!";
            eventBus.$emit("create-freet-success", review);
          })
          .catch(err => {
            // handle error
            this.errors.push(err.response.data.error);
          })
          .then(() => {
            // always executed
            this.resetForm();
            this.clearMessages();
          });
      }
    },

    resetForm: function() {
      this.content = "";
      this.covidRating = 0;
      this.serviceRating = 0;
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
        this.success = "";
      }, 5000);
    }
  },
};
</script>
