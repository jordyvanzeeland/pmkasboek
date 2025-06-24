export const getUserAmounts = async (limit, ordercolumn, orderasc) => {
    return await fetch(`http://localhost:8000/api/amounts/`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json",
            "limit": limit,
            "order": ordercolumn,
            "orderasc": orderasc
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

export const getBookAmounts = async (bookid, limit) => {
    return await fetch(`http://localhost:8000/api/amounts/${bookid}`, {
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

export const insertUserAmount = async (date, description, amount, type, bookid) => {
    return await fetch(`http://localhost:8000/api/amounts/insert`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: date,
            description: description,
            amount: amount,
            type: type,
            booksaldo: bookid
        })
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

export const updateUserAmount = async (amountid, date, description, amount, type) => {
    return await fetch(`http://localhost:8000/api/amounts/${amountid}/update`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: date,
            description: description,
            amount: amount,
            type: type
        })
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

export const deleteUserAmount = async (amountid) => {
    return await fetch(`http://localhost:8000/api/amounts/${amountid}/delete`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}