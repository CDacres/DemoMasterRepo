$(document).ready(function() {
    var date = getUrlParameter('date');
    if (date) {
        var newDate = date.split("-").reverse().join("-");
        if (typeof newDate != 'undefined') {
            setCalAndGuests(newDate);
            $('#daily_booking_toggle').click(function() {
                dailyBooking(newDate);
            });
        }
    }
});

function setCalAndGuests(date) {
    if (($('#checkin').length > 0) && (date !== '' && date !== null)) {
        $('#checkin').val(date).data('Zebra_DatePicker').show();
        RoomBooker.calendarChangeHandler('in', date);
        var bookingDuration = getUrlParameter('duration');
        if (parseFloat(bookingDuration) == 480 && RoomBooker.dailyStandardRate != null) {
            dailyBooking(date);
        } else {
            if (RoomBooker.isHourlyBookingType()) {
                var startTime = getUrlParameter('time');
                var endTime;
                setTimeout(function() {
                    if (RoomBooker.slots.length > 0) {
                        var startSlot = searchStart(startTime, RoomBooker.slots);
                        if (typeof startSlot !== 'undefined') {
                            RoomBooker.selectSlot(startSlot);
                            RoomBooker.addSelectClass(startSlot);
                            if (bookingDuration !== '' && bookingDuration !== '0') {
                                endTime = parseFloat(startTime) + parseFloat(bookingDuration);
                            } else {
                                endTime = parseFloat(startTime) + parseFloat(RoomBooker.minimumBookingMinutes);
                            }
                            var endSlot = searchEnd(endTime.toString(), RoomBooker.slots);
                            if (typeof endSlot !== 'undefined') {
                                RoomBooker.selectSlot(endSlot);
                                RoomBooker.addSelectClass(endSlot);
                                RoomBooker.fillTimeGap();
                                RoomBooker.updatePrice();
                                RoomBooker.updateDuration();
                                if ($('div[selected="selected"]').length > 0) {
                                    $('div#slots').scrollTop($('div[selected="selected"]:first').position().top);
                                }
                            }
                        }
                    }
                }, 500);
            } else if (RoomBooker.isDailyBookingType()) {
                dailyBooking(date);
            }
        }
    }
    var guests = getUrlParameter('guests');
    $('select#number_of_guests').val(guests).change();
}

function dailyBooking(date) {
    RoomBooker.setDailyBooking();
    $('#checkout').val(date).data('Zebra_DatePicker').show();
    RoomBooker.calendarChangeHandler('out', date);
}

function searchStart(nameKey, myArray) {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].start === nameKey) {
            return myArray[i];
        }
    }
}

function searchEnd(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].end === nameKey) {
            return myArray[i];
        }
    }
}
