<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import * as yup from 'yup'

const authStore = useAuthStore()
const router = useRouter()
const storeMessage = useMessageStore()

const validationSchema = yup.object({
  firstName: yup.string()
    .required('Firstname is required')
    .matches(/^[A-Za-z]+$/, 'Only alphabetic characters'),

  lastName: yup.string()
    .required('LastName is required')
    .matches(/^[A-Za-z]+$/, 'Only alphabetic characters'),

  email: yup.string()
    .required('Email is required')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Email address should ending with @example.com'),

  username: yup.string()
    .required('Username is required'),

  password: yup.string()
    .required('Password is required'),
})

const { errors, handleSubmit } = useForm({
  validationSchema,

  initialValues: { 
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  }
})

const onSubmit = handleSubmit((values) => {
  authStore
    .advisorRegister(values.firstName, values.lastName, values.email,values.username, values.password)
    .then(() => {
      router.push({ name: 'about' })
      storeMessage.updateMessage('Add Advisor Successfully');
      setTimeout(() => {
        storeMessage.resetMessage()
      }, 4000)

    })
    .catch(() => {
      storeMessage.updateMessage('could not add advisor')

      setTimeout(() => {
        storeMessage.resetMessage()
      }, 3000)
    })
})


const { value: firstName } = useField<string>('firstName')
const { value: lastName } = useField<string>('lastName')
const { value: email } = useField<string>('email')
const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')
</script>

<template>
 <div class="container">
      <div class="title">Advisor Registration</div>
      <div class="content">
        <form @submit.prevent="onSubmit">
          <div class="user-details">
            <div class="input-box">
              <span class="details">Firstname </span>
              <input type="text" v-model="firstName" placeholder="Firstname" required>
              <div v-if="errors['firstName']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
              {{ errors['firstName'] }}</div>
            </div>
            <div class="input-box">
              <span class="details">Lastname </span>
              <input type="text" v-model="lastName" placeholder="LastName" required>
              <div v-if="errors['lastName']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
              {{ errors['lastName'] }}</div>
            </div>
            <div class="input-box">
              <span class="details">Email </span>
              <input type="text" v-model="email" placeholder="Email" required>
              <div v-if="errors['email']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
              {{ errors['email'] }}</div>
            </div>
            <div class="input-box">
              <span class="details">Username </span>
              <input type="text" v-model="username" placeholder="Username" required>
              <div v-if="errors['username']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
              {{ errors['username'] }}</div>
            </div>
            <div class="input-box">
              <span class="details">Password </span>
              <input type="password" v-model="password" placeholder="Password" required>
              <div v-if="errors['password']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
              {{ errors['password'] }}</div>
            </div>
          </div>
          
          <div class="button">
            <input type="submit" value="Register">
          </div>
        </form>
      </div>
    </div>
</template>


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
    background: #1F2937;
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
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0 12px 0;
  }
  form .user-details .input-box{
    margin-bottom: 15px;
    width: calc(100% / 2 - 20px);
  }
  .user-details .input-box .details{
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
  }
  .user-details .input-box input{
    height: 45px;
    width: 95%;
    outline: none;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding-left: 15px;
    font-size: 16px;
    border-bottom-width: 2px;
    transition: all 0.3s ease;
  }
  .user-details .input-box input:focus,
  .user-details .input-box input:valid{
    border-color:  #FFC288;
  }
  .user-details .input-box-img .details{
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
  }
  .user-details .input-box-img input{
    height: 45px;
    width: auto;
    outline: none;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding-left: 15px;
    padding-top: 8px;
    font-size: 16px;
    border-bottom-width: 2px;
    transition: all 0.3s ease;
  }
  .user-details .input-box input:focus,
  .user-details .input-box input:valid{
    border-color:  #FFC288;
  }
  
  form input[type="radio"]{
    display: none;
  }
  form .button{
    height: 45px;
    margin: 45px 0;
  }
  form .button input{
    height: 100%;
    width: 90%;
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
  @media(max-width: 584px){
   .container{
    max-width: 100%;
  }
  form .user-details .input-box{
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
  .login {
    color: #FFC288;
  }
  </style>
