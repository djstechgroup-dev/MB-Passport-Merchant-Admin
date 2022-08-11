
export const signup = async user => {
    return fetch(`http://localhost:8000/api/auth/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json()
    }).catch(err => {
        throw err
    })
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