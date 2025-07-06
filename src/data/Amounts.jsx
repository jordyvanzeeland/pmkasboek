import { fetchApi } from "../Functions";

export const getUserAmounts = async (limit, ordercolumn, orderasc) => {
    return fetchApi('GET', 'amounts', {
        "limit": limit,
        "order": ordercolumn,
        "orderasc": orderasc
    })
}

export const getBookAmounts = async (bookid, limit) => {
    return fetchApi('GET', `amounts/${bookid}`)
}

export const insertUserAmount = async (date, description, amount, type, bookid) => {
    return fetchApi('POST', 'amounts/insert', null, {
        date: date,
        description: description,
        amount: amount,
        type: type,
        booksaldo: bookid
    })
}

export const updateUserAmount = async (amountid, date, description, amount, type, bookid) => {
    return fetchApi('PUT', `amounts/${amountid}/update`, null, {
        date: date,
        description: description,
        amount: amount,
        type: type,
        booksaldo: bookid
    })
}

export const deleteUserAmount = async (amountid) => {
    return fetchApi('DELETE', `amounts/${amountid}/delete`)
}