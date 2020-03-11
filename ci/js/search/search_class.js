var ZipcubeSearch =
{
    me: 'search',       //this is for debugging to find out who 'this' is...
    maptron: map_class,
    filtertron: SearchFilters,
    sensitivity: null,  //how many degrees need change before reload
    mapHasMoved: false,
    bounds: null,       //googlemaps bounds object when initiated
    centre: {},
    currentMarker:null,
    oneOffFilters: {},
    results: null,
    mapActive: false,
    searchPageHasMetaData: false,
    resultsBoxId: null,
    scrollArea: null,
    whatChanged: null,
    auditToken: null,
    widgetMode: false,
    markers: {},
    loadMoreResults: true,

    init: function (params) {
        this.parseParams(params);
        this.attachPaginationListeners();
        // this.updateUrlWithClickedResult();
        // this.loadAssetFromUrlHash();
        this.attachAdvert();
    },

    parseParams: function (params) {
        this.sensitivity = params.sensitivity;
        this.searchPageHasMetaData = params.searchPageHasMetaData;
        this.resultsBoxId = params.resultsBoxId;
        this.scrollArea = params.scrollArea;
        this.auditToken = params.auditToken;
        this.widgetMode = params.widgetMode;
        this.centre = params.centre;
    },

    filterCallback: function (callbackObject, refit, whatChanged, event, value) {
        event = event ? event : null;
        value = value ? value : null;
        if (event !== null) {
            whatChanged = whatChanged + "_" + event;
            callbackObject.addOneOffFilter(whatChanged, value);
        }
        callbackObject.updateWhatChanged(whatChanged);
        callbackObject.respondToFilterChange(refit);
    },

    initMapOnceOrSetActive: function (params) {
        this.mapActive = true;
        this.maptron.initMapOnce(params);
        this.updateMap(true);
        this.connectResultsToMarkers();
    },

    setMapActivity: function (boolActive) {
        this.mapActive = boolActive;
        if (boolActive === false) {
            this.bounds = null;
        }
    },

    mapCallback: function (callbackObject) {
        callbackObject.updateWhatChanged(['boundsCentreLong', 'boundsCentreLat']);
        if (!$('.hidden-pin').is(':visible'))
        {
            callbackObject.respondToMapChange();
        }
    },

    updateWhatChanged: function (whatChanged) {
        this.whatChanged = whatChanged;
    },

    refreshOnMapMove: function () //establish whether we're in a position to do something
    {
        var boolReturn = true;
        if (this.mapActive) {
            boolReturn = this.maptron.redoSearchAffirmation();
        }
        return boolReturn;
    },

    respondToFilterChange: function (refit) {
        this.requestNewSearch(refit);
    },

    respondToMapChange: function () {
        var newBounds = this.maptron.getBounds();
        if (this.bounds === null) {
            this.setNewBounds(newBounds);
        }
        else if (this.checkMovement(newBounds)) {
            this.acknowledgeMovement(newBounds);
            if (this.refreshOnMapMove()) {
                this.requestNewSearch();
            }
            ga('send', 'event', 'Search Filter', 'Interaction', 'map');
        }
    },

    requestNewSearch: function (refit) {
        refit = refit || false;
        if (refit) {
            this.bounds = null;
        }
        this.performNewSearch(refit);
    },

    checkMovement: function (newBounds) {
        //compare this.map bounds with 'this.sensitivity' to make sure it's worth a new search
        return !this.bounds.equals(newBounds);
    },

    acknowledgeMovement: function (newBounds) {
        this.setNewBounds(newBounds);
        this.mapHasMoved = true;
        this.updateBoundsURL();
    },

    updateBoundsURL: function () {
        this.updateUrl('swlat', this.bounds.getSouthWest().lat());
        this.updateUrl('swlong', this.bounds.getSouthWest().lng());
        this.updateUrl('nelat', this.bounds.getNorthEast().lat());
        this.updateUrl('nelong', this.bounds.getNorthEast().lng());
    },

    updateUrl: function (label, value) {
        // TBC
    },

    setNewBounds: function (newBounds) {
        this.bounds = newBounds;
    },

    performNewSearch: function (refit) {
        var scopeThis = this;
        this.activeAjaxRequest = $.ajax(
        {
            url: base_url + country_lang_url + '/search/api_json',
            data: this.getSearchParams(),
            dataType: 'json',
            success: function (response)
            {
                if (response.error.occurred === true)
                {
                    customAlert(response.error);
                }
                else
                {
                    scopeThis.jsonResultsCallback(scopeThis, response.data, refit);
                }
            },
            error: function (xhr, status)
            {
                console.log('ERROR LOADING SEARCH RESULTS', xhr, status);
            }
        });
    },

    jsonResultsCallback: function (scopeThis, data, refit)
    {
        scopeThis.updatePage(data, refit);
    },

    getSearchParams: function () {
        var filtersObject = {};
        $.extend(filtersObject, this.getOneOffFilters());
        $.extend(filtersObject, this.getBoundsAsJson());
        $.extend(filtersObject, this.filtertron.getFiltersAsJson());
        return {
            search_filters: filtersObject,
            _at: this.auditToken,
            whatChanged: this.whatChanged,
            widget: this.widgetMode
        };
    },

    getBoundsAsJson: function () {
        var retObject = {};
        if (this.mapActive && this.bounds !== null && this.mapHasMoved) {
            retObject.swLat = this.bounds.getSouthWest().lat();
            retObject.swLong = this.bounds.getSouthWest().lng();
            retObject.neLat = this.bounds.getNorthEast().lat();
            retObject.neLong = this.bounds.getNorthEast().lng();
            retObject.boundsCentreLong = (retObject.swLong + retObject.neLong) / 2;
            retObject.boundsCentreLat = (retObject.swLat + retObject.neLat) / 2;
        }
        return retObject;
    },

    addOneOffFilter: function (filterName, filterValue) {
        this.oneOffFilters[filterName] = filterValue;
    },

    getOneOffFilters: function () {
        var retObject = {};
        $.extend(retObject, this.oneOffFilters);
        this.oneOffFilters = {};
        return retObject;
    },

    updatePage: function (data, refit) {
        this.updateResults(data);
        this.setCentre(data.centre);
        this.handleMarkers(data.mapMarkers.objects, refit);
        this.updateMetaData(data.meta);
        this.connectResultsToMarkers();
        // this.updateUrlWithClickedResult();
        getClickedSearchResult();
        setRatingStars();
        this.attachAdvert();
        $('[data-toggle="tooltip"]').tooltip({
            position: {
                my: "left+5 center",
                at: "right center"
            },
            tooltipClass: "live-booking-tooltip",
            content: function()
            {
                return $(this).prop('title');
            }
        });
    },

    connectResultsToMarkers: function () {
        var scopeThis = this;
        $('.listing').each(function () {
            $(this).hover(
                function () {
                    scopeThis.maptron.addMarkerHighlight($(this).attr('zc_data_venue_id'));
                },
                function () {
                    scopeThis.maptron.removeMarkerHighlight($(this).attr('zc_data_venue_id'));
                });
        });
    },

    // updateUrlWithClickedResult: function () {
    //     var scopeThis = this;
    //     $('.listing').map(function () {
    //         $(this).each(function () {
    //             $(this).click(function () {
    //                 if (!isMobileVariable) {
    //                     scopeThis.updateHashAndFireModal(this);
    //                 }
    //             });
    //         });
    //     });
    // },

    // updateHashAndFireModal: function (data) {
    //     if (!isMobileVariable) location.hash = data.id;
    //     this.loadAssetFromUrlHash(data);
    // },

    // loadAssetFromUrlHash: function (data) {
    //     var scopeThis = this;
    //     var hash = location.hash;
    //     if (hash) {
    //         if(!isMobileVariable){
    //             clearFullModal();
    //             $("#full_modal").on("shown.bs.modal", function () {
    //                 $("#full_modal").on("hidden.bs.modal", function () {
    //                     $("#full_modal").off("shown.bs.modal");
    //                 });
    //             });
    //             $('#full_modal_content').load(base_url + country_lang_url + '/rooms/search_modal/' + hash.substring(1) + scopeThis.passThroughVariables(), function () {
    //                 setRatingStars();
    //                 $('#mobile-modal-title').text('Details');
    //                 $('#full_modal').modal('show');
    //
    //             });
    //         }
    //
    //     }
    // },

    openRoomPreview:function (data) {
        $('.hidden-pin').each(function ()
        {
            if ($(this).attr('id') != 'preview'+data.id)
            {
                $(this).addClass('hidden-preview');
            }
        });
        if (data && data.id && location.href.indexOf('room') == -1)
        {
            var thisElem = $('#preview' + data.id);

            if (thisElem.hasClass('hidden-preview'))
            {
                thisElem.removeClass('hidden-preview');
                this.currentMarker = data;
            }
            this.maptron.centreMap(data);
        }
    },

    passThroughVariables: function () {
        var retString = '';
        if (this.widgetMode) {
            retString = "?widget=1";
        }
        return retString;
    },

    listenForMapClick: function () {
        var scopeThis = this;
        $('#google_map').click(function () {
            var hash = location.hash;
            var backLocation = '/rooms/search_modal/' + hash.substring(1);
            setRatingStars();
        });
    },

    checkIfModalOpen: function () {
        var returnValue = $('#full_modal').is(':visible');
        return returnValue;
    },

    clearModalDataOnClose: function () {
        this.removeHashFromUrl();
    },

    removeHashFromUrl: function () {
        history.pushState("", document.title, window.location.pathname + window.location.search);
    },

    updateResults: function (data) {
        if (!isMobileVariable)
        {
            $(this.resultsBoxId).html(data.rooms);
        }
        else
        {
            if (data.meta.current_page == 1)
            {
                $(this.resultsBoxId).html(data.rooms);
                if (data.rooms.indexOf("Sorry") != -1)
                {
                    $(this.resultsBoxId).html(data.rooms);
                    this.loadMoreResults = false;
                    $('#pagination').css({"display": 'none'});
                }
            }
            else
            {
                if (data.rooms.indexOf("Sorry") != -1)
                {
                    this.loadMoreResults = false;
                    $('#pagination').css({"display": 'none'});
                }
                else
                {
                    $(this.resultsBoxId).append(data.rooms);
                }
            }

        }

        $(this.scrollArea).scrollTop(0);
    },

    updateMetaData: function (metaData) {
        document.title = metaData.space_title + ' in ' + metaData.location + ' - Zipcube';
        if (this.searchPageHasMetaData) {
            this.updateMetaTitles(metaData.space_title);
            this.updateMetaLocations(metaData.location);
            this.updateMetaGuestDesc(metaData.guests);
            this.updateMetaRowCounts(metaData.total_results);
            if (metaData.total_results > 0) {
                this.updateMetaResultsRange(metaData.pagination_range);
            }
            else {
                this.updateMetaResultsRange(0);
            }
            this.updateMetaPagination(metaData.pagination_html);
        }
    },

    updateMetaGuestDesc: function (guestDesc) {
        var fullGuestDesc = '';
        if (guestDesc !== false) {
            fullGuestDesc += " for ";
            if (guestDesc == 1) {
                fullGuestDesc += "1 Person";
            }
            else {
                fullGuestDesc += guestDesc + " People";
            }
        }

        $('.meta-guest-desc').each(function () {
            $(this).html(fullGuestDesc);
        });
    },

    updateMetaPagination: function (htmlString) {
        $('.pagination').each(function () {
            $(this).html(htmlString);
        });
        (!isMobileVariable) && this.attachPaginationListeners();
    },

    attachPaginationListeners: function () {
        var scopeThis = this;
        $('.zc_pagination').each(function () {
            $(this).click(function (e) {
                if (isMobileVariable) {
                    if (scopeThis.loadMoreResults) {
                        $(this).attr('zc_page_number', parseInt($(this).attr('zc_page_number')) + 1);
                        searchtron.filtertron.addParamsToUrl('currentPage', $(this).attr('zc_page_number'));
                        searchtron.filtertron.updateFilterValues('currentPage', $(this).attr('zc_page_number'));
                        ga('send', 'event', 'Search Filter', 'Interaction', 'page', $(this).attr('zc_page_number'));
                        scopeThis.requestNewSearch();
                        return;
                    }

                } else {
                    scopeThis.addOneOffFilter('currentPage', $(this).attr('zc_page_number'));
                    ga('send', 'event', 'Search Filter', 'Interaction', 'page', $(this).attr('zc_page_number'));
                    scopeThis.requestNewSearch();
                    e.preventDefault();
                }

            });
        });
    },

    pageArrayToHTML: function (pageArray) {
        var returnHTML = '';
        $.each(pageArray, function (pageIndex, pageData) {
            returnHTML += "<span";
            if (pageData.active) {
                returnHTML += " class='zc_pagination page_link' zc_page_number='" + pageData.page + "'";
            }
            returnHTML += ">" + pageData.page + "</span>";
        });
        return returnHTML;
    },

    updateMetaResultsRange: function (newRange) {
        $('.meta-results-range').each(function () {
            $(this).html(newRange);
        });
    },

    updateMetaRowCounts: function (newCount) {
        $('.meta-row-count').each(function () {
            $(this).html(newCount);
        });
    },

    updateMetaTitles: function (newTitle) {
        $('.meta-space-title').each(function () {
            $(this).html(newTitle);
        });
    },

    updateMetaLocations: function (newLocation) {
        $('.meta-location').each(function () {
            $(this).html(newLocation);
        });
    },

    setCentre: function (centre) {
        this.centre = centre;
    },

    handleMarkers: function (markers, refit) {
        this.setMarkers(markers);
        this.updateMap(refit);
    },

    setMarkers: function (markers) {
        this.markers = markers;
    },

    updateMap: function (refit) {
        if (this.maptron.mapLoaded) {
            this.maptron.clearAllMarkers();
            if (this.markers.length > 0) {
                var existPin = false;
                this.markers.forEach(function (item) {
                    if (ZipcubeSearch.currentMarker && ZipcubeSearch.currentMarker.id && item.id == ZipcubeSearch.currentMarker.id) {
                        existPin=true;
                    }
                });
                if (!existPin && ZipcubeSearch.currentMarker) this.markers.push(ZipcubeSearch.currentMarker);
                this.drawMarkers(refit);
            }
            else if (refit) {
                this.centreMap();
            }
        }
    },

    centreMap: function () {
        this.maptron.centreMap(this.centre);
        this.mapHasMoved = false;
        this.bounds = null;
    },

    drawMarkers: function (refit) {
        if (this.mapHasMoved === false) {
            this.bounds = null;
            refit = true;
        }
        var centre;
        if (this.widgetMode) {
            centre = false;
        }
        else {
            centre = this.centre;
        }
        this.maptron.drawMarkers(this.markers, refit, centre);
    },

    attachAdvert: function()
    {
        attachAdvert();
    }
};