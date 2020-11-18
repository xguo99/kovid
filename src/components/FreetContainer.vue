<template>
  <div >
    <div v-if='freets.length' class = "freet-container">
      <Freet v-for="freet in freets" v-bind:key='freet.id' :freet="freet"/>
    </div>
    <div v-else>
      <h4>
        There are no freets.
      </h4>
    </div>
  </div>
</template>


<script>
import Freet from "./Freet/Freet"

export default {
  name: 'freet',
  props: ['freets'],
  watch: {
    freets(newVal, oldVal){
      if (newVal != oldVal){
        this.freets = newVal;
      }
    }
  },
  data() {
    return {}
  },
  components: {
    Freet,
  }
}
</script>

<style scoped>
.freet-container {
  max-width: 700px;
  min-width: 50pw;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>