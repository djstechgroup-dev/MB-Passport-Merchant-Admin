import axios from 'axios'

const getMerchantBusiness = async () => {
    try {

        const response = await axios.get('merchant/my-business')
        const data = response?.data

        if(!data) throw new Error('Could not get merchant business')

        return data.business
        
    } catch (error) {
        throw error
    }
}

const getMerchantDeals = async () => {
    try {

        const response = await axios.get('merchant/my-deals')
        const data = response?.data

        if(!data) throw new Error('Could not get merchant deals')

        return data.deals
        
    } catch (error) {
        throw error
    }
}

const getBusinessById = async (id) => {
    try {
        const response = await axios.get(`business/${id}`)
        const data = response?.data

        if(!data) throw new Error('Could not get business')

        return data.business
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getBusinessLocations = async (id) => {
    try {
        const response = await axios.get(`location/b/${id}`)
        const data = response?.data

        if(!data) throw new Error('Could not get business location')

        return data.locations
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

const createBusiness = async (input) => {
    try {
        const response = await axios.post('business/', input)
        const data = response?.data

        if(!data) throw new Error('Failed to add business')

        return data.business
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

const updateBusiness = async (id, input) => {
    try {
        const response = await axios.patch(`business/${id}`, input)
        const data = response?.data

        if(!data) throw new Error('Failed to update business')

        return data.business
        
    } catch (error) {
        throw error
    }
}

const deleteBusiness = async (id) => {
    try {
        const response = await axios.delete(`business/${id}`)
        const data = response?.data

        if(!data) throw new Error('Failed to delete business')

        return data
        
    } catch (error) {
        throw error
    }
}

const addLocation = async (input) => {
    try {
        const response = await axios.post('location/', input)
        //return success, location and business
        const data = response?.data

        if(!data) throw new Error('Could not add location to the business')

        return data.business
        
    } catch (error) {
        throw error
    }
}

const getLocationById = async (id) => {
    try {
        const response = await axios.get(`location/${id}`)
        const data = response?.data

        if(!data) throw new Error('Could not get location')

        return data.location
        
    } catch (error) {
        throw error
    }
}

const updateLocation = async (id, input) => {
    try {
        const response = await axios.patch(`location/${id}`, input)
        const data = response?.data

        if(!data) throw new Error('Could not update the location')

        return data.location
    } catch (error) {
        throw error
    }
}

const deleteLocation = async (id) => {
    try {
        const response = await axios.delete(`location/${id}`)
        const data = response?.data

        if(!data) throw new Error('Could not delete the location')

        return data
    } catch (error) {
        throw error
    }
}

const addBusinessDeal = async (input) => {
    try {
        const response = await axios.post('deal/', input)
        //return success, location and business
        const data = response?.data

        if(!data) throw new Error('Could not add business deal')

        return data.deal
        
    } catch (error) {
        throw error
    }
}

const getBusinessCategories = async () => {
    try {
        const response = await axios.get('category')
        const data = response?.data
        if(!data) throw new Error('Could not get business categories')

        return data.categories
        
    } catch (error) {
        throw error
    }
}

const getBusinessDeals = async (id) => {
    try {
        const response = await axios.get(`deal/b/${id}`)
        const data = response?.data

        if(!data) throw new Error('Could not get business deals')

        return data.deals
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getDeal = async (id) => {
    try {
        const response = await axios.get(`deal/${id}`)
        const data = response?.data

        if(!data) throw new Error('Could not get the business deal')

        return data.deal
    } catch (error) {
        throw error
    }
}

const updateDeal = async (id, input) => {
    try {
        const response = await axios.patch(`deal/${id}`, input)
        const data = response?.data

        if(!data) throw new Error('Could not update the business deal')

        return data.deal
    } catch (error) {
        throw error
    }
}

const deleteDeal = async (id) => {
    try {
        const response = await axios.delete(`deal/${id}`)
        const data = response?.data

        if(!data) throw new Error('Could not delete the business deal')

        return data
    } catch (error) {
        throw error
    }
}

const pauseDeal = async (id) => {
    try {
        const response = await axios.patch(`deal/pause/${id}`)
        const data = response?.data

        if(!data) throw new Error

        return data
    } catch (error) {
        throw error
    }
}

const startDeal = async (id) => {
    try {
        const response = await axios.patch(`deal/start/${id}`)
        const data = response?.data

        if(!data) throw new Error

        return data
    } catch (error) {
        throw error
    }
}


export default {
    getMerchantBusiness,
    getMerchantDeals,
    getBusinessById,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    addLocation,
    updateLocation,
    deleteLocation,
    getBusinessLocations,
    getLocationById,
    addBusinessDeal,
    getBusinessCategories,
    getBusinessDeals,
    getDeal,
    updateDeal,
    deleteDeal,
    pauseDeal,
    startDeal
}