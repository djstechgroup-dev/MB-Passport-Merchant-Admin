import {ref} from 'vue'
import authService from '@/services/auth.service'

const user = ref(null)

const useAuth = () => {

    const getAuthUser = async () => {
        try {
            const res = await authService.getAuthUser()
            user.value = res
        } catch (error) {
            throw error
        }
    }

    return { user, getAuthUser }
}

export default useAuth