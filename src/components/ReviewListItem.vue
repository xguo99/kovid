<template>
  <div class="review-container">
    <div class="review-content-container">
        <div v-if="!this.$route.params.businessAddress" class="business">
            to {{ review.businessname}}
        </div>
        <div v-else class="reviewer"> 
        {{ review.reviewer }} 
        </div>
        <div class="review-ratings-container">
            <div class="service-rating">
                <span id="service">Service</span><span id="service-rating">{{review.servicerating}}</span>
            </div>
            <div class="covid-rating">
                <span id="covid">Covid-19</span><span id="covid-rating">{{review.covidrating}}</span>
            </div>
        </div>
        <div class="review-comment-container">
            <div class="review-comment">
                {{review.comment}} 
            </div>
        </div>
        
        <div v-if="review.reply" class="reply-container">
            <div class="reply-content-container">
            {{review.reply}}
            </div>
        </div>
        <div v-else-if="this.$cookie.get('bAdd')===this.$route.params.businessAddress && !this.reply" class="reply-action">
            <button id="reply" v-on:click="showReplyBox">Reply</button>
        </div>
        <div v-if="this.reply" class="reply-input-container">
            <input class="reply-input" v-model.trim='content' type="text" name="content" placeholder="Reply to your customer...">
            <button id="cancel" v-on:click="showReplyBox">Cancel</button>
            <button id="post" v-on:click="postReply">Post Reply</button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "ReviewListItem",

  props: {
    review: Object
  },

  data() {
    return {
        content:"",
        reply: false
    };
  },

  created: function(){
  },

  computed: {
  },


  methods: {
      showReplyBox:function(){
          this.reply=!this.reply;
      },
      postReply:function(){
          const body={reviewID:this.review.reviewid,reply:this.content}
          axios.post("/api/reply",body)
            .then(() => {
                eventBus.$emit('reply-customer-success', {});
                this.showReplyBox();
            })
            .catch(err =>{
                eventBus.$emit("reply-customer-error", err);
            })
            .then(() => {
                // always executed
                this.content = "";
            });
      }
  }
};
</script>
<style scoped>
.review-container{
  border: 1px solid white;
}
.review-content-container{
    padding: 15px;
}

.business{
    font-size: 1.7em;
    color: orange;
    font-weight: 700;
}
.reviewer{
    font-size: 1.7em;
    color: orange;
    font-weight: 700;
}
.review-comment-container{
    font-size: 1.2em;
    margin-bottom: 5px;
}
.review-ratings-container{
    display: flex;
    flex-direction: row;
}
.review-ratings-container *{
    width: 13%;
}
#service{
}
#service-rating{
    margin-left: 15px;
        color: orange;
        font-size: 1.1em;

}
#covid{
    font-size: 1em;
}
#covid-rating{
    margin-left: 15px;
        color: orange;
        font-size: 1.1em;

}
.reply-container{
    border: 1px solid white;
}
.reply-content-container{
    padding: 15px;
    font-size: 1.2em;
}
.reply-action{
    display: flex;
    flex-direction: row;
    justify-content: right;
}
hr{
  border: 0.8px solid grey;
  margin: 0;
}
</style>