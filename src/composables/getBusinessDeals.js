import {ref} from 'vue'
import businessService from '@/services/business.service'

const data = ref([])
const error = ref(null)
const isLoading = ref(false)

const getBusinessDeals = (id) => {

    const load = async () => {
        try {
            isLoading.value = true
            const response = await businessService.getBusinessDeals(id)
            data.value = response
            isLoading.value = false
        } catch (error) {
            console.log(error)
            error.value = error
            isLoading.value = false
        }
    }

    return {data, error, load, isLoading}
}

export default getBusinessDeals