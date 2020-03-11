var Slot = function (id, slotParams, callbackObject)
{
    this.id = id;
    this.start = slotParams.start;
    this.end = slotParams.end;
    this.periodId = slotParams.period_id;
    this.price = slotParams.price;
    this.discount_price = slotParams.discount_price;
    this.user_discount = slotParams.user_discount;
    this.selected = false;
    this.available = slotParams.available;
    this.callbackObject = callbackObject;
    this.$element = $(document.createElement("div"));
    this.$element.addClass('time_slot');
    if (slotParams.available == false)
    {
        this.$element.addClass('booked');
    }
    else
    {
        var scopeThis = this;
        this.$element.click(function()
        {
            if (!$(this).attr('selected'))
            {
                scopeThis.toggle();
                scopeThis.callbackObject.fillTimeGap();
            }
            else
            {
                scopeThis.toggle();
            }
            scopeThis.callbackObject.slotsUpdated();
        });
    }
    this.$element.html(slotParams.start_formatted + " - " + slotParams.end_formatted);
    $price = $(document.createElement("span"));
    $price.addClass('time_slot_price');
    if (this.user_discount != null && this.discount_price != null)
    {
        $oldprice = $(document.createElement("span"));
        $oldprice.addClass('old-price');
        $oldprice.html(slotParams.price_formatted_to_quantum);
        $price.append($oldprice);
        $newprice = $(document.createElement("span"));
        $newprice.html(slotParams.discount_price_formatted_to_quantum);
        $price.append($newprice);
    }
    else
    {
        $price.html(slotParams.price_formatted_to_quantum);
    }
    this.$element.append($price);
    this.getElement = function()
    {
        return this.$element;
    };
    this.getSlotDataArray = function()
    {
        return {
            start: this.start,
            end: this.end,
            periodId: this.periodId
        };
    };
    this.toggle = function()
    {
        if (this.selected === false)
        {
            this.$element.addClass('selected');
            this.$element.attr('selected', true);
            this.selected = true;
        }
        else
        {
            this.$element.removeClass('selected');
            this.$element.attr('selected', false);
            this.selected = false;
        }
    };
    this.isEnabled = function()
    {
        return this.selected;
    };
    this.isDiscounted = function()
    {
        return (this.user_discount != null && this.discount_price != null);
    };
};

var RoomBooker =
{
    diarytron: calendar_wrapper_class,
    roomId: null,
    assetId: null,
    bookingType: 0, //hourly booking - 0; daily booking - 1; daily delegate - 2;
    startDate: null,
    endDate: null,
    slots: [],
    slotDate: null,
    guests: 0,
    minimumBookingMinutes: null,
    minimumBookingDays: null,
    dailyBookingOnly: false,
    dailyStandardRate: null,
    dailyDelegateRate: null,
    minimumDelegates: null,
    badDates: [],
    holidayDates: [],
    closedDays: [],
    seenBubble: false,
    price: null,
    widgetMode: false,

    init: function(params, language)
    {
        this.parseParams(params);
        this.initCalendar(params.calendarParams, language);
        this.attachListeners(language);
        this.clearAll(language);
        this.hideDuration();
        this.showDuration();
    },

    parseParams: function(params)
    {
        this.roomId = params.roomId;
        this.assetId = params.assetId;
        this.widgetMode = params.widgetMode;
        this.parseBookingData(params.bookingData);
        this.parseClosedDaysData(params.closedDaysData);
    },

    parseBookingData: function(bookingData)
    {
        this.minimumBookingMinutes = bookingData.minimumBookingMinutes;
        this.minimumBookingDays = bookingData.minimumBookingDays;
        this.dailyBookingOnly = bookingData.dailyBookingOnly;
        this.dailyDelegateRate = bookingData.dailyDelegateRate;
        this.dailyStandardRate = bookingData.dailyStandardRate;
        this.minimumDelegates = bookingData.minimumDelegates;
    },

    parseClosedDaysData: function(closedDaysData)
    {
        this.parseBadDates(closedDaysData.unavailableDatesForDaily);
        this.parseHolidayDates(closedDaysData.holidayDates);
        this.closedDays = closedDaysData.daysOfWeek;
    },

    parseBadDates: function(badDates)
    {
        var scopeThis = this;
        $.each(badDates, function(i,v)
        {
            scopeThis.badDates.push(new Date(v).getTime());
        });
    },

    parseHolidayDates: function(holidays)
    {
        var scopeThis = this;
        $.each(holidays, function(i,v)
        {
            scopeThis.holidayDates.push(new Date(v).getTime());
        });
    },

    initCalendar: function(params, language)
    {
        this.diarytron.init(params, language);
    },

    attachListeners: function(language)
    {
        if (this.dailyBookingOnly)
        {
            this.setStartEndDateTitles(language);
            this.setDailyBooking(true, language);
        }
        else
        {
            this.setStartDateTitle(language);
            this.attachBookingTypeToggles(language);
        }
        this.attachDatePickerToggles();
        this.attachClearAllTrigger(language);
        this.attachGuestsListener();
        this.attachBookItListener();
    },

    getSlotsArray: function()
    {
        return this.slots;
    },

    getSelectedSlots: function()
    {
        var slotsArray = this.getSlotsArray();
        var selectedSlots = [];
        for (var s = 0; s < slotsArray.length; ++s)
        {
            if (slotsArray[s].selected)
            {
                selectedSlots.push(s);
            }
        }
        return selectedSlots;
    },

    getMinAndMax: function()
    {
        var selectedSlots = this.getSelectedSlots();
        if (selectedSlots.length > 0)
        {
            var data = {
                max: Math.max.apply(null, selectedSlots),
                min: Math.min.apply(null, selectedSlots)
            };
            return data;
        }
    },

    fillTimeGap: function()
    {
        var scopeThis = this;
        var slotsArray = this.getSlotsArray();
        var selectedSlots = this.getSelectedSlots();
        var minMax = this.getMinAndMax();
        if (selectedSlots.length > 0)
        {
            var min = minMax.min;
            var max = minMax.max;
            if ((max - min) > 1)
            {
                var indexArray = [];
                for (var i = min+1; i < max; i++)
                {
                    var index = slotsArray[i].id;
                    indexArray.push(index);
                }
                scopeThis.findSlotsInArray(indexArray);
            }
        }
    },

    findSlotsInArray: function(indexArray)
    {
        var scopeThis = this;
        var minMax = this.getMinAndMax();
        var slotsArray = this.getSlotsArray();
        $(indexArray).each(function(index, value)
        {
            var slot = slotsArray[value];
            if (slot.available)
            {
                if (value > minMax.min && value < minMax.max)
                {
                    scopeThis.selectSlot(slot);
                    scopeThis.addSelectClass(slot);
                }
                else
                {
                    scopeThis.deSelectSlot(slot);
                    scopeThis.removeSelectClass(slot);
                }
            }
        });
    },

    selectSlot: function(slot)
    {
        slot.selected = true;
    },

    deSelectSlot: function(slot)
    {
        slot.selected = false;
    },

    addSelectClass: function(slot)
    {
        var slotIndex = slot.id;
        var element = $('.time_slot').get(slotIndex);
        $(element).addClass('selected');
        $(element).attr('selected', true);
    },

    removeSelectClass: function(slot)
    {
        var slotIndex = slot.id;
        var element = $('.time_slot').get(slotIndex);
        $(element).removeClass('selected');
        $(element).$element.attr('selected', false);
    },

    setStartEndDateTitles: function(language)
    {
        $('#startdate').html(language.rooms.rooms_start_date);
        $('#enddate').html(language.rooms.rooms_end_date);
    },

    setStartDateTitle: function(language)
    {
        $('#startdate').html(language.rooms.rooms_date);
    },

    attachBookItListener: function()
    {
        var scopeThis = this;
        $('#book_it_bar').click(function()
        {
            // scopeThis.initMixpanel();
            scopeThis.bookIt();
        });
    },

    // initMixpanel: function()
    // {
    //     var date = $('#checkin').val();
    //     var duration = $('#s_houre').text();
    //     var price = $('#total_price').text();
    //     var guests = $('#number_of_guests').val();
    //     mixpanel.track("Room - Number of Guests", {
    //       "date": date,
    //       "duration": duration,
    //       "price": price,
    //       "guests": guests
    //     });
    // },

    bookIt: function()
    {
        if (this.isHourlyBookingType() && !this.hasGoodSlots())
        {
            var errorMessage = "Please choose times with no gaps in";
            if (this.minimumBookingMinutes === null || this.minimumBookingMinutes === "0")
            {
                errorMessage += ".";
            }
            else
            {
                errorMessage += ", totalling to at least " + this.minimumBookingMinutes + " minutes.";
            }
            bootstrapError(errorMessage);
        }
        else if (this.isDailyBookingType() && !this.hasGoodDates())
        {
            bootstrapError("Please choose dates that cover at least " + this.minimumBookingDays + " days.");
        }
        else if ((this.isHourlyBookingType() && this.getHourlyPriceTotal() == null) || (this.isDailyBookingType() && this.getDailyPriceTotal() == null))
        {
            bootstrapError("There is a problem with the price, please contact Zipcube if you continue experiencing problems.");
        }
        else if (this.isGoodGuestWise())
        {
            window.location.href = base_url + country_lang_url + '/payments?' + $.param(this.getRelevantBookingData()) + this.passThroughVariables();
        }
    },

    passThroughVariables: function()
    {
        var retString = '';
        if (this.widgetMode)
        {
            retString = "&widget=1";
        }
        return retString;
    },

    getRelevantBookingData: function()
    {
        //this maps directly to a 'provisionalBooking' object server-side in 'payments' controller
        //so be careful with changing param names
        return {
            room_id: this.roomId,
            asset_id: this.assetId,
            booking_type: this.bookingType,
            start_date: this.startDate,
            guests: this.guests,
            base_price: this.price,
            end_date: this.endDate,
            slots: this.getPeriodsArray()
        };
    },

    isDailyBookingType: function()
    {
        return (this.bookingType === 1 || this.bookingType === 2);
    },

    isDailyDelegateBookingType: function()
    {
        return (this.bookingType === 2);
    },

    isHourlyBookingType: function()
    {
        return (this.bookingType === 0);
    },

    attachClearAllTrigger: function(language)
    {
        var scopeThis = this;
        $('#clear-all').click(function()
        {
            if ($('#daily_booking_toggle').hasClass('active'))
            {
                scopeThis.clearAllDaily(language);
            }
            else
            {
                scopeThis.clearAll(language);
            }
        });
    },

    clearAll: function(language)
    {
        this.slotDate = null;
        this.guests = 0;
        this.diarytron.clearCalendars(language);
        this.resetGuests();
        this.hideSlots();
        this.emptySlots();
        // this.offerSlots(this.getStartDate());
        this.hideCalendars();
        this.showSelectors();
        this.updatePrice();
        $('#s_houre').empty();
    },

    clearAllDaily: function(language)
    {
        this.startDate = null;
        this.endDate = null;
        this.slotDate = null;
        this.guests = 0;
        this.diarytron.clearCalendars(language);
        this.resetGuests();
        this.hideSlots();
        this.emptySlots();
        this.hideCalendars();
        this.showSelectors();
        this.updatePrice();
    },

    reset: function(language)
    {
        this.clearAll(language);
        this.setHourlyBooking();
        this.bubbleHide();
    },

    attachGuestsListener: function()
    {
        var scopeThis = this;
        $('#number_of_guests').change(function()
        {
            scopeThis.updateGuestNumbers($(this).val());
        });
    },

    attachDatePickerToggles: function()
    {
        var scopeThis = this;
        $('#checkin-selector').click(function()
        {
            scopeThis.showCheckIn();
        });
        $('#checkout-selector').click(function()
        {
            scopeThis.showCheckOut();
        });
    },

    showCheckIn: function()
    {
        this.bubbleHide();
        this.hideSelectors();
        this.hideSlots();
        $('#checkin-container').show();
        $('#checkout-container').hide();
    },

    showCheckOut: function()
    {
        this.hideSlots();
        $('#checkin-container').hide();
        if (this.issetStartDate())
        {
            this.hideSelectors();
            $('#checkout-container').show();
        }
        else
        {
            bootstrapError("Please select a start date first.");
        }
    },

    hideSelectors: function()
    {
        $('#date-selectors').hide();
    },

    showSelectors: function()
    {
        $('#date-selectors').show();
    },

    attachBookingTypeToggles: function(language)
    {
        var scopeThis = this;
        $('#daily_booking_toggle').click(function(e)
        {
            scopeThis.setDailyBooking(language);
        });
        $('#hourly_booking_toggle').click(function(e)
        {
            scopeThis.setHourlyBooking(language);
        });
    },

    updateGuestNumbers: function(number)
    {
        this.guests = Number(number);
        this.updatePrice();
    },

    resetGuests: function()
    {
        $('#number_of_guests').val("0").change();
    },

    calendarChangeHandler: function(type, date)
    {
        this.setDate(type,date);
        this.hideCalendars();
        if (this.isHourlyBookingType() && type === 'in')
        {
            this.offerSlots(date);
        }
        this.showSelectors();
        this.updatePrice();
    },

    offerSlots: function(date)
    {
        if (date !== this.slotDate)
        {
            this.emptySlots();
            this.populateSlots(date);
        }
        this.showSlots();
    },

    updatePrice: function()
    {
        if (this.isPricable())
        {
            this.showPriceLoader();
            var price = '';
            if (this.isHourlyBookingType())
            {
                price = this.getHourlyPriceTotal();
            }
            else
            {
                price = this.getDailyPriceTotal();
            }
            this.parsePrice(price);
            this.hidePriceLoader();
        }
        else
        {
            this.resetPrice();
        }
    },

    getHourlyPriceTotal: function()
    {
        var runningTotal = null;
        if (this.isGoodHourly())
        {
            $.each(this.slots, function(key, slot)
            {
                if (slot.isEnabled())
                {
                    if (slot.isDiscounted())
                    {
                        runningTotal += Number(slot.discount_price);
                    }
                    else
                    {
                        runningTotal += Number(slot.price);
                    }
                }
            });
        }
        return runningTotal;
    },

    getDailyPriceTotal: function()
    {
        var total = null;
        if (this.isDailyBookingType())
        {
            var daysCount = this.getSelectedDaysCount();
            if (daysCount > 0)
            {
                if (this.isDailyDelegateBookingType())
                {
                    total = daysCount*this.guests*this.dailyDelegateRate;
                }
                else
                {
                    total = daysCount*this.dailyStandardRate;
                }
            }
        }
        return total;
    },

    getSelectedDaysCount: function()
    {
        var runningTotal = 0;
        if (this.isGoodDaily())
        {
            var currentDate = new Date(new Date(this.startDate).getTime()),
                endDate = new Date(new Date(this.endDate).getTime())
            ;
            while (currentDate <= endDate)
            {
                if ($.inArray(currentDate.getTime(), this.badDates) > -1)
                {
                    bootstrapError("This rooms is unavailable on " + currentDate.toDateString() + ". Please select alternative dates.");
                    runningTotal = 0;
                    break;
                }
                else if (($.inArray(currentDate.getTime(), this.holidayDates) === -1) && ($.inArray(currentDate.getDay(), this.closedDays) === -1))
                {
                    runningTotal++;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
        return runningTotal;
    },

    resetPrice: function()
    {
        this.disableBooking();
        this.setPrice(null);
    },

    parsePrice: function(priceString)
    {
        this.setPrice(priceString);
        this.enableBooking();
    },

    setPrice: function(priceString)
    {
        if (priceString === null)
        {
            priceString = "-";
            this.price = null;
        }
        else
        {
            priceString = (Math.ceil(priceString*10000)/10000).toFixed(2);
            this.price = priceString;
        }
        $('#total_price').text(priceString);
    },

    getPeriodsArray: function()
    {
        var periodsArray = [];
        if (this.isHourlyBookingType())
        {
            var lastPeriodId = null;
            var newPeriod = {};
            $.each(this.slots, function(key, slot)
            {
                if (slot.isEnabled())
                {
                    if (slot.periodId != lastPeriodId)
                    {
                        if (lastPeriodId !== null)
                        {
                            periodsArray.push({start: newPeriod.start, end: newPeriod.end, period_id: newPeriod.period_id});
                        }
                        lastPeriodId = slot.periodId;
                        newPeriod.start = slot.start;
                        newPeriod.end = slot.end;
                        newPeriod.period_id = slot.periodId;
                    }
                    else
                    {
                        newPeriod.end = slot.end;
                    }
                }
            });
            periodsArray.push({start: newPeriod.start, end: newPeriod.end, period_id: newPeriod.period_id});
        }
        return periodsArray;
    },

    hideDuration: function()
    {
        $('#daily_booking_toggle').click(function()
        {
            $('#zc_duration_wrapper').hide();
        });
    },

    showDuration: function()
    {
        $('#hourly_booking_toggle').click(function()
        {
            $('#zc_duration_wrapper').show();
        });
    },

    updateDuration: function()
    {
        var duration = this.getSlotDuration();
        if (duration === false || duration === 0)
        {
            $("#zc_duration_wrapper").hide();
        }
        else
        {
            var hours = duration/60;
            $("#s_houre").html(hours);
            $("#zc_duration_wrapper").show();
        }
    },

    getSlotDuration: function()
    {
        var startTime = null;
        var endTime = null;
        var currentId = null;
        var retVal = true;
        $.each(this.slots, function(key, slot)
        {
            if (slot.isEnabled())
            {
                if (currentId !== null && slot.id !== currentId+1)
                {
                    retVal = false;
                    return false;
                }
                currentId = slot.id;
                if (startTime === null)
                {
                    startTime = slot.start;
                }
                endTime = slot.end;
            }
        });
        if (retVal)
        {
            retVal = endTime-startTime;
        }
        return retVal;
    },

    hasGoodSlots: function()
    {
        var duration = this.getSlotDuration();
        var retVal = false;
        if (duration !== false && duration >= this.minimumBookingMinutes)
        {
            retVal = true;
        }
        return retVal;
    },

    hasGoodDates: function()
    {
        var retVal = false;
        var endDate = new Date(this.getEndDate());
        var startDate = new Date(this.getStartDate());
        if (endDate >= startDate)
        {
            if ((endDate-startDate)/1000/60/60/24 >= (this.minimumBookingDays-1))
            {
                retVal = true;
            }
        }
        return retVal;
    },

    isGoodGuestWise: function()
    {
        var retVal = true;
        if (this.guests === 0)
        {
            bootstrapError("Please select the number of guests who will be attending.");
            retVal = false;
        }
        else if (this.isDailyDelegateBookingType())
        {
            if (!(this.guests >= this.minimumDelegates))
            {
                bootstrapError("To take advantage of the daily delegate rate you must have at least " + this.minimumDelegates + " guests.");
                retVal = false;
            }
        }
        return retVal;
    },

    isGoodTimeWise: function()
    {
        return this.isGoodHourly() || this.isGoodDaily();
    },

    isGoodHourly: function()
    {
        return this.isHourlyBookingType() && this.issetStartDate() && this.activeSlotExists();
    },

    isGoodDaily: function()
    {
        return this.isDailyBookingType() && this.issetEndDate() && this.issetStartDate();
    },

    enableBooking: function()
    {
        $('#booking-options-disable').hide();
    },

    disableBooking: function()
    {
        $('#booking-options-disable').show();
    },

    isPricable: function()
    {
        return (this.isGoodTimeWise());
    },

    isBookable: function()
    {
        return this.hasPrice() && this.isPricable();
    },

    hasPrice: function()
    {
        return this.price === null?false:true;
    },

    hideCalendars: function()
    {
        $('#checkin-container').hide();
        $('#checkout-container').hide();
    },

    clearSlots: function()
    {
        this.slots = [];
    },

    activeSlotExists: function()
    {
        var retVal = false;
        $.each(this.slots, function(key, slot)
        {
            if (slot.isEnabled())
            {
                retVal = true;
                return false;
            }
        });
        return retVal;
    },

    showSlots: function()
    {
        $('#slots').show();
    },

    hideSlots: function()
    {
        $('#slots').hide();
    },

    emptySlots: function()
    {
        $('#slots').empty();
        this.clearSlots();
    },

    populateSlots: function(date)
    {
        var scopeThis = this;
        var data = {
            date: date,
            assetId: this.assetId
        };
        $.ajax({
            url: base_url + "api/v1/rooms/availabilities",
            data: data,
            dataType: "json",
            type: "GET",
            statusCode: {
                200: function(response) {
                    if (typeof response != 'undefined' && response.length)
                    {
                        var timeSlots = JSON.parse(response).data;
                        scopeThis.parseTimeSlots(date, timeSlots.objects);
                    }
                }
            },
            error: function()
            {
                bootstrapError("There was a general error while getting the availabilities.");
            }
        });
    },

    parseTimeSlots: function(date, slotsArray)
    {
        this.slotDate = date;
        var scopeThis = this;
        var idGenerator = 0;
        $.each(slotsArray, function(key, params)
        {
            var slot = new Slot(idGenerator++, params, scopeThis);
            $('#slots').append(slot.getElement());
            scopeThis.slots.push(slot);
        });
    },

    slotsUpdated: function()
    {
        this.updatePrice();
        this.updateDuration();
    },

    setDate: function(type,date)
    {
        if (type === 'in')
        {
            this.setStartDate(date);
        }
        else
        {
            this.setEndDate(date);
        }
    },

    setHourlyBooking: function(language)
    {
        this.bubbleHide();
        this.hideCalendars();
        this.showSelectors();
        $('#startdate').html(language.rooms.rooms_date);
        $('#checkout-selector').hide();
        $('#daily_booking_toggle').removeClass('active');
        $('#hourly_booking_toggle').addClass('active');
        this.setHourly();
        if (this.issetStartDate())
        {
            this.offerSlots(this.getStartDate());
        }
        this.updatePrice();
    },

    setDailyBooking: function(enforced, language)
    {
        enforced = enforced?enforced:false;
        this.bubbleHide();
        this.hideCalendars();
        this.showSelectors();
        $('#hourly_booking_toggle').removeClass('active');
        $('#daily_booking_toggle').addClass('active');
        if (enforced)
        {
            $('#daily_booking_enforced').show();
        }
        else
        {
            $('#startdate').html(language.rooms.rooms_start_date);
            $('#enddate').html(language.rooms.rooms_end_date);
        }
        $('#checkout-selector').show();
        this.hideSlots();
        this.setDaily();
        this.updatePrice();
    },

    issetStartDate: function()
    {
        if (this.startDate !== null)
        {
            return true;
        }
        else
        {
            return false;
        }
    },

    issetEndDate: function()
    {
        if (this.endDate !== null)
        {
            return true;
        }
        else
        {
            return false;
        }
    },

    isDaily: function()
    {
        var retVal = false;
        if (this.isDailyBookingType())
        {
            retVal = true;
        }
        return retVal;
    },

    isHourly: function()
    {
        var retVal = false;
        if (this.isHourlyBookingType())
        {
            retVal = true;
        }
        return retVal;
    },

    setDailyDelegate: function()
    {
        this.bookingType = 2;
        this.diarytron.updateDisabledDays(1);
    },

    setDaily: function()
    {
        this.bookingType = 1;
        this.diarytron.updateDisabledDays(1);
    },

    setHourly: function()
    {
        this.bookingType = 0;
        this.diarytron.updateDisabledDays(0);
    },

    setStartDate: function(startDate)
    {
        if (this.isHourlyBookingType())
        {
            this.setEndDate(startDate);
        }
        else if (this.issetEndDate())
        {
            var endDate = new Date(this.getEndDate());
            var newStartDate = new Date(startDate);
            if (newStartDate > endDate)
            {
                this.setEndDate(null);
            }
        }
        this.startDate=startDate;
    },

    setEndDate: function(endDate)
    {
        if (endDate === null)
        {
            this.diarytron.resetCheckOutValue();
        }
        this.endDate = endDate;
    },

    getStartDate: function()
    {
        return this.startDate;
    },

    getEndDate: function()
    {
        return this.endDate;
    },

    showPriceLoader: function()
    {
        $('#price-loader').show();
    },

    hidePriceLoader: function()
    {
        $('#price-loader').hide();
    },

    initiateBubbleHelpers: function()
    {
        if (this.seenBubble === false)
        {
            if (this.dailyBookingOnly)
            {
                $('#daily_bubble_book').show('slow');
                $('#daily_bubble_book').delay(10000).fadeOut('slow');
            }
            else
            {
                $('#hourly_bubble_book').show('slow');
                $('#hourly_bubble_book').delay(10000).fadeOut('slow');
            }
            this.seenBubble = true;
        }
    },

    bubbleHide: function()
    {
        $('.bubble-book').hide();
    },

    modalAlert: function(message)
    {
        $('.modal-title').text("Booking failed.");
        $('.modal-body').text(message);
        $('#alert-modal').modal('show');
    }
};