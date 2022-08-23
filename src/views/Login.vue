<template>
	<main class="main d-flex justify-content-around align-items-center">
		<section class="row d-flex justify-content-around align-items-center">
			<div class="col-md-8 m-auto">
				<div class="">
					<div>
						<h2 class="heading-login">Login in to <u>Myrtle Beach Passport</u></h2>
						<h4>Help people discover your business.</h4>
						<p class="para-login">By continuing you agree our to our terms of</p>
						<p class="para-login">service and privacy policy</p>
						<div class="py-3">
							<button class="btn btn-google shadow" @click="authStore.signInWithGoogle">
								<!-- <font-awesome-icon icon="fa-brands fa-google" /> -->
								<img src="../assets/google.png" alt="Save icon" />
								Continue with google
							</button>
						</div>
						<div class="row">
							<div class="col">
								<hr class="hr-login" />
							</div>
							<div class="col">
								<h3>OR</h3>
							</div>
							<div class="col">
								<hr class="hr-login" />
							</div>
						</div>
						<p class="para-login">We will never share any data</p>
						<p class="para-login">with the third parties.</p>
					</div>
					<form class="form-group m-auto col-md-8" @submit.prevent="login">
						<div>
							<input 
							type="email" 
							class="form-control my-3" 
							placeholder="Email address"
							required 
							v-model="loginForm.email" />

							<input 
							type="password" 
							class="form-control my-3" 
							placeholder="Password"
							required
							v-model="loginForm.password" />
						</div>
						<button class="btn btn-large col-12" type="submit">
							<h2 class="mb-0">Sign In</h2>
						</button>

						<div v-if="error" class="error">{{error}}</div>

						<div class="pt-3">
							<router-link to="/forgot-password">
								<p>I forgot my password</p>
							</router-link>
						</div>
						<div class="">
							<a href="/register">Don't have account</a>
						</div>
					</form>

				</div>
			</div>
			<div class="col-md-4">
				<img src="../assets/blueMBlogo.jpeg" alt="Paris" class="m-auto">
			</div>

		</section>
	</main>
</template>

<script>

import { ref } from 'vue'
import {useAuthStore} from './../store/auth'

export default {
	setup () {

		const authStore = useAuthStore()

		const error = ref('')

		const loginForm = ref({
			email: '',
			password: ''
		})

		const login = async () => {
			const {email, password} = loginForm.value
			const res = await authStore.signIn(email, password)
			error.value = res
		}

		return {
			authStore,
			loginForm,
			login,
			error
		}
	}
}
</script>

<style>
.main {
	height: 100vh;
}
.heading-login{
	color: #0D47AA;
}
.para-login {
	margin: 0;
	padding: 0;
}
.form-control{
	border-radius: 10px !important;
	border: black solid;
}
.form-control::placeholder {
	text-align: center;
	color: black;
}
.hr-login{
	padding: 2px ;
	background-color: black !important;
}
.btn {
	background-color: #0D47AA;
	color: white;
}
.btn-google{
	background-color: transparent;
	color: black;
	border: black solid;
	border-radius: 10px;
}
.fa-google {
  background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.error {
	padding: 5px;
	border-radius: 5px;
	background-color: rgb(253, 208, 208);
	border: 2px solid rgb(255, 91, 91);
	margin-top: 10px;
}
</style>