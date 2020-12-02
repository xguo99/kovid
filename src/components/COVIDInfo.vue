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
            <div><span id='mask'>Mask</span>:</div>
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
            <div><span id='hand'>Hand Sanitizer</span>: </div>
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
          <textarea class="new-descript" v-model.trim='newContent' name="newContent" rows="2" cols="29" placeholder="info1: rule1, info2: rule2, info3: rule3..."></textarea>
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
      /* eslint-disable no-console */
          console.log(1);
          /* eslint-enable no-console */
     const bodyContent = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,content:this.newContent};
     this.text = this.newContent;
     /* eslint-disable no-console */
          console.log(2);
          console.log(this.text)
          /* eslint-enable no-console */
     if (this.text == '' || this.text == null) {
       /* eslint-disable no-console */
          console.log(3);
          /* eslint-enable no-console */
      this.showList = [];
      this.showList.push({
        title: 'N/A'
      });
     } else {
       let stored =this.newContent.split(',');
       this.showList = [];
       var i;
       for (i=0; i<stored.length; i++){
        this.showList.push({
        title: stored[i]
        })
      }
     }
     /* eslint-disable no-console */
          console.log(4);
          /* eslint-enable no-console */
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
     /* eslint-disable no-console */
          console.log(5);
          /* eslint-enable no-console */
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
    width: 100%;
    margin-right: 10%;
}
.title{
  margin-top: 13%;
  margin-left: 0%;
  font-size: 1.7em;
  margin-left: 10%;
}
.covid-info-container{
    padding: 10px;
    width: 90%;
    border: 1px solid;
    margin-bottom: 0;
    margin-left: 10%;
    font-size: 1.1em;
}
.edit-CovidInfo{
  align-items: baseline;
  margin-top: 3px;
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
.saveButton{
  display: flex;
    flex-direction: row;
    justify-content: right;
}
.mt-2{
    text-align: left;
    font-size: 1.1em;
}
.handInfo{
  margin-top: 4px;
    text-align: left;
}
.maskInfo{
    text-align: left;
}
.mask{
  display:inline;
}
#mask{
  font-weight: 700;
}
#hand{
  font-weight: 700;
}
#selectedMask{
  margin-left: 5px;
}
#selectedHand{
  margin-left: 5px;
}
.mask-info{
  font-size: 1.1em;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.hand-info{
  font-size: 1.1em;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>