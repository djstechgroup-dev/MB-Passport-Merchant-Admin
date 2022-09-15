import {ref, computed} from 'vue'

const useFilteredDeals = () => {

    const filteredBusinessDeals = (data) => {
        return computed(() => {
                return data.map(deal => {

                const from = new Date(deal.active_from)
                const to = new Date(deal.active_to)

                const from_date = `${from.getUTCMonth()}/${from.getUTCDate()}/${from.getFullYear()}`
                const to_date = `${to.getUTCMonth()}/${to.getUTCDate()}/${to.getFullYear()}`

                const d = {
                    id: deal._id,
                    deal: deal.tagline,
                    business: deal.businessId.businessName,
                    active: deal.active,
                    status: (deal.active) ? 'Active': 'Paused',
                    campaign_dates: `${from_date} - ${to_date}`
                }
                return d
            })
        })
    }

    return {
        filteredBusinessDeals
    }
}

export default useFilteredDeals