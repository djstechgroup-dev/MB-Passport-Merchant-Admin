import {ref} from 'vue'

import authService from '@/services/auth.service'

const isLaoding = ref(false)
const error = ref(null)

const useSignout = () => {

    const signOut = async () => {
        try {
            isLaoding.value = true
            await authService.logout()
            isLaoding.value = false
            error.value = null

        } catch (error) {
            isLaoding.value = false
            error.value = error
        }        
    }

    return {isLaoding, error, signOut}

}

export default useSignout