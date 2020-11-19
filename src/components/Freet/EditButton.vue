<template>
  <div>   
    <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#demo' + id" >
        Edit
    </button>

    <!-- modal example from bootstrap -->
    <div class="modal fade" :id="'demo'+id" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Freet</h5>
            <button v-on:click='closeModal' type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Edit your freet:</label>
                <textarea v-model='newContent' class="form-control" id="message-text"></textarea>
                <p v-if='errors' class="error-message">{{errors}}</p>
                <p v-if='success' class="success-message">{{success}}</p>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button v-on:click='closeModal' type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button v-on:click='editFreet' type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
    name: 'edit',
    props: ['id', 'content'],
    data() {
      return {
        newContent: this.$props.content,
        errors: "",
        success: ""
      }
    },
    watch: {
      content: function(){
        this.newContent = this.$props.content;
      }
    },
    methods: {
      editFreet: function() {
        const postBody = { content: this.newContent, id: this.$props.id};
        axios.put('/api/freets/Freet/', postBody)
          .then(()=>{
            eventBus.$emit('freet-update');
            this.success = "Your freet has been edited.";
          })
          .catch((err) => {
            this.clearSuccess();
            this.errors = err.response.data.error;
            // alert(err.response.data.error);
          })
      },
      clearSuccess: function() {
        this.success = "";
      },
      closeModal: function() {
        this.success = "";
        this.errors = "";
        this.newContent = this.$props.content;
      }
    },
    components: {
      axios,
      eventBus
    }
}
</script>

<style scoped>
.textarea {
  width: 100%;
}
.modal {
  color:black;
}
</style>