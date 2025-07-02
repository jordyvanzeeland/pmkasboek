import Config from "./Config.json";

export const parseAmount = (value) => {
    if (typeof value === "string") {
        return parseFloat(value.replace(",", "."));
    } else if (typeof value === "number") {
        return value;
    }
    return 0;
};

export const sortOnDate = (list, isSortedDateAsc) => {
    return [...list].sort((a, b) => {
      return isSortedDateAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    }).reverse();
}

export const fetchApi = async (method, uri, additionalHeaders, body) => {
    const url = `${Config.API_URL}/api/${uri}`;

    const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...additionalHeaders ? additionalHeaders : ''
    }

    const options = {
        method, 
        headers,
    }

    if (body && method !== "GET") {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        return data;
      } catch (error) {
        console.error(`fetchApi error [${method} ${uri}]:`, error);
      }
}