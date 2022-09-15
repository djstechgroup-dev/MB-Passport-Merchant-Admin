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
							<button class="btn-google shadow" @click="googleLogin">
								<!-- <font-awesome-icon icon="fa-brands fa-google" /> -->
								<img src="@/assets/google.png" alt="Save icon" />
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
					<form class="form-group m-auto col-md-8" @submit.prevent="login()">
						<div>
							<input 
							type="email" 
							class="form-control my-3" 
							placeholder="Email address"
							required 
							v-model="email" />

							<input 
							type="password" 
							class="form-control my-3" 
							placeholder="Password"
							required
							v-model="password" />
						</div>
						
						<button v-if="signInLoading" class="btn-login" >
							<h2 class="mb-0">Loading...</h2>
						</button>
						<button v-else class="btn-login" type="submit">
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
				<img src="@/assets/blueMBlogo.jpeg" alt="Paris" class="m-auto">
			</div>

		</section>
	</main>
</template>

<script>
import {ref, watch} from 'vue'
import useGoogleSignin from '@/composables/useGoogleSignin'
import useSignin from '@/composables/useSignin'
import router from '@/router'

export default {
	setup () {

		const email = ref('')
		const password = ref('')
		const error = ref(null)

		const {
			error: signInError, 
			isLaoding: signInLoading, 
			redirectTo, 
			signIn,
			resetError
		} = useSignin()

		const {googleSignIn, redirectTo: googleSignInRedirectTo} = useGoogleSignin()

		watch(signInError, () => {
			error.value = signInError.value
		})

		watch([email, password], () => {
			resetError()
		})

		const login = async () => {
			await signIn(email.value, password.value)
			router.push(redirectTo.value)
		}

		const googleLogin = async () => {
			await googleSignIn()
			router.push(googleSignInRedirectTo.value)
		}

		return {
			email,
			password,
			login,
			googleLogin,
			error,
			signInLoading
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
.btn-login {
	border: none;
	border-radius: 10px;
	background-color: #0D47AA !important;
	color: white !important;
	width: 100%;
	padding: 5px 0;
}

.btn-login:hover {
	background-color: #447fe5 !important;
}

.btn-google{
	background-color: transparent;
	color: black;
	border: black solid;
	border-radius: 10px;
	padding: 10px;
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