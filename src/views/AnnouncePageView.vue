<script setup lang="ts">
import AnnouncementCard from '@/components/AnnouncementCard.vue'
import type { AnnouncementItem } from '@/type'
import { ref, watchEffect, computed } from 'vue'
import type { Ref } from 'vue'
import { useAuthStore } from '@/stores/auth';
import AnnouncementService from '@/services/AnnouncementService'

const posts: Ref<Array<AnnouncementItem>> = ref([])
const authStore = useAuthStore();

watchEffect(() => {
  AnnouncementService.getAnnouncements(authStore.advisorId as number).then((response) => {
    posts.value = response.data
  })
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
          <!-- <span>{{ post.user.name }}</span> -->
        </div>
        <div class="post-content">
          <p>{{ post.message }}</p>
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
  width: 60%;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
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
