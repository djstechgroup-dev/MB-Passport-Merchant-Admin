import axios from 'axios'

const getAllDeals = async () => {
    try {

        const response = await axios.get('admin/deals')
        const data = response?.data

        if(!data) throw new Error('Could not get all deals')

        return data.deals
        
    } catch (error) {
        throw error
    }
}

const getAllBusiness = async () => {
    try {

        const response = await axios.get('admin/business')
        const data = response?.data

        if(!data) throw new Error('Could not get all business')

        return data.business
        
    } catch (error) {
        throw error
    }
}


export default {
    getAllDeals,
    getAllBusiness
}