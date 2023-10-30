<template>
    <div class="post-container">
      <div class="post-form">
        <input type="file" @change="handleFileChange" accept="image/*" class="file-input">
        <button @click="submitPost" class="post-button">Post</button>
      </div>
      <div v-if="posts.length > 0" class="posts-list">
        <div v-for="post in posts" :key="post.id" class="post">
          <p>{{ post.text }}</p>
          <img v-if="post.image" :src="post.image" class="posted-image" />
          <hr />
        </div>
      </div>
      <div v-else>
        <p>There are no posts yet.</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const postText = ref('');
  const posts = ref([]);
  
  const submitPost = () => {
    const newPost = {
      id: Math.random().toString(36).substring(7),
      text: postText.value,
      image: imageData
    };
    posts.value.unshift(newPost);
    postText.value = '';
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
    };
    reader.readAsDataURL(file);
  };
  </script>
  
  <style>
  .post-container {
    max-width: 600px;
    margin: 20px auto;
  }
  
  .post-form {
    display: flex;
    flex-direction: column;
  }
  
  .post-textarea {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
  }
  
  .file-input {
    margin-bottom: 10px;
  }
  
  .post-button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .posts-list {
    margin-top: 20px;
  }
  
  .post {
    margin-bottom: 10px;
  }
  
  hr {
    border: 0.5px solid #ddd;
  }
  
  .posted-image {
    max-width: 100%;
    margin-top: 10px;
  }
  </style>
  