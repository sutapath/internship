<template>
<header class="max-w-7xl mx-auto p-10">
  <div class="flex items-center justify-between"> 
    <p class="flex-1 text-center">
      <span class="text-4xl font-fredoka  dark:text-white">
        store</span>
    </p>  
  </div>
</header> 
<Menu /> 
    
<div>
        <router-view />
    </div>
</template> 

<script setup>  import Menu from '../views/Menu.vue' 


</script>

<style scoped></style>
