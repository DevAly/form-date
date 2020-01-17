$(document).ready(function () {

    var loop = 0;
    $('#contact-form input').each(function () {
        var $this = $(this);
        loop++;
        $this.attr('data-input-datepicker', loop);
    });

    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true
    });

    $(".datepicker").on("changeDate", function (e) {

        var inputNumber = Number(e.target.getAttribute('data-input-datepicker'));
        //Get previous input
        var $previousInput = getInputByIndex(inputNumber - 1);
        var $nextInput = getInputByIndex(inputNumber + 1);
        var currentDate = moment(e.date);
        if (inputNumber === 1) {
            if (!isEqualOrBiggerThanToday(currentDate)) {
                //empty the input if the value is lower than today
                showError(e.target, 'First date should be greater than today!')
                return $(e.target).val('');
            } else {
                removeError(e.target);
            }
        } else {
            var previousInputDateValue = getInputDate($previousInput.val());
            var nextInputDateValue = getInputDate($nextInput.val());
            if (isPreviousInputsEmpty(inputNumber)) {
                cleanAllInputsValues();
                var $firstInput = getInputByIndex(1);
                $firstInput.focus();
                return alert('You should fill the previous inputs first');
            }
            //check if current date between previous and next date
            if (!isBetweenTwoDates(currentDate, previousInputDateValue, nextInputDateValue) && !isEmpty($nextInput.val())) {
                return console.log('between');
            }

            var difference = currentDate.diff(previousInputDateValue, 'days');
            if (difference <= 0) {
                //You should enter value lower than today
                $(e.target).val('');
                showError(e.target, 'Date should be greater than the previous input!');
            } else {
                removeError(e.target);
            }
        }

    });


});

/**
 * Get input date from string
 * @param value
 */
function getInputDate(value) {
    var parts = value.split('/');
    return moment(`${parts[2]}-${parts[1]}-${parts[0]}`, 'YYYY-MM-DD');
}


/**
 *
 * @param date {moment}
 * @returns {boolean}
 */
function isEqualOrBiggerThanToday(date) {

    var difference = date.diff(moment(), 'days');

    return difference >= 0;
}


/**
 * show error message for specific input
 * @param target
 * @param message {string}
 */
function showError(target, message) {
    removeError(target);
    $(target).closest('.form-group').append(`<span class="error-message">${message}</span>`);
}

/**
 * remove error
 * @param target
 */
function removeError(target) {
    $(target).closest('.form-group').find('.error-message').remove();
}

/**
 *
 * @param index {Number}
 * @returns {jQuery | HTMLElement}
 */
function getInputByIndex(index) {
    return $('input[data-input-datepicker="' + (index) + '"]');
}

/**
 * Is all inputs empty
 * @returns {boolean}
 * @param index {Number}
 */
function isOtherInputsEmpty(index) {
    var countEmpty = [];
    $('#contact-form input').each(function () {
        var $this = $(this);
        if (isEmpty($this.val()) && Number($this.attr('data-input-datepicker')) !== Number(index)) {
            countEmpty.push(1);
        }
    });

    return countEmpty.length === 0;
}

/**
 * Is previous inputs empty
 * @returns {boolean}
 * @param index {Number}
 */
function isPreviousInputsEmpty(index) {
    var countEmpty = [];
    $('#contact-form input').each(function () {
        var $this = $(this);
        if (isEmpty($this.val()) && Number($this.attr('data-input-datepicker')) < Number(index)) {
            countEmpty.push(1);
        }
    });

    return countEmpty.length > 0;
}

/**
 * Clean all inputs values
 */
function cleanAllInputsValues() {
    $('#contact-form input').each(function () {
        var $this = $(this);
        $this.val('');
    });
}

/**
 * Clean all inputs values
 */
function cleanAllInputsValuesAfterIndex() {
    $('#contact-form input').each(function () {
        var $this = $(this);
        $this.val('');
    });
}

/**
 * Check whether previous and next inputs are not empty
 * @param index {Number}
 */
function isNotEmptyNextAndPreviousInput(index) {
    var $previousInput = getInputByIndex(index - 1), $nextInput = getInputByIndex(index + 1);
    return !isEmpty($previousInput.val()) && !isEmpty($nextInput.val());
}

/**
 * Is empty value
 * @param value
 */
function isEmpty(value) {
    return value === '' || null === value;
}

/**
 * Check if date is between two dates
 * @param dateToCheck {moment}
 * @param firstDate {moment}
 * @param secondDate {moment}
 */
function isBetweenTwoDates(dateToCheck, firstDate, secondDate) {
    return dateToCheck.isBetween(firstDate, secondDate);
}