export const authenticate = async (username, password) => {
    return await fetch(`http://localhost:8000/api/auth/login?email=${username}&password=${password}`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}