<template>
<div class='title'>
    Operating Status

    <div class='container'>
        <div v-if="this.$cookie.get('bName')== this.$route.params.businessName && this.$cookie.get('bAdd')== this.$route.params.businessAddress" class="edit">
            <button v-if="!edit" type="button" x-small v-on:click='yes' class="btn-primary">Edit</button>
            <button v-else type="button" x-small v-on:click='cancel' class="cancel">Cancel</button>
        </div> 
        <div class="date"><span id="day">Monday</span>: {{StatusMon}} {{StartMon}} {{apMon}} -- {{EndMon}} {{apMon2}}</div>
            <div v-if='edit'>
            <select class='status' v-model="newStatusMon">
            <option disabled value=""></option>
            <option>Open</option>
            <option>Closed</option></select>

            <input class="time"  v-if='newStatusMon=="Open"' v-model='newStartMon' type='text'>

            <select class='ampm' v-if='newStatusMon=="Open"' v-model="newapMon">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select> 
            <span v-if='newStatusMon=="Open"'> -- </span>

            <input class="time2" v-if='newStatusMon=="Open"' v-model='newEndMon' type='text'>

            <select class='ampm' v-if='newStatusMon=="Open"' v-model="newapMon2">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select>
        </div>
        <div class="date"><span id="day">Tuesday</span>: {{StatusTue}} {{StartTue}} {{apTue}} -- {{EndTue}} {{apTue2}}</div>
            <div v-if='edit'>
            <select class='status' v-model="newStatusTue">
            <option disabled value=""></option>
            <option>Open</option>
            <option>Closed</option></select>

            <input class="time"  v-if='newStatusTue=="Open"' v-model='newStartTue' type='text'>

            <select class='ampm' v-if='newStatusTue=="Open"' v-model="newapTue">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select> <span v-if='newStatusTue=="Open"'>--</span>

            <input class="time2" v-if='newStatusTue=="Open"' v-model='newEndTue' type='text'>

            <select class='ampm' v-if='newStatusTue=="Open"' v-model="newapTue2">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select>
        </div>
        <div class="date"><span id="day">Wednesday</span>: {{StatusW}} {{StartW}} {{apW}} -- {{EndW}} {{apW2}}</div>
            <div v-if='edit'>
            <select class='status' v-model="newStatusW">
            <option disabled value=""></option>
            <option>Open</option>
            <option>Closed</option></select>

            <input class="time"  v-if='newStatusW=="Open"' v-model='newStartW' type='text'>

            <select class='ampm' v-if='newStatusW=="Open"' v-model="newapW">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select> <span v-if='newStatusW=="Open"'>--</span>

            <input class="time2" v-if='newStatusW=="Open"' v-model='newEndW' type='text'>

            <select class='ampm' v-if='newStatusW=="Open"' v-model="newapW2">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select>
        </div>
        <div class="date"><span id="day">Thursday</span>: {{StatusThur}} {{StartThur}} {{apThur}} -- {{EndThur}} {{apThur2}}</div>
            <div v-if='edit'>
            <select class='status' v-model="newStatusThur">
            <option disabled value=""></option>
            <option>Open</option>
            <option>Closed</option></select>

            <input class="time"  v-if='newStatusThur=="Open"' v-model='newStartThur' type='text'>

            <select class='ampm' v-if='newStatusThur=="Open"' v-model="newapThur">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select> <span v-if='newStatusThur=="Open"'>--</span>

            <input class="time2" v-if='newStatusThur=="Open"' v-model='newEndThur' type='text'>

            <select class='ampm' v-if='newStatusThur=="Open"' v-model="newapThur2">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select>
        </div>
        <div class="date"><span id="day">Fridays</span>: {{StatusF}} {{StartF}} {{apF}} -- {{EndF}} {{apF2}}</div>
            <div v-if='edit'>
            <select class='status' v-model="newStatusF">
            <option disabled value=""></option>
            <option>Open</option>
            <option>Closed</option></select>

            <input class="time"  v-if='newStatusF=="Open"' v-model='newStartF' type='text'>

            <select class='ampm' v-if='newStatusF=="Open"' v-model="newapF">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select> <span v-if='newStatusF=="Open"'>--</span>

            <input class="time2" v-if='newStatusF=="Open"' v-model='newEndF' type='text'>

            <select class='ampm' v-if='newStatusF=="Open"' v-model="newapF2">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select>
        </div>
        <div class="date"><span id="day">Saturday</span>: {{StatusSat}} {{StartSat}} {{apSat}} -- {{EndSat}} {{apSat2}}</div>
            <div v-if='edit'>
            <select class='status' v-model="newStatusSat">
            <option disabled value=""></option>
            <option>Open</option>
            <option>Closed</option></select>

            <input class="time"  v-if='newStatusSat=="Open"' v-model='newStartSat' type='text'>

            <select class='ampm' v-if='newStatusSat=="Open"' v-model="newapSat">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select> <span v-if='newStatusSat=="Open"'>--</span>

            <input class="time2" v-if='newStatusSat=="Open"' v-model='newEndSat' type='text'>

            <select class='ampm' v-if='newStatusSat=="Open"' v-model="newapSat2">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select>
        </div>
        <div class="date"><span id="day">Sunday</span>: {{StatusSun}} {{StartSun}} {{apSun}} -- {{EndSun}} {{apSun2}}</div>
            <div v-if='edit'>
            <select class='status' v-model="newStatusSun">
            <option disabled value=""></option>
            <option>Open</option>
            <option>Closed</option></select>

            <input class="time"  v-if='newStatusSun=="Open"' v-model='newStartSun' type='text'>

            <select class='ampm' v-if='newStatusSun=="Open"' v-model="newapSun">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select> <span v-if='newStatusSun=="Open"'>--</span>

            <input class="time2" v-if='newStatusSun=="Open"' v-model='newEndSun' type='text'>

            <select class='ampm' v-if='newStatusSun=="Open"' v-model="newapSun2">
            <option disabled value=""></option>
            <option>A.M</option>
            <option>P.M</option></select>
        </div>
        <div v-if="edit" class="save">
            <button type="button" class='save' v-on:click='save'>Save</button>
        </div>
    </div>
      {{this.result}}
      
</div> 
</template>

<script>
import axios from "axios";
export default {
    data() {
    return {
       edit:false,
       StatusMon:'',
       StartMon:'',
       EndMon:'',
       apMon:'',
       apMon2:'',
       newStatusMon:'',
       newStartMon:'',
       newEndMon:'',
       newapMon:'',
       newapMon2:'',

       StatusTue:'',
       StartTue:'',
       EndTue:'',
       apTue:'',
       apTue2:'',
       newStatusTue:'',
       newStartTue:'',
       newEndTue:'',
       newapTue:'',
       newapTue2:'',

       StatusW:'',
       StartW:'',
       EndW:'',
       apW:'',
       apW2:'',
       newStatusW:'',
       newStartW:'',
       newEndW:'',
       newapW:'',
       newapW2:'',

       StatusThur:'',
       StartThur:'',
       EndThur:'',
       apThur:'',
       apThur2:'',
       newStatusThur:'',
       newStartThur:'',
       newEndThur:'',
       newapThur:'',
       newapThur2:'',

       StatusF:'',
       StartF:'',
       EndF:'',
       apF:'',
       apF2:'',
       newStatusF:'',
       newStartF:'',
       newEndF:'',
       newapF:'',
       newapF2:'',

       StatusSat:'',
       StartSat:'',
       EndSat:'',
       apSat:'',
       apSat2:'',
       newStatusSat:'',
       newStartSat:'',
       newEndSat:'',
       newapSat:'',
       newapSat2:'',

       StatusSun:'',
       StartSun:'',
       EndSun:'',
       apSun:'',
       apSun2:'',
       newStatusSun:'',
       newStartSun:'',
       newEndSun:'',
       newapSun:'',
       newapSun2:'',
    }
    },
    created:function(){
       this.update();
    },
    methods: {
    yes:function(){
        this.edit=!this.edit;
        this.newStatusMon=this.StatusMon;
        this.newStartMon=this.StartMon;
        this.newEndMon=this.EndMon;
        this.newapMon=this.apMon;
        this.newapMon2=this.apMon2;

        this.newStatusTue=this.StatusTue;
        this.newStartTue=this.StartTue;
        this.newEndTue=this.EndTue;
        this.newapTue=this.apTue;
        this.newapTue2=this.apTue2;

        this.newStatusW=this.StatusW;
        this.newStartW=this.StartW;
        this.newEndW=this.EndW;
        this.newapW=this.apW;
        this.newapW2=this.apW2;

        this.newStatusThur=this.StatusThur;
        this.newStartThur=this.StartThur;
        this.newEndThur=this.EndThur;
        this.newapThur=this.apThur;
        this.newapThur2=this.apThur2;

        this.newStatusF=this.StatusF;
        this.newStartF=this.StartF;
        this.newEndF=this.EndF;
        this.newapF=this.apF;
        this.newapF2=this.apF2;

        this.newStatusSat=this.StatusSat;
        this.newStartSat=this.StartSat;
        this.newEndSat=this.EndSat;
        this.newapSat=this.apSat;
        this.newapSat2=this.apSat2;

        this.newStatusSun=this.StatusSun;
        this.newStartSun=this.StartSun;
        this.newEndSun=this.EndSun;
        this.newapSun=this.apSun;
        this.newapSun2=this.apSun2;

    },
    cancel:function(){
        this.edit=!this.edit;
        this.newStatusMon=this.StatusMon;
        this.newStartMon=this.StartMon;
        this.newEndMon=this.EndMon;
        this.newapMon=this.apMon;
        this.newapMon2=this.apMon2;

        this.newStatusTue=this.StatusTue;
        this.newStartTue=this.StartTue;
        this.newEndTue=this.EndTue;
        this.newapTue=this.apTue;
        this.newapTue2=this.apTue2;

        this.newStatusW=this.StatusW;
        this.newStartW=this.StartW;
        this.newEndW=this.EndW;
        this.newapW=this.apW;
        this.newapW2=this.apW2;

        this.newStatusThur=this.StatusThur;
        this.newStartThur=this.StartThur;
        this.newEndThur=this.EndThur;
        this.newapThur=this.apThur;
        this.newapThur2=this.apThur2;

        this.newStatusF=this.StatusF;
        this.newStartF=this.StartF;
        this.newEndF=this.EndF;
        this.newapF=this.apF;
        this.newapF2=this.apF2;

        this.newStatusSat=this.StatusSat;
        this.newStartSat=this.StartSat;
        this.newEndSat=this.EndSat;
        this.newapSat=this.apSat;
        this.newapSat2=this.apSat2;

        this.newStatusSun=this.StatusSun;
        this.newStartSun=this.StartSun;
        this.newEndSun=this.EndSun;
        this.newapSun=this.apSun;
        this.newapSun2=this.apSun2;
    },
    save:function(){
       this.StatusMon=this.newStatusMon;
       if(this.StatusMon=="Closed"){
            this.StartMon='';
            this.EndMon='';
            this.apMon='';
            this.apMon2='';
       }
       else{
       this.StartMon=this.newStartMon;
       this.EndMon=this.newEndMon;
       this.apMon=this.newapMon;
       this.apMon2=this.newapMon2;
       }

       this.StatusTue=this.newStatusTue;
       if(this.StatusTue=="Closed"){
            this.StartTue='';
            this.EndTue='';
            this.apTue='';
            this.apTue2='';
       }
       else{
       this.StartTue=this.newStartTue;
       this.EndTue=this.newEndTue;
       this.apTue=this.newapTue;
       this.apTue2=this.newapTue2;
       }

       this.StatusW=this.newStatusW;
       if(this.StatusW=="Closed"){
            this.StartW='';
            this.EndW='';
            this.apW='';
            this.apW2='';
       }
       else{
       this.StartW=this.newStartW;
       this.EndW=this.newEndW;
       this.apW=this.newapW;
       this.apW2=this.newapW2;
       }

       this.StatusThur=this.newStatusThur;
       if(this.StatusThur=="Closed"){
            this.StartThur='';
            this.EndThur='';
            this.apThur='';
            this.apThur2='';
       }
       else{
       this.StartThur=this.newStartThur;
       this.EndThur=this.newEndThur;
       this.apThur=this.newapThur;
       this.apThur2=this.newapThur2;
       }

       this.StatusF=this.newStatusF;
       if(this.StatusF=="Closed"){
            this.StartF='';
            this.EndF='';
            this.apF='';
            this.apF2='';
       }
       else{
       this.StartF=this.newStartF;
       this.EndF=this.newEndF;
       this.apF=this.newapF;
       this.apF2=this.newapF2;
       }

       this.StatusSat=this.newStatusSat;
       if(this.StatusSat=="Closed"){
            this.StartSat='';
            this.EndSat='';
            this.apSat='';
            this.apSat2='';
       }
       else{
       this.StartSat=this.newStartSat;
       this.EndSat=this.newEndSat;
       this.apSat=this.newapSat;
       this.apSat2=this.newapSat2;
       }

       this.StatusSun=this.newStatusSun;
       if(this.StatusSun=="Closed"){
            this.StartSun='';
            this.EndSun='';
            this.apSun='';
            this.apSun2='';
       }
       else{
       this.StartSun=this.newStartSun;
       this.EndSun=this.newEndSun;
       this.apSun=this.newapSun;
       this.apSun2=this.newapSun2;
       }
       
       const bodyContent = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,
       content:this.StatusMon+","+this.StartMon+","+this.EndMon+","+this.apMon+","+this.apMon2}; 
       axios.put('/api/business/monday',bodyContent)
        .then(()=>{
         this.success.push('updated!');
     }) 

       const bodyContent2 = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,
       content:this.StatusTue+","+this.StartTue+","+this.EndTue+","+this.apTue+","+this.apTue2}; 
       axios.put('/api/business/tuesday',bodyContent2)
        .then(()=>{
         this.success.push('updated!');
     })  

       const bodyContent3 = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,
       content:this.StatusW+","+this.StartW+","+this.EndW+","+this.apW+","+this.apW2}; 
       axios.put('/api/business/wednesday',bodyContent3)
        .then(()=>{
         this.success.push('updated!');
     })  
        const bodyContent4 = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,
       content:this.StatusThur+","+this.StartThur+","+this.EndThur+","+this.apThur+","+this.apThur2}; 
       axios.put('/api/business/thursday',bodyContent4)
        .then(()=>{
         this.success.push('updated!');
     })  
        const bodyContent5 = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,
       content:this.StatusF+","+this.StartF+","+this.EndF+","+this.apF+","+this.apF2}; 
       axios.put('/api/business/friday',bodyContent5)
        .then(()=>{
         this.success.push('updated!');
     })  
      const bodyContent6 = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,
       content:this.StatusSat+","+this.StartSat+","+this.EndSat+","+this.apSat+","+this.apSat2}; 
       axios.put('/api/business/saturday',bodyContent6)
        .then(()=>{
         this.success.push('updated!');
     })  
     const bodyContent7 = { name: this.$route.params.businessName, address: this.$route.params.businessAddress,
       content:this.StatusSun+","+this.StartSun+","+this.EndSun+","+this.apSun+","+this.apSun2}; 
       axios.put('/api/business/sunday',bodyContent7)
        .then(()=>{
         this.success.push('updated!');
     }) 
     this.edit=!this.edit;
    },
    update:function(){
        const bodyContent = { name: this.$route.params.businessName, address: this.$route.params.businessAddress};
        axios.post('/api/business/schedule',bodyContent)
        .then((res) => {
          // handle success
          if(res.data.data['monday'] != null){
            let result=res.data.data['monday'].split(',');
            this.StatusMon=result[0];
            if(this.StatusMon=="Closed"){
                this.StartMon='';
                this.EndMon='';
                this.apMon='';
                this.apMon2='';
            }
            else{
            this.StartMon=result[1];
            this.EndMon=result[2];
            this.apMon=result[3];
            this.apMon2=result[4];
            }
          }

          if(res.data.data['tuesday'] != null){
            let result=res.data.data['tuesday'].split(',');
            this.StatusTue=result[0];
            if(this.StatusTue=="Closed"){
                this.StartTue='';
                this.EndTue='';
                this.apTue='';
                this.apTue2='';
            }
            else{
            this.StartTue=result[1];
            this.EndTue=result[2];
            this.apTue=result[3];
            this.apTue2=result[4];
            }
          }

          if(res.data.data['wednesday'] != null){
            let result=res.data.data['wednesday'].split(',');
            this.StatusW=result[0];
            if(this.StatusW=="Closed"){
                this.StartW='';
                this.EndW='';
                this.apW='';
                this.apW2='';
            }
            else{
            this.StartW=result[1];
            this.EndW=result[2];
            this.apW=result[3];
            this.apW2=result[4];
            }
          }

          if(res.data.data['thursday'] != null){
            let result=res.data.data['thursday'].split(',');
            this.StatusThur=result[0];
            if(this.StatusThur=="Closed"){
                this.StartThur='';
                this.EndThur='';
                this.apThur='';
                this.apThur2='';
            }
            else{
            this.StartThur=result[1];
            this.EndThur=result[2];
            this.apThur=result[3];
            this.apThur2=result[4];
            }
          }

          if(res.data.data['friday'] != null){
            let result=res.data.data['friday'].split(',');
            this.StatusF=result[0];
            if(this.StatusF=="Closed"){
                this.StartF='';
                this.EndF='';
                this.apF='';
                this.apF2='';
            }
            else{
            this.StartF=result[1];
            this.EndF=result[2];
            this.apF=result[3];
            this.apF2=result[4];
            }
          }

          if(res.data.data['saturday'] != null){
            let result=res.data.data['saturday'].split(',');
            this.StatusSat=result[0];
            if(this.StatusSat=="Closed"){
                this.StartSat='';
                this.EndSat='';
                this.apSat='';
                this.apSat2='';
            }
            else{
            this.StartSat=result[1];
            this.EndSat=result[2];
            this.apSat=result[3];
            this.apSat2=result[4];
            }
          }

          if(res.data.data['sunday'] != null){
            let result=res.data.data['sunday'].split(',');
            this.StatusSun=result[0];
            if(this.StatusSun=="Closed"){
                this.StartSun='';
                this.EndSun='';
                this.apSun='';
                this.apSun2='';
            }
            else{
            this.StartSun=result[1];
            this.EndSun=result[2];
            this.apSun=result[3];
            this.apSun2=result[4];
            }
          }
          
        })
    }
    }
  }
</script>

<style scoped>
.title{
  margin-top: 5%;
  margin-left: 10%;
  font-size: 1.7em; 
  width: 100%;
}
.container{
    margin-top: 2px;
    padding: 10px;
    width: 90%;
    margin-right: 10%;
    border: 1px solid;
    margin-bottom: 0;
    font-size: 0.7em;
    text-align: center;
}
.edit{
    display: flex;
    flex-direction: row;
    justify-content: right;
    /* float:right; */
}

.save{
    display: flex;
    flex-direction: row;
    justify-content: right;
}
.date{
    margin-bottom: 5px;
}
.status{
    width:100px;
}
.time{
    width:40px;
    height: 30px;
    margin-left:0.3cm;
    margin-right: 0.1cm;
}
.time2{
    width:40px;
    height: 30px;
    margin-right: 0.1cm;
}
.ampm{
    width:80px;
}
#day{
    font-weight: 800;
}
</style>