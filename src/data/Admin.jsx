import { fetchApi } from "../Functions";

export const getCustomers = async () => {
    return fetchApi('GET', 'admin/customers');
}

export const getCustomerBooks = async (customerid) => {
    return fetchApi('GET', `admin/customers/${customerid}`);
}

export const getUserBookAmounts = async (bookid, userid) => {
    return fetchApi('GET', `amounts/${bookid}`, {
        "isAdmin": 1,
        "userid": userid
    });
}