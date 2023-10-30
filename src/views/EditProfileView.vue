<template>
  <div class="container">
    <div class="title">Edit Profile</div>
    <div class="content">
      <form @submit.prevent="onSubmit">
        <div class="user-details">
          <div class="input-box">
            <span class="details">ID</span>
            <input type="text" placeholder="ID" class="input-field" v-model="id"> <!-- <input type="text" v-model="student.id" placeholder="ID" required> -->
          </div>
          <div class="input-box">
            <span class="details">Name</span>
            <input type="text" placeholder="Name" class="input-field" v-model="firstName">
          </div>
          <div class="input-box">
            <span class="details">Surname</span>
            <input type="text" placeholder="Surname" class="input-field" v-model="lastName">
          </div>
          <div class="input-box">
            <span class="details">Department</span>
            <input type="text" placeholder="Department" class="input-field" v-model="dept">
          </div>
          <div class="input-box-img">
            <span class="details">Profile image</span>
            <input type="file" id="img" name="img" accept="image/*">
          </div>
        </div>
        <div class="button">
          <input type="submit" value="Confirm">
        </div>
        <router-link to="/student-profile" class="back-link">
          <button class="back-btn"> Back </button>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useStudentStore } from '@/stores/student';
import { useMessageStore } from '@/stores/message';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

let isEditing = ref(false);
const authStore = useAuthStore();
const studentStore = useStudentStore();
const storeMessage = useMessageStore();
const student = ref(null);
let images = '';



// onMounted(async () => {
//   try {
//     const response = await advisorStore.getAdvisorById(authStore.id);
//     advisor.value = response;
//     if (advisor.value) {
//       id.value = advisor.value.id;
//       firstName.value = advisor.value.name;
//       lastName.value = advisor.value.surname;
//       department.value = advisor.value.department;
//     }
//   } catch (error) {
//     console.error('Error fetching advisor data:', error);
//   }
// });

// const validationSchema = yup.object({
//   id: yup.string().required('The id is required'),
//   firstName: yup.string().required('The firstName is required'),
//   lastName: yup.string().required('The lastName is required'),
//   department: yup.string().required('The department is required'),
// });

const { errors, handleSubmit } = useForm({
  // validationSchema,
  initialValues: {
    id: '',
    firstName: '',
    lastName: '',
    dept: '',
  },
});



const saveChanges = () => {
  isEditing.value = false;
};

const enterEditMode = () => {
  isEditing.value = true;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    console.log(values)
    await authStore.studentUpdateProfile(values.id, values.firstName, values.lastName, values.dept);
    storeMessage.updateMessage('Update profile successful');
    setTimeout(() => {
      storeMessage.resetMessage();
    }, 4000);
  } catch (error) {
    storeMessage.updateMessage('Could not update profile');
    setTimeout(() => {
      storeMessage.resetMessage();
    }, 3000);
  }
});

const { value: id } = useField<string>('id')

const { value: firstName } = useField<string>('firstName')

const { value: lastName } = useField<string>('lastName')

const { value: dept } = useField<string>('dept')
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
.user-details .input-box-img input:focus,
.user-details .input-box-img input:valid{
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

.back-btn {
  background-color: #ffac5f;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #ffac5f;
}
</style>
