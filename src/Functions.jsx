import html2pdf from 'html2pdf.js';
import Config from "./Config.json";
import { currentUser } from "./data/Auth";

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

export const getUser = async () => {
    const data = await currentUser();
    return data;
}

export const checkIfAdmin = async () => {
    const data = await currentUser();
    return data.isAdmin;
}

export const printToPDF = async () => {
    const element = document.getElementsByClassName('content')[0];
    element.classList.add(['content-print']);
    document.querySelector('.pdf-loader-screen').style.display = "block";

    const opt = {
        margin:       0.5,
        filename:     `kasboek-maand.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().from(element).set(opt).save().then(result => {
        element.classList.remove(['content-print']);
        document.querySelector('.pdf-loader-screen').style.display = "none";
      });
};

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