<template>
  <div class="new-review">
    <div class='title'>
      Make a review:
    </div>
    <div class="review-container">
        <form id='create-review' v-on:submit.prevent='createReview' method='post'>
            service rating: <star-rating v-model="serviceRating" star-size="30"></star-rating>
            covid rating: <star-rating v-model="covidRating" star-size="30"></star-rating>
            <br>
            <textarea id="content" v-model.trim='content' name="content" rows="4" cols="115" placeholder="How do you like our service? i.e. I rate a 5 for Covid because the business have great overall precaution..."></textarea>
            <div class='submit-button'>
                <input type='submit' value="Post Review" id="createReview" class="button">
            </div>
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

      if (this.content === ""||!this.serviceRating>0||!this.covidRating>0) {
        this.errors.push("Review cannot be empty.");
        this.clearMessages();
      } else {
        const bodyContent = { service: this.serviceRating, covid: this.covidRating, comment: this.content,
        username: this.$cookie.get('auth'), business: this.$route.params.businessName, address: this.$route.params.businessAddress};
        axios
          .post("/api/reviews", bodyContent)
          .then(review => {
            // handle success
            this.success = "Review created successfully!";
            eventBus.$emit("create-review-success", review);
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

<style scoped>
.new-review{
    width: 100%;
    margin-top: 40px;
}
.title{
  margin-top: 0;
  margin-left: 10%;
  font-size: 1.7em;
  margin-bottom: 2px;
}
.submit-button{
    text-align: right;
}

.review-container{
    display:flex;
    flex-direction: row;
    margin: 10%;
    margin-top:0;
    padding: 10px;
    width: 80%;
    margin-bottom: 0;
}
</style>