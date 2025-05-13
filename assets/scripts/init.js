const { BehaviorSubject } = rxjs;

const inputValueSubject = new BehaviorSubject('');
const inputValue$ = inputValueSubject.asObservable();

const datePickerValueSubject = new BehaviorSubject('');
const datePickerValue$ = datePickerValueSubject.asObservable();

let currentDate;
let currentDateParts;
let currentTime;


/**
 * Initializes an age calculator.
 */
function onInit() {
    subscribeTo(inputValue$, 'input');
    subscribeTo(datePickerValue$, 'date-picker');
    setCurrentDateDataSet();
}


/**
 * Subscribes to an observable value.
 * @param {any} elementValue$ - The observable value.
 * @param {string} elementId - The HTML element id.
 */
function subscribeTo(elementValue$, elementId) {
    elementValue$.subscribe({
        next: (value) => setElementValue(elementId, value)
    })
}

/**
 * Sets a current date data set.
 */
function setCurrentDateDataSet() {
    currentDate = getCurrentDate();
    currentDateParts = getDateParts(currentDate);
    currentTime = getTimeByDate(currentDate);
}


/**
 * Gets a current date.
 * @returns The current date.
 */
function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

/**
 * Gets an object with the date parts.
 * @param {string} date - The date.
 * @returns The object with the date parts.
 */
function getDateParts(date) {
    let [year, month, day] = date.split('-');
    return { year, month, day };
}


/**
 * Gets a time by date.
 * @param {Date} date - The date.
 * @returns The time.
 */
function getTimeByDate(date) {
    return new Date(date).getTime();
}