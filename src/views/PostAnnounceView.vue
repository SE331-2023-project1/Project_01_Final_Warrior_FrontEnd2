<template>
    <div class="container">
      <div class="title">Post an announcement</div>
      <div class="content">
        <form @submit.prevent="postAnnouncement">
            <div class="comment-box">
                <textarea v-model="announcementText" id="announcementText"></textarea>
            </div>
            <label for="file">Upload File : </label>
            <div class="input-box-file">
                <input type="file" ref="fileInput" @change="handleFileUpload" id="file">
              </div>
          <div class="button">
            <input type="submit" value="Post Announcement">
          </div>
        </form>
      </div>
    </div>
  </template>
  
<script lang="ts">
// export default {
//   data() {
//     return {
//       announcementText: '',
//       file: null,
//       announcements: [],
//     };
//   },
//   methods: {
//     postAnnouncement() {
//       // You can send the announcementText and file to your server for processing
//       // After posting, you can clear the form and update the list of announcements
//       // For simplicity, we'll just add a new announcement to the list here.
//       this.announcements.push({
//         text: this.announcementText,
//         fileUrl: this.file ? URL.createObjectURL(this.file) : null,
//       });
//       this.announcementText = '';
//       this.$refs.fileInput.value = '';
//       this.file = null;
//     },
//     handleFileUpload(event) {
//       this.file = event.target.files[0];
//     },
//   },
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
  .input-box-file{
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    
  }
</style>
