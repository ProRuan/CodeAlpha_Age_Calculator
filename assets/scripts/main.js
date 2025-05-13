const invalidDateAffirmation = 'Nice try, time traveler. Pick a real date!';
const affirmations = [
    { minAge: 0, text: 'Curiosity is your superpower — keep exploring!' },
    { minAge: 13, text: 'Your thoughts matter. Your voice matters. You matter.' },
    { minAge: 20, text: 'Your energy and ambition can shape the future — keep going!' },
    { minAge: 30, text: 'You’re in your prime — confident, capable, and courageous.' },
    { minAge: 40, text: 'Your story is powerful — keep writing it with pride.' },
    { minAge: 50, text: 'Lead, love, and live fully — you’re just getting started.' },
    { minAge: 60, text: 'Your wisdom lights paths for others — thank you for sharing it.' },
    { minAge: 70, text: 'Your journey inspires — you carry a lifetime of grace.' },
    { minAge: 100, text: 'A legend walks among us. What stories you must carry!' }
];
const futureAgeAffirmation = `
    You may not be here yet, but greatness is already written in your stars.
`;


let userAge = '';


/**
 * Calculates a user age on submit.
 */
function onSubmit() {
    let value = getElementValue('input');
    if (value.length > 9) {
        submitBirthdate(value)
    }
}


/**
 * Submits a birthdate.
 * @param {string} value - The input value. 
 */
function submitBirthdate(value) {
    let date = getCalendarCompatibleDate(value);
    if (isDateValid(date)) {
        setAgeCalculatorStyles();
        calculateAge(date);
    } else {
        setAgeCalculatorStyles(true);
        updateAgeCont('?');
        updateAffirmationContInvalid();
    }
}


// rename!!!
function updateAffirmationContInvalid() {
    let elem = getElement('affirmation-cont');
    elem.innerHTML = `
        <p class="affirmation invalid-date">${invalidDateAffirmation}</p>
    `;
}


/**
 * Gets a formatted date.
 * @param {string} value - The input value.
 * @returns The formatted date.
 */
function getCalendarCompatibleDate(value) {
    return value.split('/').reverse().join('-')
}


/**
 * Checks a date for validity.
 * @param {string} date - The date. 
 * @returns A boolean value.
 */
function isDateValid(date) {
    return new Date(date).toDateString() !== 'Invalid Date';
}


/**
 * Sets age calculator styles.
 * @param {boolean} invalid - A boolean value. 
 */
function setAgeCalculatorStyles(invalid = false) {
    let borderColor = invalid ? '#b22222' : '';
    let bgc = invalid ? '#b22222' : '#1f618d'
    setElementStyle('input', 'borderColor', borderColor);
    setElementStyle('age-cont', 'backgroundColor', bgc);
}


/**
 * Calculates a user age by birth date.
 * @param {Date} birthdate - The birth date.
 */
function calculateAge(birthdate) {
    let birthTime = getTimeByDate(birthdate);
    let birthdateParts = getDateParts(birthdate);
    renderUserAge(birthTime, birthdateParts);
}


/**
 * Checks a user to be born.
 * @param {number} birthTime - The user birth time.
 * @param {number} currentDate - The current time.
 * @returns A boolean value.
 */
function isUserBorn(birthTime, currentTime) {
    return birthTime <= currentTime;
}


/**
 * Renders a user age.
 * @param {number} birthTime - The birth time.
 * @param {object} birthdateParts - The birth date parts.
 */
function renderUserAge(birthTime, birthdateParts) {
    if (isUserBorn(birthTime, currentTime)) {
        userAge = getUserAge(birthdateParts);
        updateAgeCont(userAge);
        updateAffirmationCont();
    } else {
        updateAgeCont('*');
        updateAffirmationCont(futureAgeAffirmation);
    }
}


/**
 * Gets a user age.
 * @param {object} birthdateParts - The birthdate parts object.
 * @returns The user age.
 */
function getUserAge(birthdateParts) {
    const { years, months, days } = getDeltaDateParts(birthdateParts);
    return isBirthdayRemaining(months, days) ? years - 1 : years;
}


/**
 * Gets a delta date parts object.
 * @param {object} birthdateParts - The birthdate parts object.
 * @returns The delta date parts object.
 */
function getDeltaDateParts(birthdateParts) {
    return {
        years: diff(currentDateParts.year, birthdateParts.year),
        months: diff(currentDateParts.month, birthdateParts.month),
        days: diff(currentDateParts.day, birthdateParts.day)
    }
}


/**
 * Gets the difference of a subtraction.
 * @param {number} minuend - The minuend.
 * @param {number} subtrahend - The subtrahend.
 * @returns The difference.
 */
function diff(minuend, subtrahend) {
    return minuend - subtrahend;
}


/**
 * Checks a user birthday remaining to be done.
 * @param {number} deltaMonths - The months after your birth month.
 * @param {number} deltaDays - The days after your birth day.
 * @returns A boolean value.
 */
function isBirthdayRemaining(deltaMonths, deltaDays) {
    return deltaMonths < 0 || deltaMonths === 0 && deltaDays < 0;
}


/**
 * Updates the inner HTML of an age container.
 * @param {any} value - The value to set.
 */
function updateAgeCont(value) {
    let ageCont = getElement('age-cont');
    ageCont.innerHTML = `
        <span id="age" name="age" for="input" class="age">${value}</span>
    `;
}


/**
 * Updates the inner HTML of an affirmation container.
 */
function updateAffirmationCont(text) {
    let affText = text ?? getAffirmation(userAge);
    let elem = getElement('affirmation-cont');
    elem.innerHTML = `<p class="affirmation">${affText}</p>`;
}


/**
 * Gets an age-related affirmation.
 * @param {number} userAge - The user age. 
 * @returns The age-related affirmation.
 */
function getAffirmation(userAge) {
    return affirmations.findLast(aff => userAge >= aff.minAge)?.text || '';
}


/**
 * Updates a date picker value on input.
 */
function onInput() {
    let input = getElement('input');
    if (input.value.length > 9) {
        let value = getCalendarCompatibleDate(input.value);
        datePickerValueSubject.next(value);
    }
}


/**
 * Updates an input value on date change.
 */
function onDateChange() {
    let datePicker = getElement('date-picker');
    let value = getInputCompatibleDate(datePicker.value);
    inputValueSubject.next(value);
}


/**
 * Gets an input compatible date.
 * @param {string} date - The date. 
 * @returns The input compatible date.
 */
function getInputCompatibleDate(date) {
    return date.split('-').reverse().join('/');
}
