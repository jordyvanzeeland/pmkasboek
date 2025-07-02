import { fetchApi } from "../Functions";

export const register = async (name, email, password) => {
    return fetchApi('POST', 'register', null, {
        name: name,
        email: email,
        password: password
    })
}

export const authenticate = async (username, password) => {
    return fetchApi('POST', `auth/login?email=${username}&password=${password}`);
}