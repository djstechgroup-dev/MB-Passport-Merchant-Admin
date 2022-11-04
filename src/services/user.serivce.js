import axios from 'axios'

const getUser = async (id) => {
    try {

        const response = await axios.get(`user/getUser/${id}`)
        const data = response?.data

        if(!data) throw new Error('Could not get user data')

        return data.selectUser

    } catch (error) {
        throw error
    }
}

export default getUser