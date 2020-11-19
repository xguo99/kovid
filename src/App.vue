<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
import { eventBus } from "./main";

export default {
  name: "app",
  data() {
    return {
        messages: [],
    }  
  },
  beforeCreate: function() {
  },
  created: function() {
  },
  components: {
      eventBus
  }
};
</script>

<!-- global styles -->
<style>
* {
  box-sizing: border-box;
}
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #292b2c;
  color: rgb(240, 240, 240);
}
.success-message {
  color: green;
  margin: auto;
}
.error-message {
  color: red;
  margin: auto;
}
</style>