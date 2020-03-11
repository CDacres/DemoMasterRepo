var map_class =
{
    map: "",
    mapLoaded: false,
    mapOptions: {
        zoom: 14,
        maxZoom:17,
        minZoom:12,
        clickableIcons: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
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
    },
    listenersLoaded: false,
    iconsLibrary: mapIcons,
    currentMarkers: {},
    $optionsBox: false,
    $redoSearchCheck: false,
    callbackObject: null,
    callback: null,
    fittedZoomMax: 15,

    initMapOnce: function (params)
    {
        if (this.mapLoaded === false)
        {
            this.$optionsBox = $(params.mapOptionsId);
            var scopeThis = this;
            if (isMobileVariable)
            {
                $('#select-map').on('pagebeforehide', function()
                {
                    scopeThis.turnMapListenersOff();
                });
            }
            if (window.google && window.google.maps)
            {
                this.$redoSearchCheck = $(params.mapRedoSearchCheckId);
                this.$optionsBox.show();
                this.callback = params.callback;
                this.callbackObject = params.callbackObject;
                this.map = new google.maps.Map($(params.mapBoxId).get(0), this.mapOptions);
                this.mapLoaded = true;
                this.iconsLibrary.init();
                return this;
            }
            else
            {
                this.$optionsBox.hide();
                return false;
            }
        }
    },

    drawMarkers: function (markerArray, resize, centre)
    {
        if (resize === true)
        {
            var scopeThis = this;
            this.parseMarkerArray(markerArray);
            this.resizeMapToMarkers(markerArray, centre);
        }
        else
        {
            this.parseMarkerArray(markerArray);
        }
    },

    parseMarkerArray: function(markerArray)
    {
        markerArray = markerArray || {};
        var defaultMarkerOptions = {
            map: this.map,
            icon: '//maps.gstatic.com/mapfiles/transparent.png'
        };
        var scopeThis = this;
        $.each(markerArray, function(markerIndex, markerData)
        {
            if (typeof scopeThis.currentMarkers[markerData.venue_id] === 'undefined')
            {
                var markerOptions = defaultMarkerOptions;
                markerOptions.position = new google.maps.LatLng(markerData.lat, markerData.long);
                markerOptions.title = markerData.title;
                var activeMarker = ZipcubeSearch.currentMarker && ZipcubeSearch.currentMarker.id == markerData.id ? '' : 'hidden-preview';
                var roomLink;
                if (!isMobileVariable)
                {
                    roomLink = '<a href="room/' + markerData.id + '" target="_blank">';
                }
                else
                {
                    roomLink = '<a href="room/' + markerData.id + '" data-ajax="true">';
                }
                markerOptions.labelContent = '' +
                    '<div class="tooltip top">' +
                    '<div id="preview' + markerData.id + '" class="hidden-pin ' + activeMarker + '">' +
                    '<div class="room-img" style="background-image: url(' + markerData.img + ')"></div>' +
                    '<div class="room-pin-text"><div class="room-pin-left-text"><b>' + markerData.title + '</b></div><div class="room-pin-right-text"><sup>' + markerData.currency_symbol_left + '</sup><b>' + markerData.price_rounded + '</b> ' + markerData.period + '</div></div>' +
                    roomLink +
                    '<div class="bookNow-btn btn btn-sm btn-primary">Book now</div></a>' + '</div>' +
                    '<div class="tooltip-arrow"></div>' +
                    '<div class="tooltip-inner">' + markerData.price_formatted + '</div></div>';
                markerOptions.labelAnchor = new google.maps.Point(0, 30);
                markerOptions.labelClass = "map-marker";
                markerOptions.labelInBackground = false;
                var newMarker = new MarkerWithLabel(markerOptions);
                google.maps.event.addListener(newMarker, "click", function()
                {
                    setTimeout(function()
                    {
                        scopeThis.captureMapMarkerClick(markerData);
                    }, 50);
                });
                if (isMobileVariable)
                {
                    google.maps.event.addListener(scopeThis.map, "click", function()
                    {
                        if ($('.hidden-pin:visible').length)
                        {
                            scopeThis.closeRoomPreview();
                        }
                    });
                }
                else
                {
                    $('#map').click(function()
                    {
                        if ($('.hidden-pin:visible').length)
                        {
                            scopeThis.closeRoomPreview();
                        }
                    });
                }
                scopeThis.currentMarkers[markerData.venue_id] = newMarker;
                scopeThis.openPreviewPin();
            }
        });
    },

    openPreviewPin:function (data) {
        var scopeThis = this;
        $('.hidden-pin').each(function () {
            if($(this).attr('id') != 'preview' + data.id)
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
                scopeThis.currentMarker = data;
            }
            scopeThis.centreMap(data);
        }
    },

    captureMapMarkerClick: function(room)
    {
        this.openPreviewPin(room);
        // mixpanel.track("Search - Map Marker", {
        //     "room_id": room.id
        // });
    },

    closeRoomPreview: function()
    {
        $('.hidden-pin').addClass('hidden-preview');
    },

    resizeMapToMarkers: function (markers, centre)
    {
        centre = centre?centre:false;
        var bounds = new google.maps.LatLngBounds();
        $.each(markers, function(markerIndex, markerData)
        {
            bounds.extend(new google.maps.LatLng(markerData.lat, markerData.long));
        });
        var fittedZoomMax = this.fittedZoomMax;
        var scopeThis = this;
        this.turnMapListenersOff();
        if (centre === false)
        {
            google.maps.event.addListenerOnce(this.map, 'idle', function()
            {
                this.setZoom(Math.min(fittedZoomMax, this.getZoom()));
                scopeThis.postMapChangeTidyUp();
            });
        }
        else
        {
            google.maps.event.addListenerOnce(this.map, 'idle', function()
            {
                var currentZoom = this.getZoom();
                if (currentZoom > fittedZoomMax)
                {
                    scopeThis.centreMap(centre);
                    this.setZoom(fittedZoomMax);
                }
                else
                {
                    scopeThis.centreMap(centre);
                    this.setZoom(currentZoom);
                }
            });
        }
        this.map.fitBounds(bounds);
    },

    centreMap: function (centre)
    {
        var newCentre = new google.maps.LatLng(centre.lat, centre.long);
        this.map.panTo(newCentre);
        this.postMapChangeTidyUp();
    },

    postMapChangeTidyUp: function ()
    {
        var scopeThis = this;
        this.turnMapListenersOn(scopeThis.callback, scopeThis.callbackObject);
        this.callback(scopeThis.callbackObject);
    },

    getBounds: function ()
    {
        return this.map.getBounds();
    },

    redoSearchAffirmation: function ()
    {
        return this.$redoSearchCheck.prop('checked');
    },

    clearAllMarkers: function ()
    {
        var scopeThis = this;
        $.each(this.currentMarkers, function(markerIndex, markerObject)
        {
            scopeThis.clearSingleMarker(markerObject);
        });
        this.currentMarkers = {};
    },

    clearSingleMarker: function (markerObject)
    {
        if (markerObject)
        {
            markerObject.setMap(null);
            markerObject = null;
        }
    },

    addMarkerHighlight: function (markerIndex)
    {
        this.currentMarkers[markerIndex].set('labelClass','map-marker map-marker-hover');
    },

    removeMarkerHighlight: function (markerIndex)
    {
        this.currentMarkers[markerIndex].set('labelClass','map-marker');
    },

    turnMapListenersOn: function (callbackFunction, callbackObject)
    {
        if (this.mapLoaded && !this.listenersLoaded && location.href.indexOf('room') == -1)
        {
            google.maps.event.addListener(this.map, "dragend", function ()
            {
                callbackFunction(callbackObject);
            });
            google.maps.event.addListener(this.map, "zoom_changed", function ()
            {
                callbackFunction(callbackObject);
            });
            this.listenersLoaded = true;
        }
    },

    turnMapListenersOff: function ()
    {
        if (this.mapLoaded && this.listenersLoaded)
        {
            this.listenersLoaded = false;
            google.maps.event.clearListeners(this.map, "click");
            google.maps.event.clearListeners(this.map, "dragend");
            google.maps.event.clearListeners(this.map, "zoom_changed");
        }
    }
};