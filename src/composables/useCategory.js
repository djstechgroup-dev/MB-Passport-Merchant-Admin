import {ref} from 'vue'
import businessService from '@/services/business.service'

const categories = ref([])
const error = ref(null)
const useCategory = () => {
    const loadCategory = async () => {
        try {
            const response = await businessService.getBusinessCategories()
            categories.value = response
        } catch (err) {
            error.value = err.message
        }
    }

    return {
        categories,
        loadCategory,
        error
    }
}

export default useCategory