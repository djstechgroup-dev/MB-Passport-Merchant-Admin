import {ref} from 'vue'
import businessService from '@/services/business.service'
import authService from '@/services/auth.service'

const data = ref(null)
const error = ref(null)
const loading = ref(false)

const addDeal = () => {

    const add = async (payload) => {

        try {
            loading.value = true
            const user = await authService.getAuthUser()
            const res = await businessService.addBusinessDeal({
                user: user._id,
                ...payload
            })
            data.value = res
            loading.value = false
            error.value = null
        } catch (err) {
            error.value = err.message
        }
        
    }

    return {
        data, 
        add,
        error
    }
}

export default addDeal