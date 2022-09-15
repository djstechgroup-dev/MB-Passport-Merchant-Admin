import {ref} from 'vue'
import businessService from "@/services/business.service"

const useToggleDeal = () => {

    const error = ref(null)

    const startDeal = async id => {
        try {
            await businessService.startDeal(id)
        } catch (err) {
            error.value = err
        }
    }

    const pauseDeal = async id => {
        try {
            await businessService.pauseDeal(id)
        } catch (err) {
            error.value = err
        }
    }

    return {startDeal, pauseDeal}
}

export default useToggleDeal