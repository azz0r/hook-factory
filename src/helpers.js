import weighted from "weighted"

const select = weighted.select

export const getPercentageAmount = (total, percentage) => total * (percentage / 100)
export const arrayOfLength = length => new Array(length).fill(1 / length)
export const chooseRandom = items => select(items, arrayOfLength(items.length))
export const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
        var key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}