<template>
    <div class="container">
      <div class="title">Student Infomation</div>
      <div class="content">
        <form>
          <div class="user-details">
            <div class="profile-image-container">
              <img src="https://media.tenor.com/Y0rQE-mqiUoAAAAC/bocchi-bocchi-the-rock.gif" > <!-- 500x500px!!! --> <!-- <img :src="student?.image" :alt="student?.name" class="w-full h-full object-cover rounded-lg" /> -->
            </div>
            <div class="box">
              <span class="details">ID: {{ student?.id }} </span><!-- {{ student.id }} -->
              <span class="details">Name: Goutou Hitori</span><!-- {{ student.name }} {{ student.surname }} -->
              <span class="details">Department: CAMT</span><!-- {{ student.department }} -->
              <span class="details">Advisor: Kikuri Hiroi</span><!-- {{ student.advisorId }} -->
            </div>
            <div class="button">
              <router-link to="/edit-profile">
                <input type="submit" value="Edit"><!-- Go to Edit Profile -->
              </router-link>
            </div>
            <div class="button">
              <router-link to="/InfoA">
                <input type="submit" value="Advisor" ><!-- Go to AdvisorDetailView -->
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="comment">
      <div class="title">Comment</div>
      <!-- <CommentForm class="mt-4" :studentId="student.id" />
      <CommentList class="mt-4" :studentId="student.id" :key="student.id" /> -->
    </div>
    
  </template>
  
  <script lang="ts">
  import type { StudentItem } from '@/type'
  import { defineProps, type PropType } from 'vue';

defineProps({
  student: {
    type: Object as PropType<StudentItem>,
    required: true
  }
});
  </script>
  
  
  <style scoped>
  *{
      color: black;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Poppins',sans-serif;
    }
    body{
      display: flex;
      height: 100vh;
      justify-content: center;
      align-items: center;
      padding: 10px;
      background: #ffdfc0;
    }
    .container{
      max-width: 700px;
      width: 100%;
      background: #fff;
      padding: 25px 30px;
      border-radius: 5px;
      margin: auto;
    }
    .container .title{
      font-size: 25px;
      font-weight: 500;
    }
    .container form .user-details{
      display: grid;
      grid-template-columns: 120px auto;
      margin: 10px 0 1px 0;
    }
    form .user-details .box{
      margin-bottom: 15px;
      width: calc(100% / 2 - 20px);
    }
    .user-details .box .details{
      display: block;
      width: max-content;
      font-weight: 500;
      margin-bottom: 5px;
    }
    .user-details .box input{
      height: 45px;
      width: 90%;
      outline: none;
      border-radius: 5px;
      border: 1px solid #ccc;
      padding-left: 15px;
      font-size: 16px;
      border-bottom-width: 2px;
      transition: all 0.3s ease;
    }
    .user-details .box input:focus,
    .user-details .box input:valid{
      border-color:  #FFC288;
    }
    form input[type="radio"]{
      display: none;
    }
    form .button{
      height: 45px;
      margin: 5px;
    }
    form .button input{
      height: 100%;
      width: 100%;
      color: #fff ;
      border: none;
      font-size: 18px;
      font-weight: 500;
      border-radius: 5px;
      letter-spacing: 1px;
      background: #FFC288;
    }
    form .button input:hover{
      background: #ffac5f;
    }
    @media(min-width: 1024px){
      #app{
        display: grid;
        grid-template-columns: 1fr;
        padding: 0 2rem;
      }
    }
    @media(max-width: 584px){
     .container{
      max-width: 100%;
    }
    form .user-details .box{
        margin-bottom: 15px;
        width: 100%;
      }
      form .category{
        width: 100%;
      }
      .content form .user-details{
        max-height: 300px;
        overflow-y: scroll;
      }
      .user-details::-webkit-scrollbar{
        width: 5px;
      }
      }
      @media(max-width: 459px){
      .container .content .category{
        flex-direction: column;
      }
      
    }
    .profile-image-container {
      width: 100px; 
      height: 100px; 
      overflow: hidden; 
      border-radius: 50%; 
    }
    .profile-image-container img {
      width: 100%; 
      height: auto;
      object-fit: cover; 
    }
    .comment{
      max-width: 700px;
      width: 100%;
      background: #fff;
      padding: 25px 30px;
      border-radius: 5px;
      margin-top: 10px;
    }
    .comment .title{
      font-size: 25px;
      font-weight: 500;
    }
  </style>
    