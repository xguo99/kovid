<template>
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

          <!-- <div v-if='success' class="success-message">
            {{ success }}
          </div>

          <div v-if='errors.length' class="error-message">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
            </ul>
          </div> -->
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
      :lat-lng="center"
      :icon="icon"/>
        <!-- v-for="business in businesses"
        v-bind:key="business.id"
        v-bind:lat-lng="latLng(business.latitude,business.longitude)"
        v-bind:icon="icon"/> -->
    </l-map>

    {{this.data}}
  </div>
</template>


<script>
import axios from "axios";
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
        iconAnchor: [16, 37]
      }),
      iconSize: 64,
      showMap: true,
      nameBusiness:'Dunkin Donuts',
      address:'222 Broadway',
      data:{},
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
          this.data= response.data;
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
        this.nameBusiness=this.content;
        this.getData();
        // this.businesses=this.data.map(busiInfo => {
        //   const geo = Geo.convert(busiInfo.phone);
        //   /* eslint-disable no-console */
        //   console.log(busiInfo);
        //   console.log(geo);
        //   /* eslint-enable no-console */
        //   const lat=geo.latitude;
        //   const lon=geo.longitude;
        //   return {busiInfo,lat,lon};
        // });

      }
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
</style>