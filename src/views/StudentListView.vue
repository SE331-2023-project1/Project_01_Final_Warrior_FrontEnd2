<script setup lang="ts">
import StudentCard from "@/components/StudentCard.vue";
import type { StudentItem } from "@/type";
import { ref, watchEffect, computed } from "vue";
import type { Ref } from "vue";
import StudentService from "@/services/StudentService";
// import AddStudent from '@/components/AddStudent.vue'

const students: Ref<Array<StudentItem>> = ref([]);
const totalEvent = ref<number>(0);

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
});
const limit = ref(props.limit);

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / 6);
  return props.page.valueOf() < totalPages;
});

watchEffect(() => {
  StudentService.getStudents(6, props.page).then((response) => {
    students.value = response.data;
    totalEvent.value = response.headers["x-total-count"];
  });
});

console.log(hasNextPage + "eiei");
</script>

<template>
  <main class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Student List</h1>

    <div class="flex flex-row items-center justify-center mb-4">
      <input class="search-input" type="text" placeholder="Search students" />
    </div>
    <div class="flex flex-col items-center">
      <div
        class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
      >
        <StudentCard
          v-for="student in students"
          :key="student.id"
          :student="student"
          class="w-full mb-4"
        />
      </div>
      <!-- Not using add student, keeping code only <AddStudent/> -->
      <div class="pagination flex items-center -space-x-px h-10 mt-4">
        <RouterLink
          :to="{
            name: 'student-list',
            query: { page: page - 1, limit: limit },
          }"
          rel="prev"
          v-if="page != 1 && students.length > 0"
          id="page-prev"
          class="pagination-button"
        >
          Prev Page
        </RouterLink>
        <RouterLink
          :to="{
            name: 'student-list',
            query: { page: page + 1, limit: limit },
          }"
          rel="next"
          v-if="hasNextPage && students.length > 0"
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

.font-bold {
  font-weight: bolder;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  border: 2px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 14px;
  margin-right: 5px;
  justify-content: center;
}

.pagination-button {
  padding: 0.5rem 1rem;
  background-color: #ffc288;
  color: white;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease-in-out;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
}

.pagination-button:hover {
  background-color: #fea82f;
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
