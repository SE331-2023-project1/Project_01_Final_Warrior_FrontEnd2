<template>
  <div class="container">
    <div class="title">Edit Advisor Profile</div>
    <div class="content">
      <form>
        <div class="user-details">
          <div class="input-box">
            <span class="details">ID</span>
            <input type="text" placeholder="ID" class="input-field">
          </div>
          <div class="input-box">
            <span class="details">Name</span>
            <input type="text" placeholder="Name" class="input-field">
          </div>
          <div class="input-box">
            <span class="details">Surname</span>
            <input type="text" placeholder="Surname" class="input-field">
          </div>
          <div class="input-box">
            <span class="details">Department</span>
            <input type="text" placeholder="Department" class="input-field">
          </div>
          <div class="input-box">
            <span class="details">New Password</span>
            <input type="password" placeholder="New Password" class="input-field">
          </div>
          <div class="input-box">
            <span class="details">Confirm New Password</span>
            <input type="password" placeholder="Confirm New Password" class="input-field">
          </div>
          <div class="input-box-img">
            <span class="details">Profile image</span>
            <input type="file" id="img" name="img" accept="image/*">
          </div>
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
