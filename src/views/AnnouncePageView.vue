<script setup lang="ts">
import AnnouncementCard from '@/components/AnnouncementCard.vue'
import type { Advisor, AnnouncementItem } from '@/type'
import { ref, watchEffect, computed } from 'vue'
import type { Ref } from 'vue'
import { useAuthStore } from '@/stores/auth';
import AnnouncementService from '@/services/AnnouncementService'
import AdvisorService from '@/services/AdvisorService';
import router from '@/router';

const posts: Ref<Array<AnnouncementItem>> = ref([])
const advisor = ref<Advisor | null>(null);
const authStore = useAuthStore();

watchEffect(() => {
  AnnouncementService.getAnnouncements(authStore.advisorId as number).then((response) => {
    posts.value = response.data
  })
})

AdvisorService.getAdvisorById(Number(authStore.advisorId)).then((response) => {
    advisor.value = response.data
    }).catch(error => {
        console.log(error)
            if(error.response && error.response.status === 404) {
                router.push({ name: '404-resource', params: { resource: 'event'} })
            }else {
                router.push({ name: 'network-error' })
            }
    })

</script>

<template>
  <div id="feed">
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="post-wrapper">
        <div class="user">
          <!-- <img
            :src="post.user.profilePicture"
            :alt="post.user.name + ' Profile Picture'"
          /> -->
          <span><b>{{ advisor?.name }} {{ advisor?.surname }}</b> posted</span>
        </div>
        <div class="post-content">
          <p>{{ post.message }}</p><br>
          <img :src="post.file" alt="owo" v-if="post.file" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#feed {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post {
  width: 40%;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
}

.post-wrapper {
  display: flex;
  flex-direction: column;
}

.user {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.post-content {
  margin-bottom: 10px;
  max-height: 40%;
  max-width: 40%;
}

.reactions button {
  margin-right: 10px;
}

.comments {
  margin-top: 10px;
}

.comment {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.comment span {
  font-weight: bold;
}
</style>
