export const register = async (name, email, password) => {
    return await fetch(`http://localhost:8000/api/register`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

export const authenticate = async (username, password) => {
    return await fetch(`http://localhost:8000/api/auth/login?email=${username}&password=${password}`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}