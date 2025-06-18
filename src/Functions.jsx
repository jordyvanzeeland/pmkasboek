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