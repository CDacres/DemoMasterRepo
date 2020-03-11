var calendar_wrapper_class=
{
    closedDays: [],
    holidayDates: [],
    unavailableDatesForHourly: [],
    unavailableDatesForDaily: [],
    callbackObject: null,
    checkin: null,
    checkout: null,

    init: function(params, language)
    {
        this.parseParams(params);
        // if (!mobileSite)
        // {
            this.initCalendar(language);
        // }
        this.resizeCal();
    },

    parseParams: function(params)
    {
        this.closedDays = params.closedDaysData.daysOfWeek;
        this.holidayDays = this.convertDate(params.closedDaysData.holidayDates);
        this.unavailableDatesForHourly = this.convertDate(params.closedDaysData.unavailableDatesForHourly);
        this.unavailableDatesForDaily = this.convertDate(params.closedDaysData.unavailableDatesForDaily);
        this.callbackObject = params.callbackObject;
    },

    convertDate: function(rawDateArray)
    {
        var retArray = [];
        $.each(rawDateArray, function(i,v){
            var date = new Date(v);
            retArray.push(date.getDate() + " " + (date.getMonth()+1) + " " + date.getFullYear());
        });
        return retArray;
    },

    initCalendar: function(language)
    {
        var scopeThis = this;
        var disabledDays = this.getDisabledDays(0);
        if (disabledDays !== false && $('#book_it').length == 1)
        {
            $('#checkin').Zebra_DatePicker(
            {
                always_visible: $('#checkin-container'),
                direction: true,
                disabled_dates: disabledDays,
                pair: $('#checkout'),
                onSelect: function(date){
                    scopeThis.callbackObject.calendarChangeHandler('in', date);
                },
                days: [language.common.Sunday, language.common.Monday, language.common.Tuesday, language.common.Wednesday, language.common.Thursday, language.common.Friday, language.common.Saturday],
                months: [language.common.January, language.common.February, language.common.March, language.common.April, language.common.May, language.common.June, language.common.July, language.common.August, language.common.September, language.common.October, language.common.November, language.common.December]
            });
            this.checkin = $('#checkin').data('Zebra_DatePicker');
            $('#checkout').Zebra_DatePicker(
            {
                direction: true,
                disabled_dates: disabledDays,
                always_visible: $('#checkout-container'),
                onSelect: function(date){
                    scopeThis.callbackObject.calendarChangeHandler('out', date);
                },
                days: [language.common.Sunday, language.common.Monday, language.common.Tuesday, language.common.Wednesday, language.common.Thursday, language.common.Friday, language.common.Saturday],
                months: [language.common.January, language.common.February, language.common.March, language.common.April, language.common.May, language.common.June, language.common.July, language.common.August, language.common.September, language.common.October, language.common.November, language.common.December]
            });
            this.checkout = $('#checkout').data('Zebra_DatePicker');
        }
    },

    resizeCal: function()
    {
        $('.dp_caption').click(function ()
        {
            $('table.dp_monthpicker').width($('.Zebra_DatePicker').width());
            $('table.dp_yearpicker').width($('.Zebra_DatePicker').width());
        });
    },

    updateDisabledDays: function(bookingType)
    {
        var disabledDays=this.getDisabledDays(bookingType);
        if (disabledDays !== false && this.checkin != null && this.checkout != null)
        {
            this.checkin.update({
                disabled_dates: disabledDays
            });
            this.checkin.show();
            this.checkout.update({
                disabled_dates: disabledDays
            });
            this.checkout.show();
        }
    },

    getDisabledDays: function(bookingType)
    {
        var retArray = [];
        var first = true;
        var disString = '';
        $.each(this.closedDays, function(i,v){
            disString += (!first?',':'') + v;
            first = false;
        });
        if (disString !== '')
        {
            if (disString == '0,1,2,3,4,5,6')
            {
                retArray = false;
            }
            else
            {
                retArray.push("* * * " + disString);
            }
        }
        if (retArray !== false)
        {
            $.each(this.holidayDates, function(i,v) {
                retArray.push(v);
            });
            if (bookingType === 0)
            {
                $.each(this.unavailableDatesForHourly, function(i,v){
                    retArray.push(v);
                });
            }
            else if (bookingType === 1)
            {
                $.each(this.unavailableDatesForDaily, function(i,v){
                    retArray.push(v);
                });
            }
            return retArray;
        }
    },

    clearCalendars: function(language)
    {
        this.resetCheckInValue(language);
        this.resetCheckOutValue(language);
    },

    resetCheckInValue: function(language)
    {
        // $('#checkin').data('Zebra_DatePicker').clear_date();
        $('#checkin').val(language.rooms.rooms_click_here);
        $('td.dp_selected').each(function()
        {
            $(this).removeClass('dp_selected');
        });
    },

    resetCheckOutValue: function(language)
    {
        // $('#checkout').data('Zebra_DatePicker').clear_date();
        $('#checkout').val(language.rooms.rooms_click_here);
        $('td.dp_selected').each(function()
        {
            $(this).removeClass('dp_selected');
        });
    }
};