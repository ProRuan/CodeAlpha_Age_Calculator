/**
 * Gets an HTML element.
 * @param {string} id - The HTML element id. 
 * @returns The HTML element.
 */
function getElement(id) {
    return document.getElementById(id);
}


/**
 * Gets an HTML element value.
 * @param {string} id - The HTML element id. 
 * @returns The HTML element value.
 */
function getElementValue(id) {
    return getElement(id).value;
}


/**
 * Sets an HTML element style.
 * @param {string} id - The HTML element id.
 * @param {string} property - The style property key.
 * @param {string} value - The style property value to set.
 */
function setElementStyle(id, property, value) {
    let element = getElement(id);
    element.style[property] = value;
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


