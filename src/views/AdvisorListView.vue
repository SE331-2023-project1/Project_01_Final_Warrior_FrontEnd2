<script setup lang="ts">
import AdvisorCard from '@/components/AdvisorCard.vue'
import type { Advisor } from '@/type'
import { ref, watchEffect, computed } from 'vue'
import type { Ref } from 'vue'
import AdvisorService from '@/services/AdvisorService'
// import AddAdvisor from '@/components/AddAdvisor.vue'


const advisors: Ref<Array<Advisor>> = ref([])

const totalEvent = ref<number>(0)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / 6)
  return props.page.valueOf() < totalPages
})

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    required: true
  }
})

watchEffect(() => {
  AdvisorService.getAdvisors(6, props.page).then((response) => {
    advisors.value = response.data
    totalEvent.value = response.headers['x-total-count']
  })
})
const limit = ref(props.limit)
</script>

<template>
  <main class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Advisor List</h1>
    <router-link to="/advisor-register" class="bg-FFC288 hover:bg-FEA82F text-white font-bold py-2 px-4 rounded mb-4 inline-block">Add New Advisor</router-link>
    <div class="flex flex-col items-center">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <AdvisorCard
          v-for="advisor in advisors"
          :key="advisor.id"
          :advisor="advisor"
          class="w-full mb-4"
        />
      </div>
      <!-- Not using add advisor, keeping code only <AddAdvisor/> -->
      <div class="pagination flex items-center -space-x-px h-10 mt-4">
        <RouterLink
          :to="{ name: 'advisor-list', query: { page: page - 1, limit: limit } }"
          rel="prev"
          v-if="page != 1 && advisors.length > 0"
          id="page-prev"
          class="pagination-button"
        >
          Prev Page
        </RouterLink>
        <RouterLink
          :to="{ name: 'advisor-list', query: { page: page + 1, limit: limit } }"
          rel="next"
          v-if="hasNextPage && advisors.length > 0"
          id="page-next"
          class="pagination-button"
        >
          Next Page
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.pagination-button {
  padding: 0.5rem 1rem;
  background-color: #FFC288;
  color: white;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease-in-out;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
}

.pagination-button:hover {
  background-color: #FEA82F;
}

@media (max-width: 767px) {
  .pagination {
    flex-direction: column;
  }
  .pagination-button {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
