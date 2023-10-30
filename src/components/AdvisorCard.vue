<template>
  <div>
    <RouterLink class="advisor-link hover:scale-105 transform transition-transform duration-300 hover:shadow-md"
      :to="{ name: 'advisor-detail', params: { id: advisor?.id } }">
      <article class="w-full bg-white rounded-lg overflow-hidden hover:shadow-md h-96">
        <div class="relative w-full h-64 bg-cover bg-center">
          <img :src="advisor?.images" :alt="advisor?.name" class="w-full h-full object-cover" />
        </div>
        <div class="p-4">
          <p class="text-xs text-gray-500 mb-1">
            Advisor
          </p>
          <div class="text-gray-800 font-bold text-lg mb-1">{{ advisor?.name }} {{ advisor?.surname }}</div>
          <p class="text-gray-700 text-sm mb-1">ID: {{ advisor?.id }}</p>
          <p class="text-gray-700 text-sm mb-1">No. of advisee: {{ advisor?.ownStudent.length }}</p>
        </div>
      </article>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { Advisor } from '@/type'
import type { PropType } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  advisor: {
    type: Object as PropType<Advisor>,
    require: true
  }
})
</script>