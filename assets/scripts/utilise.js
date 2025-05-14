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


