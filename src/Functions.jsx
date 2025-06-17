export const parseAmount = (value) => {
    if (typeof value === "string") {
        return parseFloat(value.replace(",", "."));
    } else if (typeof value === "number") {
        return value;
    }
    return 0;
};