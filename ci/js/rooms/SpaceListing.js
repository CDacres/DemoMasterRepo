var Venue = {};

var Space = {};

if (isDefined(space_id)) {
    Space.id = space_id;
}

var SpaceListing = {
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
    defaultSpaceTypes: [],
    spaceRates: {},
    defaultSpaceUsages: [],
    spaceUsage: '',
    defaultSpaceConfigurations: [],
    spaceConfigurations: [],
    defaultUsageSuitabilities: [],
    spaceSuitabilities: [],
    spaceIncentives: [],
    photosArray: [],
    mainImage: [],
    daysArray: [],
    defaultDurationOptions: {},
    defaultOpeningHours: [],
    spaceOpeningHours: {},
    spaceCancellationPolicy: {},
    selectedOpeningHours: '',
    cancellationPolicy: [],
    amenityArray: [],

    init: function() {
        SpaceListing.getVenueId();
        SpaceListing.checkCollapseState();
        if (isDefined(Space.id) && Space.id !== '') {
            SpaceListing.loadSpaceData()
            .then(function() {
                SpaceListing.setTitle('Edit your Space');
                SpaceListing.step1Submit();
                SpaceListing.checkForCustomOpeningHours();
                SpaceListing.incentiveClickListener();
                SpaceListing.updateStepsProgress();
            })
            .catch(console.log);
        } else {
            Promise.all([
                SpaceListing.getDefaultSpaceTypes()
            ]).then(function() {
                SpaceListing.setTitle('Add your Space');
                SpaceListing.populateDefaultSpaceTypes();
                SpaceListing.spaceTypeListener();
                SpaceListing.step1Submit();
                SpaceListing.checkCompletedSteps();
                SpaceListing.incentiveClickListener();
            })
            .catch(console.log);
        }
        SpaceListing.photoUploadListener();
    },

    getVenueId: function() {
        if (typeof venue_id != 'undefined')
        {
            Venue.id = venue_id;
        }
    },

    setTitle: function(title) {
        $('#listing-title').text(title);
    },

    checkCollapseState: function() {
        $('.edit-space-collapse').click(function() {
            var step = $(this).attr('zc-step');
            SpaceListing.updateCollapseState(step);
        });
    },

    updateCollapseState: function(step) {
        var openForm;
        switch (step) {
            case '1':
                if (SpaceListing.steps.step1.collapsed) {
                    openForm = SpaceListing.steps.step1;
                    SpaceListing.steps.step1.collapsed = false;
                    SpaceListing.collapseOtherOpenForms(step1);
                } else
                    SpaceListing.steps.step1.collapsed = true;
                break;
            case '2':
                if (SpaceListing.steps.step2.collapsed) {
                    openForm = SpaceListing.steps.step2;
                    SpaceListing.steps.step2.collapsed = false;
                    SpaceListing.collapseOtherOpenForms(step2);
                } else
                    SpaceListing.steps.step2.collapsed = true;
                break;
            case '3':
                if (SpaceListing.steps.step3.collapsed) {
                    openForm = SpaceListing.steps.step3;
                    SpaceListing.steps.step2.collapsed = false;
                    SpaceListing.collapseOtherOpenForms(step3);
                } else
                    SpaceListing.steps.step3.collapsed = true;
                break;
        }
    },

    collapseOtherOpenForms: function(step) {
        switch (step) {
            case step1:
                SpaceListing.steps.step2.collapsed = true;
                SpaceListing.steps.step3.collapsed = true;
                if ($('#step2Collapse').length > 0) $('#step2Collapse')
                .collapse('hide');
                if ($('#step3Collapse').length > 0) $('#step3Collapse')
                .collapse('hide');
                break;
            case step2:
                SpaceListing.steps.step1.collapsed = true;
                SpaceListing.steps.step3.collapsed = true;
                if ($('#step1Collapse').length > 0) $('#step1Collapse')
                .collapse('hide');
                if ($('#step3Collapse').length > 0) $('#step3Collapse')
                .collapse('hide');
                break;
            case step3:
                SpaceListing.steps.step1.collapsed = true;
                SpaceListing.steps.step2.collapsed = true;
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
                SpaceListing.updateCollapseState('2');
                if ($('#step2Collapse').length > 0)
                    $('#step2Collapse').collapse('show');
                break;
            case '2':
                SpaceListing.updateCollapseState('3');
                if ($('#step3Collapse').length > 0)
                    $('#step3Collapse').collapse('show');
                break;
        }
    },

    loadSpaceData: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/rooms?id=' + Space.id, 'GET')
            .then(function(response) {
                Space = response;
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    showHideSpaceSwitch: function() {
        if (isDefined(Space)) {
            $('.hide-space').remove();
            var switchElement = {
                checked: ''
            };
            if (Space.hidden == 1) {
                switchElement.checked = ' checked';
            }
            var HideSpaceSwitchTemplate = _.template($('#HideSpaceSwitch').html());
            $('#space-title-row').append(HideSpaceSwitchTemplate(switchElement));
            applySwitchesToCheckboxes();
        }
    },

    hideSpace: function() {
        $('input:checkbox[name="zc_hide_space"]').on('change', function() {
            var data = {
                id: Space.id,
                hidden: +$(this).is(':checked')
            };
            SpaceListing.ajaxRequest('api/v1/rooms', 'PUT', data)
            .catch(console.log);
        });
    },

    updateStepsProgress: function() {
        if (isDefined(Space.id))
            SpaceListing.populateStepsData();
        else
            bootstrapError("There was an error: the requested space has returned undefined.");
    },

    populateStepsData: function() {
        Promise.all([
            // First stage GETs
            SpaceListing.getDefaultSpaceTypes(),
            SpaceListing.getDefaultSpaceUsages(),
            SpaceListing.getSpaceUsage(),
            SpaceListing.getSpaceRates(),
            SpaceListing.getSpaceConfigurations(),
            SpaceListing.getPhotos(),
            SpaceListing.getDefaultDurationOptions(),
            SpaceListing.getDefaultOpeningHours(),
            SpaceListing.getDaysObject(),
            SpaceListing.getSpaceOpeningHours(),
            SpaceListing.getAmenityTypes(),
            SpaceListing.getAmenities()
        ])
        .then(function() {
            SpaceListing.populateDefaultSpaceTypes();
            SpaceListing.setSpaceType();
            SpaceListing.populateDefaultSpaceUsages();
            SpaceListing.spaceTypeListener();
            SpaceListing.setSpaceUsage();
            Promise.all([
                SpaceListing.getDefaultSpaceSuitabilites(),
                SpaceListing.getSpaceSuitabilities(),
                SpaceListing.getSpaceIncentives()
            ])
            .then(function() {
                loadLang(['common']).then(function (lang) {
                    SpaceListing.showHideSpaceSwitch();
                    SpaceListing.hideSpace();
                    if (Space.spacetype_id == 1) {
                        SpaceListing.populateDefaultSpaceSuitabilities();
                        SpaceListing.setSpaceSuitabilities();
                    } else
                        SpaceListing.setSpaceIncentives();
                    SpaceListing.populateStep1Fields();
                    SpaceListing.showStep1Progess();
                    SpaceListing.populatePhotos();
                    $('#description').val(Space.desc);
                    SpaceListing.showStep2Progess();
                    SpaceListing.step2FormSubmit();
                    SpaceListing.populateMinimumMinutesOptions();
                    if (isDefined(SpaceListing.spaceOpeningHours[0]))
                        $('select#minimum_minutes').val(SpaceListing.spaceOpeningHours[0].minimum_minutes);
                    SpaceListing.populateDefaultOpeningHours();
                    SpaceListing.populateCustomOpeningHoursTable();
                    SpaceListing.populateTimeDropdowns();
                    if (SpaceListing.spaceOpeningHours.opening_type == 5) {
                        SpaceListing.setCustomOpeningHours();
                    }
                    SpaceListing.setOpeningHoursRadio();
                    SpaceListing.openingHoursListener();
                    SpaceListing.populateAmenities(lang);
                    SpaceListing.toggleAmenity();
                    SpaceListing.step3FormSubmit();
                    SpaceListing.showStep3Progess();
                    SpaceListing.checkCompletedSteps();
                    // SpaceListing.formChangeListener();
                });
            })
            .catch(console.log);
        })
        .catch(console.log);
    },

    populateStep1Fields: function() {
        $('#title').val(Space.title);
        if (Space.spacetype_id == 2) {
            $('input:radio[name="spacetype_id"][value="' + 'monthly' + '"]').prop('checked', true);
            $('#monthly-access').show();
        } else {
            $('input:radio[name="spacetype_id"][value="' + 'hourly_daily' + '"]').prop('checked', true);
            $('#hourly-day-access').show();
        }
        $('#num_of_desks').val(Space.num_of_desks);
    },

    showStep1Progess: function() {
        var progress = SpaceListing.steps.step1.progress;
        if (Space.spacetype_id == 1) {
            if (!_.isNull(Space.title)) {
                progress += 20;
            }
            if (!_.isNull(Space.spacetype_id)) {
                progress += 20;
            }
            if (!_.isEmpty(SpaceListing.spaceUsage)) {
                progress += 20;
            }
            if ((typeof SpaceListing.spaceRates.hour !== 'undefined' && typeof SpaceListing.spaceRates.hour !== 'undefined') || (typeof SpaceListing.spaceRates.day !== 'undefined' && (typeof SpaceListing.spaceRates.day.daily_rate !== 'undefined' || typeof SpaceListing.spaceRates.day.daily_delegate_rate !== 'undefined'))) {
                progress += 20;
            }
            if (SpaceListing.spaceUsage == 5 || SpaceListing.spaceUsage == 13) {
                if (!_.isNull(Space.num_of_desks)) {
                    progress += 20;
                }
            } else {
                if (SpaceListing.spaceConfigurations !== 'undefined' && SpaceListing.spaceConfigurations.length > 0) {
                    progress += 20;
                }
            }
        } else {
            if (SpaceListing.spaceUsage == 5 || SpaceListing.spaceUsage == 14) {
                if (!_.isNull(Space.title)) {
                    progress += 20;
                }
                if (!_.isNull(Space.spacetype_id)) {
                    progress += 20;
                }
                if (!_.isEmpty(SpaceListing.spaceUsage)) {
                    progress += 20;
                }
                if (!_.isNull(Space.num_of_desks)) {
                    progress += 20;
                }
                if (typeof SpaceListing.spaceRates.month !== 'undefined' && typeof SpaceListing.spaceRates.month.monthly_rate !== 'undefined') {
                    progress += 20;
                }
            } else {
                if (!_.isNull(Space.title)) {
                    progress += 16;
                }
                if (!_.isNull(Space.spacetype_id)) {
                    progress += 16;
                }
                if (!_.isEmpty(SpaceListing.spaceUsage)) {
                    progress += 16;
                }
                if (typeof Space.size !== 'undefined') {
                    progress += 16;
                }
                if (typeof Space.size_units !== 'undefined') {
                    progress += 16;
                }
                if (typeof SpaceListing.spaceRates.month !== 'undefined' && typeof SpaceListing.spaceRates.month.monthly_rate !== 'undefined') {
                    progress += 20;
                }
            }
        }
        if (progress == 100) {
            SpaceListing.steps.step1.complete = true;
            SpaceListing.steps.step1.progress = progress;
        }
        else
            SpaceListing.steps.step1.progress = progress;
    },

    showStep2Progess: function() {
        var progress = SpaceListing.steps.step2.progress;
        if (!_.isNull(Space.desc))
            progress += 50;
        if (SpaceListing.photosArray.length > 0)
            progress += 50;
        if (progress == 100) {
            SpaceListing.steps.step2.complete = true;
            SpaceListing.steps.step2.progress = progress;
        }
        else
            SpaceListing.steps.step2.progress = progress;
    },

    showStep3Progess: function() {
        var progress = SpaceListing.steps.step3.progress;
        if (isDefined(SpaceListing.defaultOpeningHours) && !_.isNull(SpaceListing.defaultOpeningHours))
            progress += 50;
        if (isDefined(SpaceListing.spaceOpeningHours[0]) && !_.isNull(SpaceListing.spaceOpeningHours[0].minimum_minutes))
            progress += 50;
        if (progress == 100) {
            SpaceListing.steps.step3.complete = true;
            SpaceListing.steps.step3.progress = progress;
        }
        else
            SpaceListing.steps.step3.progress = progress;
    },

    checkCompletedSteps: function() {
        if (SpaceListing.steps.step1.complete) {
            SpaceListing.hideProgress(SpaceListing.steps.step1);
            SpaceListing.setButtonText(SpaceListing.steps.step1, 'Change');
            SpaceListing.setButtonText(SpaceListing.steps.step2, 'Continue');
            SpaceListing.enableStep(SpaceListing.steps.step2);
            SpaceListing.showProgress(SpaceListing.steps.step2);
            SpaceListing.showCompleteTick(SpaceListing.steps.step1.$completeTick);
        }
        else if (SpaceListing.steps.step1.progress === 0)
            SpaceListing.setButtonText(SpaceListing.steps.step1, 'Start');
        else {
            SpaceListing.setButtonText(SpaceListing.steps.step1, 'Continue');
            SpaceListing.showProgress(SpaceListing.steps.step1);
        }
        if (SpaceListing.steps.step1.complete && SpaceListing.steps.step2.complete) {
            SpaceListing.hideProgress(SpaceListing.steps.step2);
            SpaceListing.setButtonText(SpaceListing.steps.step2, 'Change');
            SpaceListing.setButtonText(SpaceListing.steps.step3, 'Continue');
            SpaceListing.enableStep(SpaceListing.steps.step3);
            SpaceListing.showProgress(SpaceListing.steps.step3);
            SpaceListing.showCompleteTick(SpaceListing.steps.step2.$completeTick);
        }
        else if (SpaceListing.steps.step2.progress === 0)
            SpaceListing.setButtonText(SpaceListing.steps.step2, 'Start');
        else {
            SpaceListing.setButtonText(SpaceListing.steps.step2, 'Continue');
            SpaceListing.showProgress(SpaceListing.steps.step2);
        }
        if (SpaceListing.steps.step1.complete && SpaceListing.steps.step2.complete && SpaceListing.steps.step3.complete) {
            SpaceListing.hideProgress(SpaceListing.steps.step3);
            SpaceListing.setButtonText(SpaceListing.steps.step3, 'Change');
            SpaceListing.showCompleteTick(SpaceListing.steps.step3.$completeTick);
        }
        else if (SpaceListing.steps.step3.progress === 0)
            SpaceListing.setButtonText(SpaceListing.steps.step3, 'Start');
        else {
            SpaceListing.setButtonText(SpaceListing.steps.step3, 'Continue');
            SpaceListing.showProgress(SpaceListing.steps.step3);
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
        if (isDefined(step)) {
            $(step.$progressSpan).css('width', function() {
                return step.progress.toString() + '%';
            });
        }
    },

    hideProgress: function(step) {
        $(step.$progressBar).hide();
    },

    setButtonText: function(step, text) {
        if (isDefined(step) && isDefined(text))
            step.$button.text(text);
    },

    getSpaceRates: function() {
        return new Promise(function(resolve, reject) {
             SpaceListing.ajaxRequest('api/v1/rooms/price?id=' + Space.id, 'GET')
            .then(function(response) {
                SpaceListing.spaceRates = response;
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    getDefaultSpaceTypes: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/spacetypes', 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    SpaceListing.defaultSpaceTypes = JSON.parse(response).data.objects;
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populateDefaultSpaceTypes: function() {
        if (_.isArray(SpaceListing.defaultSpaceTypes) && SpaceListing.defaultSpaceTypes.length > 0) {
            $('#spaceTypes').empty();
            var populatedTypes = 0;
            _.each(SpaceListing.defaultSpaceTypes, function(spaceType, i) {
                spaceType.index = i;
                spaceType.desc = spaceType.typedesc;
                spaceType.radioName = 'spacetype_id';
                spaceType.radioValue = spaceType.id;
                var RadioButtonTemplate = _.template($('#RadioButton').html());
                $('#spaceTypes').append(RadioButtonTemplate(spaceType));
                populatedTypes++;
            });
            if (populatedTypes == SpaceListing.defaultSpaceTypes.length) {
                // SpaceListing.formChangeListener();
            }
        }
    },

    spaceTypeListener: function() {
        $(document).on('change', 'input:radio[name="spacetype_id"]', function() {
            delete SpaceListing.spaceUsage;
            SpaceListing.hideFormItems();
            Space.spacetype_id = this.value;
            SpaceListing.getDefaultSpaceUsages()
            .then(function() {
                SpaceListing.populateDefaultSpaceUsages();
                if (typeof SpaceListing.spaceUsage !== 'undefined')
                    SpaceListing.setSpaceUsage();
                SpaceListing.revealSpaceUsages();
                // SpaceListing.formChangeListener();
            })
            .catch(console.log);
        });
    },

    setSpaceType: function() {
        if (isDefined(Space.spacetype_id)) {
            $('input:radio[name="spacetype_id"][value="' + Space.spacetype_id + '"]').attr('checked', 'checked');
            SpaceListing.revealSpaceUsages();
        }
    },

    getDefaultSpaceUsages: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/usage/spacetype?spacetype_id=' + Space.spacetype_id, 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    SpaceListing.defaultSpaceUsages = JSON.parse(response).data.objects;
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populateDefaultSpaceUsages: function() {
        if (_.isArray(SpaceListing.defaultSpaceUsages) && SpaceListing.defaultSpaceUsages.length > 0) {
            $('#dailySpaceUsages').empty();
            $('#monthlySpaceUsages').empty();
            var addedElements = 0;
            _.each(SpaceListing.defaultSpaceUsages, function(spaceUsage, i) {
                spaceUsage.index = i;
                spaceUsage.radioValue = spaceUsage.id;
                spaceUsage.radioName = 'usage_id';
                var RadioButtonTemplate = _.template($('#RadioButton').html());
                if (Space.spacetype_id == 2)
                    $('#monthlySpaceUsages').append(RadioButtonTemplate(spaceUsage));
                else
                    $('#dailySpaceUsages').append(RadioButtonTemplate(spaceUsage));
                addedElements++;
            });
            if (addedElements == SpaceListing.defaultSpaceUsages.length) {
                SpaceListing.spaceUsageListener();
            }
        }
    },

    getSpaceUsage: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/rooms/usage?id=' + Space.id, 'GET')
            .then(function(response) {
                SpaceListing.spaceUsage = response;
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    setSpaceUsage: function() {
        if (isDefined(SpaceListing.spaceUsage)) {
            $('input:radio[name="usage_id"][value="' + SpaceListing.spaceUsage + '"]').attr('checked', 'checked');
            SpaceListing.getDefaultSpaceConfigurations()
            .then(function() {
                SpaceListing.populateDefaultSpaceConfigurations();
                SpaceListing.setSpaceConfiguration();
                SpaceListing.setOfficeCapacity();
                SpaceListing.setOfficeSize();
                SpaceListing.revealSpaceDetails();
            })
            .catch(console.log);
        }
    },

    revealSpaceUsages: function() {
        if (Space.spacetype_id == 2) {
            $('#hourly-day-access').hide();
            $('#monthly-access').show();
            SpaceListing.populateMinimumTermDropdown();
            if (isDefined(Space.id) && Space.id !== '') {
                SpaceListing.setMonthlyPrice();
                SpaceListing.setMinimumTerm();
            }
        } else {
            $('#monthly-access').hide();
            $('#hourly-day-access').show();
            if (isDefined(Space.id) && Space.id !== '') {
                SpaceListing.setHourlyPrice();
                SpaceListing.setDailyPrice();
                SpaceListing.setDayDelegate();
                SpaceListing.setMinimumSpend();
            }
        }
    },

    spaceUsageListener: function() {
        $(document).on('change', 'input:radio[name="usage_id"]', function() {
            SpaceListing.spaceUsage = this.value;
            SpaceListing.getDefaultSpaceConfigurations()
            .then(function() {
                SpaceListing.populateDefaultSpaceConfigurations();
                SpaceListing.setSpaceConfiguration();
                SpaceListing.setOfficeCapacity();
                SpaceListing.setOfficeSize();
                SpaceListing.revealSpaceDetails();
                SpaceListing.getDefaultSpaceSuitabilites()
                .then(function() {
                    SpaceListing.populateDefaultSpaceSuitabilities();
                })
                .catch(console.log);
            })
            .catch(console.log);
        });
    },

    revealSpaceDetails: function() {
        SpaceListing.hideFormItems();
        if (Space.spacetype_id == 2 && SpaceListing.spaceUsage == 5 || SpaceListing.spaceUsage == 14)
            SpaceListing.showMonthlyDeskFormItems();
        else if (Space.spacetype_id == 1 && SpaceListing.spaceUsage == 5 || SpaceListing.spaceUsage == 13)
            SpaceListing.showDailyDeskFormItems();
        else if (SpaceListing.spaceUsage == 1)
            SpaceListing.showPrivateOfficeFormItems();
        else
            SpaceListing.showStandardSpaceFormItems();
        if (SpaceListing.spaceUsage == 4 || SpaceListing. spaceUsage == 6)
            SpaceListing.showDayDelegateInput();
        if (SpaceListing.spaceUsage == 6)
            SpaceListing.showMinimumSpendInput();
    },

    hideFormItems: function() {
        $('#desks-config').hide();
        $('#office-config').hide();
        $('#monthly-price').hide();
        $('#day-delegate').hide();
        $('#spaces-config').hide();
        $('#hourly-daily-price').hide();
        $('#day-delegate').hide();
        $('#minimum-spend').hide();
        $('#suitable_for').hide();
        $('#office-size').hide();
        SpaceListing.clearRoomUsageContent();
    },

    showStandardSpaceFormItems: function() {
        $('#spaces-config').show();
        $('#hourly-daily-price').show();
        $('#suitable_for').show();
    },

    showDayDelegateInput: function() {
        $('#day-delegate').show();
    },

    showMinimumSpendInput: function() {
        $('#minimum-spend').show();
    },

    showDailyDeskFormItems: function() {
        $('#desks-config').show();
        $('#hourly-daily-price').show();
    },

    showMonthlyDeskFormItems: function() {
        $('#desks-config').show();
        $('#monthly-price').show();
    },

    showPrivateOfficeFormItems: function() {
        $('#monthly-price').show();
        $('#office-config').show();
        $('#office-size').show();
        SpaceListing.duplicateOfficeCapacity();
    },

    clearRoomUsageContent: function() {
        if (Space.spacetype_id == 2) {
            delete SpaceListing.spaceRates.hour;
            delete SpaceListing.spaceRates.day;
        } else {
            delete SpaceListing.spaceRates.month;
        }
    },

    getDefaultSpaceConfigurations: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/configurations/usage?usage_id=' + SpaceListing.spaceUsage, 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    SpaceListing.defaultSpaceConfigurations = JSON.parse(response).data.objects;
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populateDefaultSpaceConfigurations: function() {
        var populatedConfigs = 0;
        $('#spaceConfigurations').empty();
        if (_.isArray(SpaceListing.defaultSpaceConfigurations) && SpaceListing.defaultSpaceConfigurations.length > 0) {
            var SpaceConfigurationTemplate = _.template($('#SpaceConfiguration').html());
            _.each(SpaceListing.defaultSpaceConfigurations, function(spaceConfig, i) {
                spaceConfig.index = i;
                spaceConfig.name = 'configs';
                spaceConfig.descLower = spaceConfig.desc.replace(/\s+/g, '-').toLowerCase();
                $('#spaceConfigurations').append(SpaceConfigurationTemplate(spaceConfig));
                populatedConfigs++;
            });
        }
        if (SpaceListing.defaultSpaceConfigurations.length === 1) {
            $('.config_check').attr('checked', 'checked');
        }
        if (populatedConfigs === SpaceListing.defaultSpaceConfigurations.length) {
            $(".config_max_capacity").on("change keyup paste", function() {
                var scopeThis = $(this);
                $(".config_check").each(function() {
                    if ($(this).val() == scopeThis.attr('zc_data_id')) {
                        if (scopeThis.val() != '' && !this.checked) {
                            $(this).prop('checked', true);
                        }
                        else if (scopeThis.val() == '') {
                            $(this).prop('checked', false);
                        }
                    }
                });
            });
        }
    },

    getSpaceConfigurations: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/rooms/configurations?id=' + Space.id, 'GET')
            .then(function(response) {
                SpaceListing.spaceConfigurations = response;
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    setSpaceConfiguration: function() {
        if (_.isArray(SpaceListing.spaceConfigurations) && SpaceListing.spaceConfigurations.length > 0) {
            _.each(SpaceListing.spaceConfigurations, function(spaceConfig, i) {
                $('input.config_check[value="' + spaceConfig.config_id + '"]').attr('checked', 'checked');
                $('#config_max_cap_' + spaceConfig.config_id).val(spaceConfig.max_capacity);
            });
        }
    },

    amalgamateSpaceConfigurations: function() {
        var configs = {};
        configs.type = [];
        configs.capacity = [];
        $(".config_check").each(function()
        {
            if (this.checked && $("#config_max_cap_" + $(this).val()).val() != '' && !isNaN($("#config_max_cap_" + $(this).val()).val()))
            {
                configs.type.push($(this).val());
                configs.capacity.push($("#config_max_cap_" + $(this).val()).val());
            }
        });
        return configs;
    },

    setHourlyPrice: function() {
        if (isDefined(SpaceListing.spaceRates.hour)) {
            var price = Number(SpaceListing.spaceRates.hour);
            $('#hourly-price-input').val(price.toFixed(2));
        }
    },

    setDailyPrice: function() {
        if (isDefined(SpaceListing.spaceRates.day)) {
            var price = Number(SpaceListing.spaceRates.day.daily_rate);
            $('#daily-price-input').val(price.toFixed(2));
        }
    },

    setDayDelegate: function() {
        if (isDefined(SpaceListing.spaceRates.day) && !_.isNull(SpaceListing.spaceRates.day.daily_delegate_rate)) {
            var price = Number(SpaceListing.spaceRates.day.daily_delegate_rate);
            $('#daily_delegate_rate').val(price.toFixed(2));
        }
    },

    setMinimumSpend: function() {
        if (isDefined(SpaceListing.spaceRates.day)) {
            var price = Number(SpaceListing.spaceRates.day.minimum_spend);
            $('#minimum_spend').val(price.toFixed(2));
        }
    },

    setMonthlyPrice: function() {
        if (isDefined(SpaceListing.spaceRates.month)) {
            var price = Number(SpaceListing.spaceRates.month.monthly_rate);
            $('#monthly-price-input').val(price.toFixed(2));
        }
    },

    getDefaultSpaceSuitabilites: function() {
        return new Promise(function(resolve, reject) {
            if (Space.spacetype_id == 1 && (SpaceListing.spaceUsage != 5 && SpaceListing.spaceUsage != 13)) {
                 SpaceListing.ajaxRequest('api/v1/suitable/usage?usage_id=' + SpaceListing.spaceUsage, 'GET')
                .then(function(response) {
                    if (typeof response != 'undefined' && response.length)
                    {
                        SpaceListing.defaultUsageSuitabilities = JSON.parse(response).data.objects;
                    }
                    resolve();
                })
                .catch(function(error) {
                    reject(error);
                });
            } else {
                resolve();
            }
        });
    },

    populateDefaultSpaceSuitabilities: function() {
        $('#suitableFor').empty();
        if (_.isArray(SpaceListing.defaultUsageSuitabilities) && SpaceListing.defaultUsageSuitabilities.length > 0) {
            var SpaceSuitabilityTemplate = _.template($('#SpaceSuitability').html());
            _.each(SpaceListing.defaultUsageSuitabilities, function(suitability, i) {
                suitability.index = i;
                suitability.name = 'suitable';
                suitability.descLower = suitability.desc.replace(/\s+/g, '-').toLowerCase();
                $('#suitableFor').append(SpaceSuitabilityTemplate(suitability));
            });
        }
    },

    getSpaceSuitabilities: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/rooms/suitable?id=' + Space.id, 'GET')
            .then(function(response) {
                if (Space.spacetype_id == 1)
                    SpaceListing.spaceSuitabilities = response;
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    setSpaceSuitabilities: function() {
        if (_.isArray(SpaceListing.spaceSuitabilities) && SpaceListing.spaceSuitabilities.length > 0) {
            _.each(SpaceListing.spaceSuitabilities, function(spaceSuitability, i) {
                $('input:checkbox[name="suitable"][value="' + spaceSuitability.suitable_id + '"]').attr('checked', 'checked');
            });
        }
    },

    amalgamateSpaceSuitabilities: function() {
        var suitable = {};
        suitable.suitable_id = [];
        $(".suitable_check").each(function() {
            if (this.checked) {
                suitable.suitable_id.push($(this).val());
            }
        });
        return suitable;
    },

    duplicateOfficeCapacity: function() {
        $('#capacity').keyup(function() {
            $('#config_max_cap_9').val($(this).val());
        });
    },

    setOfficeCapacity: function() {
        if (_.isArray(SpaceListing.spaceConfigurations) && SpaceListing.spaceConfigurations.length > 0) {
            var maxcap = Number(SpaceListing.spaceConfigurations[0].max_capacity);
            $('#capacity').val(maxcap.toFixed());
            $('#config_max_cap_9').val(maxcap.toFixed());
        }
    },

    setOfficeSize: function() {
        if (isDefined(Space.size)) {
            var size = Number(Space.size);
            if (Space.size_units == 'ft2') {
                size = (size / 0.09290304).toFixed(2);
            }
            $('#size').val(size);
            $('#size_units').val(Space.size_units);
        }
    },

    populateMinimumTermDropdown: function() {
        $('#minimum_term').empty();
        var months = [
            {
                desc: '1 month',
                value: 1
            },
            {
                desc: '3 months',
                value: 3
            },
            {
                desc: '6 months',
                value: 6
            },
            {
                desc: '12 months',
                value: 12
            }
        ];
        var DropdownOptionTemplate = _.template($('#DropdownOption').html());
        _.each(months, function(month, i) {
            $('#minimum_term').append(DropdownOptionTemplate(month));
        });
    },

    setMinimumTerm: function() {
        if (isDefined(SpaceListing.spaceRates.month)) {
            var minimumTerm = Number(SpaceListing.spaceRates.month.minimum_term);
            $('#minimum_term').val(minimumTerm);
        }
    },

    incentiveClickListener: function() {
        $('.add-incentive').click(function() {
            SpaceListing.addIncentive($(this));
        });
    },

    addIncentive: function($element) {
        var discount = $element.attr('id') + '-input';
        var total = $element.attr('id') + '-total-title';
        $element.hide();
        $('#' + discount).show();
        $('#' + total).show();
        SpaceListing.insertIncentivePrice($element);
    },

    insertIncentivePrice: function($element) {
        var discount = $element.attr('id') + '-input';
        var incentiveTotal = $element.attr('id') + '-total';
        var discountValue = $('#monthly-price-input').val() * ($('#' + discount).val() / 100);
        var total = $('#monthly-price-input').val();
        var discounted = total - discountValue;
        var currency = Currency.getCurrency(Space.currency);
        $('#' + incentiveTotal).text(currency.symbol + discounted.toFixed(2));
        $('#' + discount + ', #monthly-price-input').keyup(function() {
            var discountValue = $('#monthly-price-input').val() * ($('#' + discount).val() / 100);
            var total = $('#monthly-price-input').val();
            var discounted = total - discountValue;
            $('#' + incentiveTotal).text(currency.symbol + discounted.toFixed(2));
        });
    },

    amalgamateIncentives: function() {
        var incentives = {};
        incentives.month_terms = [];
        incentives.discount = [];
        $(".incentive-input").each(function() {
            if ($(this).is(':visible')) {
                incentives.month_terms.push(this.id.substr(0, this.id.indexOf('-')));
                incentives.discount.push($(this).val());
            }
        });
        return incentives;
    },

    getSpaceIncentives: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/rooms/incentives?id=' + Space.id, 'GET')
            .then(function(response) {
                if (Space.spacetype_id == 2)
                    SpaceListing.spaceIncentives = response;
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    setSpaceIncentives: function() {
        if (_.isArray(SpaceListing.spaceIncentives) && SpaceListing.spaceIncentives.length > 0) {
            _.each(SpaceListing.spaceIncentives, function(spaceIncentive, i) {
                $('#' + spaceIncentive.month_terms + '-month-incentive').hide();
                $('#' + spaceIncentive.month_terms + '-month-incentive-input').show();
                $('#' + spaceIncentive.month_terms + '-month-incentive-total-title').show();
                $('#' + spaceIncentive.month_terms + '-month-incentive-input').val(Number(spaceIncentive.discount).toFixed(2));
                SpaceListing.insertIncentivePrice($('#' + spaceIncentive.month_terms + '-month-incentive'));
            });
        }
    },

    step1Submit: function() {
        $('#step1Form').submit(function(event) {
            event.preventDefault();
            var method = 'POST';
            if (isDefined(Space.id) && Space.id !== '') {
                method = 'PUT';
            }
            var $form = $(this);
            var data = $form.serializeObject();
            data.incentives = JSON.stringify(SpaceListing.amalgamateIncentives());
            data.configs = JSON.stringify(SpaceListing.amalgamateSpaceConfigurations());
            data.suitable = JSON.stringify(SpaceListing.amalgamateSpaceSuitabilities());
            if (data.size_units == 'ft2') {
                // Conversion from ft2 to m2
                data.size = data.size * 0.09290304;
            }
            if ($('#minimum_term').val() == null)
                data.minimum_term = '';
            if (Space.id !== '')
                data.id = Space.id;
            else
                data.venue_id = Venue.id;
            if (SpaceListing.step1ValidationPassed()) {
                SpaceListing.ajaxRequest('api/v1/rooms', method, data)
                .then(function(response) {
                    Space = response;
                    SpaceListing.steps.step1.progress = 0;
                    SpaceListing.updateStepsProgress();
                    SpaceListing.moveToNextStep($form.attr('zc-step'));
                    if (method == 'POST')
                    {
                        window.history.pushState(null, null, base_url + country_lang_url + '/rooms/' + Space.id + '/edit');
                    }
//                    var analyticsData = {
//                        tracking_cookie_id: tracking_cookie_id,
//                        language: language_code,
//                        admin_id: 0 //??
//                    };
//                    $.ajax({
//                        url: zc_analytics_url + '/listing/' + Space.asset_id,
//                        data: analyticsData,
//                        dataType: "json",
//                        type: "POST",
//                        error: function()
//                        {
//                            //does this need an error?
//                        }
//                    });
                })
                .catch(console.log);
            }
        });
    },

    step1ValidationPassed: function() {
        if (SpaceListing.spaceNameTypePassed()) {
            if (SpaceListing.spaceUsagePassed()) {
                if (Space.spacetype_id == 1 && (SpaceListing.spaceUsage != 5 && SpaceListing.spaceUsage != 13)) {
                    if (SpaceListing.spaceConfigPassed()) {
                        if (SpaceListing.spacePricePassed()) {
                            return true;
                        }
                    }
                }
                else {
                    if (SpaceListing.spacePricePassed()) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    spaceNameTypePassed: function() {
        if (inputIsEmpty($('#title'))) {
            throwInputError($('#title'));
            bootstrapError("Please enter the name of your Space.");
            return false;
        }
        else if (!radioOptionChecked('spacetype_id')) {
            throwRadioError($('#spaceTypes'));
            bootstrapError("Please select a Space type.");
            return false;
        }
        return true;
    },

    spaceUsagePassed: function() {
        if (radioOptionChecked('usage_id')) {
            return true;
        }
        throwRadioError($('#dailySpaceUsages'));
        bootstrapError("Please select a Space usage.");
        return false;
    },

    spaceConfigPassed: function() {
        if (checkboxIsChecked('configs')) {
            if (atLeastOneInputFilled('config_max_capacity')) {
                return true;
            }
        }
        throwCheckboxError($('input.config_check'));
        throwInputError($('input.config_max_capacity'));
        bootstrapError("Please select at least one Space configuration.");
        return false;
    },

    spacePricePassed: function() {
        if (Space.spacetype_id == 1) {
            if (!inputIsEmpty($('#daily_delegate_rate'))) {
                return true;
            } else if (!inputIsEmpty($('#daily-price-input')))
                return true;
            else if (!inputIsEmpty($('#hourly-price-input')))
                return true;
            else {
                throwInputError($('#hourly-price-input'));
                throwInputError($('#daily-price-input'));
                throwInputError($('#daily_delegate_rate'));
                bootstrapError("Please enter an hourly, daily and/or day-delegate price for your Space.");
            }
        } else {
            if (!inputIsEmpty($('#monthly-price-input')) && selectOptionSelected($('#minimum_term'))) {
                return true;
            }
            throwInputError($('#monthly-price-input'));
            throwSelectError($('#minimum_term'));
            bootstrapError("Please enter a monthly price for your Space.");
        }
        return false;
    },

    getPhotos: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/images?room_id=' + Space.id, 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    SpaceListing.photosArray = JSON.parse(response).data.objects;
                    SpaceListing.mainImage = SpaceListing.photosArray.filter(function(photo) {
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
        $('#spacePhotos').empty();
        if (_.isArray(SpaceListing.photosArray) && SpaceListing.photosArray.length > 0) {
            var PhotoTemplate = _.template($('#Photo').html());
            _.each(SpaceListing.photosArray, function(photoObj, i) {
                photoObj.index = i;
                $('#spacePhotos').append(PhotoTemplate(photoObj));
            });
            SpaceListing.deletePhotoListener();
            SpaceListing.mainImageListener();
        }
    },

    photoUploadListener: function() {
        $(".zc_room_photo_upload").on('click', function(event) {
            event.preventDefault();
            $("#zc_upload").trigger("click");
        });
        $("#zc_upload").change(function() {
            SpaceListing.postPhotos();
        });
    },

    postPhotos: function() {
        var formData = new FormData();
        formData.append("upload_image", $("#zc_upload")[0].files[0]);
        formData.append("room_id", Space.id);
        $.ajax({
            url: base_url + "api/v1/images",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            type: "POST",
            success: function() {
                SpaceListing.getPhotos()
                .then(function() {
                    SpaceListing.populatePhotos();
                    if (SpaceListing.photosArray.length > 0 && SpaceListing.photosArray.length < 2) {
                        SpaceListing.steps.step2.progress += 50;
                        SpaceListing.showProgress(SpaceListing.steps.step2);
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
                SpaceListing.deletePhoto(photo_id)
                .then(function() {
                    SpaceListing.getPhotos()
                    .then(function() {
                        SpaceListing.populatePhotos();
                        SpaceListing.photosArray.splice(index, 1);
                        $('li#' + photo_id).remove();
                        if (SpaceListing.photosArray.length < 1) {
                            SpaceListing.steps.step2.progress -= 50;
                            SpaceListing.showProgress(SpaceListing.steps.step2);
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
                room_id: Space.id
            };
            SpaceListing.ajaxRequest('api/v1/images', 'DELETE', data)
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
            if (SpaceListing.mainImage.length > 0) {
                SpaceListing.changeMainImage("0")
                .then(function() {
                    SpaceListing.mainImage = [];
                })
                .catch(console.log);
            }
            SpaceListing.mainImage = SpaceListing.photosArray.filter(function(photo) {
                return photo.id == value;
            });
            SpaceListing.changeMainImage("1")
            .then(function() {
                SpaceListing.getPhotos();
            })
            .catch(console.log);
        });
    },

    changeMainImage: function(represents) {
        return new Promise(function(resolve, reject) {
            var data = {
                id: SpaceListing.mainImage[0].id,
                room_id: Space.id,
                represents: represents
            };
            SpaceListing.ajaxRequest('api/v1/images', 'PUT', data)
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
            var data = $form.serializeObject();
            data.id = Space.id;
            if (SpaceListing.step2ValidationPassed())
            {
                SpaceListing.ajaxRequest('api/v1/rooms', 'PUT', data)
                .then(function(response) {
                    Space = response;
                    SpaceListing.steps.step2.progress = 0;
                    SpaceListing.updateStepsProgress();
                    SpaceListing.moveToNextStep($form.attr('zc-step'));
                })
                .catch(console.log);
            }
        });
    },

    step2ValidationPassed: function() {
        if (SpaceListing.descriptionPassed()) {
            if (SpaceListing.photosPassed())
                return true;
        }
        return false;
    },

    descriptionPassed: function() {
        if (inputIsEmpty($('#description'))) {
            throwInputError($('#description'));
            bootstrapError("Please enter a description of your space.");
            return false;
        }
        return true;
    },

    photosPassed: function() {
        if (SpaceListing.photosArray.length < 1) {
            bootstrapError("Please ensure that at least one image is uploaded");
            return false;
        }
        return true;
    },

    getDefaultDurationOptions: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/durations', 'GET')
            .then(function(response) {
                SpaceListing.defaultDurationOptions = response;
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
        if (_.isObject(SpaceListing.defaultDurationOptions) && !_.isEmpty(SpaceListing.defaultDurationOptions)) {
            var DropdownOptionTemplate = _.template($('#DropdownOption').html());
            _.each(SpaceListing.defaultDurationOptions, function(durationOption, i) {
                var option = {};
                option.value = i;
                option.desc = durationOption;
                $('#minimum_minutes').append(DropdownOptionTemplate(option));
            });
        }
    },

    populateDefaultOpeningHours: function() {
        $('#openingHoursOptions').empty();
        if (_.isArray(SpaceListing.defaultOpeningHours) && SpaceListing.defaultOpeningHours.length > 0) {
            _.each(SpaceListing.defaultOpeningHours, function(option, i) {
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
        }
    },

    getSpaceOpeningHours: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/rooms/openhours?id=' + Space.id, 'GET')
            .then(function(response) {
                SpaceListing.spaceOpeningHours = response;
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    setOpeningHoursRadio: function() {
        $('input:radio[name="opening_type"][value="' + SpaceListing.spaceOpeningHours.opening_type + '"]').attr('checked', 'checked');
    },

    checkForCustomOpeningHours: function() {
        if ($(".zc_space_opening_type:checked"))
            SpaceListing.showCustomOpeningHours();
        $(".zc_space_opening_type").click(SpaceListing.showCustomOpeningHours());
    },

    setCustomOpeningHours: function() {
        var openingHours = {};
        if (_.isObject(SpaceListing.spaceOpeningHours) && !_.isEmpty(SpaceListing.spaceOpeningHours)) {
            _.each(SpaceListing.spaceOpeningHours, function(day, i) {
                if (i !== 'opening_type') {
                    openingHours[day.day_id] = [];
                }
            });
            _.each(SpaceListing.spaceOpeningHours, function(day, i) {
                if (i !== 'opening_type') {
                    openingHours[day.day_id].push(day);
                }
            });
        }
        if (_.isObject(openingHours) && !_.isEmpty(openingHours)) {
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
        }
    },

    getDaysObject: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/days', 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    SpaceListing.daysArray = JSON.parse(response).data.objects;
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populateCustomOpeningHoursTable: function() {
        $('#customOpeningHoursTable').empty();
        if (_.isArray(SpaceListing.daysArray) && SpaceListing.daysArray.length > 0) {
            var CustomDayRowTemplate = _.template($('#CustomDayRow').html());
            _.each(SpaceListing.daysArray, function(day, i) {
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
            SpaceListing.showCustomOpeningHours();
        else
            SpaceListing.hideCustomOpeningHours();
        $('input:radio[name="opening_type"]').click(function() {
            if ($('input:radio[name="opening_type"]:checked').val() == 5)
                SpaceListing.showCustomOpeningHours();
            else
                SpaceListing.hideCustomOpeningHours();
        });
        $(".zc_listing_opening_split_check").each(function() {
            var scopeThis = $(this);
            $(this).click(function() {
                $("#zc_listing_opening_split_" + scopeThis.val()).toggle(this.checked);
            });
            if (this.checked) {
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

    amalgamateSelectedOpeningHours: function() {
        var errorMessage = '';
        var radioValue = $('input:radio[name="opening_type"]:checked').val();
        var openTimes = {};
        if (radioValue == 5) {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'
            ];
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
                    } else {
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
                            openTimes.start[d].push(openingHoursStart);
                            openTimes.end[d].push(openingHoursEnd);
                            if (splitChecked) {
                                openTimes.start[d].push(openingHoursSplitStart);
                                openTimes.end[d].push(openingHoursSplitEnd);
                            }
                        }
                        if (errorMessage !== '') {
                            bootstrapError("Please ensure " + errorMessage + ".");
                        }
                    }
                }
            }
        } else {
            var defaultOpeningHours = SpaceListing.defaultOpeningHours[radioValue - 1];
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
        var data = SpaceListing.amalgamateSelectedOpeningHours()
        if (data.errorMessage === '') {
            SpaceListing.selectedOpeningHours = JSON.stringify(data.openTimes);
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
            SpaceListing.ajaxRequest('api/v1/openinghours', 'GET')
            .then(function(response) {
                SpaceListing.defaultOpeningHours = response;
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    checkForCustomCancellationPolicy: function() {
        if ($(".space_cancellation_type:checked"))
            SpaceListing.showCustomCancellationPolicy();
        $(".space_cancellation_type").click(SpaceListing.showCustomCancellationPolicy());
    },

    getDefaultCancellationPolicies: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/rooms/canceldefaults', 'GET')
            .then(function(response) {
                SpaceListing.cancellationPolicy = response;
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populateCancellationPolicies: function() {
        $('#cancellationPolicies').empty();
        if (_.isArray(SpaceListing.cancellationPolicy) && SpaceListing.cancellationPolicy.length > 0) {
            var CancellationPolicyTemplate = _.template($('#CancellationPolicy').html());
            _.each(SpaceListing.cancellationPolicy, function(cancellationPolicy, i) {
                cancellationPolicy.index = i;
                $('#cancellationPolicy').append(CancellationPolicyTemplate(cancellationPolicy));
            });
        }
    },

    getSpaceCancellationPolicy: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/rooms/cancelbyspace?id=' + Space.id, 'GET')
            .then(function(response) {
                SpaceListing.spaceCancellationPolicy = response;
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    setSpaceCancellationPolicy: function() {
        if (isDefined(SpaceListing.spaceCancellationPolicy) && !_.isEmpty(SpaceListing.spaceCancellationPolicy)) {
            var percent = Number(SpaceListing.spaceCancellationPolicy.cancel_percent).toFixed(2);
            var period = Number(SpaceListing.spaceCancellationPolicy.cancel_days);
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
        $('input:radio[name="cancellation_type_id"]').click(function() {
            SpaceListing.showCustomCancellationPolicy($(this));
        });
    },

    showCustomCancellationPolicy: function() {
        if ($('input:radio[name=cancellation_type_id]:checked').val() == 4)
            $('#custom_cancellation').show();
        else
            $('#custom_cancellation').hide();
    },

    getAmenityTypes: function() {
        return new Promise(function(resolve, reject) {
            SpaceListing.ajaxRequest('api/v1/amenities/types', 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    SpaceListing.amenityTypeArray = JSON.parse(response).data.objects;
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
            SpaceListing.ajaxRequest('api/v1/amenities?room_id=' + Space.id, 'GET')
            .then(function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    SpaceListing.amenityArray = JSON.parse(response).data.objects;
                }
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },

    populateAmenities: function(lang) {
        $('#spaceAmenities').empty();
        if (_.isArray(SpaceListing.amenityArray) && SpaceListing.amenityArray.length > 0) {
            var AmenitytypeHeadingTemplate = _.template($('#Amenity-typeHeading').html());
            var AmenityamenityTemplate = _.template($('#Amenity-amenity').html());
            var AmenityaddLinkTemplate = _.template($('#Amenity-addLink').html());
            _.each(SpaceListing.amenityTypeArray, function(amenityTypeObject, i) {
                var amenityType = amenityTypeObject.id;
                amenityTypeObject.amenity_type = lang.common[amenityTypeObject.name];
                $('#spaceAmenities').append(AmenitytypeHeadingTemplate(amenityTypeObject));
                _.each(SpaceListing.amenityArray, function(amenityObject, i) {
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
                            amenityObject.checked = ' checked="checked"';
                        }
                        $('#spaceAmenities').append(AmenityamenityTemplate(amenityObject));
                    }
                });
                $('#spaceAmenities').append(AmenityaddLinkTemplate(amenityTypeObject));
            });
            applySwitchesToCheckboxes();
            SpaceListing.amenityClickListener(lang);
        }
    },

    amenityClickListener: function(lang) {
        $('.addInfo').click(function() {
            var amenityObject = {};
            amenityObject.costText = '';
            var currency = Currency.getCurrency(Space.currency);
            amenityObject.currency_symbols = currency.symbol;
            amenityObject.amenity_type = $(this).attr('id');
            var AddAmenityTemplate = _.template($('#AddAmenity').html());
            SpaceListing.showAmenityModal(AddAmenityTemplate(amenityObject));
        });
        $('.editItem').click(function() {
            SpaceListing.getAmenityObject(lang, $(this).attr('amenity_id'));
        });
    },

    getAmenityObject: function(lang, amenityId) {
        var amenityObject;
        SpaceListing.ajaxRequest('api/v1/amenities?id=' + amenityId + '&room_id=' + Space.id, 'GET')
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
                    SpaceListing.showAmenityModal(EditAmenityTemplate(amenityObject));
                }
            })
            .catch(console.log);
    },

    showAmenityModal: function(modalContent) {
        clearMainModal();
        $("#mainModal").on("shown.bs.modal", function() {
            $("#mainModal").on("hidden.bs.modal", function() {
                $("#mainModal").off("shown.bs.modal");
            });
        });
        $("#modal_slide_up_content").html(modalContent);
        $('.modal-dialog').addClass('modal-tiny');
        $("#mainModal").modal('show');
        verticallyCenterModal();
        cancelButtonListener();
        SpaceListing.modalListeners();
    },

    modalListeners: function() {
        $(".zc_include_list").click(function() {
            if ($(this).data('value') == 'free') {
                $('#zc_amenity_cost_enc').hide();
            } else {
                $('#zc_amenity_cost_enc').show();
            }
            $('#zc_include_option_btn').contents().first().replaceWith($(this).text());
            $('#zc_include_option_btn').data('value', $(this).data('value'));
        });
        if ($("#zc_include_option_btn").data('value') != 'free') {
            $('#zc_amenity_cost_enc').show();
        }
        $("#add_amenity").click(function() {
            SpaceListing.addAmenity($(this).data("amenity-type"));
        });
        $("#modify_amenity").click(function() {
            SpaceListing.editAmenity($(this).data("amenity-id"));
        });
    },

    toggleAmenity: function() {
        $(".zc_amenity_available").change(function() {
            var data = {
                id: $(this).attr('id'),
                room_id: Space.id,
                amenity_type: $(this).attr('amenity_type'),
                available: +$(this).is(':checked')
            };
            SpaceListing.ajaxRequest('api/v1/amenities', 'PUT', data)
            .then(console.log)
            .catch(console.log);
        });
    },

    addAmenity: function(amenity_type) {
        var errorMessage = '';
        if ($("#amenity_desc").val() === '') {
            errorMessage = "the amenity name is filled in";
        } else if ($("#zc_amenity_cost_enc").is(":visible") && $("#cost").val() === '') {
            errorMessage = "the amenity cost is filled in";
        }
        else if (isNaN($("#cost").val()))
        {
            errorMessage = "the amenity cost is a number";
        }
        if (errorMessage === '') {
            var data = {
                amenity_type: Number(amenity_type),
                room_id: Space.id,
                amenity_desc: $("#amenity_desc").val(),
                instructions: nl2br($("#instructions").val())
            };
            if ($("#zc_amenity_cost_enc").is(":visible")) {
                data.cost = $("#cost").val();
            }
            SpaceListing.ajaxRequest('api/v1/amenities', 'POST', data)
            .then(function() {
                closeMainModal();
                SpaceListing.getAmenities()
                .then(function() {
                    loadLang(['common']).then(function (lang) {
                        SpaceListing.populateAmenities(lang);
                        SpaceListing.toggleAmenity();
                    });
                })
                .catch(console.log);
            })
            .catch(console.log);
        } else {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    },

    editAmenity: function(amenity_id) {
        var errorMessage = '';
        if ($("#amenity_desc").val() === '') {
            errorMessage = "the amenity name is filled in";
        } else if ($("#zc_amenity_cost_enc").is(":visible") && $("#cost").val() === '') {
            errorMessage = "the amenity cost is filled in";
        }
        else if (isNaN($("#cost").val()))
        {
            errorMessage = "the amenity cost is a number";
        }
        if (errorMessage === '') {
            var data = {
                id: amenity_id,
                room_id: Space.id,
                amenity_desc: $("#amenity_desc").val(),
                instructions: nl2br($("#instructions").val())
            };
            if ($("#zc_amenity_cost_enc").is(":visible")) {
                data.cost = $("#cost").val();
            }
            SpaceListing.ajaxRequest('api/v1/amenities', 'PUT', data)
            .then(function() {
                closeMainModal();
                SpaceListing.getAmenities()
                .then(function() {
                    loadLang(['common']).then(function (lang) {
                        SpaceListing.populateAmenities(lang);
                        SpaceListing.toggleAmenity();
                    });
                })
                .catch(console.log);
            })
            .catch(console.log);
        } else {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    },

    step3FormSubmit: function() {
        $('#step3Form').submit(function(event) {
            event.preventDefault();
            if (SpaceListing.setSelectedOpeningHours()) {
                var data = {
                    id: Space.id,
                    minimum_minutes: $('select#minimum_minutes').val(),
                    openTimes: SpaceListing.selectedOpeningHours
                };
                if (SpaceListing.step3ValidationPassed())
                {
                    SpaceListing.ajaxRequest('api/v1/rooms', 'PUT', data)
                    .then(function() {
                        window.location.href = room_finish_link;
                    })
                    .catch(console.log);
                }
            }
        });
    },

    step3ValidationPassed: function() {
        var openingHoursPassed = SpaceListing.openingHoursPassed();
        var minimumDurationPassed = SpaceListing.minimumDurationPassed();
        return openingHoursPassed && minimumDurationPassed;
    },

    openingHoursPassed: function() {
        if (isDefined($("input[name='opening_type']:checked").val())) {
            if (isDefined(SpaceListing.selectedOpeningHours))
                return true;
        }
        bootstrapError("Please select the opening hours of your space.");
        return false;
    },

    minimumDurationPassed: function() {
        if (selectOptionSelected($("#zc_space_min_duration")))
            return true;
        throwSelectError($("#zc_space_min_duration"));
        bootstrapError("Please the minimum duration is chosen");
        return false;
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
                SpaceListing.steps.step1.progress = SpaceListing.updateProgressBar($(this), initialValue, SpaceListing.steps.step1);
                if (SpaceListing.steps.step1.progress == 100)
                    SpaceListing.steps.step1.complete = true;
                SpaceListing.showProgress(SpaceListing.steps.step1);
            }
            if ($(this).hasClass('step2-data')) {
                SpaceListing.steps.step2.progress = SpaceListing.updateProgressBar($(this), initialValue, SpaceListing.steps.step2);
                if (SpaceListing.steps.step2.progress == 100)
                    SpaceListing.steps.step2.complete = true;
                SpaceListing.showProgress(SpaceListing.steps.step2);
            }
        });
        $('input:radio[name="spacetype_id"]').bind('change', function() {
            // Amount to add to progress changes based on selection of Space usage
            SpaceListing.steps.step1.progress = SpaceListing.steps.step1.progress += 20;
            SpaceListing.showProgress(SpaceListing.steps.step1);
            $('input:radio[name="spacetype_id"]').unbind('change');
        });
        $('input:radio[name="usage_id"]').bind('change', function() {
            // Amount to add to progress changes based on selection of Space usage
            SpaceListing.steps.step1.progress = SpaceListing.steps.step1.progress += 20;
            SpaceListing.showProgress(SpaceListing.steps.step1);
            $('input:radio[name="usage_id"]').unbind('change');
        });
        $('input:radio[name="opening_type"]').bind('change', function() {
            SpaceListing.steps.step3.progress = SpaceListing.steps.step3.progress += 33.3;
            SpaceListing.showProgress(SpaceListing.steps.step3);
            $('input:radio[name="opening_type"]').unbind('change');
        });
    },

    updateProgressBar: function($input, initialValue, step) {
        var progress = step.progress;
        if ($input.prop('nodeName') == 'INPUT' || $input.prop('nodeName') == 'TEXTAREA') {
            if (_.isEmpty(initialValue) && !_.isEmpty($input.val())) {
                if (step.name == 'step1') {
                    progress += 12.5;
                }
                else if (step.name == 'step2')
                    progress += 50;
            } else if (!_.isEmpty(initialValue) && _.isEmpty($input.val())) {
                if (step.name == 'step1') {
                    progress -= 12.5;
                }
                else if (step.name == 'step2')
                    progress -= 50;
            }
        } else if ($input.prop('nodeName') == 'SELECT') {
            if (_.isNull(initialValue) && !_.isNull($input.val())) {
                if ($input.val() !== '-1') {
                    if (step.name == 'step1') {
                        progress += 12.5;
                    }
                }
            } else if (!_.isNull(initialValue) && _.isNull($input.val())) {
                if (step.name == 'step1') {
                    progress -= 12.5;
                }
            }
        }
        return progress;
    },

    showLoader: function() {
        $('.zc_space_photo_upload').hide();
        $('.loading-gif').show();
    },

    hideLoader: function() {
        $('.loading-gif').hide();
        $('.zc_space_photo_upload').show();
    }
};

$(document).ready(function() {
    SpaceListing.init();
});