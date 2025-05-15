/**
 * Gets a date.
 * @param {any} value - The date value. 
 * @returns The date.
 */
function getDate(value = Date.now()) {
    return new Date(value);
}


/**
 * Gets a date from the ISO string.
 * @param {any} value - The date value. 
 * @returns The date from the ISO string.
 */
function getDateFromISOString(value) {
    return getDate(value).toISOString().split('T')[0];
}


/**
 * Gets a date string.
 * @param {any} value - The date value.
 * @returns The date string.
 */
function getDateString(value) {
    return getDate(value).toDateString();
}


/**
 * Gets a HTML element.
 * @param {string} id - The HTML element id. 
 * @returns The HTML element.
 */
function getElement(id) {
    return document.getElementById(id);
}


/**
 * Gets a HTML element value.
 * @param {string} id - The HTML element id. 
 * @returns The HTML element value.
 */
function getElementValue(id) {
    return getElement(id).value;
}


/**
 * Checks a date for invalidity.
 * @param {any} value - The date value.
 * @returns A boolean value.
 */
function isDateInvalid(value) {
    return getDateString(value) === 'Invalid Date';
}


/**
 * Checks a (leap) date for being existent.
 * @param {any} value - The date value.
 * @returns A boolean value.
 */
function isLeapVerifiedDate(value) {
    return getDateFromISOString(value) === value;
}


/**
 * Sets a HTML element style.
 * @param {string} id - The HTML element id.
 * @param {string} key - The style property key.
 * @param {string} value - The style property value to set.
 */
function setElementStyle(id, key, value) {
    let element = getElement(id);
    element.style[key] = value;
}


/**
 * Sets a HTML element value.
 * @param {string} id - The HTML element id.
 * @param {string} value - The value to set.
 */
function setElementValue(id, value) {
    const element = getElement(id);
    element.value = value;
}


