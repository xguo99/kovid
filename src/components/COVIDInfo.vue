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
        <div class="mask-container">
          <div class="mask-info">
            <div id='mask'>Mask:</div>
            <div v-if="!edit" id='selectedMask' class="maskInfo"> {{selectedMask}}</div>
            <div v-if='edit'>
              <select v-model="newSelectedMask">
              <option disabled value="">Please select one</option>
              <option>Required</option>
              <option>Not Required</option>
              </select>
            </div>
          </div>
        </div>
        <div class="hand-container">
          <div class="hand-info">
            <div id='hand'>Hand Sanitizer:</div>
            <div v-if="!edit" id='selectedHand' class="handInfo"> {{selectedHand}}</div>
            <div v-if='edit'>
              <select v-model="newSelectedHand">
              <option disabled value="">Please select one</option>
              <option>Provided</option>
              <option>Not Provided</option>
              </select>
            </div>
          </div>
        </div>
        <div v-if="!edit" class="mt-2" >
          <div v-for="show in showList" :key="show.title">
            {{show.title}}
          </div>
        </div>
        <div class='edit-CovidInfo' v-if="edit">
          <textarea class="new-descript" v-model.trim='newContent' name="newContent" rows="2" cols="79" placeholder="info1: rule1, info2: rule2, info3: rule3..."></textarea>
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
        text: '',
        showList: [],
        edit:false,
        newContent:'',
        success:[],
        selectedMask:'',
        newSelectedMask:'',
        selectedHand:'',
        newSelectedHand:''
      }
    },
    created:function(){
        this.update();
    },
    methods: {
    yes: function() {
      this.edit=!this.edit;
      this.newContent=this.text;
      this.newSelectedMask=this.selectedMask;
      this.newSelectedHand=this.selectedHand;
    },
    save:function(){
     const bodyContent = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,content:this.newContent};
     this.text = this.newContent;
     let stored =this.newContent.split(',');
     if (stored == '') {
      this.showList = [];
      this.showList.push({
        title: 'N/A'
      });
     } else {
       this.showList = [];
       var i;
       for (i=0; i<stored.length; i++){
        this.showList.push({
        title: stored[i]
        })
      }
     }
     axios.put('/api/business/CovidInfo',bodyContent)
     .then(()=>{
         this.success.push('updated!');
     })
     this.selectedMask=this.newSelectedMask;
     const bodyContent2 = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,content:this.selectedMask};
      axios.put('/api/business/mask',bodyContent2)
      .then(()=>{
         this.success.push('updated!');
     })  
     this.selectedHand=this.newSelectedHand;
     const bodyContent3 = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,content:this.selectedHand};
     axios.put('/api/business/handSanitizer',bodyContent3)
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
          this.text = res.data.data['covidinfo'];
          if(res.data.data['covidinfo'] == ''){
              this.showList=[];
              this.showList.push({
                title: 'N/A'
              });
          }
          else{
            let stored = res.data.data['covidinfo'].split(',');
            this.showList = [];
            var i;
            for (i=0; i<stored.length; i++){
              this.showList.push({
                title: stored[i]
              })
            }

          }
        })
        axios.post('/api/business/mask',bodyContent)
        .then((res) => {
          // handle success
          if(res.data.data['mask'] != null){
              this.selectedMask=res.data.data['mask'];
          }
        })
        axios.post('/api/business/handSanitizer',bodyContent)
        .then((res) => {
          // handle success
          if(res.data.data['handsanitizer'] != null){
              this.selectedHand=res.data.data['handsanitizer'];
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
    font-size: 1.1em;
}
.handInfo{
    text-align: left;
    font-size: 1.1em;
}
.maskInfo{
    text-align: left;
    font-size: 1.1em;
}
</style>