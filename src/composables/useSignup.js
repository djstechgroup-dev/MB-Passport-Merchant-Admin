import {ref} from 'vue'
import authService from '@/services/auth.service'

const isLaoding = ref(false)
const error = ref(null)
const data = ref(null)
const redirectTo = ref('/')

const useSignup = () => {

    const signUp = async (input) => {

      isLaoding.value = true
      const data = await authService.signUp(input)

      switch(data.data.code) {
        case 'auth/user-not-found':
          error.value = 'Invalid credentials'
          redirectTo.value = 'ERROR'
          break
        case 'auth/wrong-password':
          error.value = 'Incorrect password'
          redirectTo.value = 'ERROR'
          break
        case 'auth/invalid-email':
          error.value = 'Invalid Email Address'
          redirectTo.value = 'ERROR'
          break
        case 'auth/email-already-in-use':
          error.value = 'User already exist'
          redirectTo.value = 'ERROR'
          break
        case 'auth/invalid-phone-number':
          error.value = 'Invalid phone number'
          redirectTo.value = 'ERROR'
          break
        case 'auth/internal-error':
          error.value = 'Internal server error' 
          redirectTo.value = 'ERROR'
          break
        default:
          error.value = err.message
      }

      if(!data.data.code) {
        data.value = data
        isLaoding.value = false
        error.value = '/'
      }

      if(data.value.user.role === 0) {
        redirectTo.value = '/admin'
      }

      console.log(data.data.code)

        // try {
        //     isLaoding.value = true
        //     const data = await authService.signUp(input)
        //     if(!data) throw new Error('Something went wrong')

        //     console.log(data)

        //     // data.value = data
        //     // isLaoding.value = false
        //     // error.value = null

        //     if(data.value.user.role === 0) {
        //         redirectTo.value = '/admin'
        //     }

        //   } catch (err) {
        //     data.value = null
        //     isLaoding.value = false
        //     switch(err.code) {
        //       case 'auth/user-not-found':
        //         error.value = 'Invalid credentials'
        //         break
        //       case 'auth/wrong-password':
        //         error.value = 'Incorrect password'
        //         break
        //       case 'auth/invalid-email':
        //         error.value = 'Invalid Email Address'
        //         break
        //       case 'auth/email-already-in-use':
        //         error.value = 'User already exist'
        //         break
        //       case 'auth/invalid-phone-number':
        //         error.value = 'Invalid phone number'
        //         break
        //       case 'auth/internal-error':
        //         error.value = 'Internal server error' 
        //         break
        //       default:
        //         error.value = err.message
        //     }

        //     console.log(error.value)
        // }
    }

    const resetError = () => {
      error.value = null
    }

    return {isLaoding, error, data, redirectTo, signUp, resetError}

}

export default useSignup