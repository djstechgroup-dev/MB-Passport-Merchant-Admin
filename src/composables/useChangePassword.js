import {ref} from 'vue'
import userService from '@/services/user.serivce'

const isLoading = ref(false)
const error = ref(null)

const useChangePassword = () => {
    const changePassword = async (input) => {
        isLoading.value = true
        console.log(input)
        const data = await userService.changeUserPassword(input)
        console.log(data)
        console.log('change password send post with ' + input)
    }

    const resetError = () => {
        error.value = null
    }

    return {isLoading, error, changePassword, resetError}
}

export default useChangePassword