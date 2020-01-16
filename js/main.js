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
        var $previousInput = $('input[data-input-datepicker="' + (inputNumber - 1) + '"]');
        var currentDate = moment(e.date);
        if (inputNumber === 1) {
            if (!isGreaterThanToday(currentDate)) {
                //empty the input if the value is lower than today
                showError(e.target, 'First date should be greater than today!')
                return $(e.target).val('');
            }else{
              removeError(e.target);
            }
        } else {
            var previousInputDateValue = getInputDate($previousInput.val());

            var difference = currentDate.diff(previousInputDateValue, 'days');
            if (difference >= 0) {
                //you should enter value lower than today
                $(e.target).val('');
                showError(e.target, 'You should add date lower than today !');
            }else{
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
    // var prev = new Date(`${parts[2]}-${parts[1] - 1}-${parts[0]}`);
    return moment(`${parts[2]}-${parts[1]}-${parts[0]}`, 'YYYY-MM-DD');
}


/**
 *
 * @param date moment()
 * @returns {boolean}
 */
function isGreaterThanToday(date) {

    var difference = date.diff(moment(), 'days');

    return difference > 0;
}


/**
 *
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