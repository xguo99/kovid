<template>
  <div class="error-container">
    <br>
    <h1>K-ovid 404</h1> 
    <h2>One is never lost, only found what others have not.</h2>
    <br>
    <router-link 
      :to="{name: 'home'}" 
      tag = "button"
      class='btn btn-primary' 
    >
      Home
    </router-link>
  </div>
</template>

<style scoped>
  .error-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>