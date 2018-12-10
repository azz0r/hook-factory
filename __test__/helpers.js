import weighted from "weighted"

export const arrayOfLength = length => new Array(length).fill(1 / length)
export const chooseRandom = items => weighted.select(items, arrayOfLength(items.length))
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