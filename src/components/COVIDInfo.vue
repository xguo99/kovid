<template>
  <div class='box'>
      <div class='title'>
        Covid Info
      </div>
      <div class='covid-info-container'>
        <div v-if="this.$cookie.get('bName')== this.$route.params.businessName && this.$cookie.get('bAdd')== this.$route.params.businessAddress" 
        class='actions'>
            <button v-if="!edit" type="button" class="btn-primary" size='sm'
            v-on:click='yes'>Edit
            </button>
            <button v-else type="button" class="cancel" v-on:click='cancel' >Cancel</button>
        </div>
        <div v-if="!edit" class="mt-2">{{ text }}</div>
        <div class='edit-CovidInfo' v-if="edit">
          <textarea class="new-descript" v-model.trim='newContent' name="newContent" rows="2" cols="79"></textarea>
        </div> 
        <div v-if="edit" class='saveButton'>
            <button type="button" v-on:click='save' class="save-info">Save</button>
        </div>
         
    </div> 
  </div>
  
</template>


<script>
import axios from "axios";

  export default {
    data() {
      return {
        text: 'empty',
        edit:false,
        newContent:'',
        success:[]
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
     axios.put('/api/business/CovidInfo',bodyContent)
     .then(()=>{
         this.success.push('updated!');
     })
     this.edit=!this.edit; 
    },
    cancel:function(){
      this.edit=!this.edit;
    },
    update:function(){
        const bodyContent = { name: this.$route.params.businessName, address: this.$route.params.businessAddress};
        axios.post('/api/business/CovidInfo',bodyContent)
        .then((res) => {
          // handle success
          /* eslint-disable no-console */
          console.log(res);
          /* eslint-enable no-console */
          if(res.data.data['covidinfo'] == null){
              this.text='nothing in db';
          }
          else{
              this.text=res.data.data['covidinfo'];
          }
        })
    }
    }
  }
</script>


<style scoped>
.box{
    width: 40%;
}
.title{
  margin-top: 5%;
  margin-left: 10%;
  font-size: 1.7em;
  margin-bottom: 2px;
}
.covid-info-container{
    margin: 10%;
    margin-top:0;
    padding: 10px;
    width: 80%;
    border: 1px solid;
    margin-bottom: 0;
}
.edit-CovidInfo{
  align-items: baseline;
}
.btn-primary{
    float:right;
}
.cancel{
  float:right;
}
.save-info{
  margin-left: 10px;
}
.mt-2{
    text-align: left;
    font-size: 1.4em;
}
</style>