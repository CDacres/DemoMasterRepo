<?php

use Illuminate\Database\Seeder;

use App\Models\Landing\Location;
use App\Models\Landing\LocationAsset;
use App\Models\Landing\LocationRoom;
use App\Models\Landing\LocationCountryPlace;
use App\Models\Landing\BLP_Browse;
use App\Models\Landing\BLP_BrowseInfo;
use App\Models\Landing\BLP_BrowseMetaOverride;
use App\Models\Landing\BLP_BrowseUrl;
use App\Models\Landing\BLP_BrowseCard;
use App\Models\Landing\BLP_Landing;
use App\Models\Landing\BLP_LandingAttribute;
use App\Models\Landing\BLP_LandingInfo;
use App\Models\Landing\BLP_LandingLinked;
use App\Models\Landing\BLP_LandingMetaOverride;
use App\Models\Landing\BLP_LandingUrl;

class LocationTableSeeder extends Seeder
{
    private $_data = [
        [
            //uk
            'id' => 1,
            'parent_id' => 0,
            'url_desc' => 'united-kingdom',
            'search_url' => 'UK',
            'human_desc' => 'United Kingdom',
            'locationcategorie_id' => Location::COUNTRY,
            'lat' => 51.5072996,
            'long' => -0.1280232,
            'country' => 'gb',
            'constituancy_unit' => 'high-streets-peterport',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 51.3300744,
            'bounds_sw_lon' => -0.2983299,
            'bounds_ne_lat' => 51.6842762,
            'bounds_ne_lon' => 0.0436126,
            'bounds_distance' => 300.00,
            'search_radius' => 300.0,
            'place_id' => 'ChIJm2ofyZdWfUgRcoWvZmw4vwE',
            'approved_venue_count' => 2191,
            'unapproved_venue_count' => 2291,
            'requires_determiner' => 1,
            'rooms' => [
                [
                    'id' => 1,
                    'tag_id' => 152,
                    'approved_room_count' => 2163,
                    'unapproved_room_count' => 2657
                ],
                [
                    'id' => 2,
                    'tag_id' => 5,
                    'approved_room_count' => 334,
                    'unapproved_room_count' => 5102
                ],
                [
                    'id' => 3,
                    'tag_id' => 84,
                    'approved_room_count' => 654,
                    'unapproved_room_count' => 151
                ]
            ],
            'browse' => [
                [
                    'id' => 1,
                    'tag_label_id' => 660,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 1,
                            'url' => '/meeting-rooms',
                            'preferred' => 1
                        ],
                        [
                            'id' => 2,
                            'url' => '/meeting',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 1,
                            'lp_id' => 1,
                            'ordering' => 1
                        ],
                        [
                            'id' => 2,
                            'lp_id' => 6,
                            'ordering' => 2
                        ]
                    ]
                ],
                [
                    'id' => 2,
                    'tag_label_id' => 21,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 3,
                            'url' => '/wedding-venues',
                            'preferred' => 1
                        ],
                        [
                            'id' => 4,
                            'url' => '/wedding',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 3,
                            'lp_id' => 3,
                            'ordering' => 1
                        ],
                        [
                            'id' => 4,
                            'lp_id' => 8,
                            'ordering' => 2
                        ]
                    ]
                ],
                [
                    'id' => 3,
                    'tag_label_id' => 1385,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 5,
                            'url' => '/conference-venues',
                            'preferred' => 1
                        ],
                        [
                            'id' => 6,
                            'url' => '/conference',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 5,
                            'lp_id' => 4,
                            'ordering' => 1
                        ],
                        [
                            'id' => 6,
                            'lp_id' => 9,
                            'ordering' => 2
                        ]
                    ]
                ]
            ]
        ],
        [
            //london
            'id' => 2,
            'parent_id' => 1,
            'url_desc' => 'london',
            'search_url' => 'London--UK',
            'human_desc' => 'London',
            'locationcategorie_id' => Location::CITY,
            'lat' => 51.5072996,
            'long' => -0.1280232,
            'country' => 'gb',
            'locality' => 'london',
            'constituancy_unit' => 'a4',
            'location_type' => 'RANGE_INTERPOLATED',
            'bounds_sw_lat' => 51.3300744,
            'bounds_sw_lon' => -0.2983299,
            'bounds_ne_lat' => 51.6842762,
            'bounds_ne_lon' => 0.0436126,
            'bounds_distance' => 23.00,
            'search_radius' => 10.0,
            'place_id' => 'ChIJdd4hrwug2EcRmSrV3Vo6llI',
            'approved_venue_count' => 2191,
            'unapproved_venue_count' => 2291,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 4,
                    'tag_id' => 152,
                    'approved_room_count' => 2163,
                    'unapproved_room_count' => 2657
                ],
                [
                    'id' => 5,
                    'tag_id' => 5,
                    'approved_room_count' => 334,
                    'unapproved_room_count' => 5102
                ],
                [
                    'id' => 6,
                    'tag_id' => 84,
                    'approved_room_count' => 654,
                    'unapproved_room_count' => 151
                ]
            ],
            'landing' => [
                [
                    'id' => 1,
                    'tag_label_id' => 660,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 1,
                            'url' => '/meeting-rooms/london',
                            'preferred' => 1
                        ],
                        [
                            'id' => 2,
                            'url' => '/meeting/london',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 1,
                            'linked_lp_id' => 6
                        ],
                        [
                            'id' => 2,
                            'linked_lp_id' => 51
                        ],
                        [
                            'id' => 3,
                            'linked_lp_id' => 76
                        ],
                        [
                            'id' => 4,
                            'linked_lp_id' => 81
                        ]
                    ]
                ],
                [
                    'id' => 2,
                    'tag_label_id' => 660,
                    'locale_id' => 1,
                    'attribute_id' => 7,
                    'urls' => [
                        [
                            'id' => 3,
                            'url' => '/cheap--meeting-rooms/london',
                            'preferred' => 1
                        ],
                        [
                            'id' => 4,
                            'url' => '/cheap-meeting-rooms-london',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 3,
                    'tag_label_id' => 21,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 5,
                            'url' => '/wedding-venues/london',
                            'preferred' => 1
                        ],
                        [
                            'id' => 6,
                            'url' => '/wedding/london',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 4,
                    'tag_label_id' => 1385,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 7,
                            'url' => '/conference-venues/london',
                            'preferred' => 1
                        ],
                        [
                            'id' => 8,
                            'url' => '/conference/london',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 5,
                    'tag_label_id' => 1385,
                    'attribute_id' => 1,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 9,
                            'url' => '/cool--conference-venues/london',
                            'preferred' => 1
                        ],
                        [
                            'id' => 10,
                            'url' => '/cool-conference-venues-london',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //bristol
            'id' => 3,
            'parent_id' => 1,
            'url_desc' => 'bristol',
            'search_url' => 'Bristol--UK',
            'human_desc' => 'Bristol',
            'locationcategorie_id' => Location::CITY,
            'lat' => 51.4539329,
            'long' => -2.5867125,
            'country' => 'gb',
            'locality' => 'bristol',
            'constituancy_unit' => 'st-philips-bridge',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 51.3549485,
            'bounds_sw_lon' => -2.6819138,
            'bounds_ne_lat' => 51.5528399,
            'bounds_ne_lon' => -2.4910976,
            'bounds_distance' => 12.85,
            'search_radius' => 3.0,
            'place_id' => 'ChIJ_S9IYXqOcUgR3j-EelzIlas',
            'approved_venue_count' => 52,
            'unapproved_venue_count' => 35,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 7,
                    'tag_id' => 152,
                    'approved_room_count' => 136,
                    'unapproved_room_count' => 33
                ],
                [
                    'id' => 8,
                    'tag_id' => 5,
                    'approved_room_count' => 7,
                    'unapproved_room_count' => 38
                ],
                [
                    'id' => 9,
                    'tag_id' => 84,
                    'approved_room_count' => 9,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 6,
                    'tag_label_id' => 660,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 11,
                            'url' => '/meeting-rooms/bristol',
                            'preferred' => 1
                        ],
                        [
                            'id' => 12,
                            'url' => '/meeting/bristol',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 5,
                            'linked_lp_id' => 1
                        ]
                    ]
                ],
                [
                    'id' => 7,
                    'tag_label_id' => 660,
                    'locale_id' => 1,
                    'attribute_id' => 7,
                    'urls' => [
                        [
                            'id' => 13,
                            'url' => '/cheap--meeting-rooms/bristol',
                            'preferred' => 1
                        ],
                        [
                            'id' => 14,
                            'url' => '/cheap-meeting-rooms-bristol',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 8,
                    'tag_label_id' => 21,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 15,
                            'url' => '/wedding-venues/bristol',
                            'preferred' => 1
                        ],
                        [
                            'id' => 16,
                            'url' => '/wedding/bristol',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 9,
                    'tag_label_id' => 1385,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 17,
                            'url' => '/conference-venues/bristol',
                            'preferred' => 1
                        ],
                        [
                            'id' => 18,
                            'url' => '/conference/bristol',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 10,
                    'tag_label_id' => 1385,
                    'attribute_id' => 1,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 19,
                            'url' => '/cool--conference-venues/bristol',
                            'preferred' => 1
                        ],
                        [
                            'id' => 20,
                            'url' => '/cool-conference-venues-bristol',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //france
            'id' => 4,
            'parent_id' => 0,
            'url_desc' => 'france',
            'search_url' => 'France',
            'human_desc' => 'France',
            'locationcategorie_id' => Location::COUNTRY,
            'lat' => 46.2276380,
            'long' => 2.2137490,
            'country' => 'fr',
            'location_type' => 'APPROXIMATE',
            'bounds_sw_lat' => 41.3427780,
            'bounds_sw_lon' => -5.1422579,
            'bounds_ne_lat' => 51.0891285,
            'bounds_ne_lon' => 9.5597934,
            'bounds_distance' => 780.54,
            'search_radius' => 300.0,
            'place_id' => 'ChIJMVd4MymgVA0R99lHx5Y__Ws',
            'approved_venue_count' => 974,
            'unapproved_venue_count' => 1645,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 10,
                    'tag_id' => 152,
                    'approved_room_count' => 1889,
                    'unapproved_room_count' => 408
                ],
                [
                    'id' => 11,
                    'tag_id' => 5,
                    'approved_room_count' => 36,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 12,
                    'tag_id' => 84,
                    'approved_room_count' => 232,
                    'unapproved_room_count' => 15
                ]
            ],
            'browse' => [
                [
                    'id' => 4,
                    'tag_label_id' => 663,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 7,
                            'url' => '/salle-de-réunion',
                            'preferred' => 1
                        ],
                        [
                            'id' => 8,
                            'url' => '/salle-réunion',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 7,
                            'lp_id' => 11,
                            'ordering' => 1
                        ],
                        [
                            'id' => 8,
                            'lp_id' => 16,
                            'ordering' => 2
                        ]
                    ]
                ],
                [
                    'id' => 5,
                    'tag_label_id' => 24,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 9,
                            'url' => '/location-salle-mariage',
                            'preferred' => 1
                        ],
                        [
                            'id' => 10,
                            'url' => '/salle-mariage',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 9,
                            'lp_id' => 13,
                            'ordering' => 1
                        ],
                        [
                            'id' => 10,
                            'lp_id' => 18,
                            'ordering' => 2
                        ]
                    ]
                ],
                [
                    'id' => 6,
                    'tag_label_id' => 390,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 11,
                            'url' => '/salle-de-conférence',
                            'preferred' => 1
                        ],
                        [
                            'id' => 12,
                            'url' => '/salle-conférence',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 11,
                            'lp_id' => 14,
                            'ordering' => 1
                        ],
                        [
                            'id' => 12,
                            'lp_id' => 19,
                            'ordering' => 2
                        ]
                    ]
                ]
            ]
        ],
        [
            //paris
            'id' => 5,
            'parent_id' => 4,
            'url_desc' => 'paris',
            'search_url' => 'Paris--France',
            'human_desc' => 'Paris',
            'locationcategorie_id' => Location::CITY,
            'lat' => 48.8569240,
            'long' => 2.3526841,
            'country' => 'fr',
            'locality' => 'paris',
            'constituancy_unit' => 'htel-de-ville',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 48.7803549,
            'bounds_sw_lon' => 2.2772478,
            'bounds_ne_lat' => 48.9334438,
            'bounds_ne_lon' => 2.4283515,
            'bounds_distance' => 10.16,
            'search_radius' => 2.0,
            'place_id' => 'ChIJL2xPhB1u5kcRqoTwvKSubws',
            'approved_venue_count' => 569,
            'unapproved_venue_count' => 397,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 13,
                    'tag_id' => 152,
                    'approved_room_count' => 1054,
                    'unapproved_room_count' => 177
                ],
                [
                    'id' => 14,
                    'tag_id' => 5,
                    'approved_room_count' => 26,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 15,
                    'tag_id' => 84,
                    'approved_room_count' => 148,
                    'unapproved_room_count' => 7
                ]
            ],
            'landing' => [
                [
                    'id' => 11,
                    'tag_label_id' => 663,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 21,
                            'url' => '/salle-de-réunion/paris',
                            'preferred' => 1
                        ],
                        [
                            'id' => 22,
                            'url' => '/salle-réunion/paris',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 6,
                            'linked_lp_id' => 16
                        ],
                        [
                            'id' => 7,
                            'linked_lp_id' => 56
                        ],
                        [
                            'id' => 8,
                            'linked_lp_id' => 86
                        ],
                        [
                            'id' => 9,
                            'linked_lp_id' => 91
                        ]
                    ]
                ],
                [
                    'id' => 12,
                    'tag_label_id' => 663,
                    'attribute_id' => 7,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 23,
                            'url' => '/pas-cher--salle-de-réunion/paris',
                            'preferred' => 1
                        ],
                        [
                            'id' => 24,
                            'url' => '/pas-cher-salle-de-réunion-paris',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 13,
                    'tag_label_id' => 24,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 25,
                            'url' => '/location-salle-mariage/paris',
                            'preferred' => 1
                        ],
                        [
                            'id' => 26,
                            'url' => '/salle-mariage/paris',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 14,
                    'tag_label_id' => 390,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 27,
                            'url' => '/salle-de-conférence/paris',
                            'preferred' => 1
                        ],
                        [
                            'id' => 28,
                            'url' => '/salle-conférence/paris',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 15,
                    'tag_label_id' => 390,
                    'attribute_id' => 1,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 29,
                            'url' => '/atypique--salle-de-conférence/paris',
                            'preferred' => 1
                        ],
                        [
                            'id' => 30,
                            'url' => '/atypique-salle-de-conférence-paris',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //lyon
            'id' => 6,
            'parent_id' => 4,
            'url_desc' => 'lyon',
            'search_url' => 'Lyon--France',
            'human_desc' => 'Lyon',
            'locationcategorie_id' => Location::CITY,
            'lat' => 45.7640430,
            'long' => 4.8356590,
            'country' => 'fr',
            'locality' => 'lyon',
            'constituancy_unit' => 'rue-de-la-poulaillerie',
            'location_type' => 'APPROXIMATE',
            'bounds_sw_lat' => 45.6962152,
            'bounds_sw_lon' => 4.7512811,
            'bounds_ne_lat' => 45.8318085,
            'bounds_ne_lon' => 4.9202422,
            'bounds_distance' => 10.00,
            'search_radius' => 2.0,
            'place_id' => 'ChIJl4foalHq9EcR8CG75CqrCAQ',
            'approved_venue_count' => 61,
            'unapproved_venue_count' => 90,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 16,
                    'tag_id' => 152,
                    'approved_room_count' => 119,
                    'unapproved_room_count' => 79
                ],
                [
                    'id' => 17,
                    'tag_id' => 5,
                    'approved_room_count' => 2,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 18,
                    'tag_id' => 84,
                    'approved_room_count' => 15,
                    'unapproved_room_count' => 5
                ]
            ],
            'landing' => [
                [
                    'id' => 16,
                    'tag_label_id' => 663,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 31,
                            'url' => '/salle-de-réunion/lyon',
                            'preferred' => 1
                        ],
                        [
                            'id' => 32,
                            'url' => '/salle-réunion/lyon',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 10,
                            'linked_lp_id' => 11
                        ]
                    ]
                ],
                [
                    'id' => 17,
                    'tag_label_id' => 663,
                    'attribute_id' => 7,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 33,
                            'url' => '/pas-cher--salle-de-réunion/lyon',
                            'preferred' => 1
                        ],
                        [
                            'id' => 34,
                            'url' => '/pas-cher-salle-de-réunion-lyon',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 18,
                    'tag_label_id' => 24,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 35,
                            'url' => '/location-salle-mariage/lyon',
                            'preferred' => 1
                        ],
                        [
                            'id' => 36,
                            'url' => '/salle-mariage/lyon',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 19,
                    'tag_label_id' => 390,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 37,
                            'url' => '/salle-de-conférence/lyon',
                            'preferred' => 1
                        ],
                        [
                            'id' => 38,
                            'url' => '/salle-conférence/lyon',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 20,
                    'tag_label_id' => 390,
                    'attribute_id' => 1,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 39,
                            'url' => '/atypique--salle-de-conférence/lyon',
                            'preferred' => 1
                        ],
                        [
                            'id' => 40,
                            'url' => '/atypique-salle-de-conférence-lyon',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //germany
            'id' => 7,
            'parent_id' => 0,
            'url_desc' => 'deutschland',
            'search_url' => 'Deutschland',
            'human_desc' => 'Deutschland',
            'locationcategorie_id' => Location::COUNTRY,
            'lat' => 51.1638081,
            'long' => 10.4528180,
            'country' => 'de',
            'locality' => 'niederdorla',
            'constituancy_unit' => 'hngedaer-weg',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 47.0060938,
            'bounds_sw_lon' => 6.7033105,
            'bounds_ne_lat' => 55.1781815,
            'bounds_ne_lon' => 14.9318521,
            'bounds_distance' => 537.37,
            'search_radius' => 300.0,
            'place_id' => 'ChIJsym_44eNpEcRxp7Bmeui4j4',
            'approved_venue_count' => 1460,
            'unapproved_venue_count' => 74,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 19,
                    'tag_id' => 152,
                    'approved_room_count' => 1970,
                    'unapproved_room_count' => 186
                ],
                [
                    'id' => 20,
                    'tag_id' => 5,
                    'approved_room_count' => 4,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 21,
                    'tag_id' => 84,
                    'approved_room_count' => 880,
                    'unapproved_room_count' => 48
                ]
            ],
            'browse' => [
                [
                    'id' => 7,
                    'tag_label_id' => 1389,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 13,
                            'url' => '/meetingraum',
                            'preferred' => 1
                        ],
                        [
                            'id' => 14,
                            'url' => '/meeting',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 13,
                            'lp_id' => 21,
                            'ordering' => 1
                        ],
                        [
                            'id' => 14,
                            'lp_id' => 26,
                            'ordering' => 2
                        ]
                    ]
                ],
                [
                    'id' => 8,
                    'tag_label_id' => 25,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 15,
                            'url' => '/hochzeitslocation',
                            'preferred' => 1
                        ],
                        [
                            'id' => 16,
                            'url' => '/hochzeits',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 15,
                            'lp_id' => 23,
                            'ordering' => 1
                        ],
                        [
                            'id' => 16,
                            'lp_id' => 28,
                            'ordering' => 2
                        ]
                    ]
                ],
                [
                    'id' => 9,
                    'tag_label_id' => 391,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 17,
                            'url' => '/konferenzraum',
                            'preferred' => 1
                        ],
                        [
                            'id' => 18,
                            'url' => '/konferenz',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 17,
                            'lp_id' => 24,
                            'ordering' => 1
                        ],
                        [
                            'id' => 18,
                            'lp_id' => 29,
                            'ordering' => 2
                        ]
                    ]
                ]
            ]
        ],
        [
            //berlin
            'id' => 8,
            'parent_id' => 7,
            'url_desc' => 'berlin',
            'search_url' => 'Berlin--Deutschland',
            'human_desc' => 'Berlin',
            'locationcategorie_id' => Location::CITY,
            'lat' => 52.5213100,
            'long' => 13.4054600,
            'country' => 'de',
            'locality' => 'berlin',
            'constituancy_unit' => 'karl-liebknecht-str.',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 52.4442850,
            'bounds_sw_lon' => 13.3295549,
            'bounds_ne_lat' => 52.5982862,
            'bounds_ne_lon' => 13.4816317,
            'bounds_distance' => 10.00,
            'search_radius' => 2.0,
            'place_id' => 'ChIJQTbS599RqEcRB73zot_n3io',
            'approved_venue_count' => 290,
            'unapproved_venue_count' => 12,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 22,
                    'tag_id' => 152,
                    'approved_room_count' => 386,
                    'unapproved_room_count' => 27
                ],
                [
                    'id' => 23,
                    'tag_id' => 5,
                    'approved_room_count' => 2,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 24,
                    'tag_id' => 84,
                    'approved_room_count' => 185,
                    'unapproved_room_count' => 9
                ]
            ],
            'landing' => [
                [
                    'id' => 21,
                    'tag_label_id' => 1389,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 41,
                            'url' => '/meetingraum/berlin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 42,
                            'url' => '/meeting/berlin',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 11,
                            'linked_lp_id' => 26
                        ],
                        [
                            'id' => 12,
                            'linked_lp_id' => 61
                        ],
                        [
                            'id' => 13,
                            'linked_lp_id' => 96
                        ],
                        [
                            'id' => 14,
                            'linked_lp_id' => 101
                        ]
                    ]
                ],
                [
                    'id' => 22,
                    'tag_label_id' => 1389,
                    'attribute_id' => 7,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 43,
                            'url' => '/günstige--meetingraum/berlin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 44,
                            'url' => '/günstige-meetingraum-berlin',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 23,
                    'tag_label_id' => 25,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 45,
                            'url' => '/hochzeitslocation/berlin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 46,
                            'url' => '/hochzeits/berlin',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 24,
                    'tag_label_id' => 391,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 47,
                            'url' => '/konferenzraum/berlin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 48,
                            'url' => '/konferenz/berlin',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 25,
                    'tag_label_id' => 391,
                    'attribute_id' => 1,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 49,
                            'url' => '/cool--konferenzraum/berlin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 50,
                            'url' => '/cool-konferenzraum-berlin',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //stuttgart
            'id' => 9,
            'parent_id' => 7,
            'url_desc' => 'stuttgart',
            'search_url' => 'Stuttgart--Deutschland',
            'human_desc' => 'Stuttgart',
            'locationcategorie_id' => Location::CITY,
            'lat' => 48.7758459,
            'long' => 9.1829321,
            'country' => 'de',
            'locality' => 'stuttgart',
            'location_type' => 'APPROXIMATE',
            'bounds_sw_lat' => 48.6920187,
            'bounds_sw_lon' => 9.0386053,
            'bounds_ne_lat' => 48.8663994,
            'bounds_ne_lon' => 9.3158251,
            'bounds_distance' => 14.04,
            'search_radius' => 2.0,
            'place_id' => 'ChIJ04-twTTbmUcR5M-RdxzB1Xk',
            'approved_venue_count' => 71,
            'unapproved_venue_count' => 1,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 25,
                    'tag_id' => 152,
                    'approved_room_count' => 92,
                    'unapproved_room_count' => 3
                ],
                [
                    'id' => 26,
                    'tag_id' => 5,
                    'approved_room_count' => 2,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 27,
                    'tag_id' => 84,
                    'approved_room_count' => 58,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 26,
                    'tag_label_id' => 1389,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 51,
                            'url' => '/meetingraum/stuttgart',
                            'preferred' => 1
                        ],
                        [
                            'id' => 52,
                            'url' => '/meeting/stuttgart',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 15,
                            'linked_lp_id' => 21
                        ]
                    ]
                ],
                [
                    'id' => 27,
                    'tag_label_id' => 1389,
                    'attribute_id' => 7,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 53,
                            'url' => '/günstige--meetingraum/stuttgart',
                            'preferred' => 1
                        ],
                        [
                            'id' => 54,
                            'url' => '/günstige-meetingraum-stuttgart',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 28,
                    'tag_label_id' => 25,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 55,
                            'url' => '/hochzeitslocation/stuttgart',
                            'preferred' => 1
                        ],
                        [
                            'id' => 56,
                            'url' => '/hochzeits/stuttgart',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 29,
                    'tag_label_id' => 391,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 57,
                            'url' => '/konferenzraum/stuttgart',
                            'preferred' => 1
                        ],
                        [
                            'id' => 58,
                            'url' => '/konferenz/stuttgart',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 30,
                    'tag_label_id' => 391,
                    'attribute_id' => 1,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 59,
                            'url' => '/cool--konferenzraum/stuttgart',
                            'preferred' => 1
                        ],
                        [
                            'id' => 60,
                            'url' => '/cool-konferenzraum-stuttgart',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //ie
            'id' => 10,
            'parent_id' => 0,
            'url_desc' => 'ireland',
            'search_url' => 'Ireland',
            'human_desc' => 'Ireland',
            'locationcategorie_id' => Location::COUNTRY,
            'lat' => 53.4098135,
            'long' => -8.2263141,
            'country' => 'ie',
            'constituancy_unit' => 'unnamed-road',
            'location_type' => 'GEOMETRIC_CENTER',
            'bounds_sw_lat' => 51.0401947,
            'bounds_sw_lon' => -9.1641758,
            'bounds_ne_lat' => 55.7712184,
            'bounds_ne_lon' => -7.1779374,
            'bounds_distance' => 271.42,
            'search_radius' => 300.0,
            'place_id' => 'ChIJiWvNsNRBXEgRIhnLjtpsHLg',
            'approved_venue_count' => 34,
            'unapproved_venue_count' => 87,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 28,
                    'tag_id' => 152,
                    'approved_room_count' => 118,
                    'unapproved_room_count' => 29
                ],
                [
                    'id' => 29,
                    'tag_id' => 5,
                    'approved_room_count' => 2,
                    'unapproved_room_count' => 77
                ],
                [
                    'id' => 30,
                    'tag_id' => 84,
                    'approved_room_count' => 2,
                    'unapproved_room_count' => 11
                ]
            ],
            'browse' => [
                [
                    'id' => 10,
                    'tag_label_id' => 662,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 19,
                            'url' => '/meeting-rooms',
                            'preferred' => 1
                        ],
                        [
                            'id' => 20,
                            'url' => '/meeting',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 19,
                            'lp_id' => 31,
                            'ordering' => 1
                        ],
                        [
                            'id' => 20,
                            'lp_id' => 36,
                            'ordering' => 2
                        ]
                    ]
                ],
                [
                    'id' => 11,
                    'tag_label_id' => 23,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 21,
                            'url' => '/wedding-venues',
                            'preferred' => 1
                        ],
                        [
                            'id' => 22,
                            'url' => '/wedding',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 21,
                            'lp_id' => 33,
                            'ordering' => 1
                        ],
                        [
                            'id' => 22,
                            'lp_id' => 38,
                            'ordering' => 2
                        ]
                    ]
                ],
                [
                    'id' => 12,
                    'tag_label_id' => 389,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 23,
                            'url' => '/conference-rooms',
                            'preferred' => 1
                        ],
                        [
                            'id' => 24,
                            'url' => '/conference',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 23,
                            'lp_id' => 34,
                            'ordering' => 1
                        ],
                        [
                            'id' => 24,
                            'lp_id' => 39,
                            'ordering' => 2
                        ]
                    ]
                ]
            ]
        ],
        [
            //dublin
            'id' => 11,
            'parent_id' => 10,
            'url_desc' => 'dublin',
            'search_url' => 'Dublin--Ireland',
            'human_desc' => 'Dublin',
            'locationcategorie_id' => Location::CITY,
            'lat' => 53.3497915,
            'long' => -6.2602366,
            'country' => 'ie',
            'locality' => 'dublin',
            'constituancy_unit' => 'earl-st-n',
            'location_type' => 'GEOMETRIC_CENTER',
            'bounds_sw_lat' => 53.3108874,
            'bounds_sw_lon' => -6.2978247,
            'bounds_ne_lat' => 53.3886838,
            'bounds_ne_lon' => -6.2225798,
            'bounds_distance' => 5.00,
            'search_radius' => 5.0,
            'place_id' => 'ChIJ3yzTPoQOZ0gRUp-nRwXVd7s',
            'approved_venue_count' => 53,
            'unapproved_venue_count' => 37,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 31,
                    'tag_id' => 152,
                    'approved_room_count' => 164,
                    'unapproved_room_count' => 135
                ],
                [
                    'id' => 32,
                    'tag_id' => 5,
                    'approved_room_count' => 2,
                    'unapproved_room_count' => 14
                ],
                [
                    'id' => 33,
                    'tag_id' => 84,
                    'approved_room_count' => 1,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 31,
                    'tag_label_id' => 662,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 61,
                            'url' => '/meeting-rooms/dublin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 62,
                            'url' => '/meeting/dublin',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 16,
                            'linked_lp_id' => 36
                        ],
                        [
                            'id' => 17,
                            'linked_lp_id' => 66
                        ],
                        [
                            'id' => 18,
                            'linked_lp_id' => 106
                        ],
                        [
                            'id' => 19,
                            'linked_lp_id' => 111
                        ]
                    ]
                ],
                [
                    'id' => 32,
                    'tag_label_id' => 662,
                    'attribute_id' => 7,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 63,
                            'url' => '/cheap--meeting-rooms/dublin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 64,
                            'url' => '/cheap-meeting-rooms-dublin',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 33,
                    'tag_label_id' => 23,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 65,
                            'url' => '/wedding-venues/dublin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 66,
                            'url' => '/wedding/dublin',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 34,
                    'tag_label_id' => 389,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 67,
                            'url' => '/conference-rooms/dublin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 68,
                            'url' => '/conference/dublin',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 35,
                    'tag_label_id' => 389,
                    'attribute_id' => 1,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 69,
                            'url' => '/cool--conference-rooms/dublin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 70,
                            'url' => '/cool-conference-rooms-dublin',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //limerick
            'id' => 12,
            'parent_id' => 10,
            'url_desc' => 'limerick',
            'search_url' => 'Limerick--Ireland',
            'human_desc' => 'Limerick',
            'locationcategorie_id' => Location::CITY,
            'lat' => 52.6679862,
            'long' => -8.6304511,
            'country' => 'ie',
            'locality' => 'limerick',
            'constituancy_unit' => 'rockspring-gardens',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 52.6235487,
            'bounds_sw_lon' => -8.6744275,
            'bounds_ne_lat' => 52.7124074,
            'bounds_ne_lon' => -8.5863852,
            'bounds_distance' => 5.77,
            'search_radius' => 5.0,
            'place_id' => 'ChIJURpU7V1cW0gRJdkY9OOcnHU',
            'approved_venue_count' => 3,
            'unapproved_venue_count' => 1,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 34,
                    'tag_id' => 152,
                    'approved_room_count' => 15,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 35,
                    'tag_id' => 5,
                    'approved_room_count' => 2,
                    'unapproved_room_count' => 1
                ],
                [
                    'id' => 36,
                    'tag_id' => 84,
                    'approved_room_count' => 2,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 36,
                    'tag_label_id' => 662,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 71,
                            'url' => '/meeting-rooms/limerick',
                            'preferred' => 1
                        ],
                        [
                            'id' => 72,
                            'url' => '/meeting/limerick',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 20,
                            'linked_lp_id' => 31
                        ]
                    ]
                ],
                [
                    'id' => 37,
                    'tag_label_id' => 662,
                    'attribute_id' => 7,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 73,
                            'url' => '/cheap--meeting-rooms/limerick',
                            'preferred' => 1
                        ],
                        [
                            'id' => 74,
                            'url' => '/cheap-meeting-rooms-limerick',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 38,
                    'tag_label_id' => 23,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 75,
                            'url' => '/wedding-venues/limerick',
                            'preferred' => 1
                        ],
                        [
                            'id' => 76,
                            'url' => '/wedding/limerick',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 39,
                    'tag_label_id' => 389,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 77,
                            'url' => '/conference-rooms/limerick',
                            'preferred' => 1
                        ],
                        [
                            'id' => 78,
                            'url' => '/conference/limerick',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 40,
                    'tag_label_id' => 389,
                    'attribute_id' => 1,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 79,
                            'url' => '/cool--conference-rooms/limerick',
                            'preferred' => 1
                        ],
                        [
                            'id' => 80,
                            'url' => '/cool-conference-rooms-limerick',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //us
            'id' => 13,
            'parent_id' => 0,
            'url_desc' => 'united-states',
            'search_url' => 'United-States',
            'human_desc' => 'United States',
            'locationcategorie_id' => Location::COUNTRY,
            'lat' => 37.0891604,
            'long' => -95.7131979,
            'country' => 'us',
            'locality' => 'independence',
            'constituancy_unit' => 'estate-enighed',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 16.4393707,
            'bounds_sw_lon' => -111.3653281,
            'bounds_ne_lat' => 54.2335075,
            'bounds_ne_lon' => -69.4351731,
            'bounds_distance' => 2766.73,
            'search_radius' => 300.0,
            'place_id' => 'ChIJQ10sdeyBt4cRZHuO2F6deVg',
            'approved_venue_count' => 433,
            'unapproved_venue_count' => 6,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 37,
                    'tag_id' => 152,
                    'approved_room_count' => 732,
                    'unapproved_room_count' => 5
                ],
                [
                    'id' => 38,
                    'tag_id' => 5,
                    'approved_room_count' => 10,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 39,
                    'tag_id' => 84,
                    'approved_room_count' => 256,
                    'unapproved_room_count' => 0
                ]
            ],
            'browse' => [
                [
                    'id' => 13,
                    'tag_label_id' => 661,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 25,
                            'url' => '/meeting-space',
                            'preferred' => 1
                        ],
                        [
                            'id' => 26,
                            'url' => '/meeting',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 25,
                            'lp_id' => 41,
                            'ordering' => 1
                        ],
                        [
                            'id' => 26,
                            'lp_id' => 46,
                            'ordering' => 2
                        ]
                    ]
                ],
                [
                    'id' => 14,
                    'tag_label_id' => 22,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 27,
                            'url' => '/wedding-venues',
                            'preferred' => 1
                        ],
                        [
                            'id' => 28,
                            'url' => '/wedding',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 27,
                            'lp_id' => 43,
                            'ordering' => 1
                        ],
                        [
                            'id' => 28,
                            'lp_id' => 48,
                            'ordering' => 2
                        ]
                    ]
                ],
                [
                    'id' => 15,
                    'tag_label_id' => 388,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 29,
                            'url' => '/conference-rooms',
                            'preferred' => 1
                        ],
                        [
                            'id' => 30,
                            'url' => '/conference',
                            'preferred' => 0
                        ]
                    ],
                    'cards' => [
                        [
                            'id' => 29,
                            'lp_id' => 44,
                            'ordering' => 1
                        ],
                        [
                            'id' => 30,
                            'lp_id' => 49,
                            'ordering' => 2
                        ]
                    ]
                ]
            ]
        ],
        [
            //washington
            'id' => 14,
            'parent_id' => 13,
            'url_desc' => 'washington',
            'search_url' => 'Washington--DC--USA',
            'human_desc' => 'Washington',
            'locationcategorie_id' => Location::CITY,
            'lat' => 47.7510741,
            'long' => -120.7401385,
            'country' => 'us',
            'bounds_sw_lat' => 45.5435410,
            'bounds_sw_lon' => -124.8489739,
            'bounds_ne_lat' => 49.0024305,
            'bounds_ne_lon' => -116.9155800,
            'bounds_distance' => 355.43,
            'search_radius' => 2.0,
            'place_id' => 'ChIJW-T2Wt7Gt4kRKl2I1CJFUsI',
            'approved_venue_count' => 2,
            'unapproved_venue_count' => 0,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 40,
                    'tag_id' => 152,
                    'approved_room_count' => 2,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 41,
                    'tag_id' => 5,
                    'approved_room_count' => 2,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 42,
                    'tag_id' => 84,
                    'approved_room_count' => 2,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 41,
                    'tag_label_id' => 661,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 81,
                            'url' => '/meeting-space/washington',
                            'preferred' => 1
                        ],
                        [
                            'id' => 82,
                            'url' => '/meeting/washington',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 21,
                            'linked_lp_id' => 46
                        ]
                    ]
                ],
                [
                    'id' => 42,
                    'tag_label_id' => 661,
                    'attribute_id' => 7,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 83,
                            'url' => '/cheap--meeting-space/washington',
                            'preferred' => 1
                        ],
                        [
                            'id' => 84,
                            'url' => '/cheap-meeting-space-washington',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 43,
                    'tag_label_id' => 22,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 85,
                            'url' => '/wedding-venues/washington',
                            'preferred' => 1
                        ],
                        [
                            'id' => 86,
                            'url' => '/wedding/washington',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 44,
                    'tag_label_id' => 388,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 87,
                            'url' => '/conference-rooms/washington',
                            'preferred' => 1
                        ],
                        [
                            'id' => 88,
                            'url' => '/conference/washington',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 45,
                    'tag_label_id' => 388,
                    'attribute_id' => 1,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 89,
                            'url' => '/cool--conference-rooms/washington',
                            'preferred' => 1
                        ],
                        [
                            'id' => 90,
                            'url' => '/cool-conference-rooms-washington',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //new york
            'id' => 15,
            'parent_id' => 13,
            'url_desc' => 'new-york',
            'search_url' => 'New-York--NY--United-States',
            'human_desc' => 'New York',
            'locationcategorie_id' => Location::CITY,
            'lat' => 40.7127461,
            'long' => -74.0059740,
            'country' => 'us',
            'locality' => 'new-york',
            'constituancy_unit' => 'new-york-city-hall',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 40.4755419,
            'bounds_sw_lon' => -74.2407187,
            'bounds_ne_lat' => 40.9494714,
            'bounds_ne_lon' => -73.7695524,
            'bounds_distance' => 33.03,
            'search_radius' => 2.0,
            'place_id' => 'ChIJMfxeDCJawokRaUdk7prx_pY',
            'approved_venue_count' => 399,
            'unapproved_venue_count' => 1,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 43,
                    'tag_id' => 152,
                    'approved_room_count' => 697,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 44,
                    'tag_id' => 5,
                    'approved_room_count' => 10,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 45,
                    'tag_id' => 84,
                    'approved_room_count' => 255,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 46,
                    'tag_label_id' => 661,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 91,
                            'url' => '/meeting-space/new-york',
                            'preferred' => 1
                        ],
                        [
                            'id' => 92,
                            'url' => '/meeting/new-york',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 22,
                            'linked_lp_id' => 41
                        ],
                        [
                            'id' => 23,
                            'linked_lp_id' => 71
                        ],
                        [
                            'id' => 24,
                            'linked_lp_id' => 116
                        ],
                        [
                            'id' => 25,
                            'linked_lp_id' => 121
                        ]
                    ]
                ],
                [
                    'id' => 47,
                    'tag_label_id' => 661,
                    'attribute_id' => 7,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 93,
                            'url' => '/cheap--meeting-space/new-york',
                            'preferred' => 1
                        ],
                        [
                            'id' => 94,
                            'url' => '/cheap-meeting-space-new-york',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 48,
                    'tag_label_id' => 22,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 95,
                            'url' => '/wedding-venues/new-york',
                            'preferred' => 1
                        ],
                        [
                            'id' => 96,
                            'url' => '/wedding/new-york',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 49,
                    'tag_label_id' => 388,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 97,
                            'url' => '/conference-rooms/new-york',
                            'preferred' => 1
                        ],
                        [
                            'id' => 98,
                            'url' => '/conference/new-york',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 50,
                    'tag_label_id' => 388,
                    'attribute_id' => 1,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 99,
                            'url' => '/cool--conference-rooms/new-york',
                            'preferred' => 1
                        ],
                        [
                            'id' => 100,
                            'url' => '/cool-conference-rooms-new-york',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //euston
            'id' => 16,
            'parent_id' => 2,
            'url_desc' => 'euston',
            'search_url' => 'Euston-Station--London--UK',
            'human_desc' => 'Euston Station',
            'locationcategorie_id' => Location::DISTRICT,
            'lat' => 51.5279527,
            'long' => -0.1321597,
            'country' => 'gb',
            'locality' => 'london',
            'constituancy_unit' => 'euston',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 51.5210225,
            'bounds_sw_lon' => -0.1388518,
            'bounds_ne_lat' => 51.5348826,
            'bounds_ne_lon' => -0.1254656,
            'bounds_distance' => 0.90,
            'search_radius' => 3.0,
            'place_id' => 'ChIJ5dUFACUbdkgRK_P-o6pZw8s',
            'approved_venue_count' => 26,
            'unapproved_venue_count' => 26,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 46,
                    'tag_id' => 152,
                    'approved_room_count' => 80,
                    'unapproved_room_count' => 108
                ],
                [
                    'id' => 47,
                    'tag_id' => 5,
                    'approved_room_count' => 9,
                    'unapproved_room_count' => 141
                ],
                [
                    'id' => 48,
                    'tag_id' => 84,
                    'approved_room_count' => 32,
                    'unapproved_room_count' => 3
                ]
            ],
            'landing' => [
                [
                    'id' => 51,
                    'tag_label_id' => 660,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 101,
                            'url' => '/meeting-rooms/euston',
                            'preferred' => 1
                        ],
                        [
                            'id' => 102,
                            'url' => '/meeting/euston',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 26,
                            'linked_lp_id' => 1
                        ]
                    ]
                ],
                [
                    'id' => 52,
                    'tag_label_id' => 660,
                    'locale_id' => 1,
                    'attribute_id' => 7,
                    'urls' => [
                        [
                            'id' => 103,
                            'url' => '/cheap--meeting-rooms/euston',
                            'preferred' => 1
                        ],
                        [
                            'id' => 104,
                            'url' => '/cheap-meeting-rooms-euston',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 53,
                    'tag_label_id' => 21,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 105,
                            'url' => '/wedding-venues/euston',
                            'preferred' => 1
                        ],
                        [
                            'id' => 106,
                            'url' => '/wedding/euston',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 54,
                    'tag_label_id' => 1385,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 107,
                            'url' => '/conference-venues/euston',
                            'preferred' => 1
                        ],
                        [
                            'id' => 108,
                            'url' => '/conference/euston',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 55,
                    'tag_label_id' => 1385,
                    'attribute_id' => 1,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 109,
                            'url' => '/cool--conference-venues/euston',
                            'preferred' => 1
                        ],
                        [
                            'id' => 110,
                            'url' => '/cool-conference-venues-euston',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //arts et métiers
            'id' => 17,
            'parent_id' => 5,
            'url_desc' => 'arts-et-métiers',
            'search_url' => 'Arts-et-Métiers--Paris--France',
            'human_desc' => 'Arts et Métiers',
            'locationcategorie_id' => Location::DISTRICT,
            'lat' => 48.8668175,
            'long' => 2.3573545,
            'country' => 'fr',
            'locality' => 'paris',
            'constituancy_unit' => 'place-de-la-bastille',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 48.8607902,
            'bounds_sw_lon' => 2.3514051,
            'bounds_ne_lat' => 48.8728445,
            'bounds_ne_lon' => 2.3633053,
            'bounds_distance' => 0.80,
            'search_radius' => 2.0,
            'place_id' => 'ChIJ-wOd7w9u5kcRAMdEMgSgYm4',
            'approved_venue_count' => 39,
            'unapproved_venue_count' => 17,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 49,
                    'tag_id' => 152,
                    'approved_room_count' => 44,
                    'unapproved_room_count' => 8
                ],
                [
                    'id' => 50,
                    'tag_id' => 5,
                    'approved_room_count' => 5,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 51,
                    'tag_id' => 84,
                    'approved_room_count' => 14,
                    'unapproved_room_count' => 1
                ]
            ],
            'landing' => [
                [
                    'id' => 56,
                    'tag_label_id' => 663,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 111,
                            'url' => '/salle-de-réunion/arts-et-métiers',
                            'preferred' => 1
                        ],
                        [
                            'id' => 112,
                            'url' => '/salle-réunion/arts-et-métiers',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 27,
                            'linked_lp_id' => 11
                        ]
                    ]
                ],
                [
                    'id' => 57,
                    'tag_label_id' => 663,
                    'attribute_id' => 7,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 113,
                            'url' => '/pas-cher--salle-de-réunion/arts-et-métiers',
                            'preferred' => 1
                        ],
                        [
                            'id' => 114,
                            'url' => '/pas-cher-salle-de-réunion-arts-et-métiers',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 58,
                    'tag_label_id' => 24,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 115,
                            'url' => '/location-salle-mariage/arts-et-métiers',
                            'preferred' => 1
                        ],
                        [
                            'id' => 116,
                            'url' => '/salle-mariage/arts-et-métiers',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 59,
                    'tag_label_id' => 390,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 117,
                            'url' => '/salle-de-conférence/arts-et-métiers',
                            'preferred' => 1
                        ],
                        [
                            'id' => 118,
                            'url' => '/salle-conférence/arts-et-métiers',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 60,
                    'tag_label_id' => 390,
                    'attribute_id' => 1,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 119,
                            'url' => '/atypique--salle-de-conférence/arts-et-métiers',
                            'preferred' => 1
                        ],
                        [
                            'id' => 120,
                            'url' => '/atypique-salle-de-conférence-arts-et-métiers',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //kaufhaus des westens
            'id' => 18,
            'parent_id' => 8,
            'url_desc' => 'kaufhaus-des-westens',
            'search_url' => 'Kadewe--Tauentzienstraße--Berlin--Deutschland',
            'human_desc' => 'Kaufhaus des Westens',
            'locationcategorie_id' => Location::LANDMARK,
            'lat' => 52.5016021,
            'long' => 13.3409930,
            'country' => 'de',
            'locality' => 'berlin',
            'constituancy_unit' => 'tauentzienstraße',
            'location_type' => 'APPROXIMATE',
            'bounds_sw_lat' => 52.4954419,
            'bounds_sw_lon' => 13.3349135,
            'bounds_ne_lat' => 52.5077620,
            'bounds_ne_lon' => 13.3470742,
            'bounds_distance' => 0.80,
            'search_radius' => 2.0,
            'place_id' => 'ChIJYb9yIlRQqEcR7A7Zwwy7q-0',
            'approved_venue_count' => 8,
            'unapproved_venue_count' => 0,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 52,
                    'tag_id' => 152,
                    'approved_room_count' => 19,
                    'unapproved_room_count' => 16
                ],
                [
                    'id' => 53,
                    'tag_id' => 5,
                    'approved_room_count' => 2,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 54,
                    'tag_id' => 84,
                    'approved_room_count' => 5,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 61,
                    'tag_label_id' => 1389,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 121,
                            'url' => '/meetingraum/kaufhaus-des-westens',
                            'preferred' => 1
                        ],
                        [
                            'id' => 122,
                            'url' => '/meeting/kaufhaus-des-westens',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 28,
                            'linked_lp_id' => 21
                        ]
                    ]
                ],
                [
                    'id' => 62,
                    'tag_label_id' => 1389,
                    'attribute_id' => 7,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 123,
                            'url' => '/günstige--meetingraum/kaufhaus-des-westens',
                            'preferred' => 1
                        ],
                        [
                            'id' => 124,
                            'url' => '/günstige-meetingraum-kaufhaus-des-westens',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 63,
                    'tag_label_id' => 25,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 125,
                            'url' => '/hochzeitslocation/kaufhaus-des-westens',
                            'preferred' => 1
                        ],
                        [
                            'id' => 126,
                            'url' => '/hochzeits/kaufhaus-des-westens',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 64,
                    'tag_label_id' => 391,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 127,
                            'url' => '/konferenzraum/kaufhaus-des-westens',
                            'preferred' => 1
                        ],
                        [
                            'id' => 128,
                            'url' => '/konferenz/kaufhaus-des-westens',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 65,
                    'tag_label_id' => 391,
                    'attribute_id' => 1,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 129,
                            'url' => '/cool--konferenzraum/kaufhaus-des-westens',
                            'preferred' => 1
                        ],
                        [
                            'id' => 130,
                            'url' => '/cool-konferenzraum-kaufhaus-des-westens',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //drumcondra
            'id' => 19,
            'parent_id' => 11,
            'url_desc' => 'drumcondra',
            'search_url' => 'Drumcondra--Dublin--Ireland',
            'human_desc' => 'Drumcondra',
            'locationcategorie_id' => Location::DISTRICT,
            'lat' => 53.3634929,
            'long' => -6.2582235,
            'country' => 'ie',
            'locality' => 'dublin',
            'constituancy_unit' => 'drumcondra',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 53.3507337,
            'bounds_sw_lon' => -6.2705639,
            'bounds_ne_lat' => 53.3762509,
            'bounds_ne_lon' => -6.2458757,
            'bounds_distance' => 1.64,
            'search_radius' => 3.0,
            'place_id' => 'ChIJQ15wy2QOZ0gRU04pWe-_ixE',
            'approved_venue_count' => 6,
            'unapproved_venue_count' => 4,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 55,
                    'tag_id' => 152,
                    'approved_room_count' => 16,
                    'unapproved_room_count' => 15
                ],
                [
                    'id' => 56,
                    'tag_id' => 5,
                    'approved_room_count' => 0,
                    'unapproved_room_count' => 1
                ],
                [
                    'id' => 57,
                    'tag_id' => 84,
                    'approved_room_count' => 1,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 66,
                    'tag_label_id' => 662,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 131,
                            'url' => '/meeting-rooms/drumcondra',
                            'preferred' => 1
                        ],
                        [
                            'id' => 132,
                            'url' => '/meeting/drumcondra',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 29,
                            'linked_lp_id' => 31
                        ]
                    ]
                ],
                [
                    'id' => 67,
                    'tag_label_id' => 662,
                    'attribute_id' => 7,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 133,
                            'url' => '/cheap--meeting-rooms/drumcondra',
                            'preferred' => 1
                        ],
                        [
                            'id' => 134,
                            'url' => '/cheap-meeting-rooms-drumcondra',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 68,
                    'tag_label_id' => 23,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 135,
                            'url' => '/wedding-venues/drumcondra',
                            'preferred' => 1
                        ],
                        [
                            'id' => 136,
                            'url' => '/wedding/drumcondra',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 69,
                    'tag_label_id' => 389,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 137,
                            'url' => '/conference-rooms/drumcondra',
                            'preferred' => 1
                        ],
                        [
                            'id' => 138,
                            'url' => '/conference/drumcondra',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 70,
                    'tag_label_id' => 389,
                    'attribute_id' => 1,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 139,
                            'url' => '/cool--conference-rooms/drumcondra',
                            'preferred' => 1
                        ],
                        [
                            'id' => 140,
                            'url' => '/cool-conference-rooms-drumcondra',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //34 st-penn station
            'id' => 20,
            'parent_id' => 15,
            'url_desc' => '34-st-~-penn-station',
            'search_url' => '34-St-~-Penn-Station--New-York--NY--United-States',
            'human_desc' => '34 St - Penn Station',
            'locationcategorie_id' => Location::DISTRICT,
            'lat' => 40.7505958,
            'long' => -73.9904014,
            'country' => 'us',
            'locality' => 'new-york',
            'constituancy_unit' => '7th-ave',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 40.7448562,
            'bounds_sw_lon' => -73.9961100,
            'bounds_ne_lat' => 40.7563351,
            'bounds_ne_lon' => -73.9846918,
            'bounds_distance' => 0.80,
            'search_radius' => 2.0,
            'place_id' => 'ChIJLRQdmK5ZwokRCtDWq2rhOBA',
            'approved_venue_count' => 60,
            'unapproved_venue_count' => 0,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 58,
                    'tag_id' => 152,
                    'approved_room_count' => 122,
                    'unapproved_room_count' => 2
                ],
                [
                    'id' => 59,
                    'tag_id' => 5,
                    'approved_room_count' => 3,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 60,
                    'tag_id' => 84,
                    'approved_room_count' => 32,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 71,
                    'tag_label_id' => 661,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 141,
                            'url' => '/meeting-space/34-st-~-penn-station',
                            'preferred' => 1
                        ],
                        [
                            'id' => 142,
                            'url' => '/meeting/34-st-~-penn-station',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 30,
                            'linked_lp_id' => 46
                        ]
                    ]
                ],
                [
                    'id' => 72,
                    'tag_label_id' => 661,
                    'attribute_id' => 7,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 143,
                            'url' => '/cheap--meeting-space/34-st-~-penn-station',
                            'preferred' => 1
                        ],
                        [
                            'id' => 144,
                            'url' => '/cheap-meeting-space-34-st-~-penn-station',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 73,
                    'tag_label_id' => 22,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 145,
                            'url' => '/wedding-venues/34-st-~-penn-station',
                            'preferred' => 1
                        ],
                        [
                            'id' => 146,
                            'url' => '/wedding/34-st-~-penn-station',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 74,
                    'tag_label_id' => 388,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 147,
                            'url' => '/conference-rooms/34-st-~-penn-station',
                            'preferred' => 1
                        ],
                        [
                            'id' => 148,
                            'url' => '/conference/34-st-~-penn-station',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 75,
                    'tag_label_id' => 388,
                    'attribute_id' => 1,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 149,
                            'url' => '/cool--conference-rooms/34-st-~-penn-station',
                            'preferred' => 1
                        ],
                        [
                            'id' => 150,
                            'url' => '/cool-conference-rooms-34-st-~-penn-station',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //gherkin
            'id' => 21,
            'parent_id' => 2,
            'url_desc' => 'gherkin',
            'search_url' => 'The-Gherkin--London--UK',
            'human_desc' => '30 St Mary Axe (The Gherkin)',
            'locationcategorie_id' => Location::LANDMARK,
            'lat' => 51.5144054,
            'long' => -0.0802511,
            'country' => 'gb',
            'locality' => 'london',
            'constituancy_unit' => 'ec3a',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 51.5105553,
            'bounds_sw_lon' => -0.0839681,
            'bounds_ne_lat' => 51.5182554,
            'bounds_ne_lon' => -0.0765335,
            'bounds_distance' => 0.50,
            'search_radius' => 3.0,
            'place_id' => 'ChIJqR7TME0DdkgRxplj_CKMkG0',
            'approved_venue_count' => 63,
            'unapproved_venue_count' => 53,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 61,
                    'tag_id' => 152,
                    'approved_room_count' => 105,
                    'unapproved_room_count' => 39
                ],
                [
                    'id' => 62,
                    'tag_id' => 5,
                    'approved_room_count' => 4,
                    'unapproved_room_count' => 101
                ],
                [
                    'id' => 63,
                    'tag_id' => 84,
                    'approved_room_count' => 27,
                    'unapproved_room_count' => 8
                ]
            ],
            'landing' => [
                [
                    'id' => 76,
                    'tag_label_id' => 660,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 151,
                            'url' => '/meeting-rooms/gherkin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 152,
                            'url' => '/meeting/gherkin',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 31,
                            'linked_lp_id' => 1
                        ]
                    ]
                ],
                [
                    'id' => 77,
                    'tag_label_id' => 660,
                    'locale_id' => 1,
                    'attribute_id' => 7,
                    'urls' => [
                        [
                            'id' => 153,
                            'url' => '/cheap--meeting-rooms/gherkin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 154,
                            'url' => '/cheap-meeting-rooms-gherkin',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 78,
                    'tag_label_id' => 21,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 155,
                            'url' => '/wedding-venues/gherkin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 156,
                            'url' => '/wedding/gherkin',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 79,
                    'tag_label_id' => 1385,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 157,
                            'url' => '/conference-venues/gherkin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 158,
                            'url' => '/conference/gherkin',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 80,
                    'tag_label_id' => 1385,
                    'attribute_id' => 1,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 159,
                            'url' => '/cool--conference-venues/gherkin',
                            'preferred' => 1
                        ],
                        [
                            'id' => 160,
                            'url' => '/cool-conference-venues-gherkin',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //heathrow airport
            'id' => 22,
            'parent_id' => 2,
            'url_desc' => 'heathrow-airport',
            'search_url' => 'Heathrow-Airport-Terminal-3--Longford--UK',
            'human_desc' => 'Heathrow Airport',
            'locationcategorie_id' => Location::AIRPORT,
            'lat' => 51.4718914,
            'long' => -0.4567098,
            'country' => 'gb',
            'locality' => 'longford',
            'constituancy_unit' => 'heathrow-airport',
            'location_type' => 'GEOMETRIC_CENTER',
            'bounds_sw_lat' => 51.4333852,
            'bounds_sw_lon' => -0.4938167,
            'bounds_ne_lat' => 51.5103859,
            'bounds_ne_lon' => -0.4195402,
            'bounds_distance' => 5.00,
            'search_radius' => 10.0,
            'place_id' => 'ChIJHc0rMs1zdkgR4rxHYfQlb8c',
            'approved_venue_count' => 14,
            'unapproved_venue_count' => 9,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 64,
                    'tag_id' => 152,
                    'approved_room_count' => 34,
                    'unapproved_room_count' => 19
                ],
                [
                    'id' => 65,
                    'tag_id' => 5,
                    'approved_room_count' => 3,
                    'unapproved_room_count' => 29
                ],
                [
                    'id' => 66,
                    'tag_id' => 84,
                    'approved_room_count' => 8,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 81,
                    'tag_label_id' => 660,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 161,
                            'url' => '/meeting-rooms/heathrow-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 162,
                            'url' => '/meeting/heathrow-airport',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 32,
                            'linked_lp_id' => 1
                        ]
                    ]
                ],
                [
                    'id' => 82,
                    'tag_label_id' => 660,
                    'locale_id' => 1,
                    'attribute_id' => 7,
                    'urls' => [
                        [
                            'id' => 163,
                            'url' => '/cheap--meeting-rooms/heathrow-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 164,
                            'url' => '/cheap-meeting-rooms-heathrow-airport',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 83,
                    'tag_label_id' => 21,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 165,
                            'url' => '/wedding-venues/heathrow-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 166,
                            'url' => '/wedding/heathrow-airport',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 84,
                    'tag_label_id' => 1385,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 167,
                            'url' => '/conference-venues/heathrow-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 168,
                            'url' => '/conference/heathrow-airport',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 85,
                    'tag_label_id' => 1385,
                    'attribute_id' => 1,
                    'locale_id' => 1,
                    'urls' => [
                        [
                            'id' => 169,
                            'url' => '/cool--conference-venues/heathrow-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 170,
                            'url' => '/cool-conference-venues-heathrow-airport',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //arsenal paris
            'id' => 23,
            'parent_id' => 5,
            'url_desc' => 'arsenal-paris',
            'search_url' => 'Arsenal--Paris--France',
            'human_desc' => 'Arsenal',
            'locationcategorie_id' => Location::LANDMARK,
            'lat' => 48.8520564,
            'long' => 2.3654125,
            'country' => 'fr',
            'locality' => 'paris',
            'constituancy_unit' => 'boulevard-henri-iv',
            'location_type' => 'RANGE_INTERPOLATED',
            'bounds_sw_lat' => 48.8460291,
            'bounds_sw_lon' => 2.3594648,
            'bounds_ne_lat' => 48.8580834,
            'bounds_ne_lon' => 2.3713616,
            'bounds_distance' => 0.80,
            'search_radius' => 2.0,
            'place_id' => 'ChIJUaLdnKa12IcRlZVA5wZtgQ4',
            'approved_venue_count' => 16,
            'unapproved_venue_count' => 10,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 67,
                    'tag_id' => 152,
                    'approved_room_count' => 13,
                    'unapproved_room_count' => 9
                ],
                [
                    'id' => 68,
                    'tag_id' => 5,
                    'approved_room_count' => 4,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 69,
                    'tag_id' => 84,
                    'approved_room_count' => 4,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 86,
                    'tag_label_id' => 663,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 171,
                            'url' => '/salle-de-réunion/arsenal-paris',
                            'preferred' => 1
                        ],
                        [
                            'id' => 172,
                            'url' => '/salle-réunion/arsenal-paris',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 33,
                            'linked_lp_id' => 11
                        ]
                    ]
                ],
                [
                    'id' => 87,
                    'tag_label_id' => 663,
                    'attribute_id' => 7,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 173,
                            'url' => '/pas-cher--salle-de-réunion/arsenal-paris',
                            'preferred' => 1
                        ],
                        [
                            'id' => 174,
                            'url' => '/pas-cher-salle-de-réunion-arsenal-paris',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 88,
                    'tag_label_id' => 24,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 175,
                            'url' => '/location-salle-mariage/arsenal-paris',
                            'preferred' => 1
                        ],
                        [
                            'id' => 176,
                            'url' => '/salle-mariage/arsenal-paris',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 89,
                    'tag_label_id' => 390,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 177,
                            'url' => '/salle-de-conférence/arsenal-paris',
                            'preferred' => 1
                        ],
                        [
                            'id' => 178,
                            'url' => '/salle-conférence/arsenal-paris',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 90,
                    'tag_label_id' => 390,
                    'attribute_id' => 1,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 179,
                            'url' => '/atypique--salle-de-conférence/arsenal-paris',
                            'preferred' => 1
                        ],
                        [
                            'id' => 180,
                            'url' => '/atypique-salle-de-conférence-arsenal-paris',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //aéroport de paris orly
            'id' => 24,
            'parent_id' => 5,
            'url_desc' => 'aéroport-de-paris-orly',
            'search_url' => 'Paris~Orly-Airport--Orly--France',
            'human_desc' => 'Aéroport de Paris-Orly',
            'locationcategorie_id' => Location::AIRPORT,
            'lat' => 48.7262433,
            'long' => 2.3652472,
            'country' => 'fr',
            'locality' => 'orly',
            'constituancy_unit' => 'orly-airport',
            'location_type' => 'APPROXIMATE',
            'bounds_sw_lat' => 48.6508805,
            'bounds_sw_lon' => 2.2911897,
            'bounds_ne_lat' => 48.8015585,
            'bounds_ne_lon' => 2.4395269,
            'bounds_distance' => 10.00,
            'search_radius' => 2.0,
            'place_id' => 'ChIJHTtq-rF15kcRIoTbQ9feeJ0',
            'approved_venue_count' => 13,
            'unapproved_venue_count' => 6,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 70,
                    'tag_id' => 152,
                    'approved_room_count' => 45,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 71,
                    'tag_id' => 5,
                    'approved_room_count' => 1,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 72,
                    'tag_id' => 84,
                    'approved_room_count' => 1,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 91,
                    'tag_label_id' => 663,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 181,
                            'url' => '/salle-de-réunion/aéroport-de-paris-orly',
                            'preferred' => 1
                        ],
                        [
                            'id' => 182,
                            'url' => '/salle-réunion/aéroport-de-paris-orly',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 34,
                            'linked_lp_id' => 11
                        ]
                    ]
                ],
                [
                    'id' => 92,
                    'tag_label_id' => 663,
                    'attribute_id' => 7,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 183,
                            'url' => '/pas-cher--salle-de-réunion/aéroport-de-paris-orly',
                            'preferred' => 1
                        ],
                        [
                            'id' => 184,
                            'url' => '/pas-cher-salle-de-réunion-aéroport-de-paris-orly',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 93,
                    'tag_label_id' => 24,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 185,
                            'url' => '/location-salle-mariage/aéroport-de-paris-orly',
                            'preferred' => 1
                        ],
                        [
                            'id' => 186,
                            'url' => '/salle-mariage/aéroport-de-paris-orly',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 94,
                    'tag_label_id' => 390,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 187,
                            'url' => '/salle-de-conférence/aéroport-de-paris-orly',
                            'preferred' => 1
                        ],
                        [
                            'id' => 188,
                            'url' => '/salle-conférence/aéroport-de-paris-orly',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 95,
                    'tag_label_id' => 390,
                    'attribute_id' => 1,
                    'locale_id' => 3,
                    'urls' => [
                        [
                            'id' => 189,
                            'url' => '/atypique--salle-de-conférence/aéroport-de-paris-orly',
                            'preferred' => 1
                        ],
                        [
                            'id' => 190,
                            'url' => '/atypique-salle-de-conférence-aéroport-de-paris-orly',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //schöneberg
            'id' => 25,
            'parent_id' => 8,
            'url_desc' => 'schöneberg',
            'search_url' => 'Schöneberg--Berlin--Deutschland',
            'human_desc' => 'Schöneberg',
            'locationcategorie_id' => Location::DISTRICT,
            'lat' => 52.4893436,
            'long' => 13.3525480,
            'country' => 'de',
            'locality' => 'berlin',
            'constituancy_unit' => 'schöneberg',
            'location_type' => 'APPROXIMATE',
            'bounds_sw_lat' => 52.4546437,
            'bounds_sw_lon' => 13.3362757,
            'bounds_ne_lat' => 52.5049610,
            'bounds_ne_lon' => 13.3764396,
            'bounds_distance' => 3.11,
            'search_radius' => 2.0,
            'place_id' => 'ChIJI2UqzxRQqEcREK1fW0YgIQU',
            'approved_venue_count' => 32,
            'unapproved_venue_count' => 0,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 73,
                    'tag_id' => 152,
                    'approved_room_count' => 52,
                    'unapproved_room_count' => 12
                ],
                [
                    'id' => 74,
                    'tag_id' => 5,
                    'approved_room_count' => 2,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 75,
                    'tag_id' => 84,
                    'approved_room_count' => 27,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 96,
                    'tag_label_id' => 1389,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 191,
                            'url' => '/meetingraum/schöneberg',
                            'preferred' => 1
                        ],
                        [
                            'id' => 192,
                            'url' => '/meeting/schöneberg',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 35,
                            'linked_lp_id' => 21
                        ]
                    ]
                ],
                [
                    'id' => 97,
                    'tag_label_id' => 1389,
                    'attribute_id' => 7,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 193,
                            'url' => '/günstige--meetingraum/schöneberg',
                            'preferred' => 1
                        ],
                        [
                            'id' => 194,
                            'url' => '/günstige-meetingraum-schöneberg',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 98,
                    'tag_label_id' => 25,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 195,
                            'url' => '/hochzeitslocation/schöneberg',
                            'preferred' => 1
                        ],
                        [
                            'id' => 196,
                            'url' => '/hochzeits/schöneberg',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 99,
                    'tag_label_id' => 391,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 197,
                            'url' => '/konferenzraum/schöneberg',
                            'preferred' => 1
                        ],
                        [
                            'id' => 198,
                            'url' => '/konferenz/schöneberg',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 100,
                    'tag_label_id' => 391,
                    'attribute_id' => 1,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 199,
                            'url' => '/cool--konferenzraum/schöneberg',
                            'preferred' => 1
                        ],
                        [
                            'id' => 200,
                            'url' => '/cool-konferenzraum-schöneberg',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //flughafen berlin-tegel
            'id' => 26,
            'parent_id' => 8,
            'url_desc' => 'flughafen-berlin~tegel',
            'search_url' => 'Flughafen-Berlin~Tegel--Berlin--Deutschland',
            'human_desc' => 'Flughafen Berlin-Tegel',
            'locationcategorie_id' => Location::AIRPORT,
            'lat' => 52.5588327,
            'long' => 13.2884374,
            'country' => 'de',
            'locality' => 'berlin',
            'constituancy_unit' => 'berlin-tegel-airport',
            'location_type' => 'APPROXIMATE',
            'bounds_sw_lat' => 52.5203263,
            'bounds_sw_lon' => 13.2504192,
            'bounds_ne_lat' => 52.5973269,
            'bounds_ne_lon' => 13.3265224,
            'bounds_distance' => 5.00,
            'search_radius' => 2.0,
            'place_id' => 'ChIJVVVVVflTqEcR6iq_Z319uWQ',
            'approved_venue_count' => 8,
            'unapproved_venue_count' => 1,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 76,
                    'tag_id' => 152,
                    'approved_room_count' => 3,
                    'unapproved_room_count' => 40
                ],
                [
                    'id' => 77,
                    'tag_id' => 5,
                    'approved_room_count' => 1,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 78,
                    'tag_id' => 84,
                    'approved_room_count' => 1,
                    'unapproved_room_count' => 1
                ]
            ],
            'landing' => [
                [
                    'id' => 101,
                    'tag_label_id' => 1389,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 201,
                            'url' => '/meetingraum/flughafen-berlin~tegel',
                            'preferred' => 1
                        ],
                        [
                            'id' => 202,
                            'url' => '/meeting/flughafen-berlin~tegel',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 36,
                            'linked_lp_id' => 21
                        ]
                    ]
                ],
                [
                    'id' => 102,
                    'tag_label_id' => 1389,
                    'attribute_id' => 7,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 203,
                            'url' => '/günstige--meetingraum/flughafen-berlin~tegel',
                            'preferred' => 1
                        ],
                        [
                            'id' => 204,
                            'url' => '/günstige-meetingraum-flughafen-berlin~tegel',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 103,
                    'tag_label_id' => 25,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 205,
                            'url' => '/hochzeitslocation/flughafen-berlin~tegel',
                            'preferred' => 1
                        ],
                        [
                            'id' => 206,
                            'url' => '/hochzeits/flughafen-berlin~tegel',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 104,
                    'tag_label_id' => 391,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 207,
                            'url' => '/konferenzraum/flughafen-berlin~tegel',
                            'preferred' => 1
                        ],
                        [
                            'id' => 208,
                            'url' => '/konferenz/flughafen-berlin~tegel',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 105,
                    'tag_label_id' => 391,
                    'attribute_id' => 1,
                    'locale_id' => 5,
                    'urls' => [
                        [
                            'id' => 209,
                            'url' => '/cool--konferenzraum/flughafen-berlin~tegel',
                            'preferred' => 1
                        ],
                        [
                            'id' => 210,
                            'url' => '/cool-konferenzraum-flughafen-berlin~tegel',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //NUI
            'id' => 27,
            'parent_id' => 11,
            'url_desc' => 'NUI',
            'search_url' => 'The-National-University-of-Ireland--Merrion-Square-East--Ireland',
            'human_desc' => 'The National University of Ireland',
            'locationcategorie_id' => Location::LANDMARK,
            'lat' => 53.3381523,
            'long' => -6.2469413,
            'country' => 'ie',
            'locality' => 'dublin',
            'constituancy_unit' => 'university-rd',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 53.3342624,
            'bounds_sw_lon' => -6.2507022,
            'bounds_ne_lat' => 53.3420421,
            'bounds_ne_lon' => -6.2431797,
            'bounds_distance' => 0.50,
            'search_radius' => 5.0,
            'place_id' => 'ChIJObwiipYOZ0gRqs-Ddjsqub0',
            'approved_venue_count' => 6,
            'unapproved_venue_count' => 3,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 79,
                    'tag_id' => 152,
                    'approved_room_count' => 14,
                    'unapproved_room_count' => 11
                ],
                [
                    'id' => 80,
                    'tag_id' => 5,
                    'approved_room_count' => 1,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 81,
                    'tag_id' => 84,
                    'approved_room_count' => 1,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 106,
                    'tag_label_id' => 662,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 211,
                            'url' => '/meeting-rooms/NUI',
                            'preferred' => 1
                        ],
                        [
                            'id' => 212,
                            'url' => '/meeting/NUI',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 37,
                            'linked_lp_id' => 31
                        ]
                    ]
                ],
                [
                    'id' => 107,
                    'tag_label_id' => 662,
                    'attribute_id' => 7,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 213,
                            'url' => '/cheap--meeting-rooms/NUI',
                            'preferred' => 1
                        ],
                        [
                            'id' => 214,
                            'url' => '/cheap-meeting-rooms-NUI',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 108,
                    'tag_label_id' => 23,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 215,
                            'url' => '/wedding-venues/NUI',
                            'preferred' => 1
                        ],
                        [
                            'id' => 216,
                            'url' => '/wedding/NUI',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 109,
                    'tag_label_id' => 389,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 217,
                            'url' => '/conference-rooms/NUI',
                            'preferred' => 1
                        ],
                        [
                            'id' => 218,
                            'url' => '/conference/NUI',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 110,
                    'tag_label_id' => 389,
                    'attribute_id' => 1,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 219,
                            'url' => '/cool--conference-rooms/NUI',
                            'preferred' => 1
                        ],
                        [
                            'id' => 220,
                            'url' => '/cool-conference-rooms-NUI',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //dublin airport
            'id' => 28,
            'parent_id' => 11,
            'url_desc' => 'dublin-airport',
            'search_url' => 'Dublin-Airport--Ireland',
            'human_desc' => 'Dublin Airport',
            'locationcategorie_id' => Location::AIRPORT,
            'lat' => 53.4255814,
            'long' => -6.2411496,
            'country' => 'ie',
            'locality' => 'dublin-airport',
            'constituancy_unit' => 'dublin-airport',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 53.4191190,
            'bounds_sw_lon' => -6.2516205,
            'bounds_ne_lat' => 53.4320429,
            'bounds_ne_lon' => -6.2306755,
            'bounds_distance' => 1.00,
            'search_radius' => 3.0,
            'place_id' => 'ChIJwQig6bYRZ0gRq4JxtpY9MjM',
            'approved_venue_count' => 2,
            'unapproved_venue_count' => 1,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 82,
                    'tag_id' => 152,
                    'approved_room_count' => 12,
                    'unapproved_room_count' => 4
                ],
                [
                    'id' => 83,
                    'tag_id' => 5,
                    'approved_room_count' => 1,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 84,
                    'tag_id' => 84,
                    'approved_room_count' => 1,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 111,
                    'tag_label_id' => 662,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 221,
                            'url' => '/meeting-rooms/dublin-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 222,
                            'url' => '/meeting/dublin-airport',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 38,
                            'linked_lp_id' => 31
                        ]
                    ]
                ],
                [
                    'id' => 112,
                    'tag_label_id' => 662,
                    'attribute_id' => 7,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 223,
                            'url' => '/cheap--meeting-rooms/dublin-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 224,
                            'url' => '/cheap-meeting-rooms-dublin-airport',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 113,
                    'tag_label_id' => 23,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 225,
                            'url' => '/wedding-venues/dublin-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 226,
                            'url' => '/wedding/dublin-airport',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 114,
                    'tag_label_id' => 389,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 227,
                            'url' => '/conference-rooms/dublin-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 228,
                            'url' => '/conference/dublin-airport',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 115,
                    'tag_label_id' => 389,
                    'attribute_id' => 1,
                    'locale_id' => 2,
                    'urls' => [
                        [
                            'id' => 229,
                            'url' => '/cool--conference-rooms/dublin-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 230,
                            'url' => '/cool-conference-rooms-dublin-airport',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //central park
            'id' => 29,
            'parent_id' => 15,
            'url_desc' => 'central-park',
            'search_url' => 'Central-Park--New-York--NY--United-States',
            'human_desc' => 'Central Park',
            'locationcategorie_id' => Location::LANDMARK,
            'lat' => 40.7824930,
            'long' => -73.9654237,
            'country' => 'us',
            'locality' => 'new-york',
            'constituancy_unit' => '85th-st-transverse',
            'location_type' => 'ROOFTOP',
            'bounds_sw_lat' => 40.7609682,
            'bounds_sw_lon' => -73.9868361,
            'bounds_ne_lat' => 40.8040138,
            'bounds_ne_lon' => -73.9439974,
            'bounds_distance' => 3.00,
            'search_radius' => 2.0,
            'place_id' => 'ChIJ9QtmiZlYwokREvzwdEXBjCc',
            'approved_venue_count' => 29,
            'unapproved_venue_count' => 0,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 85,
                    'tag_id' => 152,
                    'approved_room_count' => 71,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 86,
                    'tag_id' => 5,
                    'approved_room_count' => 1,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 87,
                    'tag_id' => 84,
                    'approved_room_count' => 28,
                    'unapproved_room_count' => 1
                ]
            ],
            'landing' => [
                [
                    'id' => 116,
                    'tag_label_id' => 661,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 231,
                            'url' => '/meeting-space/central-park',
                            'preferred' => 1
                        ],
                        [
                            'id' => 232,
                            'url' => '/meeting/central-park',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 39,
                            'linked_lp_id' => 46
                        ]
                    ]
                ],
                [
                    'id' => 117,
                    'tag_label_id' => 661,
                    'attribute_id' => 7,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 233,
                            'url' => '/cheap--meeting-space/central-park',
                            'preferred' => 1
                        ],
                        [
                            'id' => 234,
                            'url' => '/cheap-meeting-space-central-park',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 118,
                    'tag_label_id' => 22,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 235,
                            'url' => '/wedding-venues/central-park',
                            'preferred' => 1
                        ],
                        [
                            'id' => 236,
                            'url' => '/wedding/central-park',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 119,
                    'tag_label_id' => 388,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 237,
                            'url' => '/conference-rooms/central-park',
                            'preferred' => 1
                        ],
                        [
                            'id' => 238,
                            'url' => '/conference/central-park',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 120,
                    'tag_label_id' => 388,
                    'attribute_id' => 1,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 239,
                            'url' => '/cool--conference-rooms/central-park',
                            'preferred' => 1
                        ],
                        [
                            'id' => 240,
                            'url' => '/cool-conference-rooms-central-park',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ],
        [
            //JFK international airport
            'id' => 30,
            'parent_id' => 15,
            'url_desc' => 'JFK-international-airport',
            'search_url' => 'JFK-International-Airport-JFK--Queens--NY--USA',
            'human_desc' => 'John F. Kennedy International Airport',
            'locationcategorie_id' => Location::AIRPORT,
            'lat' => 40.641311,
            'long' => -73.778139,
            'country' => 'us',
            'locality' => 'queens',
            'constituancy_unit' => 'queens-county',
            'location_type' => 'GEOMETRIC_CENTER',
            'bounds_sw_lat' => 40.64266,
            'bounds_sw_lon' => -73.77679,
            'bounds_ne_lat' => 40.639962,
            'bounds_ne_lon' => -73.779488,
            'bounds_distance' => 3.00,
            'search_radius' => 2.0,
            'place_id' => 'ChIJR0lA1VBmwokR8BGfSBOyT-w',
            'approved_venue_count' => 14,
            'unapproved_venue_count' => 2,
            'requires_determiner' => 0,
            'rooms' => [
                [
                    'id' => 88,
                    'tag_id' => 152,
                    'approved_room_count' => 12,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 89,
                    'tag_id' => 5,
                    'approved_room_count' => 1,
                    'unapproved_room_count' => 0
                ],
                [
                    'id' => 90,
                    'tag_id' => 84,
                    'approved_room_count' => 1,
                    'unapproved_room_count' => 0
                ]
            ],
            'landing' => [
                [
                    'id' => 121,
                    'tag_label_id' => 661,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 241,
                            'url' => '/meeting-space/JFK-international-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 242,
                            'url' => '/meeting/JFK-international-airport',
                            'preferred' => 0
                        ]
                    ],
                    'linked_landing_pages' => [
                        [
                            'id' => 40,
                            'linked_lp_id' => 46
                        ]
                    ]
                ],
                [
                    'id' => 122,
                    'tag_label_id' => 661,
                    'attribute_id' => 7,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 243,
                            'url' => '/cheap--meeting-space/JFK-international-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 244,
                            'url' => '/cheap-meeting-space-JFK-international-airport',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 123,
                    'tag_label_id' => 22,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 245,
                            'url' => '/wedding-venues/JFK-international-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 246,
                            'url' => '/wedding/JFK-international-airport',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 124,
                    'tag_label_id' => 388,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 247,
                            'url' => '/conference-rooms/JFK-international-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 248,
                            'url' => '/conference/JFK-international-airport',
                            'preferred' => 0
                        ]
                    ]
                ],
                [
                    'id' => 125,
                    'tag_label_id' => 388,
                    'attribute_id' => 1,
                    'locale_id' => 4,
                    'urls' => [
                        [
                            'id' => 249,
                            'url' => '/cool--conference-rooms/JFK-international-airport',
                            'preferred' => 1
                        ],
                        [
                            'id' => 250,
                            'url' => '/cool-conference-rooms-JFK-international-airport',
                            'preferred' => 0
                        ]
                    ]
                ]
            ]
        ]
    ];

    private $_country_data = [
        [
            //uk
            'id' => 1,
            'country' => 'gb',
            'main_location_id' => 2,
            'location_1_id' => 2
        ],
        [
            //fr
            'id' => 2,
            'country' => 'fr',
            'main_location_id' => 5,
            'location_1_id' => 5
        ],
        [
            //de
            'id' => 3,
            'country' => 'de',
            'main_location_id' => 8,
            'location_1_id' => 8
        ],
        [
            //ie
            'id' => 4,
            'country' => 'ie',
            'main_location_id' => 11,
            'location_1_id' => 11
        ],
        [
            //us
            'id' => 5,
            'country' => 'us',
            'main_location_id' => 14,
            'location_1_id' => 14
        ]
    ];

    public function run()
    {
        $locationArr = [];
        $locationAssetArr = [];
        $locationRoomArr = [];
        $browseArr = [];
        $browseInfoArr = [];
        $browseMetaArr = [];
        $browseUrlArr = [];
        $browseCardArr = [];
        $landingArr = [];
        $landingAttrArr = [];
        $landingInfoArr = [];
        $landingLinkedArr = [];
        $landingMetaArr = [];
        $landingUrlArr = [];
        foreach ($this->_data as $location_data) {
            $locationArr[] = $this->_add_to_location_array($location_data);
            $locationAssetArr[] = $this->_add_to_location_asset_array($location_data);
            foreach ($location_data['rooms'] as $room) {
                $locationRoomArr[] = $this->_add_to_location_room_array($location_data, $room);
            }
            if (isset($location_data['browse'])) {
                foreach ($location_data['browse'] as $browse) {
                    $browseArr[] = $this->_add_to_browse_array($location_data, $browse);
                    $browseInfoArr[] = $this->_add_to_browse_info_array($browse);
                    $browseMetaArr[] = $this->_add_to_browse_meta_array($browse);
                    foreach ($browse['urls'] as $url)
                    {
                        $browseUrlArr[] = $this->_add_to_browse_url_array($browse, $url);
                    }
                    foreach ($browse['cards'] as $card)
                    {
                        $browseCardArr[] = $this->_add_to_browse_card_array($browse, $card);
                    }
                }
            }
            if (isset($location_data['landing'])) {
                foreach ($location_data['landing'] as $landing) {
                    $landingArr[] = $this->_add_to_landing_array($location_data, $landing);
                    if (isset($landing['attribute_id'])) {
                        $landingAttrArr[] = $this->_add_to_landing_attribute_array($landing);
                    }
                    $landingInfoArr[] = $this->_add_to_landing_info_array($landing);
                    if (isset($landing['linked_landing_pages'])) {
                        foreach ($landing['linked_landing_pages'] as $linked) {
                            $landingLinkedArr[] = $this->_add_to_landing_linked_array($landing, $linked);
                        }
                    }
                    $landingMetaArr[] = $this->_add_to_landing_meta_array($landing);
                    foreach ($landing['urls'] as $lpurl) {
                        $landingUrlArr[] = $this->_add_to_landing_url_array($landing, $lpurl);
                    }
                }
            }
        }
        $locationCountryArr = [];
        foreach ($this->_country_data as $country_data) {
            $locationCountryArr[] = $this->_add_to_location_country_array($country_data);
        }
        Location::insert($locationArr);
        LocationAsset::insert($locationAssetArr);
        LocationRoom::insert($locationRoomArr);
        LocationCountryPlace::insert($locationCountryArr);
        BLP_Browse::insert($browseArr);
        BLP_BrowseInfo::insert($browseInfoArr);
        BLP_BrowseMetaOverride::insert($browseMetaArr);
        BLP_BrowseUrl::insert($browseUrlArr);
        BLP_Landing::insert($landingArr);
        BLP_BrowseCard::insert($browseCardArr);
        BLP_LandingAttribute::insert($landingAttrArr);
        BLP_LandingInfo::insert($landingInfoArr);
        BLP_LandingLinked::insert($landingLinkedArr);
        BLP_LandingMetaOverride::insert($landingMetaArr);
        BLP_LandingUrl::insert($landingUrlArr);
//        factory(App\Models\Location::class, 3)->create()->each(function ($location) {
//            $location->room()->saveMany(factory(App\Models\LocationRoom::class, 5)->make());
//            $location->landing_page()->saveMany(factory(App\Models\LandingPage::class, 3)->create()->each(function ($landing_page) {
//                $landing_page->landing_page_lang()->saveMany(factory(App\Models\LandingPageLanguage::class, 1)->create()->each(function ($landing_page_lang) {
//                    $landing_page_lang->landing_page_url()->saveMany(factory(App\Models\LandingPageUrl::class, 1)->make());
//                }));
//            }));
//        });
    }

    private function _add_to_location_array($location_data)
    {
        return [
            'id' => $location_data['id'],
            'parent_id' => $location_data['parent_id'],
            'url_desc' => $location_data['url_desc'],
            'search_url' => $location_data['search_url'],
            'human_desc' => $location_data['human_desc'],
            'locationcategorie_id' => $location_data['locationcategorie_id'],
            'lat' => $location_data['lat'],
            'long' => $location_data['long'],
            'country' => $location_data['country'],
            'locality' => ((isset($location_data['locality']))?$location_data['locality']:NULL),
            'constituancy_unit' => ((isset($location_data['constituancy_unit']))?$location_data['constituancy_unit']:NULL),
            'location_type' => ((isset($location_data['location_type']))?$location_data['location_type']:NULL),
            'bounds_sw_lat' => $location_data['bounds_sw_lat'],
            'bounds_sw_lon' => $location_data['bounds_sw_lon'],
            'bounds_ne_lat' => $location_data['bounds_ne_lat'],
            'bounds_ne_lon' => $location_data['bounds_ne_lon'],
            'bounds_distance' => $location_data['bounds_distance'],
            'search_radius' => $location_data['search_radius'],
            'in_sitemap' => 1,
            'place_id' => $location_data['place_id'],
            'requires_determiner' => $location_data['requires_determiner']
        ];
    }

    private function _add_to_location_asset_array($location_data)
    {
        return [
            'id' => $location_data['id'],
            'location_id' => $location_data['id'],
            'approved_venue_count' => $location_data['approved_venue_count'],
            'unapproved_venue_count' => $location_data['unapproved_venue_count']
        ];
    }

    private function _add_to_location_room_array($location_data, $room)
    {
        return [
            'id' => $room['id'],
            'location_id' => $location_data['id'],
            'tag_id' => $room['tag_id'],
            'approved_room_count' => $room['approved_room_count'],
            'unapproved_room_count' => $room['unapproved_room_count']
        ];
    }

    private function _add_to_location_country_array($country_data)
    {
        return [
            'id' => $country_data['id'],
            'country' => $country_data['country'],
            'main_location_id' => $country_data['main_location_id'],
            'location_1_id' => $country_data['location_1_id']
        ];
    }

    private function _add_to_browse_array($location_data, $browse)
    {
        return [
            'id' => $browse['id'],
            'location_id' => $location_data['id'],
            'tag_label_id' => $browse['tag_label_id'],
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_browse_info_array($browse)
    {
        $faker = Faker\Factory::create();
        return [
            'id' => $browse['id'],
            'browse_id' => $browse['id'],
            'banner_title' => $faker->words(3, true),
            'banner_button' => $faker->words(3, true),
            'banner_text' => $faker->sentence(9, true),
            'banner_text_color' => $faker->hexcolor,
            'card_title' => $faker->words(3, true),
            'card_subtitle' => $faker->words(6, true),
            'help_title' => $faker->words(3, true),
            'help_subtitle' => $faker->words(6, true),
            'html_bottom' => $faker->paragraphs(3, true),
            'html_top' => $faker->paragraphs(3, true),
            'nearby_title' => $faker->words(3, true),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_browse_meta_array($browse)
    {
        $faker = Faker\Factory::create();
        return [
            'id' => $browse['id'],
            'browse_id' => $browse['id'],
            'page_title' => $faker->words(3, true),
            'page_subtitle' => $faker->sentence(9, true),
            'meta_title' => $faker->words(3, true),
            'meta_desc' => $faker->sentence(9, true),
            'meta_keyword' => $faker->words(9, true),
            'schema_name' => $faker->words(3, true),
            'schema_desc' => $faker->sentence(9, true),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_browse_url_array($browse, $url)
    {
        return [
            'id' => $url['id'],
            'browse_id' => $browse['id'],
            'locale_id' => $browse['locale_id'],
            'url' => $url['url'],
            'preferred' => $url['preferred'],
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_browse_card_array($browse, $card)
    {
        $faker = Faker\Factory::create();
        return [
            'id' => $card['id'],
            'browse_id' => $browse['id'],
            'card_title' => $faker->words(3, true),
            'card_text' => $faker->sentence(9, true),
            'ordering' => $card['ordering'],
            'lp_id' => $card['lp_id'],
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_landing_array($location_data, $landing)
    {
        return [
            'id' => $landing['id'],
            'location_id' => $location_data['id'],
            'tag_label_id' => $landing['tag_label_id'],
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_landing_attribute_array($landing)
    {
        return [
            'id' => $landing['id'],
            'lp_id' => $landing['id'],
            'attribute_id' => $landing['attribute_id'],
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_landing_info_array($landing)
    {
        $faker = Faker\Factory::create();
        return [
            'id' => $landing['id'],
            'lp_id' => $landing['id'],
            'banner_title' => $faker->words(3, true),
            'banner_button' => $faker->words(3, true),
            'banner_text' => $faker->sentence(9, true),
            'banner_text_color' => $faker->hexcolor,
            'favourite_card_title' => $faker->words(3, true),
            'favourite_card_subtitle' => $faker->words(6, true),
            'popular_card_title' => $faker->words(3, true),
            'popular_card_subtitle' => $faker->words(6, true),
            'review_card_title' => $faker->words(3, true),
            'review_card_subtitle' => $faker->words(6, true),
            'recent_card_title' => $faker->words(3, true),
            'recent_card_subtitle' => $faker->words(6, true),
            'map_title' => $faker->words(3, true),
            'related_title' => $faker->words(3, true),
            'help_title' => $faker->words(3, true),
            'help_subtitle' => $faker->words(6, true),
            'html_bottom' => $faker->paragraphs(3, true),
            'html_top' => $faker->paragraphs(3, true),
            'nearby_title' => $faker->words(3, true),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_landing_linked_array($landing, $linked)
    {
        return [
            'id' => $linked['id'],
            'lp_id' => $landing['id'],
            'linked_lp_id'=> $linked['linked_lp_id']
        ];
    }

    private function _add_to_landing_meta_array($landing)
    {
        $faker = Faker\Factory::create();
        return [
            'id' => $landing['id'],
            'lp_id' => $landing['id'],
            'page_title' => $faker->words(3, true),
            'page_subtitle' => $faker->sentence(9, true),
            'meta_title' => $faker->words(3, true),
            'meta_desc' => $faker->sentence(9, true),
            'meta_keyword' => $faker->words(9, true),
            'schema_name' => $faker->words(3, true),
            'schema_desc' => $faker->sentence(9, true),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_landing_url_array($landing, $url)
    {
        return [
            'id' => $url['id'],
            'lp_id' => $landing['id'],
            'locale_id' => $landing['locale_id'],
            'url' => $url['url'],
            'preferred' => $url['preferred'],
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_landing_card_array($landing, $card)
    {
        return [
            'id' => $card['id'],
            'lp_id' => $landing['id'],
            'asset_id' => $card['asset_id'],
            'type_id' => $card['type_id'],
            'ordering' => $card['ordering'],
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }
}