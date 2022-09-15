import {ref} from 'vue'
import authService from '@/services/auth.service'

const isLaoding = ref(false)
const error = ref(null)
const data = ref(null)
const redirectTo = ref('/')

const useSignin = () => {

    const signIn = async (email, password) => {
        try {
            isLaoding.value = true
            const data = await authService.signIn({email, password})
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
              default:
                error.value = error.message
            }
        }
    }

    const resetError = () => {
      error.value = null
    }

    return {isLaoding, error, data, redirectTo, signIn, resetError}

}

export default useSignin