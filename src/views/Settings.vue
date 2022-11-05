<template>
  <div class="pb-5">
    <div class="m-auto text-center">
        <img src="../assets/settings.png" alt="Paris" class="m-auto">
        <h4 class="pt-3">Settings</h4>
        <hr class="hr-login col-4 m-auto"/>
    </div>
  </div>
  <div class="row">
    <div class="col-md text-center">
        <h5>Account Information</h5>
        <hr class="hr-login"/>
        <div>
            <p>Name: {{this.User.displayName}}</p>
            <p>Email: {{this.User.email}}</p>
            <p>Phone Number: {{this.User.phoneNumber}}</p>
        </div>
    </div>
    <div class="col-md text-center">
        <h5>Change Password</h5>
        <hr class="hr-login"/>
        <form class="form-group m-auto" @submit.prevent="changePasswordAction">
            <div class="text-center">
                <div class="form-group py-1">
                    <label for="Student">Enter Old Password:</label>
                    <input 
                        v-on:change="error = null"
                        v-model="oldPassword"
                        type="password" 
                        class="form-control-pass mx-3"/>
                </div>
                <div class="form-group py-1">
                    <label for="Student">Enter New Password:</label>
                    <input 
                        v-on:change="error = null"
                        v-model="newPassword"
                        type="password" 
                        class="form-control-pass mx-3"/>
                </div>
                <div class="form-group py-1">
                    <label for="Student">Confirm New Password:</label>
                    <input 
                        v-on:change="error = null"
                        v-model="confirmNewPassword"
                        type="password" 
                        class="form-control-pass mx-3"/>
                </div>
                <div v-if="error" class="error">{{ error }}</div>
                <div v-if="success" class="success">{{ success }}</div>
            </div>
            <div class="text-center">
                <router-link to="/forgot-password"><p>I forgot my password</p></router-link>
                <button class="btn mx-3 col-4 shadow" type="submit" 
                style="background-color: #C3F9D1; color: black; border-radius: 20px;">
                    <p style="margin-bottom: 0;">Save</p>
                </button>
            </div>

        </form>
    </div>
  </div>
  <div class="d-flex justify-content-center align-items-center">
    <div class="text-center">
        <h4>Regulatory Information</h4>
        <hr class="hr-login" />
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
const Auth = getAuth()
export default {
  data() {
    return {
      User: {
        displayName: Auth.authStateSubscription.auth.currentUser.displayName,
        email: Auth.authStateSubscription.auth.currentUser.email,
        phoneNumber: Auth.authStateSubscription.auth.currentUser.phoneNumber
      }
    }
  },
  setup() {
    const oldPassword = ref("")
    const newPassword = ref("")
    const confirmNewPassword = ref("")

    const error = ref(null);
    const success = ref(null);

    const changePasswordAction = async () => {

      let user = getAuth().currentUser;

      try {
        let credential = EmailAuthProvider.credential(
          user.email,
          oldPassword.value
        );

        const authentificated = await reauthenticateWithCredential(user, credential)
        if(authentificated) {
          if(newPassword.value === confirmNewPassword.value) {
            let updatedPassword = updatePassword(Auth.currentUser, newPassword.value)
            if(updatedPassword) {
              success.value = "The password has been successfuly changed"
            }
          } else {
            error.value = "The new password doesn't match"
          }
        }

      } catch (e) {
        error.value = 'Old password is incorrect'
        console.log(e)
      }
    }

    return {
      oldPassword,
      newPassword,
      confirmNewPassword,
      error,
      success,
      changePasswordAction
    }
  }
}

</script>

<style>
.card-bg{
	background-color: #0D47AA;
  color: white;
  border-radius: 10px;
}
.border-nav{
  border-bottom: 5px solid black;
}
.border-bar{
  border-bottom: 3px solid black;
}
.border-ver{
  border-right: 5px solid black;
  padding: 0;
}
.hr-login{
	padding: 2px ;
	background-color: black !important;
}
.form-control-pass{
	border-radius: 10px !important;
	border: black solid;
}

.success {
	padding: 5px;
	border-radius: 5px;
	background-color: rgb(212, 253, 208);
	border: 2px solid rgb(117, 212, 91);
	margin-top: 10px;
    text-align: center;
}
</style>