<template>
  <div class='box'>
      <div class='title'>
        About the Business
      </div>
      <div class='descript-container'>
          <div v-if="this.$cookie.get('bName')== this.$route.params.businessName && this.$cookie.get('bAdd')== this.$route.params.businessAddress" 
          class='actions'>
                <button type="button" class="btn-primary" size='sm'
                v-on:click='yes'>Edit
                </button>
          </div>
        <div class="mt-2">{{ text }}</div>
        <div class='edit-descript' v-if="edit">
        <input 
            v-model='newContent'
            type='text'>
        <button type="button" class="btn-info" size='sm'
                v-on:click='save'>Save
                </button>
         </div> 
        <div>
          <span id='category'>Category:</span><span id='selected'> {{selected}}</span>
          <div v-if="this.$cookie.get('bName')== this.$route.params.businessName && this.$cookie.get('bAdd')== this.$route.params.businessAddress" 
          class='category'>
            <button type="button" class="btn-primary" size='sm'
                v-on:click='yesC'>Edit
            </button>
           <div v-if='editC'>
            <select v-model="newSelected">
            <option disabled value="">Please select one</option>
            <option>Arts/Entertainment</option>
            <option>Coffee/Tea</option>
            <option>Education</option>
            <option>Event Planning</option>
            <option>Financial Services</option>
            <option>Food</option>
            <option>Health/Medicial</option>
            <option>Hotels/Travel</option>
            <option>Local Services</option>
            <option>Mass Media</option>
            <option>Pet</option>
            <option>Professional Services</option>
            <option>Public/Government Services</option>
            <option>Real Estate</option>
            <option>Religious Organizations</option>
            <option>Others</option>
        </select>
          
          <button type="button" class="btn-info" size='sm'
                v-on:click='saveC'>Save
          </button>
          </div>
        </div>

        </div> 
         
    </div> 
  </div>
  
</template>

<script>
import axios from "axios";

  export default {
    data() {
      return {
        text: 'N/A',
        editC:false,
        edit:false,
        newContent:'',
        success:[],
        selected:'',
        newSelected:''
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
    yesC:function(){
      this.editC=!this.editC;
      this.newSelected=this.selected;
    },
    save:function(){
     this.text=this.newContent;
     const bodyContent = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,content:this.text};
     axios.put('/api/business/description',bodyContent)
     .then(()=>{
         this.success.push('updated!');
     })  
    },
    saveC:function(){
      this.selected=this.newSelected;
      const bodyContent = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,content:this.selected};
      axios.put('/api/business/category',bodyContent)
      .then(()=>{
         this.success.push('updated!');
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
        axios.post('/api/business/category',bodyContent)
        .then((res) => {
          // handle success
          if(res.data.data['category'] != null){
              this.selected=res.data.data['category'];
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
.title{
  margin-top: 5%;
  margin-left: 10%;
  font-size: 1.7em;
  /* font-weight: 500; */
  margin-bottom: 2px;
}
.descript-container{
    margin: 10%;
    margin-top:0;
    padding: 10px;
    width: 80%;
    border: 1px solid;
}
.btn-primary{
    float:right;
}
.mt-2{
    text-align: left;
    font-size: 1.4em;
}
.category{
  display:inline;
}
#category{
  font-weight: 600;
  color:orange;
  font-size: 1.3em;
}
#selected{
  font-size: 1.2em;
}





</style>