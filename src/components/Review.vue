<template>
  <div class='review'>
      <div class='title'>
        Reviews
      </div>
      <hr> 
      <ReviewList/>
  </div>
</template>

<script>
import ReviewList from "../components/ReviewList.vue";

  export default {
    components: {
        ReviewList
    }
  }
</script>

<style scoped>
.review{
    width: 100%;
    margin-top: 40px;
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






</style>