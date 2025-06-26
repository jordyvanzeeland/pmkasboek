export const getCustomers = async () => {
    return await fetch(`http://localhost:8000/api/admin/customers`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

export const getCustomerBooks = async (customerid) => {
    return await fetch(`http://localhost:8000/api/admin/customers/${customerid}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

export const getUserBookAmounts = async (bookid, userid) => {
    return await fetch(`http://localhost:8000/api/amounts/${bookid}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json",
            "isAdmin": 1,
            "userid": userid
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}