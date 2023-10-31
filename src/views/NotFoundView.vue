<template>
  <div class="flex flex-col items-center mt-20">
    <h1 class="text-4xl text-red-500 mb-4 font-bold">Oops!</h1>
    <h3 class="text-lg text-gray-700 mb-8">The {{ resource }} you're looking for is not here.</h3>
    <button @click="logout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Back to home page
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessageStore } from "@/stores/message";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const isOpen = ref(false);
const store = useMessageStore();
const { message } = storeToRefs(store);
const authStore = useAuthStore();
const router = useRouter();
const token = localStorage.getItem("access_token");
const userRole = localStorage.getItem("user_role");
const id = localStorage.getItem("id");

function logout() {
  authStore.logout();
  router.push({ name: "login" });
}

if (token && userRole) {
  authStore.reload(token, JSON.parse(userRole));
} else {
  authStore.logout();
}
</script>

<style scoped>
  .font-bold {
    font-weight: bold;
  }

  .mt-20 {
    margin-top: 5rem;
  }

  .text-4xl {
    font-size: 2.25rem;
  }

  .text-lg {
    font-size: 1.125rem;
  }

  .text-red-500 {
    color: #DC2626;
  }

  .text-gray-700 {
    color: #4B5563;
  }

  .bg-red-500 {
    background-color: #FFC288;
  }

  .hover\:bg-red-700:hover {
    background-color: #ffac5f;
  }

  .text-white {
    color: #FFFFFF;
  }

  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .rounded {
    border-radius: 0.25rem;
  }

  .hover\:bg-white:hover {
    background-color: #FFFFFF;
  }
</style>
