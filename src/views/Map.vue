<template>
  <div>
    <div class="navbar">
      <div class="left-bar">
        <div class="Kovid">Kovid</div>
        <div class="searchbar">
          <form id='search-bar' v-on:submit.prevent='searchBusi' method='get'>
            <input id='content' v-model.trim='content' type='text' name='content'  placeholder="Business name...">
            <input type='submit' value="Search" id="searchBusi" class="button">
          </form>
          <form id="clear-bar" v-on:submit.prevent='clearPin'>
            <input type='submit' value="Clear" id="clearPin" class="button">
          </form>
        </div>
      </div>

      
      <div v-if="!isSignedIn" class="login">
        <div>
          <router-link to="/business">SignIn</router-link>
        </div>
      </div>
      <div v-else class="login">
        <router-link v-if="this.$cookie.get('account-type')==='business'" 
        :to="{name:'businessInfopage',params:{businessName:this.$cookie.get('bName'),businessAddress:this.$cookie.get('bAdd')}}"
        >{{username}}</router-link>
        <router-link v-else to="/customer-profile">{{username}}</router-link>
      </div>
    </div>   

    <div v-if='success.length' class="success-message" style="text-align:center;">
      <div v-for='success_message in success' v-bind:key='success_message.id'>{{ success_message }}</div>
    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
    <div class="main-container">

      <div class="map" style="height: 670px; width: 92%">
        <!-- <div style="height: 200px overflow: auto;"> -->
          <!-- <p>Center is at {{ center }} and the zoom is: {{ currentZoom }}</p> -->
          <!-- <button @click="showLongText">
            Toggle long popup
          </button> -->
        <!-- </div> -->

        <l-map
          v-if="showMap"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="height: 80%"
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
        >
          <l-tile-layer
            :url="url"
            :attribution="attribution"
          />
          <l-marker
            v-for="business in businesses"
            v-bind:key="business.id"
            :lat-lng="[business.latitude,business.longitude]"
            :icon="icon">
            <l-popup>
              <div @click="innerClick(business.name,business.phone)">
                <div>{{business.name}}</div>
                <div>{{business.phone}}</div>
                <div>{{business.status}}</div>
                <router-link id="business-homepage" 
                :to="{name:'businessInfopage',params:{businessName:business.name, businessAddress:business.phone}}">homepage</router-link>
              </div>
            </l-popup>
          </l-marker>
        </l-map>
        <div v-if='errors.length' class="error-message">
            <br>
          <div v-for='error in errors' v-bind:key='error.id'>{{ error }}</div>
        </div>
      </div>
      <div class="filter">
        <div class="filter-title"> Filter </div>
          <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-button block v-b-toggle.accordion-1 color=#eee>Category 
              <div v-if=category>Selected: {{category}}</div>
            </b-button>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <div class="category-filter">
                  <b-form-group class="black-text">
                    <b-form-radio v-model="category" value="Arts/Entertainment">Arts/Entertainment</b-form-radio>
                    <b-form-radio v-model="category" value="Coffee/Tea">Coffee/Tea</b-form-radio>
                    <b-form-radio v-model="category" value="Education">Education</b-form-radio>
                    <b-form-radio v-model="category" value="Event Planning">Event Planning</b-form-radio>
                    <b-form-radio v-model="category" value="Financial Services">Financial Services</b-form-radio>
                    <b-form-radio v-model="category" value="Food">Food</b-form-radio>
                    <b-form-radio v-model="category" value="Health/Medical">Health/Medical</b-form-radio>
                    <b-form-radio v-model="category" value="Hotels/Travel">Hotels/Travel</b-form-radio>
                    <b-form-radio v-model="category" value="Local Services">Local Services</b-form-radio>
                    <b-form-radio v-model="category" value="Mass Media">Mass Media</b-form-radio>
                    <b-form-radio v-model="category" value="Pet">Pet</b-form-radio>
                    <b-form-radio v-model="category" value="Professional Services">Professional Services</b-form-radio>
                    <b-form-radio v-model="category" value="Public/Government Services">Public/Government Services</b-form-radio>
                    <b-form-radio v-model="category" value="Real Estate">Real Estate</b-form-radio>
                    <b-form-radio v-model="category" value="Religious Organizations">Religious Organizations</b-form-radio>
                    <b-form-radio v-model="category" value="Others">Others</b-form-radio>
                  </b-form-group>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-button block v-b-toggle.accordion-2 color=#eee>Mask
              <div v-if=mask>Selected: {{mask}}</div>
            </b-button>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <div class="mask-filter">
                  <b-form-group class="black-text">
                    <b-form-radio v-model="mask" value="Required">Required</b-form-radio>
                    <b-form-radio v-model="mask" value="Not Required">Not Required</b-form-radio>
                  </b-form-group>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-button block v-b-toggle.accordion-3 color=#eee>Hand Sanitizer
              <div v-if=handSanitizer>Selected: {{handSanitizer}}</div>
            </b-button>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <div class="hand-filter">
                  <b-form-group class="black-text">
                    <b-form-radio v-model="handSanitizer" value="Provided">Provided</b-form-radio>
                    <b-form-radio v-model="handSanitizer" value="Not Provided">Not Provided</b-form-radio>
                  </b-form-group>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
          <div class='filter-buttons'>
            <div class='filter-button'>
              <b-button v-on:click='filter' class="filter-busi">Filter</b-button>
            </div>
            <div class='reset-button'>
              <b-button v-on:click='reset' class="reset">Reset</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { eventBus } from "../main";
import { latLng ,icon} from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip,LIcon} from "vue2-leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LIcon
  },
  created: function () {
    //harcode signout
    // this.$cookie.set('auth','');
    // this.$cookie.set('account-type','');
    // this.$cookie.set('bName','');
    // this.$cookie.set('bAdd','');
    
    if(this.$cookie.get("auth")){
      this.isSignedIn=true;
      this.username=this.$cookie.get('auth');
      /* eslint-disable no-console */
          console.log(this.$cookie.get('auth'));
          /* eslint-enable no-console */
    }
    eventBus.$on("search-success", res => {
      this.data=res;
      this.data.forEach(busi=>{
        const business=busi;
        const address = busi.phone;
        // /* eslint-disable no-console */
        //   console.log(address);
        //   /* eslint-enable no-console */
        axios
          .get(`/api/latlong/?address=${address}`,{})
          .then(res=>{
            business['latitude']=res.data.latitude;
            business['longitude']=res.data.longitude
            this.businesses.push(business);
          })
      })
    });
    eventBus.$on("filter-success", res => {
      // /* eslint-disable no-console */
      //     console.log(res);
      //     /* eslint-enable no-console */
      this.data=res;
      this.data.forEach(busi=>{
        const business=busi;
        const address = busi.address;
        // /* eslint-disable no-console */
        //   console.log(address);
        //   /* eslint-enable no-console */
        axios
          .get(`/api/latlong/?address=${address}`,{})
          .then(res=>{
            business['latitude']=res.data.latitude;
            business['longitude']=res.data.longitude
            this.businesses.push(business);
          })
      });
    });
  },
  data() {
    return {
      zoom: 13,
      center: latLng(42.3736, -71.1097),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      //withPopup: latLng(47.41322, -1.219482),
      //withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 13,
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      icon: icon({
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        iconSize: [32, 37],
        iconAnchor: [16, 37]}),
      iconSize: 64,
      showMap: true,
      nameBusiness:'',
      data:[],
      errors:[],
      success: '',
      content:"",
      businesses:[],
      isSignedIn: false,
      username: '',
      category: '',
      mask: '',
      handSanitizer: '',
      searchData: []
    };
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }},
  methods: {
    zoomUpdate() {
      this.currentZoom = 13;
    },
    centerUpdate() {
      this.currentCenter = latLng(42.3736, -71.1097);
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick(name,address) {
      //alert("Click!");
      this.$router.push({ path: `/business/${name}/${address}` }) // -> /user/123;
    },
    getData:function(){
      axios.get(`https://data.cambridgema.gov/resource/9q33-qjp4.json?$where=lower(name) LIKE lower('%25${this.nameBusiness}%25')&$limit=50`)
          .then((response) => {   
            alert("We are searching for matching businesses. Please allow up to 30 seconds for results to be shown.")
            // /* eslint-disable no-console */
            // //console.log(this.nameBusiness);
            // console.log(response.data);
            // console.log(`https://data.cambridgema.gov/resource/9q33-qjp4.json?$where=lower(name) LIKE '%25lower(${this.nameBusiness})%25'&$limit=10`);
            // /* eslint-enable no-console */
            /* eslint-disable no-console */
           console.log('length is ', response.data.length);
          // console.log('data is ', response.data.allData);
          /* eslint-enable no-console */
            if (response.data.length === 50) {
              alert("There are more than 50 matching businesses. We will only show 50 top matches for your convenience.")
            } else if (response.data.length === 0) {
              alert("We failed to find any matching business. Please try again.")
            }
            eventBus.$emit("search-success", response.data);
          }).catch(err => {
            // handle error
            this.errors.push(err.response.data.error);
          })
          .then(() => {
            // always executed
            this.content="";
            this.errors=[];
          });
    },
    filter: function(){
      // get all
      // const bodyContent = {content: this.category};
      /* eslint-disable no-console */
      console.log(this.category);
      /* eslint-enable no-console */
      if(this.businesses){
        this.searchData=this.businesses;
      }
      this.businesses=[];
      this.errors=[];
      axios.get('/api/businesses/all').then((response) => { 
          let allData = response.data.allData;
          if(this.searchData.length > 0){
            /* eslint-disable no-console */
           console.log('has search result');
           console.log(this.searchData);
          // console.log('data is ', response.data.allData);
          /* eslint-enable no-console */
            allData = allData.filter(data => {
              let matchData = this.searchData.filter(busi=>busi.phone===data.address);
              return matchData.length>0;
            })
            /* eslint-disable no-console */
           console.log('new all data is');
           console.log(allData);
          // console.log('data is ', response.data.allData);
          /* eslint-enable no-console */
          }
          /* eslint-disable no-console */
          // console.log('all found');
          // console.log('data is ', response.data.allData);
          /* eslint-enable no-console */
          // if (this.category !== '') {
            allData = allData.filter(busi => {
              return (!this.category || busi.category === this.category)
                      &&(!this.mask || busi.mask===this.mask)
                      &&(!this.handSanitizer || busi.handsanitizer===this.handSanitizer);
            });
          // }
          // if (this.mask !== '') {
          //   allData = allData.filter(busi => busi.mask === this.mask);
          // }
          // if (this.handSanitizer !== '') {
          //   allData = allData.filter(busi => busi.handsanitizer === this.handSanitizer);
          // }
          if (allData.length > 0){
            var i = 0;
            for (i=0; i < allData.length; i++){
              allData[i].name = allData[i].businessname;
              allData[i].phone = allData[i].address;
            }
            eventBus.$emit("filter-success", allData);
          } else {
            alert("No matching business in our database");
          }
        }).catch(err => {
          // handle error
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          // always executed
          this.content="";
          this.errors=[];
        });
      
    },
    reset: function() {
      this.category='';
      this.mask='';
      this.handSanitizer='';
    },
    searchBusi:function(){
      this.errors=[];
      if (this.content === "") {
        this.errors.push("Search cannot be empty.");
        this.clearMessages();
      } else {
        this.businesses=[];
        this.nameBusiness=this.content;
        this.getData();
      }
    },
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
        this.success = "";
      }, 5000);
    },
    clearPin:function(){
        this.error=[];
        this.businesses=[];
        this.nameBusiness='';
        this.searchData=[];
    }
  }
};
</script>

<style scoped>
  .searchbar {
    display : flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    margin: 10px 0px;
  }
  .searchbar form{
    margin-right: 0px;
  }
  .searchbar * {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  .login{
      font-size: x-large;
      display: flex;
      flex-direction: row;
      justify-content: right;
  }
  .login * {
    margin-left: 10px;
  }
  .navbar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .Kovid{
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: xx-large;
  }
  .left-bar{
    display: flex;
    flex-direction: row;
  }
  .left-bar *{
    margin-right: 15px;
  }
  .main-container{
    display: flex;
    flex-direction: row;
  }
  .map{
    margin-left: 15px;
  }
  .collapse {
    margin-top: 5px;
    display:flex; 
    flex-direction: column;
    justify-content: space-evenly;
  }
  .filter-buttons {
    display:flex; 
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 5%;
  }

  .filter{
    margin-left: 10px;
    margin-right: 10px;
    width: 400px;
  }

  .category-filter{
    margin-bottom:20px;
  }
  .mask-filter{
    margin-bottom:20px;
  }
  .hand-filter{
    margin-bottom:40px;
  }
  .filter-title{
    font-weight: 700;
    color: aliceblue;
    font-size: 1.5em;
    margin-bottom: 10px;
    text-align: center;
    background-color:grey;
  }
  .black-text{
    color: black;
  }
</style>