import {ref} from 'vue'
import authService from '@/services/auth.service'

const isLaoding = ref(false)
const error = ref(null)
const data = ref(null)
const redirectTo = ref('/')

const useSignup = () => {

    const signUp = async (input) => {
        try {
            isLaoding.value = true
            const data = await authService.signUp(input)
            if(!data) throw new Error('Something went wrong')

            data.value = data
            isLaoding.value = false
            error.value = null

            if(data.value.user.role === 0) {
                redirectTo.value = '/admin'
            }

          } catch (err) {
            data.value = null
            isLaoding.value = false
            switch(err.code) {
              case 'auth/user-not-found':
                error.value = 'Invalid credentials'
                break
              case 'auth/wrong-password':
                error.value = 'Incorrect password'
                break
              case 'auth/invalid-email':
                error.value = 'Invalid Email Address'
                break
              case 'auth/email-already-in-use':
                error.value = 'User already exist'
                break
               case 'auth/internal-error':
                error.value = 'Internal server error' 
                break
              default:
                error.value = err.message
            }

            console.log(error.value)
        }
    }

    const resetError = () => {
      error.value = null
    }

    return {isLaoding, error, data, redirectTo, signUp, resetError}

}

export default useSignup