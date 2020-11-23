<template>
<div>
  <div class='back'>
      <router-link 
      :to="{name: 'home'}" 
      tag = "button"
      class='btn btn-primary'>
      Back</router-link>   
  </div>
  
  <div class='info'>
      Welcome!
      <br>
      {{this.$route.params.businessName}}
      <br>
      {{this.$route.params.businessAddress}}
  </div>
</div>

</template>

<style scoped>
  *{
    justify-content: flex;
  }
  .info{
      font-size: x-large;
      text-align: center;
  }
</style>