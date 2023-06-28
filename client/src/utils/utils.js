export function capitalizeFirstLetter (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function isEmptyArray (array) {
    return !array
        || !Array.isArray(array)
        || !array.length;
}



