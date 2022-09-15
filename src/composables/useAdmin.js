import {ref} from 'vue'
import adminService from '@/services/admin.service'

const deals = ref([])
const business = ref([])

const useAdmin = () => {

    const fetchDeals = async () => {
        try {
            const response = await adminService.getAllDeals()
            deals.value = response
        } catch (error) {
        }
    }

    const fetchBusiness = async () => {
        try {
            const response = await adminService.getAllBusiness()
            business.value = response
        } catch (error) {
        }
    }

    return {
        deals,
        business,
        fetchDeals,
        fetchBusiness
    }

}

export default useAdmin