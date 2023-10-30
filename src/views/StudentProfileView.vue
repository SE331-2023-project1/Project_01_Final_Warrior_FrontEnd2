<template>
  <div class="container">
    <div class="title">Student Infomation</div>
    <div class="content">
      <form>
        <div class="user-details">
          <div class="profile-image-container">
            <img
              src="https://media.tenor.com/Y0rQE-mqiUoAAAAC/bocchi-bocchi-the-rock.gif"
            />
            <!-- 500x500px!!! -->
            <!-- <img :src="student?.image" :alt="student?.name" class="w-full h-full object-cover rounded-lg" /> -->
          </div>
          <div class="box">
            <span class="details">ID: {{ student?.id }} </span
            ><!-- {{ student.id }} -->
            <span class="details"
              >Name: {{ student?.name }} {{ student?.surname }}</span
            ><!-- {{ student.name }} {{ student.surname }} -->
            <span class="details">Department: {{ student?.dept }}</span
            ><!-- {{ student.department }} -->
            <span class="details">Advisor: {{ student?.advisorId }}</span
            ><!-- {{ student.advisorId }} -->
          </div>
          <div class="button">
            <router-link to="/edit-profile">
              <input type="submit" value="Edit" /><!-- Go to Edit Profile -->
            </router-link>
          </div>
          <div class="button">
            <router-link to="/InfoA">
              <input
                type="submit"
                value="Advisor"
              /><!-- Go to AdvisorDetailView -->
            </router-link>
          </div>
        </div>
        <hr>
          <div class="title">Comment</div>
          <div class="comment-box">
            <textarea v-model="comment" placeholder="Enter your comment here"></textarea>
            <button @click="submitComment">Submit</button>
          </div>
      </form>
    </div>
  </div>

</template>

<script lang="ts" setup>
import type { StudentItem } from "@/type";
import { defineProps, ref, type PropType } from "vue";
import StudentService from "@/services/StudentService";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const store = useAuthStore()
const student = ref<StudentItem | null>(null);

StudentService.getStudentById(Number(store.studentId)).then((response) => {
    student.value = response.data
    }).catch(error => {
        console.log(error)
            if(error.response && error.response.status === 404) {
                router.push({ name: '404-resource', params: { resource: 'event'} })
            }else {
                router.push({ name: 'network-error' })
            }
    })

// export default {
//   name: "CommentBox",
//   data() {
//     return {
//       comment: "",
//       comments: []
//     };
//   },
//   methods: {
//     onSubmit(event) {
//       event.preventDefault();
//
      // Send the form data to the server.
//       axios.post("/api/comments", {
//         text: this.comment
//       }).then(response => {
//         // Add the new comment to the comments array.
//         this.comments.push(response.data);

//         // Clear the text input field.
//         this.comment = "";
//       });
//     }
//   }
// };
</script>

<style scoped>
* {
  color: black;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: #ffdfc0;
}
.container {
  max-width: 700px;
  width: 100%;
  background: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  margin: auto;
}
.container .title {
  font-size: 25px;
  font-weight: 500;
}
.container form .user-details {
  display: grid;
  grid-template-columns: 120px auto;
  margin: 10px 0 1px 0;
}
form .user-details .box {
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
}
.user-details .box .details {
  display: block;
  width: max-content;
  font-weight: 500;
  margin-bottom: 5px;
}
.user-details .box input {
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
.user-details .box input:valid {
  border-color: #ffc288;
}
form input[type="radio"] {
  display: none;
}
form .button {
  height: 45px;
  margin: 5px;
}
form .button input {
  height: 100%;
  width: 100%;
  color: #fff;
  border: none;
  font-size: 18px;
  font-weight: 500;
  border-radius: 5px;
  letter-spacing: 1px;
  background: #ffc288;
}
form .button input:hover {
  background: #ffac5f;
}
@media (min-width: 1024px) {
  #app {
    display: grid;
    grid-template-columns: 1fr;
    padding: 0 2rem;
  }
}
@media (max-width: 584px) {
  .container {
    max-width: 100%;
  }
  form .user-details .box {
    margin-bottom: 15px;
    width: 100%;
  }
  form .category {
    width: 100%;
  }
  .content form .user-details {
    max-height: 300px;
    overflow-y: scroll;
  }
  .user-details::-webkit-scrollbar {
    width: 5px;
  }
}
@media (max-width: 459px) {
  .container .content .category {
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
.comment {
  max-width: 700px;
  width: 100%;
  background: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  margin-top: 10px;
}
.comment .title {
  font-size: 25px;
  font-weight: 500;
}
.comment-box {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.comment-box textarea {
  width: 100%;
  height: 50px;
  padding: 5px;
  border: none;
  outline: none;
}

.comment-box button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background: #FFC288;
  color: #fff;
  cursor: pointer;
}
form .comment-box button:hover{
  background: #ffac5f;
}
hr {
  border: 1px solid black;
  margin: 15px 0;
}
</style>
