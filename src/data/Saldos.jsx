export const getUserSaldos = async () => {
    return await fetch(`http://localhost:8000/api/saldos`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

export const getUserSaldo = async (saldoid) => {
    return await fetch(`http://localhost:8000/api/saldos/${saldoid}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

export const insertUserSaldos = async (year) => {
    return await fetch(`http://localhost:8000/api/saldos/insert`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            bookyear: year
        })
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

export const updateUserSaldos = async (bookid, year, startSaldo) => {
    return await fetch(`http://localhost:8000/api/saldos/${bookid}/update`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            bookyear: year,
            startsaldo: startSaldo
        })
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}