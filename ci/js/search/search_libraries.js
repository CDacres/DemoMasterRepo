var mapIcons = {

    centrePoint: false,

    numbered: [],

    numberedHover: [],

    numberedStarred: [],

    numberedStarredHover: [],

    numberedVisited: [],

    numberedVisitedHover: [],

    numberedVisitedStarred: [],

    numberedVisitedStarredHover: [],

    small: false,

    smallHover: false,

    smallStarred: false,

    smallStarredHover: false,

    smallVisited: false,

    smallVisitedHover: false,

    smallVisitedStarred: false,

    smallVisitedStarredHover: false,

    shadowStandard: false,

    shadowSmall: false,

    shadowCentrePoint: false,

    init: function () {

        this.centrePoint = new google.maps.MarkerImage(base_url+"images/map_icons/icon_center_point.png", 

		new google.maps.Size(15, 36), new google.maps.Point(0, 0));

        this.small = new google.maps.MarkerImage(base_url+"images/map_icons/small_pins.png", 

		new google.maps.Size(9, 9), new google.maps.Point(0, 0));

        this.smallHover = new google.maps.MarkerImage(base_url+"images/map_icons/small_pins.png", 

		new google.maps.Size(9, 9), new google.maps.Point(9, 0));

        this.smallStarred = new google.maps.MarkerImage(base_url+"images/map_icons/small_pins.png",

		 new google.maps.Size(9, 9), new google.maps.Point(0, 9));

        this.smallStarredHover = new google.maps.MarkerImage(base_url+"images/map_icons/small_pins.png",

		 new google.maps.Size(9, 9), new google.maps.Point(9, 9));

        this.smallVisited = new google.maps.MarkerImage(base_url+"images/map_icons/small_pins.png", 

		new google.maps.Size(9, 9), new google.maps.Point(18, 0));

        this.smallVisitedHover = new google.maps.MarkerImage(base_url+"images/map_icons/small_pins.png",

		 new google.maps.Size(9, 9), new google.maps.Point(27, 0));

        this.smallVisitedStarred = new google.maps.MarkerImage(base_url+"images/map_icons/small_pins.png",

		 new google.maps.Size(9, 9), new google.maps.Point(18, 9));

        this.smallVisitedStarredHover = new google.maps.MarkerImage(base_url+"images/map_icons/small_pins.png", 

		new google.maps.Size(9, 9), new google.maps.Point(27, 9));
                
        this.zipcubeNatural = new google.maps.MarkerImage(base_url+"images/map_icons/zipcubeNatural.png",
        new google.maps.Size(21,33), new google.maps.Point(0,0));
        this.zipcubeHover = new google.maps.MarkerImage(base_url+"images/map_icons/zipcubeHover.png",
        new google.maps.Size(21,33), new google.maps.Point(0,0));

		

        for (var a = 0; a < 20; a++) {

            this.numbered[a + 1] = new google.maps.MarkerImage(base_url+"images/map_icons/map_pins_sprite_001.png", 

			new google.maps.Size(22, 34), new google.maps.Point(0, (a * 34)));

            this.numberedHover[a + 1] = new google.maps.MarkerImage(base_url+"images/map_icons/map_pins_sprite_001.png", 

			new google.maps.Size(22, 34), new google.maps.Point(44, (a * 34)));

            this.numberedStarred[a + 1] = new google.maps.MarkerImage(base_url+"images/map_icons/map_pins_sprite_001.png", 

			new google.maps.Size(22, 34), new google.maps.Point(22, (a * 34)));

            this.numberedStarredHover[a + 1] = new google.maps.MarkerImage(base_url+"images/map_icons/map_pins_sprite_001.png",

			 new google.maps.Size(22, 34), new google.maps.Point(66, (a * 34)));

            this.numberedVisited[a + 1] = new google.maps.MarkerImage(base_url+"images/map_icons/map_pins_sprite_001.png",

			 new google.maps.Size(22, 34), new google.maps.Point(88, (a * 34)));

            this.numberedVisitedHover[a + 1] = new google.maps.MarkerImage(base_url+"images/map_icons/map_pins_sprite_001.png", 

			new google.maps.Size(22, 34), new google.maps.Point(132, (a * 34)));

            this.numberedVisitedStarred[a + 1] = new google.maps.MarkerImage(base_url+"images/map_icons/map_pins_sprite_001.png",

			 new google.maps.Size(22, 34), new google.maps.Point(110, (a * 34)));

            this.numberedVisitedStarredHover[a + 1] = new google.maps.MarkerImage(base_url+"images/map_icons/map_pins_sprite_001.png",

			 new google.maps.Size(22, 34), new google.maps.Point(154, (a * 34)))

        }

        this.shadowCentrePoint = new google.maps.MarkerImage(base_url+"images/map_icons/icon_center_point_shadow.png", 

		new google.maps.Size(35, 27), new google.maps.Point(0, 0), new google.maps.Point(4, 27));

        this.shadowSmall = new google.maps.MarkerImage(base_url+"images/map_icons/icon_small_dot_shadow.png",

		 new google.maps.Size(11, 11), new google.maps.Point(0, 0), new google.maps.Point(5, 9));

        this.shadowStandard = new google.maps.MarkerImage(base_url+"images/map_icons/default_shadow.png",

		 new google.maps.Size(33, 26), new google.maps.Point(0, 0), new google.maps.Point(5, 23));
                 
        return this;            
    }

};