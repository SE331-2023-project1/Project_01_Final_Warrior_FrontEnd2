<script setup lang="ts">
import SideBar from './components/SideBar.vue'
</script>

<template>
  <header>
    <SideBar /> 
    <div class="flex flex-col w-full overflow-auto">
      <RouterView />
    </div>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
*{
  font-family: 'Poppins',sans-serif;
}

.flex {
  display: flex;
  min-height: 100vh;
  background-color: #ffdfc0;
}
</style>