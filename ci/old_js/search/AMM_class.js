var AMM = {

    map: "",
    
    mapLoaded: false,

    defaultMapOptions: {},

//    isFirstMapInteraction: true,
//
//    redoSearchPromptTimeout: false,
//
//    overlay: false,
//
//    new_bounds: false,
//
//    currentBounds: false,
//
//    currentHighestZIndex: 0,
//
//    activeInfoWindow: null,
//
//    activeInfoWindowMarker: false,
//
//    queue: [],
//
//    activeHostingIds: [],
//
//    markers: {},
//    centerLat: false,
//
//    centerLng: false,
//
//    centerMarker: false,
//
//    geocodePrecision: false,

    initMapOnce: function (a) {

        if (AMM.mapLoaded === false) {

            if (window.google && window.google.maps) {

                $("#map_options").show();

                AMM.defaultMapOptions = {

                    zoom: 12,

                    maxZoom:17,

                    minZoom:12,

                    /*styles: [ { 

                        stylers: [ {    Hue:   "#0066ff",

                                        Saturation: 9,

                                        Lightness:  21,

                                        Gamma:  0.48,

                                    } ] } ],*/

                   center: new google.maps.LatLng(51.5072, -0.1275),

                    mapTypeId: google.maps.MapTypeId.ROADMAP,

                    disableDefaultUI: true,

                    navigationControl: true,

                    navigationControlOptions: {

                        position: google.maps.ControlPosition.LEFT

                    },

                    scaleControl: true,

                    scrollwheel: false,

                    zoomControl: true,

                    zoomControlOptions: {

                        style: google.maps.ZoomControlStyle.SMALL,

                        position: google.maps.ControlPosition.LEFT_TOP

                      }

                };
                

                AMM.map = new google.maps.Map(document.getElementById(a), AMM.defaultMapOptions);
                
                AMM.overlay = new google.maps.OverlayView();

                AMM.overlay.draw = function () {};

                AMM.overlay.setMap(AMM.map);

                MapIcons.init();

                AMM.mapLoaded = true

            } else
            {

                $("#map_options").hide();
            }

        }

    },

    add: function (a, b) {

        if (!AMM.markers[b.id]) {

            AMM.markers[b.id] = {

                location: a,

                details: b,

                active: false

            }

        }

        AMM.queue.push(b.id)

    },

    drawCenterMarker: function () {

        AMM.clearCenterMarker();
	updatecenter();

        if (AMM.mapLoaded && AMM.centerLat && AMM.centerLng) {

            var b = 1;

            if (AMM.geocodePrecision) {

                if (AMM.geocodePrecision == "address") {

                    b = 100

                }

            }

            var d = new google.maps.LatLng(AMM.centerLat, AMM.centerLng);

            var a = new google.maps.Marker({

                position: d,

                map: AMM.map,

                icon: MapIcons.centerPoint,

                shadow: MapIcons.shadowCenterPoint,

                title: Translations.you_are_here,

                zIndex: b

            });

            AMM.centerMarker = a;

            var c = AMM.currentBounds;

            if (c === false) {

                c = new google.maps.LatLngBounds()

            }

            c.extend(d)

        }

    },

    clearCenterMarker: function () {

        if (AMM.centerMarker !== false) {

            AMM.centerMarker.setMap(null);

            AMM.centerMarker = false

        }

    },

    clearOverlays: function (a) {

        if (AMM.markers) {

            jQuery.each(AMM.markers, function (b, c) {

                if (jQuery.inArray(parseInt(b, 10), AMM.queue) === -1 || a === true) {

                    AMM.removeOverlay(b)

                }

            })

        }

    },

    openInfoWindow: function (b, a, d) {

        var c = AMM.activeInfoWindow;

        AMM.activeInfoWindowMarker = a;

        if (c) {

            c.setContent(b);

            c.open(AMM.map, a)

        } else {

            c = AMM.activeInfoWindow = new google.maps.InfoWindow({

                content: b,

                maxWidth: 241

            });

            google.maps.event.addListenerOnce(c, "closeclick", function () {

                c = AMM.activeInfoWindow = AMM.activeInfoWindowMarker = null

            });

            c.open(AMM.map, a)

        }

        if (SS.initialized === true) {

            SS.reset();

            google.maps.event.addListenerOnce(c, "domready", function () {

                if (typeof SS.pictureArrays[d] !== "undefined") {

                    jQuery(".map_info_window").find("img").attr("src", SS.fullImageUrl(SS.pictureArrays[d][0]))

                }

                SS.show(".map_info_window", d)

            })

        }

    },

    closeInfoWindow: function () {

        if (AMM.activeInfoWindow) {

            google.maps.event.clearInstanceListeners(AMM.activeInfoWindow);

            AMM.activeInfoWindow.close();

            AMM.activeInfoWindow = AMM.activeInfoWindowMarker = null;

            if (SS.initialized === true) {

                SS.hide()

            }

            return true

        } else {

            return false

        }

    },

    removeOverlay: function (b) {

        var a = AMM.markers[b];

        if (a.active === true) {

            if (a.infoWindow) {

                google.maps.event.clearInstanceListeners(a.infoWindow);

                a.infoWindow = null

            }

            google.maps.event.clearInstanceListeners(a.marker);

            a.marker.setMap(null);

            a.marker = null;

            a.active = false

        }

    },

    showOverlays: function () {

        var a = 20;

        var b = AMM.queue.length;

        jQuery.each(AMM.queue, function (e, h) {

            var c, l, f, k;

            var j = AMM.markers[h];

            if (j && !j.active) {

                c = j.details;

                k = jQuery.inArray(h.toString(), ZipcubeSearch.viewedIds) !== -1;

                if (e < a) {

                    if (k) {

                        l = MapIcons.numberedVisited[e + 1]

                    } else {

                        l = MapIcons.numbered[e + 1]

                    }

                    j.numbered_pin = e;

                    f = new google.maps.Marker({

                        position: j.location,

                        map: AMM.map,

                        icon: l,

                        shadow: MapIcons.shadowStandard,

                        title: [(e + 1), ". ", c.name].join(""),

                        zIndex: (b - e)

                    })

                } else {

                    if (k) {

                        l = MapIcons.smallVisited

                    } else {

                        l = MapIcons.small

                    }

                    j.numbered_pin = false;

                    f = new google.maps.Marker({

                        position: j.location,

                        map: AMM.map,

                        icon: l,

                        shadow: MapIcons.shadowSmall,

                        title: c.name,

                        zIndex: (b - e)

                    })

                }

                if (ZipcubeSearch.currentViewType === "map") {

                    var g = (c.review_count === 1 ? Translations.review : Translations.reviews);

                    var d = ['<div class="map_info_window">', '<a class="map_info_window_link_image" href="'+base_url+'rooms/', h, '" />', '<img width="210" height="140" class="map_info_window_thumbnail" src="', c.smallThumbnail, '" />', "</a>", '<p class="map_info_window_details">', '<a class="map_info_window_link" href="'+base_url+'rooms/', h, '" />', c.name, "</a>", '<span class="map_info_window_review_count">', c.review_count, " ", g, "</span>", '<span class="map_info_window_price">', ZipcubeSearch.currencySymbolLeft, c.price, ZipcubeSearch.currencySymbolRight, "</span>", "</p>", "</div>"].join("");

                    google.maps.event.addListener(f, "click", function (i) {

                        AMM.openInfoWindow(d, f, h)

                    })

                } else {

                    google.maps.event.addListener(f, "mouseover", function () {

                        ZipcubeSearch.hoverListResult(h)

                    });

                    google.maps.event.addListener(f, "mouseout", function () {

                        ZipcubeSearch.unHoverListResult(h)

                    });

                    google.maps.event.addListener(f, "click", function () {

                        ZipcubeSearch.viewedIds.push(h.toString());

                        var i = MapIcons.numberedVisitedHover[j.numbered_pin + 1];

                        j.marker.setIcon(i);

                        window.location = [base_url+"rooms/", h].join("")

                    })

                }

                j.marker = f;

                j.active = true

            }

        });

        AMM.clearQueue()

    },

    clearQueue: function () {

        AMM.queue = []

    },

    turnMapListenersOn: function () {

        AMM.listenForMapChanges()

    },

    turnMapListenersOff: function () {

        if (AMM.mapLoaded) {

            google.maps.event.clearListeners(AMM.map, "idle")

        }

    },

    listenForMapChanges: function () {

        if (AMM.mapLoaded) {

            google.maps.event.addListener(AMM.map, "idle", function () {

                AMM.mapListenerCallback()

            })

        }

    },

    fitBounds: function (a) {

        if (AMM.mapLoaded) {

            AMM.map.fitBounds(a)

        }

    },

    mapListenerCallback: function () {

        if (AMM.isFirstMapInteraction === true) {

            AMM.isFirstMapInteraction = false;

            var a = jQuery("#first_time_map_question");

            if (!redoSearchInMapIsChecked()) {

                AMM.redoSearchPromptTimeout = setTimeout(function () {

                    a.fadeOut(2000)

                }, 14000);

                a.show();

                return false

            }

        }

        if (AMM.activeInfoWindow && AMM.activeInfoWindowMarker) {

            var i = AMM.overlay.getProjection().fromLatLngToContainerPixel(AMM.activeInfoWindowMarker.getPosition());

            var j = i.x;

            var g = i.y;

            var c = 82;

            var l = jQuery(map_box_id);

            var e = l.width();

            var d = l.height();

            var k = 260;

            var h = 250;

            var b = k / 2;

            var f = h / 2;

            if (redoSearchInMapIsChecked()) {

                if ((j < f) || (g < b) || (j > (e - (f) + (c / 2))) || (g > (d + (b * 1.33)))) {

                   AMM.closeInfoWindow()

                }

            } else {

                if (j < 0 || g < 0 || (j > (e + c)) || g > (d + k)) {

                    AMM.closeInfoWindow()

                }

            }

        }

        if (!AMM.activeInfoWindow) {

            ZipcubeSearch.results_changed_by_map_action = true;
			var mapcenter1	=	AMM.map.getCenter();
			
			//console.log(mapcenter1);
			
			$("#city1Lng").val(mapcenter1.lng());
			$("#city1Lat").val(mapcenter1.lat());
	        

            ZipcubeSearch.loadNewResults()

        }

    }

};
