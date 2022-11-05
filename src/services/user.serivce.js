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

const changeUserPassword = async (data) => {
    // console.log('de la functia pulii - log')
    // return 'de la functia pulii'
    const response = await axios.post('change-password', data)
    return response
}

export default { getUser, changeUserPassword }