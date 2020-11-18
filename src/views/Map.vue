<template>
  <div style="height: 600px; width: 80%">
    <div style="height: 200px overflow: auto;">
      <p>Center is at {{ center }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
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
   this.getData();
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
      nameBusiness:'Dunkin Donut',
      address:'222 Broadway',
      data:{},
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
      axios.get('https://data.cambridgema.gov/resource/9q33-qjp4.json?name='+this.nameBusiness+'s&&phone='+this.address)
          .then((response) => {     
          this.data= response.data;});
    },
  }
};
</script>