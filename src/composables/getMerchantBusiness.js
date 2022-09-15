import {ref} from 'vue'
import axios from 'axios'

const data = ref([])
const error = ref(null)
const isLoading = ref(false)

const getMerchantBusiness = () => {

    const load = async () => {
        try {
            isLoading.value = true
            const response = await axios.get('merchant/my-business')
            data.value = response.data.business
            isLoading.value = false
        } catch (error) {
            console.log(error)
            error.value = error
            isLoading.value = false
        }
    }

    return {data, error, load, isLoading}
}

export default getMerchantBusiness