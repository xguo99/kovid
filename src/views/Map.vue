<template>
  <div>
    <div class="business-login">
      <div>
        <router-link to="/account/business">For Business</router-link>
      </div>
    </div>
    <div style="height: 600px; width: 80%">
      <div style="height: 200px overflow: auto;">
        <p>Center is at {{ center }} and the zoom is: {{ currentZoom }}</p>
        <!-- <button @click="showLongText">
          Toggle long popup
        </button> -->
        <div class="searchbar">
          <form id='search-bar' v-on:submit.prevent='searchBusi' method='get'>
            <input id='content' v-model.trim='content' type='text' name='content'  placeholder="Business name...">
            <input type='submit' value="Search" id="searchBusi" class="button">
          </form>
        </div>

        <div class="clearbar">
          <form id='clear-bar' v-on:submit.prevent='clearPin' >
            <input type='submit' value="Clear" id="clearPin" class="button">
          </form>
        </div>

      </div>

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
            <div @click="innerClick">
              <div>{{business.name}}</div>
              <div>{{business.phone}}</div>
              <div>{{business.status}}</div>
            </div>
          </l-popup>
        </l-marker>
      </l-map>
      <div v-if='success' class="success-message">
              {{ success }}
      </div>
      <div v-if='errors.length' class="error-message">
          <br>
      <div v-for='error in errors' v-bind:key='error.id'>{{ error }}</div>
      </div>

    </div>
  </div>
</template>


<script>
import axios from "axios";
import { eventBus } from "../main";
import { latLng ,icon} from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip,LIcon } from "vue2-leaflet";

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
    eventBus.$on("search-success", res => {
      this.data=res;
      this.data.forEach(busi=>{
        const body = {busi};
        /* eslint-disable no-console */
          console.log(body);
          /* eslint-enable no-console */
        axios
          .put('/api/searches/search',body)
          .then(res=>{
            this.businesses.push(res.data);
            this.center=latLng(this.businesses[0].latitude,this.businesses[0].longitude);
          })
      })
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
      currentZoom: 11.5,
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
      content:"",
      businesses:[]
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
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    getData:function(){
      axios.get('https://data.cambridgema.gov/resource/9q33-qjp4.json?name='+this.nameBusiness)
          .then((response) => {   
            /* eslint-disable no-console */
            console.log(this.nameBusiness);
            console.log(response.data);
            /* eslint-enable no-console */
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
    }
  }
};
</script>

<style scoped>
  .searchbar {
    display : flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    margin: 10px 0px;
  }
  .searchbar * {
    margin-right: 20px;
  }
  .clearbar{
    display : flex;
  }
</style>