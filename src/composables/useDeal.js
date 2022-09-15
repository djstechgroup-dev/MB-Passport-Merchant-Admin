import {ref} from 'vue'
import businessService from '@/services/business.service'

const deal = ref(null)
const getError = ref(null)

const updated = ref(null)
const updateError = ref(null)

const deleted = ref(null)
const deleteError = ref(null)

const useDeal = (id) => {

    const getDeal = async () => {
        try {
            const response = await businessService.getDeal(id)
            deal.value = response
            getError.value = null
        } catch (error) {
            getError.value = error.message
        }     
    }

    const updateDeal = async (payload) => {
        try {
            const response = await businessService.updateDeal(id, payload)
            updated.value = response
            updateError.value = null
        } catch (error) {
            updateError.value = error.message
        }
    }

    const deleteDeal = async () => {
        try {
            const response = await businessService.deleteDeal(id)
            deleted.value = response
            deleteError.value = null
        } catch (error) {
            deleteError.value = error.message
        }
    }

    return {
        getDeal,
        updateDeal,
        deleteDeal,
        deal,
        updated,
        deleted,
        getError,
        updateError,
        deleteError
    }

}

export default useDeal