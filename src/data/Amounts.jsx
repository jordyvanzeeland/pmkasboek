export const getUserAmounts = async (year) => {
    return await fetch(`http://localhost:8000/api/amounts`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer" + localStorage.getItem('token'),
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}