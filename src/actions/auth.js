
export const signup = async user => {

    console.log(user)

    try {
        const result = await fetch(`http://localhost:8000/api/auth/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        
        const data = await result.json()
        return data
    } catch (error) {
        throw error
    }
}

export const signin = email => {
    return fetch(`http://localhost:8000/api/auth/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    }).then(response => {
        return response.json();
    }).catch(err => {
        throw err
    })
}