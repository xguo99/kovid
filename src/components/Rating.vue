<template>
  <div class='rating'>
      <div class='title'>
        Rating
      </div>
      <hr>
      <div class='rating-container'>
        <div class="service">
            <span id="service-title">Service </span>
            <star-rating v-model="serviceRating" star-size=30 v-bind:read-only="true" inline=true v-bind:increment="0.02" v-bind:show-rating="false"></star-rating>
            <span id="service-rating">{{serviceRating}}</span>
        </div>
        <div class="covid">
            <span id="covid-title">Covid-19 </span>
            <star-rating v-model="covidRating" star-size=30 v-bind:read-only="true" inline=true v-bind:increment="0.02" v-bind:show-rating="false"></star-rating>
            <span id="covid-rating">{{covidRating}}</span>
        </div>
      </div> 
  </div>
</template>

<script>
import axios from "axios";
import StarRating from 'vue-star-rating'


import { eventBus } from "../main";

  export default {
    data() {
      return {
        serviceRating: "N/A",
        covidRating:"N/A"
      }
    },
    components:{
        StarRating
    },
    created:function(){
      this.update();
      eventBus.$on("create-review-success", () => {
        this.update();
      });
    },

    methods: {
      update:function(){
        axios.get(`/api/businesses/${this.$route.params.businessName}/${this.$route.params.businessAddress}/reviews`,{})
        .then((res) => {
          // handle success
          this.serviceRating=res.data.serviceRating;
          this.covidRating=res.data.covidRating;
        })
      }
    }
  }
</script>

<style scoped>
.rating{
    width: 100%;
    margin-top: 100px;
}
.title{
  margin-top: 0;
  margin-left: 10%;
  font-size: 1.7em;
  /* font-weight: 500; */
  margin-bottom: 2px;
}
hr{
  border: 0.8px solid white;
  margin-left: 10%;
  margin-right: 10%;
  margin-top:2px;
  margin-bottom: 0;
}
/* #0275d8 */
.rating-container{
    display:flex;
    flex-direction: row;
    margin: 10%;
    margin-top:0;
    padding: 10px;
    width: 80%;
    margin-bottom: 0;
}
.service{
    width:50%;
    font-size: 1.7em;
}

.covid{
    width:50%;
    font-size: 1.7em;
}
#service-title{
    margin-left: 80px;
    margin-right: 50px
    /* color: orange; */
}
#service-rating{
    margin-left: 10px;
    color: orange;
}
#covid-title{
    margin-left: 30px;
    margin-right: 50px;
    /* color: orange; */
}
#covid-rating{
    margin-left: 10px;
        color: orange;

}




</style>