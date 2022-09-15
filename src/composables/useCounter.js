import {ref} from 'vue'
import businessService from '@/services/business.service'

const activeDeals = ref(0)
const usedDeals = ref(0)
const deals = ref(0)

const useCounter = () => {
    const loadCounter = async () => {
        try {
            const response = await businessService.getMerchantDeals()


            const actives = response.filter(deal => {
                return deal.active
            })

            activeDeals.value = actives.length

            const useDeals = response.map(res => res.used_deals)

            usedDeals.value = useDeals.reduce((total, num) => {
                return total + num
            }, 0)

            const offers = response.map(res => res.no_offers)

            deals.value = offers.reduce((total, offer) => total + offer, 0)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        loadCounter,
        activeDeals,
        usedDeals,
        deals
    }
}

export default useCounter