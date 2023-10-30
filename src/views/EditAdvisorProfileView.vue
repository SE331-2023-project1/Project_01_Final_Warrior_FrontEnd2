<template>
  <div class="container">
    <div class="title">Edit Advisor Profile</div>
    <div class="content">
      <form @submit.prevent="onSubmit">
        <div class="user-details">
          <div class="input-box">
            <span class="details">ID</span>
            <input type="text" placeholder="ID" class="input-field" v-model="id">
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
          <!-- ส่วนที่เพิ่มเข้าไป -->
          <div class="input-box-img">
            <span class="details">Profile image</span>
            <input type="file" id="img" name="img" accept="image/*">
          </div>
          <!-- ส่วนที่เพิ่มเข้าไป -->
        </div>
        <div class="button">
          <input type="submit" value="Confirm" class="submit-btn">
        </div>
        <router-link to="/advisor" class="back-link">
          <button class="back-btn"> Back </button>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useAdvisorStore } from '@/stores/advisor';
import { useMessageStore } from '@/stores/message';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

let isEditing = ref(false);
const authStore = useAuthStore();
const advisorStore = useAdvisorStore();
const storeMessage = useMessageStore();
const advisor = ref(null);
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
    await authStore.advisorUpdateProfile(values.id, values.firstName, values.lastName, values.dept);
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
/* Add your own custom styles here */
.container {
  max-width: 500px;
  width: 100%;
  background: #ffffff;
  padding: 25px 30px;
  border-radius: 10px;
  margin: auto;
}

.title {
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
}

.user-details {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.input-box {
  margin-bottom: 15px;
  width: 100%;
}

.details {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
}

.input-field {
  height: 45px;
  width: 100%;
  outline: none;
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  padding: 0 15px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.input-field:focus,
.input-field:valid {
  border-color:  #FFC288;
}

.input-box-img input {
  padding-top: 13px;
}

.button {
  text-align: center;
  margin-top: 20px;
}

.submit-btn {
  height: 45px;
  width: 100%;
  color: #ffffff;
  border: none;
  font-size: 18px;
  font-weight: 500;
  border-radius: 5px;
  letter-spacing: 1px;
  background: #FFC288;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #ffac5f;
}

.back-link {
  text-align: center;
  display: block;
  text-decoration: none;
  margin-top: 10px;
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
