<template>
  <div class='box'>
      <div class='descript-container'>
          <div v-if="this.$cookie.get('bName')== this.$route.params.businessName && this.$cookie.get('bAdd')== this.$route.params.businessAddress" 
          class='actions'>
                <button type="button" class="btn-primary" size='sm'
                v-on:click='yes'>Edit
                </button>
          </div>
        <div class="mt-2">Business Description: {{ text }}</div>
        <div class='edit-descript' v-if="edit">
        <input 
            v-model='newContent'
            type='text'>
        <button type="button" class="btn-primary" size='sm'
                v-on:click='save'>Save
                </button>
         </div>  
    </div> 
  </div>
  
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

  export default {
    data() {
      return {
        text: 'N/A',
        edit:false,
        newContent:'',
        success:[],
      }
    },
    created:function(){
        this.update();
    },
    methods: {
    yes: function() {
      this.edit=!this.edit;
      this.newContent=this.text;
    },
    save:function(){
     this.text=this.newContent;
     const bodyContent = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,content:this.text};
     axios.put('/api/business/description',bodyContent)
     .then(()=>{
         eventBus.$emit('descrpition-success', {});
     })  
    },
    update:function(){
        const bodyContent = { name: this.$route.params.businessName, address: this.$route.params.businessAddress};
        axios.post('/api/business/description',bodyContent)
        .then((res) => {
          // handle success
          if(res.data.data['description'] == null){
              this.text='N/A';
          }
          else{
              this.text=res.data.data['description'];
          }
        })
    }
    }
  }
</script>

<style scoped>
.box{
    width: 100%;
}
.descript-container{
    margin: 10%;
    margin-top:5%;
    padding: 10px;
    width: 80%;
    border: 5px solid;
}
.btn-primary{
    float:right;
}
.mt-2{
    text-align: left;
}




</style>