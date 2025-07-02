import { fetchApi } from "../Functions";

export const getUserSaldos = async () => {
    return fetchApi('GET', 'saldos');
}

export const getUserSaldo = async (saldoid) => {
    return fetchApi('GET', `saldos/${saldoid}`);
}

export const insertUserSaldos = async (year) => {
    return fetchApi('POST', `saldos/insert`, null, {
        bookyear: year
    });
}

export const updateUserSaldos = async (bookid, year, startSaldo) => {
    return fetchApi('PUT', `saldos/${bookid}/update`, null, {
        bookyear: year,
        startsaldo: startSaldo
    });
}