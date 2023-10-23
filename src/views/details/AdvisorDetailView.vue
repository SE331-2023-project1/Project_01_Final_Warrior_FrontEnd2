<script setup lang="ts">
import { defineProps } from 'vue';
import { Advisor } from '@/type';
import Annoucement from '@/components/Annoucement.vue'


defineProps({
  advisor: {
    type: Object as () => Advisor,
    required: true
  }
});
</script>

<template>
  <div class="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
    <div class="text-center">
      <div class="mb-4">
        <img :src="advisor?.images" alt="advisor image" class="rounded-lg shadow-md custom-image">
      </div>
    </div>
    <div class="text-center">
      <div class="mb-6 mt-4">
        <label for="firstName" class="block text-gray-700 text-xl font-bold mb-2">First Name:</label>
        <h2 class="text-base font-semibold mb-2">{{ advisor?.name }}</h2>
      </div>
      <div class="mb-6">
        <label for="lastName" class="block text-gray-700 text-xl font-bold mb-2">Last Name:</label>
        <h2 class="text-base font-semibold mb-2">{{ advisor?.surname }}</h2>
      </div>
      <div class="mb-6">
        <label for="department" class="block text-gray-700 text-xl font-bold mb-2">Department:</label>
        <h2 class="text-base font-semibold mb-2">{{ advisor?.dept }}</h2>
      </div>
      <div class="mb-6">
        <label for="position" class="block text-gray-700 text-xl font-bold mb-2">Position:</label>
        <h2 class="text-base font-semibold mb-2">{{ advisor?.position }}</h2>
      </div>
      <div class="flex justify-center mt-6">
        <router-link to="/advisor" class="inline-block mx-4">
          <button @click="" class="bg-FFC288 hover:bg-FEA82F text-white font-bold py-2 px-4 rounded">Back</button>
        </router-link>
        <router-link to="/advisee" class="text-blue-500 inline-block">
          <button @click="" class="bg-FFC288 hover:bg-FEA82F text-white font-bold py-2 px-4 rounded">Advisee</button>
        </router-link>
        <router-link to="/editadvisor" class="text-blue-500 inline-block mx-4">
          <button @click="" class="bg-FFC288 hover:bg-FEA82F text-white font-bold py-2 px-4 rounded">Edit</button>
        </router-link>
      </div>
      <Annoucement class=""></Annoucement>
    </div>
  </div>
  
</template>

<style>
.max-w-md {
  max-width: 30rem;
  margin: auto;
}

.custom-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>
