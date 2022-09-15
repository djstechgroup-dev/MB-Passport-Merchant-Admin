import {ref} from 'vue'
import businessService from '@/services/business.service'

const getBusinessError = ref(null)
const businesses = ref([])

const getDealsError = ref(null)
const deals = ref([])

const useMerchant = () => {

    const getAllBusiness = async () => {
        try {
            const response = await businessService.getMerchantBusiness()
            businesses.value = response
            getBusinessError.value = null
        } catch (err) {
            getBusinessError.value = err.message
        }
    }

    const getAllDeals = async () => {
        try {
            const response = await businessService.getMerchantDeals()
            deals.value = response
            getDealsError.value = null
        } catch (err) {
            getDealsError.value = err.message
        }
    }

    return {
        getAllBusiness,
        businesses,
        getBusinessError,
        getAllDeals,
        deals,
        getDealsError
    }

}

export default useMerchant