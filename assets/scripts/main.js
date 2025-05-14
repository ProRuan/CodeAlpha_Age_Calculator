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
    if (isDateComplete(value)) {
        submitBirthdate(value);
    }
}


/**
 * Checks an input value to be ready for submission.
 * @param {string} value - The input value. 
 * @returns A boolean value.
 */
function isDateComplete(value) {
    return value.length === 10;
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
        setErrorAffirmation();
    }
}



/**
 * Gets a calendar compatible date.
 * @param {string} value - The input value.
 * @returns The calendar compatible date.
 */
function getCalendarCompatibleDate(value) {
    return value.split('/').reverse().join('-');
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
 * @param {boolean} invalid - The value to set. 
 */
function setAgeCalculatorStyles(invalid = false) {
    let borderColor = invalid ? '#b22222' : '';
    let bgc = invalid ? '#b22222' : '#1f618d';
    setElementStyle('input', 'borderColor', borderColor);
    setElementStyle('age-cont', 'backgroundColor', bgc);
}


/**
 * Calculates a user age by birthdate.
 * @param {Date} birthdate - The birthdate.
 */
function calculateAge(birthdate) {
    let birthTime = getTimeByDate(birthdate);
    let birthdateParts = getDateParts(birthdate);
    renderUserAge(birthTime, birthdateParts);
    setElementValue('input', '');
    setSubmitButtonDisabled(true);
}


/**
 * Renders a user age.
 * @param {number} birthTime - The birth time.
 * @param {object} birthdateParts - The birthdate parts.
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
 * Checks a user to be born.
 * @param {number} birthTime - The user birth time.
 * @param {number} currentTime - The current time.
 * @returns A boolean value.
 */
function isUserBorn(birthTime, currentTime) {
    return birthTime <= currentTime;
}


/**
 * Gets a user age.
 * @param {object} birthdateParts - The object containing the birthdate parts.
 * @returns The user age.
 */
function getUserAge(birthdateParts) {
    const { years, months, days } = getDeltaDateParts(birthdateParts);
    return isBirthdayRemaining(months, days) ? years - 1 : years;
}


/**
 * Gets the object containing delta date parts.
 * @param {object} birthdateParts - The object containing the birthday parts.
 * @returns The object cotaining the delta date parts.
 */
function getDeltaDateParts(birthdateParts) {
    return {
        years: diff(currentDateParts.year, birthdateParts.year),
        months: diff(currentDateParts.month, birthdateParts.month),
        days: diff(currentDateParts.day, birthdateParts.day)
    };
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
 * @param {number} deltaMonths - The distance to the user birth month in month.
 * @param {number} deltaDays - The distance to the user birth day in days.
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
 * @param {string} text - The text to set.
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
 * Sets the disabled state of a submit button.
 * @param {boolean} value - The value to set.
 */
function setSubmitButtonDisabled(value) {
    let submitBtn = getElement('submit-btn');
    submitBtn.disabled = value;
}


/**
 * Sets an error affirmation.
 */
function setErrorAffirmation() {
    let affCont = getElement('affirmation-cont');
    affCont.innerHTML = `
        <p class="affirmation invalid-date">${invalidDateAffirmation}</p>
    `;
}



/**
 * Updates input related values on input.
 */
function onInput() {
    let value = getElementValue('input');
    if (isDateComplete(value)) {
        setSubmitButtonDisabled(false);
        let date = getCalendarCompatibleDate(value);
        if (isDateValid(date)) {
            datePickerValueSubject.next(date);
        }
    } else {
        setSubmitButtonDisabled(true);
    }
}


/**
 * Updates an input value on date change.
 */
function onDateChange() {
    let datePicker = getElement('date-picker');
    let value = getInputCompatibleValue(datePicker.date);
    inputValueSubject.next(value);
}


/**
 * Gets an input compatible value.
 * @param {string} date - The date. 
 * @returns The input compatible value.
 */
function getInputCompatibleValue(date) {
    return date.split('-').reverse().join('/');
}
