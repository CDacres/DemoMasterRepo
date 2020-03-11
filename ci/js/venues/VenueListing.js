var Venue = {};

if (isDefined(venue_id)) {
    Venue.id = venue_id;
}

var VenueListing = {
    steps: {
        step1: {
            name: 'step1',
            complete: false,
            progress: 0,
            $progressBar: $('#step1ProgressBar'),
            $progressSpan: $('#step1Progress'),
            $section: $('section#step1'),
            $button: $('#step1Button'),
            $content: $('#step1Content'),
            $completeTick: $('#step1Tick'),
            collapsed: true
        },
        step2: {
            name: 'step2',
            complete: false,
            progress: 0,
            $progressBar: $('#step2ProgressBar'),
            $progressSpan: $('#step2Progress'),
            $section: $('section#step2'),
            $button: $('#step2Button'),
            $content: $('#step2Content'),
            $spacer: $('#step2Spacer'),
            $completeTick: $('#step2Tick'),
            collapsed: true
        },
        step3: {
            name: 'step3',
            complete: false,
            progress: 0,
            $progressBar: $('#step3ProgressBar'),
            $progressSpan: $('#step3Progress'),
            $section: $('section#step3'),
            $button: $('#step3Button'),
            $content: $('#step3Content'),
            $spacer: $('#step3Spacer'),
            $completeTick: $('#step3Tick'),
            collapsed: true
        }
    },
    defaultVenueTypes: [],
    photosArray: [],
    mainImage: [],
    amenityTypeArray: [],
    amenityArray: [],
    daysArray: [],
    durationOptions: {},
    defaultOpeningHours: [],
    venueOpeningHours: {},
    venueCancellationPolicy: {},
    selectedOpeningHours: '',
    cancellationPolicies: [],
    venueRooms: [],

    init: function() {
        VenueListing.checkCollapseState();
        // VenueListing.formChangeListener();
        if (isDefined(Venue.id) && Venue.id !== '') {
            VenueListing.setTitle('Edit your Venue');
            VenueListing.loadVenueData();
            VenueListing.step1Submit();
            VenueListing.checkForCustomOpeningHours();
            VenueListing.checkForCustomCancellationPolicy();
            $('#fullAddress').show();
        } else {
            VenueListing.setTitle('Add your Venue');
            VenueListing.step1Submit();
            VenueListing.getDefaultVenueTypes()
            .then(function() {
                VenueListing.populateDefaultVenueTypes();
            })
            .catch(console.log);
        }
        VenueListing.photoUploadListener();
    },

    setTitle: function(title) {
        $('#listing-title').text(title);
    },

    checkCollapseState: function() {
        $('.edit-venue-collapse').click(function() {
            var step = $(this).attr('zc-step');
            VenueListing.updateCollapseState(step);
        });
    },

    updateCollapseState: function(step) {
        var openForm;
        switch (step) {
            case '1':
                if (VenueListing.steps.step1.collapsed) {
                    openForm = VenueListing.steps.step1;
                    VenueListing.steps.step1.collapsed = false;
                    $('#step1Collapse').on('shown.bs.collapse', function() {
                        VenueListing.initiateMap();
                    });
                    VenueListing.collapseOtherOpenForms(step1);
                }
                else
                    VenueListing.steps.step1.collapsed = true;
                break;
            case '2':
                if (VenueListing.steps.step2.collapsed) {
                    openForm = VenueListing.steps.step2;
                    VenueListing.steps.step2.collapsed = false;
                    VenueListing.collapseOtherOpenForms(step2);
                }
                else
                    VenueListing.steps.step2.collapsed = true;
                break;
            case '3':
                if (VenueListing.steps.step3.collapsed) {
                    openForm = VenueListing.steps.step3;
                    VenueListing.steps.step2.collapsed = false;
                    VenueListing.collapseOtherOpenForms(step3);
                }
                else
                    VenueListing.steps.step3.collapsed = true;
                break;
        }
    },

    collapseOtherOpenForms: function(step) {
        switch (step) {
            case step1:
                VenueListing.steps.step2.collapsed = true;
                VenueListing.steps.step3.collapsed = true;
                if ($('#step2Collapse').length > 0) $('#step2Collapse')
                .collapse('hide');
                if ($('#step3Collapse').length > 0) $('#step3Collapse')
                .collapse('hide');
                break;
            case step2:
                VenueListing.steps.step1.collapsed = true;
                VenueListing.steps.step3.collapsed = true;
                if ($('#step1Collapse').length > 0) $('#step1Collapse')
                .collapse('hide');
                if ($('#step3Collapse').length > 0) $('#step3Collapse')
                .collapse('hide');
                break;
            case step3:
                VenueListing.steps.step1.collapsed = true;
                VenueListing.steps.step2.collapsed = true;
                if ($('#step1Collapse').length > 0) $('#step1Collapse')
                .collapse('hide');
                if ($('#step2Collapse').length > 0) $('#step2Collapse')
                .collapse('hide');
                break;
        }
    },

    moveToNextStep: function(currentStep) {
        switch (currentStep) {
            case '1':
                VenueListing.updateCollapseState('2');
                if ($('#step2Collapse').length > 0) $('#step2Collapse').collapse('show');
                break;
            case '2':
                VenueListing.updateCollapseState('3');
                if ($('#step3Collapse').length > 0) $('#step3Collapse').collapse('show');
                break;
        }
    },

    updateStepsProgress: function(data) {
        if (isDefined(data)) {
            VenueListing.populateStepsData(data);
        } else {
            bootstrapError(
                "There was an error: the requested venue has returned undefined."
            );
        }
    },

    populateStepsData: function(data) {
        Promise.all([
            VenueListing.getDefaultVenueTypes(),
            VenueListing.getPhotos(),
            VenueListing.getDefaultDurationOptions(),
            VenueListing.getDefaultOpeningHours(),
            VenueListing.getDaysObject(),
            VenueListing.getVenueOpeningHours(),
            VenueListing.getDefaultCancellationPolicies(),
            VenueListing.getVenueCancellationPolicy(),
            VenueListing.getVenueRooms(),
            VenueListing.getAmenityTypes(),
            VenueListing.getAmenities()
        ])
        .then(function() {
            loadLang(['common']).then(function (lang) {
                VenueListing.populateDefaultVenueTypes();
                VenueListing.populateStep1Fields(data);
                VenueListing.showStep1Progess(data);
                VenueListing.populatePhotos();
                $('#description').val(data.description);
                VenueListing.showStep2Progess(data);
                VenueListing.step2FormSubmit();
                VenueListing.populateMinimumMinutesOptions();
                $('select#minimum_minutes').val(data.minimum_minutes);
                VenueListing.populateDefaultOpeningHours();
                VenueListing.populateCustomOpeningHoursTable();
                VenueListing.populateTimeDropdowns();
                if (VenueListing.venueOpeningHours.opening_type == 5) {
                    VenueListing.setCustomOpeningHours();
                }
                VenueListing.setOpeningHoursRadio();
                VenueListing.openingHoursListener();
                VenueListing.populateCancellationPolicies();
                VenueListing.setVenueCancellationPolicy();
                VenueListing.cancellationPoliciesListener();
                VenueListing.populateUpdateRoomsTable();
                VenueListing.populateAmenities(lang);
                VenueListing.toggleAmenity();
                VenueListing.step3FormSubmit();
                VenueListing.showStep3Progess(data);
                VenueListing.checkCompletedSteps();
                // VenueListing.formChangeListener();
            });
        })
        .catch(console.log);
    },

    loadVenueData: function() {
        return new Promise(function(resolve, reject) {
            VenueListing.ajaxRequest('api/v1/venues?id=' + Venue.id, 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    Venue = JSON.parse(response).data;
                    VenueListing.updateStepsProgress(Venue);
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populateStep1Fields: function(data) {
        $('#name').val(data.name);
        $('#venueTypes').val(data.venue_type);
        $('#zc_venue_website').val(data.website);
        $('#modal_autocomplete').val(data.address);
        $('#zc_street_number').val(data.street_number);
        $('#zc_street_address').val(data.road);
        $('#zc_town_city').val(data.town);
        $('#zc_county').val(data.county);
        $('#zc_postcode').val(data.post_code);
        $('#zc_venue_country').val(data.country);
    },

    initiateMap: function() {
        var mapOptions = {
            zoom: 16,
            maxZoom: 19,
            minZoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: {
                lat: typeof Venue.lat != 'undefined' && Venue.lat != null ? parseFloat(Venue.lat) : 51.507351,
                lng: typeof Venue.long != 'undefined' && Venue.long != null ? parseFloat(Venue.long) : -0.127758
            },
            disableDefaultUI: true,
            navigationControl: true,
            navigationControlOptions:
            {
                position: google.maps.ControlPosition.LEFT
            },
            scaleControl: true,
            scrollwheel: false,
            zoomControl: true,
            zoomControlOptions:
            {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.LEFT_TOP
            }
        };
        var map = new google.maps.Map($("#map")[0], mapOptions);
        $('<div/>').addClass('centreMarker').appendTo(map.getDiv());
        google.maps.event.addListener(map, 'dragend', function() {
            var lat = map.getCenter().lat();
            var long = map.getCenter().lng();
            if (Venue.id !== '')
            {
                VenueListing.setVenueLatLong(lat, long);
            }
        });
    },

    setVenueLatLong: function(lat, long) {
        var data = {
            id: Venue.id,
            lat: lat,
            long: long
        };
        VenueListing.ajaxRequest('api/v1/venues', 'PUT', data)
        .then(function(response) {
            if (typeof response != 'undefined' && response.length)
            {
                Venue = JSON.parse(response).data;
            }
        })
        .catch(console.log);
    },

    step1Submit: function() {
        $('#step1Form').submit(function(event) {
            event.preventDefault();
            var method = 'POST';
            if (isDefined(Venue.id) && Venue.id !== '') {
                method = 'PUT';
            }
            var $form = $(this);
            var data = $form.serializeObject();
            if (Venue.id !== '') {
                data.id = Venue.id;
            }
            if (VenueListing.step1ValidationPassed()) {
                return new Promise(function(resolve, reject) {
                    VenueListing.ajaxRequest('api/v1/venues', method, data)
                    .then(function(response) {
                        if (typeof response != 'undefined' && response.length)
                        {
                            Venue = JSON.parse(response).data;
                        }
                        window.history.pushState(null, null, base_url + country_lang_url + '/venues/' + Venue.id + '/edit');
                        VenueListing.steps.step1.progress = 0;
                        VenueListing.updateStepsProgress(Venue);
                        VenueListing.moveToNextStep($form.attr('zc-step'));
                        resolve();
                    })
                    .catch(function(error) {
                        reject(error);
                    });
                });
            }
        });
    },

    showStep1Progess: function(data) {
        var progress = VenueListing.steps.step1.progress;
        if (typeof data.name != 'undefined' && data.name !== '')
            progress += 14;
        if (typeof data.venue_type != 'undefined' && !_.isNull(data.venue_type))
            progress += 14;
        if (typeof data.road != 'undefined' && !_.isNull(data.road))
            progress += 14;
        if (typeof data.town != 'undefined' && !_.isNull(data.town))
            progress += 14;
        if (typeof data.county != 'undefined' && !_.isNull(data.county))
            progress += 14;
        if (typeof data.post_code != 'undefined' && !_.isNull(data.post_code))
            progress += 14;
        if (typeof data.country != 'undefined' && !_.isNull(data.country))
            progress += 16;
        if (progress == 100) {
            VenueListing.steps.step1.complete = true;
            VenueListing.steps.step1.progress = progress;
        }
        else
            VenueListing.steps.step1.progress = progress;
    },

    showStep2Progess: function(data) {
        var progress = VenueListing.steps.step2.progress;
        if (typeof data.description != 'undefined' && !_.isNull(data.description))
            progress += 100;
//        if (VenueListing.photosArray.length > 0)
//            progress += 50;
        if (progress == 100) {
            VenueListing.steps.step2.complete = true;
            VenueListing.steps.step2.progress = progress;
        }
        else
            VenueListing.steps.step2.progress = progress;
    },

    showStep3Progess: function(data) {
        var progress = VenueListing.steps.step3.progress;
        if (!_.isEmpty(VenueListing.venueOpeningHours))
            progress += 33.3;
        if (typeof data.minimum_minutes != 'undefined' && !_.isNull(data.minimum_minutes))
            progress += 33.3;
        if (!_.isEmpty(VenueListing.venueCancellationPolicy))
            progress += 33.4;
        if (progress == 100) {
            VenueListing.steps.step3.complete = true;
            VenueListing.steps.step3.progress = progress;
        }
        else
            VenueListing.steps.step3.progress = progress;
    },

    checkCompletedSteps: function() {
        if (VenueListing.steps.step1.complete) {
            VenueListing.hideProgress(VenueListing.steps.step1);
            VenueListing.setButtonText(VenueListing.steps.step1, 'Change');
            VenueListing.setButtonText(VenueListing.steps.step2, 'Continue');
            VenueListing.enableStep(VenueListing.steps.step2);
            VenueListing.showProgress(VenueListing.steps.step2);
            VenueListing.showCompleteTick(VenueListing.steps.step1.$completeTick);
        }
        else if (VenueListing.steps.step1.progress === 0) {
            VenueListing.setButtonText(VenueListing.steps.step1, 'Start');
        }
        else {
            VenueListing.setButtonText(VenueListing.steps.step1, 'Continue');
            VenueListing.showProgress(VenueListing.steps.step1);
        }
        if (VenueListing.steps.step1.complete) {
            if (VenueListing.steps.step2.complete) {
                VenueListing.hideProgress(VenueListing.steps.step2);
                VenueListing.setButtonText(VenueListing.steps.step2, 'Change');
                VenueListing.setButtonText(VenueListing.steps.step3, 'Continue');
                VenueListing.enableStep(VenueListing.steps.step3);
                VenueListing.showProgress(VenueListing.steps.step3);
                VenueListing.showCompleteTick(VenueListing.steps.step2.$completeTick);
            }
            else if (VenueListing.steps.step2.progress === 0) {
                VenueListing.setButtonText(VenueListing.steps.step2, 'Start');
            }
            else {
                VenueListing.setButtonText(VenueListing.steps.step2, 'Continue');
                VenueListing.showProgress(VenueListing.steps.step2);
            }
        }
        if (VenueListing.steps.step1.complete && VenueListing.steps.step2.complete) {
            if (VenueListing.steps.step3.complete) {
                VenueListing.hideProgress(VenueListing.steps.step3);
                VenueListing.setButtonText(VenueListing.steps.step3, 'Change');
                VenueListing.showCompleteTick(VenueListing.steps.step3.$completeTick);
            }
            else if (VenueListing.steps.step3.progress === 0) {
                VenueListing.setButtonText(VenueListing.steps.step3, 'Start');
            }
            else {
                VenueListing.setButtonText(VenueListing.steps.step3, 'Continue');
                VenueListing.showProgress(VenueListing.steps.step3);
            }
        }
    },

    showCompleteTick: function($completeTick) {
        $completeTick.show();
    },

    enableStep: function(step) {
        step.$section.removeClass('step-disabled');
        step.$progressBar.show();
        step.$content.show();
        step.$spacer.hide();
    },

    disableStep: function(step) {
        step.$section.addClass('step-disabled');
        step.$progressBar.hide();
        step.$content.hide();
        step.$spacer.show();
    },

    showProgress: function(step) {
        $(step.$progressSpan).css('width', function() {
            return step.progress.toString() + '%';
        });
    },

    hideProgress: function(step) {
        $(step.$progressBar).hide();
    },

    setButtonText: function(step, text) {
        step.$button.text(text);
    },

    step1ValidationPassed: function() {
        if (VenueListing.venueNameTypePassed()) {
            if (VenueListing.venueLocationPassed())
                return true;
        }
        return false;
    },

    venueNameTypePassed: function() {
        if (inputIsEmpty($('#name'))) {
            throwInputError($('#name'));
            bootstrapError("Please enter the name of your Venue.");
            return false;
        }
        else if (!selectOptionSelected($('#venueTypes'))) {
            throwSelectError($('#venueTypes'));
            bootstrapError("Please select a Venue type.");
            return false;
        }
        return true;
    },

    venueLocationPassed: function() {
        if (inputIsEmpty($('#modal_autocomplete'))) {
            throwInputError($('#modal_autocomplete'));
            bootstrapError("Please enter the address of your venue.");
            return false;
        }
        if (inputIsEmpty($('#zc_street_address'))) {
            throwInputError($('#zc_street_address'));
            bootstrapError("Please enter a street address for your venue.");
            return false;
        } else if (inputIsEmpty($('#zc_town_city'))) {
            throwInputError($('#zc_town_city'));
            bootstrapError("Please enter a town/city for your venue.");
            return false;
        } else if (inputIsEmpty($('#zc_county'))) {
            throwInputError($('#zc_county'));
            bootstrapError("Please enter a county for your venue.");
            return false;
        } else if (inputIsEmpty($('#zc_postcode'))) {
            throwInputError($('#zc_postcode'));
            bootstrapError("Please enter a postal code for your venue.");
            return false;
        } else if (inputIsEmpty($('#zc_venue_country'))) {
            throwInputError($('#zc_venue_country'));
            bootstrapError("Please enter a country for your venue.");
            return false;
        }
        return true;
    },

    getDefaultVenueTypes: function() {
        return new Promise(function(resolve, reject) {
            VenueListing.ajaxRequest('api/v1/venues/types', 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    VenueListing.defaultVenueTypes = JSON.parse(response).data.objects;
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populateDefaultVenueTypes: function() {
        $('#venueTypes').empty();
        var DropdownPlaceholderTemplate = _.template($('#DropdownPlaceholder').html());
        $('#venueTypes').append(DropdownPlaceholderTemplate());
        var DropdownOptionTemplate = _.template($('#DropdownOption').html());
        _.each(VenueListing.defaultVenueTypes, function(venueType) {
            var option = {};
            option.value = venueType.id;
            option.desc = venueType.description;
            $('#venueTypes').append(DropdownOptionTemplate(option));
        });
    },

    getPhotos: function() {
        return new Promise(function(resolve, reject) {
            VenueListing.ajaxRequest('api/v1/images?venue_id=' + Venue.id, 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    VenueListing.photosArray = JSON.parse(response).data.objects;
                    VenueListing.mainImage = VenueListing.photosArray.filter(function(photo) {
                        return photo.represents === '1';
                    });
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populatePhotos: function() {
        if (_.isArray(VenueListing.photosArray) && VenueListing.photosArray.length > 0) {
            $('#venuePhotos').empty();
            var PhotoTemplate = _.template($('#Photo').html());
            _.each(VenueListing.photosArray, function(photoObj, i) {
                photoObj.index = i;
                $('#venuePhotos').append(PhotoTemplate(photoObj));
            });
            VenueListing.deletePhotoListener();
            VenueListing.mainImageListener();
        }
    },

    photoUploadListener: function() {
        $(".zc_room_photo_upload").on('click', function(event) {
            event.preventDefault();
            $("#zc_upload").trigger("click");
        });
        $("#zc_upload").change(function() {
            VenueListing.postPhotos();
        });
    },

    postPhotos: function() {
        var formData = new FormData();
        formData.append("upload_image", $("#zc_upload")[0].files[0]);
        formData.append("venue_id", Venue.id);
        $.ajax({
            url: base_url + "api/v1/images",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            type: "POST",
            success: function() {
                VenueListing.getPhotos()
                .then(function() {
                    VenueListing.populatePhotos();
                    if (VenueListing.photosArray.length > 0 && VenueListing.photosArray.length < 2) {
                        VenueListing.steps.step2.progress += 50;
                        VenueListing.showProgress(VenueListing.steps.step2);
                    }
                })
                .catch(console.log);
            },
            error: function(response) {
                bootstrapError(response.responseJSON);
            }
        });
    },

    deletePhotoListener: function() {
        if ($('.listing_photo').length > 0) {
            $('.delete_image').click(function() {
                var index = $(this).attr('zc_index');
                var photo_id = $(this).attr('zc_photo_id');
                VenueListing.deletePhoto(photo_id)
                .then(function() {
                    VenueListing.getPhotos()
                    .then(function() {
                        VenueListing.populatePhotos();
                        VenueListing.photosArray.splice(index, 1);
                        $('li#' + photo_id).remove();
                        if (VenueListing.photosArray.length < 1) {
                            VenueListing.steps.step2.progress -= 50;
                            VenueListing.showProgress(VenueListing.steps.step2);
                        }
                    })
                    .catch(console.log);
                })
                .catch(console.log);
            });
        }
    },

    deletePhoto: function(photo_id) {
        return new Promise(function(resolve, reject) {
            var data = {
                id: photo_id,
                venue_id: Venue.id
            };
            VenueListing.ajaxRequest('api/v1/images', 'DELETE', data)
            .then(function() {
                $("#zc_upload").val('');
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    mainImageListener: function() {
        $('.zc_image_featured').change(function() {
            var value = $(this).val();
            if (VenueListing.mainImage.length > 0) {
                VenueListing.changeMainImage("0")
                .then(function() {
                    VenueListing.mainImage = [];
                })
                .catch(console.log);
            }
            VenueListing.mainImage = VenueListing.photosArray.filter(function(photo) {
                return photo.id == value;
            });
            VenueListing.changeMainImage("1")
            .then(function() {
                VenueListing.getPhotos();
            })
            .catch(console.log);
        });
    },

    changeMainImage: function(represents) {
        return new Promise(function(resolve, reject) {
            var data = {
                id: VenueListing.mainImage[0].id,
                venue_id: Venue.id,
                represents: represents
            };
            VenueListing.ajaxRequest('api/v1/images', 'PUT', data)
            .then(function() {
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    step2FormSubmit: function() {
        $('#step2Form').submit(function(event) {
            event.preventDefault();
            var $form = $(this);
            if (VenueListing.step2ValidationPassed())
            {
                return new Promise(function(resolve, reject) {
                    var data = $form.serializeObject();
                    data.id = Venue.id;
                    VenueListing.ajaxRequest('api/v1/venues', 'PUT', data)
                    .then(function(response) {
                        if (typeof response != 'undefined' && response.length)
                        {
                            Venue = JSON.parse(response).data;
                        }
                        VenueListing.steps.step2.progress = 0;
                        VenueListing.updateStepsProgress(Venue);
                        VenueListing.moveToNextStep($form.attr('zc-step'));
                        resolve();
                    })
                    .catch(function(error) {
                        reject(error);
                    });
                });
            }
        });
    },

    step2ValidationPassed: function() {
        if (VenueListing.descriptionPassed()) {
//            if (VenueListing.photosPassed())
                return true;
        }
        return false;
    },

    descriptionPassed: function() {
        if (inputIsEmpty($('#description'))) {
            throwInputError($('#description'));
            bootstrapError("Please enter a description of your venue.");
            return false;
        }
        return true;
    },

//    photosPassed: function() {
//        if (VenueListing.photosArray.length < 1) {
//            bootstrapError("Please ensure that at least one image is uploaded");
//            return false;
//        }
//        return true;
//    },

    getDefaultDurationOptions: function() {
        return new Promise(function(resolve, reject) {
            VenueListing.ajaxRequest('api/v1/durations', 'GET')
            .then(function(response) {
                VenueListing.durationOptions = response;
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populateMinimumMinutesOptions: function() {
        $('#minimum_minutes').empty();
        var DropdownPlaceholderTemplate = _.template($('#DropdownPlaceholder').html());
        $('#minimum_minutes').append(DropdownPlaceholderTemplate());
        var DropdownOptionTemplate = _.template($('#DropdownOption').html());
        _.each(VenueListing.durationOptions, function(durationOption, i) {
            var option = {};
            option.value = i;
            option.desc = durationOption;
            $('#minimum_minutes').append(DropdownOptionTemplate(option));
        });
    },

    populateDefaultOpeningHours: function() {
        $('#openingHoursOptions').empty();
        _.each(VenueListing.defaultOpeningHours, function(option, i) {
            option.radioName = 'opening_type';
            if (i == 4) {
                option.radioValue = 5;
            } else {
                option.radioValue = option[0].opening_type;
            }
            option.desc = option.type;
            var RadioButtonTemplate = _.template($('#RadioButton').html());
            $('#openingHoursOptions').append(RadioButtonTemplate(option));
        });
    },

    getVenueOpeningHours: function() {
        return new Promise(function(resolve, reject) {
            VenueListing.ajaxRequest('api/v1/venues/openhours?id=' + Venue.id, 'GET')
            .then(function(response) {
                VenueListing.venueOpeningHours = response;
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    setOpeningHoursRadio: function() {
        $('input:radio[name="opening_type"][value="' + VenueListing.venueOpeningHours.opening_type + '"]').attr('checked', 'checked');
    },

    checkForCustomOpeningHours: function() {
        if ($(".zc_venue_opening_type:checked"))
            VenueListing.showCustomOpeningHours();
        $(".zc_venue_opening_type").click(function() {
            VenueListing.showCustomOpeningHours();
        });
    },

    setCustomOpeningHours: function() {
        var openingHours = {};
        _.each(VenueListing.venueOpeningHours, function(day, i) {
            if (i !== 'opening_type')
            {
                openingHours[day.day_id] = [];
            }
        });
        _.each(VenueListing.venueOpeningHours, function(day, i) {
            if (i !== 'opening_type')
            {
                openingHours[day.day_id].push(day);
            }
        });
        _.each(openingHours, function(day, i) {
            if (day[0].start == '0' && day[0].end == '1440') {
                $('#zc_listing_opening_allday_' + i).attr('checked', 'checked');
            } else {
                $("select#zc_listing_opening_hours_start_" + i).val(day[0].start);
                $("select#zc_listing_opening_hours_end_" + i).val(day[0].end);
                if (day.length > 1) {
                    $('#split_' + i).attr('checked', 'checked');
                    $("select#zc_listing_opening_hours_split_start_" + i).val(day[1].start);
                    $("select#zc_listing_opening_hours_split_end_" + i).val(day[1].end);
                }
            }
        });
        for (var d = 0; d < 7; ++d) {
            if (!openingHours[d]) {
                $('#zc_listing_closed_' + d).attr('checked', 'checked');
            }
        }
    },

    getDaysObject: function() {
        return new Promise(function(resolve, reject) {
            VenueListing.ajaxRequest('api/v1/days', 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    VenueListing.daysArray = JSON.parse(response).data.objects;
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populateCustomOpeningHoursTable: function() {
        if (_.isArray(VenueListing.daysArray) && VenueListing.daysArray.length > 0) {
            $('#customOpeningHoursTable').empty();
            var CustomDayRowTemplate = _.template($('#CustomDayRow').html());
            _.each(VenueListing.daysArray, function(day, i) {
                $('#customOpeningHoursTable').append(CustomDayRowTemplate(day));
            });
        }
    },

    populateTimeDropdowns: function() {
        var time = {};
        $('.time-dropdown').empty();
        var DropdownOptionTemplate = _.template($('#DropdownOption').html());
        for (i = 0; i <= 1410; i += 30) {
            var hours = Math.floor(i / 60);
            var mins = i % 60;
            var split_min = i;
            if (mins < 10)
                mins = "0" + mins;
            if (hours < 10)
                hours = "0" + hours;
            if (hours === 0)
                hours = "00";
            time.value = split_min;
            time.desc = hours + ":" + mins;
            $('.time-dropdown').append(DropdownOptionTemplate(time));
        }
    },

    openingHoursListener: function() {
        if ($('input:radio[name="opening_type"]:checked').val() == 5)
            VenueListing.showCustomOpeningHours();
        else
            VenueListing.hideCustomOpeningHours();
        $('input:radio[name="opening_type"]').click(function()
        {
            if ($('input:radio[name="opening_type"]:checked').val() == 5)
                VenueListing.showCustomOpeningHours();
            else
                VenueListing.hideCustomOpeningHours();
        });
        $(".zc_listing_opening_split_check").each(function()
        {
            var scopeThis = $(this);
            $(this).click(function()
            {
                $("#zc_listing_opening_split_" + scopeThis.val()).toggle(this.checked);
            });
            if (this.checked)
            {
                $("#zc_listing_opening_split_" + scopeThis.val()).toggle(this.checked);
            }
        });
        $('#customOpeningHoursTable input:checkbox').on('click', function() {
            var $box = $(this);
            if ($box.is(':checked')) {
                var group = 'input:checkbox[name="' + $box.attr('name') + '"]';
                if (!$box.hasClass('zc_listing_opening_split_check') && $("#split_" + $box.attr('name')).is(':checked')) {
                    $("#zc_listing_opening_split_" + $box.attr('name')).toggle();
                }
                $(group).prop('checked', false);
                $box.prop('checked', true);
            } else {
                $box.prop('checked', false);
            }
        });
    },

    convertSelectedOpeningHours: function() {
        var errorMessage = '';
        var radioValue = $('input:radio[name="opening_type"]:checked').val();
        var openTimes = {};
        if (radioValue == 5) {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday'];
            openTimes.start = {};
            openTimes.end = {};
            for (var d = 0; d < 7; ++d) {
                openTimes.start[d] = [];
                openTimes.end[d] = [];
                if (!$("#zc_listing_closed_" + d).is(":checked")) {
                    openTimes.start[d] = [];
                    openTimes.end[d] = [];
                    if ($("#zc_listing_opening_allday_" + d).is(":checked")) {
                        openTimes.start[d].push(0);
                        openTimes.end[d].push(1440);
                    }
                    else {
                        var openingHoursStart = $("#zc_listing_opening_hours_start_" + d).val();
                        var openingHoursEnd = $("#zc_listing_opening_hours_end_" + d).val();
                        var splitChecked = $("#split_" + d).is(":checked");
                        var openingHoursSplitStart = $("#zc_listing_opening_hours_split_start_" + d).val();
                        var openingHoursSplitEnd = $("#zc_listing_opening_hours_split_end_" + d).val();
                        if (Number(openingHoursStart) >= Number(openingHoursEnd) || (splitChecked && (Number(openingHoursSplitStart) >= Number(openingHoursSplitEnd)))) {
                            errorMessage = "the start time is before the end time on " + days[d];
                        } else if (splitChecked && (Number(openingHoursStart) >= Number(openingHoursSplitStart) || Number(openingHoursEnd) > Number(openingHoursSplitStart))) {
                            errorMessage = "the times do not overlap on " + days[d];
                        } else {
                            openTimes.start[d].push($("#zc_listing_opening_hours_start_" + d).val());
                            openTimes.end[d].push($("#zc_listing_opening_hours_end_" + d).val());
                            if ($("#split_" + d).is(":checked")) {
                                openTimes.start[d].push($("#zc_listing_opening_hours_split_start_" + d).val());
                                openTimes.end[d].push($("#zc_listing_opening_hours_split_end_" + d).val());
                            }
                        }
                        if (errorMessage !== '') {
                            bootstrapError("Please ensure " + errorMessage + ".");
                        }
                    }
                }
            }
        }
        else {
            var defaultOpeningHours = VenueListing.defaultOpeningHours[radioValue - 1];
            openTimes.start = {};
            openTimes.end = {};
            var indexMax;
            if (radioValue == 2)
                indexMax = 5;
            else
                indexMax = 6;
            _.each(defaultOpeningHours, function(day, i) {
                if (i <= indexMax) {
                    openTimes.start[day.day_id] = [];
                    openTimes.end[day.day_id] = [];
                    openTimes.start[day.day_id].push(day.start);
                    openTimes.end[day.day_id].push(day.end);
                }
            });
        }
        var data = {
            errorMessage: errorMessage,
            openTimes: openTimes
        };
        return data;
    },

    setSelectedOpeningHours: function() {
        var data = VenueListing.convertSelectedOpeningHours();
        if (data.errorMessage === '') {
            VenueListing.selectedOpeningHours = JSON.stringify(data.openTimes);
            return true;
        }
        bootstrapError(data.errorMessage);
        return false;
    },

    showCustomOpeningHours: function() {
        $("#custom_hours").show();
    },

    hideCustomOpeningHours: function() {
        $("#custom_hours").hide();
    },

    getDefaultOpeningHours: function() {
        return new Promise(function(resolve, reject) {
            VenueListing.ajaxRequest('api/v1/openinghours', 'GET')
            .then(function(response) {
                VenueListing.defaultOpeningHours = response;
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    getVenueRooms: function() {
        return new Promise(function(resolve, reject) {
            VenueListing.ajaxRequest('api/v1/venues/rooms?id=' + Venue.id, 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    VenueListing.venueRooms = JSON.parse(response).data.objects;
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populateUpdateRoomsTable: function() {
        $('#updateRoomRows').empty();
        if (_.isArray(VenueListing.venueRooms) && VenueListing.venueRooms.length > 0) {
            $('#updateRoomsTable').show();
            var VenueRoomRowTemplate = _.template($('#VenueRoomRow').html());
            _.each(VenueListing.venueRooms, function(room, i) {
                $('#updateRoomRows').append(VenueRoomRowTemplate(room));
            });
        }
    },

    getOverwriteRoomHours: function() {
        var overwriteRoomHours = [];
        if ($('.overwrite_room_hours:checkbox:checked').length > 0) {
            $.each($('.overwrite_room_hours:checkbox:checked'), function() {
                overwriteRoomHours.push($(this).val());
            });
        }
        return overwriteRoomHours;
    },

    getOverwriteRoomDuration: function() {
        var overwriteRoomDuration = [];
        if ($('.overwrite_room_duration:checkbox:checked').length > 0) {
            $.each($('.overwrite_room_duration:checkbox:checked'), function() {
                overwriteRoomDuration.push($(this).val());
            });
        }
        return overwriteRoomDuration;
    },

    getOverwriteRoomAmenities: function() {
        var overwriteRoomAmenities = [];
        if ($('.overwrite_room_amenities:checkbox:checked').length > 0) {
            $.each($('.overwrite_room_amenities:checkbox:checked'), function() {
                overwriteRoomAmenities.push($(this).val());
            });
        }
        return overwriteRoomAmenities;
    },

    checkForCustomCancellationPolicy: function() {
        if ($(".venue_cancellation_type:checked"))
            VenueListing.showCustomCancellationPolicy();
        $(".venue_cancellation_type").click(function() {
            VenueListing.showCustomCancellationPolicy();
        });
    },

    getDefaultCancellationPolicies: function() {
        return new Promise(function(resolve, reject) {
            VenueListing.ajaxRequest('api/v1/cancellation', 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    VenueListing.cancellationPolicies = JSON.parse(response).data.objects;
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populateCancellationPolicies: function() {
        if (_.isArray(VenueListing.cancellationPolicies) && VenueListing.cancellationPolicies.length > 0) {
            $('#cancellationPolicy').empty();
            var CancellationPolicyTemplate = _.template($('#CancellationPolicy').html());
            _.each(VenueListing.cancellationPolicies, function(cancellationPolicy, i) {
                cancellationPolicy.index = i;
                $('#cancellationPolicy').append(CancellationPolicyTemplate(cancellationPolicy));
            });
        }
    },

    getVenueCancellationPolicy: function() {
        return new Promise(function(resolve, reject) {
            VenueListing.ajaxRequest('api/v1/venues/cancellation?id=' + Venue.id, 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    VenueListing.venueCancellationPolicy = JSON.parse(response).data;
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    setVenueCancellationPolicy: function() {
        if (isDefined(VenueListing.venueCancellationPolicy) && !_.isEmpty(VenueListing.venueCancellationPolicy)) {
            var percent = Number(VenueListing.venueCancellationPolicy.cancellation_percentage);
            var period = Number(VenueListing.venueCancellationPolicy.cancellation_period);
            if ($('input:radio[data-percentage="' + percent + '"][data-period="' + period + '"]').length === 0) {
                $('input:radio[name="cancellation_type_id"][title="Custom"]').prop('checked', true);
                $('#cancellationPercent').val(percent);
                $('#cancellationPeriod').val(period);
                $("#custom_cancellation").show();
            } else {
                $('input:radio[data-percentage="' + percent + '"][data-period="' + period + '"]').prop('checked', true);
            }
        }
    },

    cancellationPoliciesListener: function() {
        $('input:radio[name="cancellation_type_id"]').click(function()
        {
            VenueListing.showCustomCancellationPolicy($(this));
        });
    },

    showCustomCancellationPolicy: function() {
        if ($('input:radio[name="cancellation_type_id"]:checked').val() == 4)
            $('#custom_cancellation').show();
        else
            $('#custom_cancellation').hide();
    },

    getAmenityTypes: function() {
        return new Promise(function(resolve, reject) {
            VenueListing.ajaxRequest('api/v1/amenities/types', 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    VenueListing.amenityTypeArray = JSON.parse(response).data.objects;
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    getAmenities: function() {
        return new Promise(function(resolve, reject) {
            VenueListing.ajaxRequest('api/v1/amenities?venue_id=' + Venue.id, 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    VenueListing.amenityArray = JSON.parse(response).data.objects;
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populateAmenities: function(lang) {
        $('#venueAmenities').empty();
        if (_.isArray(VenueListing.amenityArray) && VenueListing.amenityArray.length > 0) {
            var AmenitytypeHeadingTemplate = _.template($('#Amenity-typeHeading').html());
            var AmenityamenityTemplate = _.template($('#Amenity-amenity').html());
            var AmenityaddLinkTemplate = _.template($('#Amenity-addLink').html());
            _.each(VenueListing.amenityTypeArray, function(amenityTypeObject, i) {
                var amenityType = amenityTypeObject.id;
                amenityTypeObject.amenity_type = lang.common[amenityTypeObject.name];
                $('#venueAmenities').append(AmenitytypeHeadingTemplate(amenityTypeObject));
                _.each(VenueListing.amenityArray, function(amenityObject, i) {
                    if (amenityObject.amenity_type == amenityType)
                    {
                        amenityObject.index = i;
                        if (typeof lang.common[amenityObject.amenity_desc] != 'undefined') {
                            amenityObject.amenity_name = lang.common[amenityObject.amenity_desc];
                        } else {
                            amenityObject.amenity_name = amenityObject.amenity_desc;
                        }
                        amenityObject.includedText = '';
                        amenityObject.costText = '';
                        amenityObject.unavailableClass = ' low-opacity';
                        amenityObject.hiddenClass = ' hide';
                        amenityObject.checked = '';
                        amenityObject.currency_symbols = '';
                        if (typeof amenityObject.cost == 'undefined') {
                            amenityObject.includedText = lang.common.common_amenity_free;
                        } else {
                            amenityObject.includedText = lang.common.common_amenity_extra_fee;
                            var currency = Currency.getCurrency(amenityObject.currency);
                            amenityObject.currency_symbols = currency.symbol;
                            amenityObject.costText = Number(amenityObject.cost).toFixed(2);
                        }
                        if (amenityObject.available == '1') {
                            amenityObject.unavailableClass = '';
                            amenityObject.hiddenClass = '';
                            amenityObject.checked = 'checked';
                        }
                        $('#venueAmenities').append(AmenityamenityTemplate(amenityObject));
                    }
                });
                $('#venueAmenities').append(AmenityaddLinkTemplate(amenityTypeObject));
            });
            applySwitchesToCheckboxes();
            VenueListing.amenityClickListener(lang);
        }
    },

    amenityClickListener: function(lang) {
        $('.addInfo').click(function()
        {
            var amenityObject = {};
            amenityObject.costText = '';
            var currency = Currency.getCurrency(Venue.currency_code);
            amenityObject.currency_symbols = currency.symbol;
            amenityObject.amenity_type = $(this).attr('id');
            var AddAmenityTemplate = _.template($('#AddAmenity').html());
            VenueListing.showAmenityModal(AddAmenityTemplate(amenityObject));
        });
        $('.editItem').click(function()
        {
            VenueListing.getAmenityObject(lang, $(this).attr('amenity_id'));
        });
    },

    getAmenityObject: function(lang, amenityId) {
        var amenityObject;
        VenueListing.ajaxRequest('api/v1/amenities?id=' + amenityId + '&venue_id=' + Venue.id, 'GET')
        .then(function(response) {
            if (typeof response != 'undefined' && response.length)
            {
                amenityObject = JSON.parse(response).data;
                if (typeof lang.common[amenityObject.amenity_desc] != 'undefined') {
                    amenityObject.amenity_name = lang.common[amenityObject.amenity_desc];
                } else {
                    amenityObject.amenity_name = amenityObject.amenity_desc;
                }
                amenityObject.costText = '';
                amenityObject.buttondataValue = 'free';
                var currency = Currency.getCurrency(amenityObject.currency);
                amenityObject.currency_symbols = currency.symbol;
                if (typeof amenityObject.cost != 'undefined') {
                    amenityObject.costText = Number(amenityObject.cost).toFixed(2);
                    amenityObject.buttondataValue = 'fee';
                }
                if (typeof amenityObject.instructions == 'undefined') {
                    amenityObject.instructions = '';
                }
                var EditAmenityTemplate = _.template($('#EditAmenity').html());
                VenueListing.showAmenityModal(EditAmenityTemplate(amenityObject));
            }
        })
        .catch(console.log);
    },

    showAmenityModal: function(modalContent) {
        clearMainModal();
        $("#mainModal").on("shown.bs.modal", function()
        {
            $("#mainModal").on("hidden.bs.modal", function()
            {
                $("#mainModal").off("shown.bs.modal");
            });
        });
        $("#modal_slide_up_content").html(modalContent);
        $('.modal-dialog').addClass('modal-tiny');
        $("#mainModal").modal('show');
        verticallyCenterModal();
        cancelButtonListener();
        VenueListing.modalListeners();
    },

    modalListeners: function() {
        $(".zc_include_list").click(function()
        {
            if ($(this).data('value') == 'free')
            {
                $('#zc_amenity_cost_enc').hide();
            }
            else
            {
                $('#zc_amenity_cost_enc').show();
            }
            $('#zc_include_option_btn').contents().first().replaceWith($(this).text());
            $('#zc_include_option_btn').data('value', $(this).data('value'));
        });
        if ($("#zc_include_option_btn").data('value') != 'free')
        {
            $('#zc_amenity_cost_enc').show();
        }
        $("#add_amenity").click(function()
        {
            VenueListing.addAmenity($(this).data("amenity-type"));
        });
        $("#modify_amenity").click(function()
        {
            VenueListing.editAmenity($(this).data("amenity-id"));
        });
    },

    toggleAmenity: function() {
        $(".zc_amenity_available").change(function()
        {
            var data = {
                id: $(this).attr('id'),
                venue_id: Venue.id,
                amenity_type: $(this).attr('amenity_type'),
                available: +$(this).is(':checked')
            };
            VenueListing.ajaxRequest('api/v1/amenities', 'PUT', data)
            .catch(console.log);
        });
    },

    addAmenity: function(amenity_type) {
        var errorMessage = '';
        if ($("#amenity_desc").val() === '') {
            errorMessage = "the amenity name is filled in";
        }
        else if ($("#zc_amenity_cost_enc").is(":visible") && $("#cost").val() === '') {
            errorMessage = "the amenity cost is filled in";
        }
        else if (isNaN($("#cost").val()))
        {
            errorMessage = "the amenity cost is a number";
        }
        if (errorMessage === '') {
            var data = {
                amenity_type: Number(amenity_type),
                venue_id: Venue.id,
                amenity_desc: $("#amenity_desc").val(),
                instructions: nl2br($("#instructions").val())
            };
            if ($("#zc_amenity_cost_enc").is(":visible"))
            {
                data.cost = $("#cost").val();
            }
            VenueListing.ajaxRequest('api/v1/amenities', 'POST', data)
            .then(function() {
                closeMainModal();
                VenueListing.getAmenities()
                .then(function() {
                    loadLang(['common']).then(function (lang) {
                        VenueListing.populateAmenities(lang);
                        VenueListing.toggleAmenity();
                    });
                })
                .catch(console.log);
            })
            .catch(console.log);
        }
        else
        {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    },

    editAmenity: function(amenity_id) {
        var errorMessage = '';
        if ($("#amenity_desc").val() === '')
        {
            errorMessage = "the amenity name is filled in";
        }
        else if ($("#zc_amenity_cost_enc").is(":visible") && $("#cost").val() === '')
        {
            errorMessage = "the amenity cost is filled in";
        }
        else if (isNaN($("#cost").val()))
        {
            errorMessage = "the amenity cost is a number";
        }
        if (errorMessage === '')
        {
            var data = {
                id: amenity_id,
                venue_id: Venue.id,
                amenity_desc: $("#amenity_desc").val(),
                instructions: nl2br($("#instructions").val())
            };
            if ($("#zc_amenity_cost_enc").is(":visible"))
            {
                data.cost = $("#cost").val();
            }
            VenueListing.ajaxRequest('api/v1/amenities', 'PUT', data)
            .then(function() {
                closeMainModal();
                VenueListing.getAmenities()
                .then(function() {
                    loadLang(['common']).then(function (lang) {
                        VenueListing.populateAmenities(lang);
                        VenueListing.toggleAmenity();
                    });
                })
                .catch(console.log);
            })
            .catch(console.log);
        }
        else
        {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    },

    step3ValidationPassed: function() {
        var openingHoursPassed = VenueListing.openingHoursPassed();
        var minimumDurationPassed = VenueListing.minimumDurationPassed();
        var cancellationPolicyPassed = VenueListing.cancellationPolicyPassed();
        return openingHoursPassed && minimumDurationPassed && cancellationPolicyPassed;
    },

    openingHoursPassed: function() {
         if (isDefined($('input[name="opening_type"]:checked').val())) {
            if (isDefined(VenueListing.selectedOpeningHours))
                return true;
        }
        bootstrapError("Please select the opening hours of your venue.");
        return false;
    },

    minimumDurationPassed: function() {
        if (selectOptionSelected($('#zc_venue_min_duration')))
            return true;
        else {
            throwSelectError($('#zc_venue_min_duration'));
            bootstrapError("Please the minimum duration is chosen");
        }
        return false;
    },

    cancellationPolicyPassed: function() {
        if ($('input:radio[name="cancellation_type_id"]').is(':checked')) {
            if ($('input:radio[name="cancellation_type_id"]:checked').val() == 4) {
                if ($('#cancellationPercent').val() === '') {
                    throwInputError($('#cancellationPercent'));
                    bootstrapError("Please enter the percentage refund for your venue cancellation policy.");
                    return false;
                }
                if ($('#cancellationPeriod').val() === '') {
                    throwInputError($('#cancellationPeriod'));
                    bootstrapError("Please enter the number of working days notice required for your venue cancellation policy.");
                    return false;
                }
                if ($('#cancellationPercent').val() < 0) {
                    throwInputError($('#cancellationPercent'));
                    bootstrapError("The percentage refund must be a positive number.");
                    return false;
                }
                if ($('#cancellationPeriod').val() < 0) {
                    throwInputError($('#cancellationPeriod'));
                    bootstrapError("The number of Working days notice must be a positive number.");
                    return false;
                }
                return true;
            }
            return true;
        }
        throwRadioError($('input:radio[name="cancellation_type_id"]'));
        bootstrapError('Please select a cancellation policy for your venue.');
        return false;
    },

    step3FormSubmit: function() {
        $('#step3Form').submit(function(event) {
            event.preventDefault();
            VenueListing.setSelectedOpeningHours();
            if (VenueListing.setSelectedOpeningHours()) {
                var data = {
                    id: Venue.id,
                    minimum_minutes: $('select#minimum_minutes').val(),
                    openTimes: VenueListing.selectedOpeningHours,
                    cancellation_percentage: $('input:radio[name="cancellation_type_id"]:checked').data('percentage'),
                    cancellation_period: $('input:radio[name="cancellation_type_id"]:checked').data('period')
                };
                if ($('input:radio[name="cancellation_type_id"]:checked').val() == 4) {
                    data.cancellation_percentage = $('#cancellationPercent').val();
                    data.cancellation_period = $('#cancellationPeriod').val();
                }
                var overwriteRoomHours = VenueListing.getOverwriteRoomHours();
                var overwriteRoomDuration = VenueListing.getOverwriteRoomDuration();
                var overwriteRoomAmenities = VenueListing.getOverwriteRoomAmenities();
                if (overwriteRoomHours.length > 0) {
                    data.overwrite_room_hours = JSON.stringify(overwriteRoomHours);
                }
                if (overwriteRoomDuration.length > 0) {
                    data.overwrite_room_duration = JSON.stringify(overwriteRoomDuration);
                }
                if (overwriteRoomAmenities.length > 0) {
                    data.overwrite_room_amenities = JSON.stringify(overwriteRoomAmenities);
                }
                if (VenueListing.step3ValidationPassed())
                {
                    VenueListing.ajaxRequest('api/v1/venues', 'PUT', data)
                    .then(function() {
                        window.location.href = venue_finish_link;
                    })
                    .catch(console.log);
                }
            }
        });
    },

    ajaxRequest: function(url, method, data) {
        var settings = {
            async: true,
            crossDomain: true,
            url: base_url + url,
            method: method,
            headers: {
                "accept": "application/json",
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache"
            },
            data: data
        };
        return new Promise(function(resolve, reject) {
            $.ajax(settings)
            .done(function(response) {
                resolve(response);
            })
            .fail(function(error) {
                reject(error);
            });
        });
    },

    formChangeListener: function() {
        var initialValue;
        $('input, select, textarea').focusin(function() {
            initialValue = $(this).val();
        }).focusout(function() {
            if ($(this).hasClass('step1-data')) {
                VenueListing.steps.step1.progress = VenueListing.updateProgressBar($(this), initialValue, VenueListing.steps.step1);
                if (VenueListing.steps.step1.progress == 100)
                    VenueListing.steps.step1.complete = true;
                VenueListing.showProgress(VenueListing.steps.step1);
            }
            if ($(this).hasClass('step2-data')) {
                VenueListing.steps.step2.progress = VenueListing.updateProgressBar($(this), initialValue, VenueListing.steps.step2);
                if (VenueListing.steps.step2.progress == 100)
                    VenueListing.steps.step2.complete = true;
                VenueListing.showProgress(VenueListing.steps.step2);
            }
        });
        $('input:radio[name="opening_type"]').bind('change', function() {
            VenueListing.steps.step3.progress = VenueListing.steps.step3.progress += 33.3;
            VenueListing.showProgress(VenueListing.steps.step3);
            $('input:radio[name="opening_type"]').unbind('change');
        });
        $('input:radio[name="cancellation_type_id"]').bind('change', function() {
            VenueListing.steps.step3.progress = VenueListing.steps.step3.progress += 33.3;
            VenueListing.showProgress(VenueListing.steps.step3);
            $('input:radio[name="cancellation_type_id"]').unbind('change');
        });
    },

    updateProgressBar: function($input, initialValue, step) {
        var progress = step.progress;
        if ($input.prop('nodeName') == 'INPUT' || $input.prop('nodeName') == 'TEXTAREA') {
            if (initialValue === '' && $input.val() !== '') {
                if (step.name == 'step1')
                    progress += 12.5;
                else if (step.name == 'step2')
                    progress += 50;
            }
            else if (initialValue !== '' && $input.val() === '') {
                if (step.name == 'step1')
                    progress -= 12.5;
                else if (step.name == 'step2')
                    progress -= 50;
            }
        }
        else if ($input.prop('nodeName') == 'SELECT') {
            if (_.isNull(initialValue) && !_.isNull($input.val())) {
                if ($input.val() !== '-1') {
                    if (step.name == 'step1')
                        progress += 12.5;
                }
            }
            else if (!_.isNull(initialValue) && _.isNull($input.val())) {
                if (step.name == 'step1')
                    progress -= 12.5;
            }
        }
        return progress;
    },

    throwBootstrapError: function(message) {
        bootstrapError("Please " + message);
    },

    showLoader: function() {
        $('.zc_room_photo_upload').hide();
        $('.loading-gif').show();
    },

    hideLoader: function() {
        $('.loading-gif').hide();
        $('.zc_room_photo_upload').show();
    }
};

$(document).ready(function() {
    VenueListing.init();
});