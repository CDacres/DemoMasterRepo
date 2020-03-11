<?php

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Booking\VatRate;
use App\Models\Booking\BookingChannelCountry;
use App\Models\CurrencyLocation;
use App\Models\FinancialEntity;
use App\Models\Asset;
use App\Models\Company;
use App\Models\Venue;
use App\Models\Room;
use App\Models\Pivots\AssetUserPrivilege;
use App\Helpers\RolesAndPrivilegesHelper;
use App\Models\AssetImage;
use App\Models\Booking\AssetCommission;
use App\Models\Booking\CancellationTerm;
use App\Models\Pivots\AssetAmenity;
use App\Models\OpeningPeriod;
use App\Models\HourRate;
use App\Models\DayRate;
use App\Models\Verticals\Vertical;
use App\Models\Usage;
use App\Models\OfficeType;
use App\Models\Pivots\AssetTag;
use App\Models\Pivots\AssetAttribute;
use App\Models\Pivots\AssetConfiguration;
use App\Models\Pivots\AssetDDRInclude;
use App\Models\Booking\AssetDiscount;
use App\Models\Pivots\AssetMinimumSpend;
use App\Models\Pivots\AssetSetMenu;
use App\Models\Booking\AssetBookingIncentive;
use App\Models\Booking\Review;

class AssetTableSeeder extends Seeder
{
    private $_data = [
        [
            'fin_ent_id' => 1,
            'country' => 'United Kingdom',
            'country_code' => 'GB',
            'companies' => [
                [
                    'id' => 1,
                    'asset_id' => 1,
                    'city' => 'London',
                    'bounds_sw_lat' => 51.3300744,
                    'bounds_sw_lon' => -0.2983299,
                    'bounds_ne_lat' => 51.6842762,
                    'bounds_ne_lon' => 0.0436126,
                    'venues' => [
                        [
                            'id' => 1,
                            'asset_id' => 2,
                            'rooms' => [
                                [
                                    'id' => 1,
                                    'asset_id' => 3,
                                    'name' => 'Meeting Room',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 2,
                                    'asset_id' => 4,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 3,
                                    'asset_id' => 5,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 4,
                                    'asset_id' => 6,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 5,
                                    'asset_id' => 7,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 2,
                            'asset_id' => 8,
                            'rooms' => [
                                [
                                    'id' => 6,
                                    'asset_id' => 9,
                                    'name' => 'Meeting Room',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 7,
                                    'asset_id' => 10,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 8,
                                    'asset_id' => 11,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 9,
                                    'asset_id' => 12,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 10,
                                    'asset_id' => 13,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 3,
                            'asset_id' => 14,
                            'rooms' => [
                                [
                                    'id' => 11,
                                    'asset_id' => 15,
                                    'name' => 'Meeting Room',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 12,
                                    'asset_id' => 16,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 13,
                                    'asset_id' => 17,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 14,
                                    'asset_id' => 18,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 15,
                                    'asset_id' => 19,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ]
                    ]
                ],
                [
                    'id' => 2,
                    'asset_id' => 20,
                    'city' => 'Bristol',
                    'bounds_sw_lat' => 51.3549485,
                    'bounds_sw_lon' => -2.6819138,
                    'bounds_ne_lat' => 51.5528399,
                    'bounds_ne_lon' => -2.4910976,
                    'venues' => [
                        [
                            'id' => 4,
                            'asset_id' => 21,
                            'rooms' => [
                                [
                                    'id' => 16,
                                    'asset_id' => 22,
                                    'name' => 'Meeting Room',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 17,
                                    'asset_id' => 23,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 18,
                                    'asset_id' => 24,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 19,
                                    'asset_id' => 25,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 20,
                                    'asset_id' => 26,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 5,
                            'asset_id' => 27,
                            'rooms' => [
                                [
                                    'id' => 21,
                                    'asset_id' => 28,
                                    'name' => 'Meeting Room',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 22,
                                    'asset_id' => 29,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 23,
                                    'asset_id' => 30,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 24,
                                    'asset_id' => 31,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 25,
                                    'asset_id' => 32,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 6,
                            'asset_id' => 33,
                            'rooms' => [
                                [
                                    'id' => 26,
                                    'asset_id' => 34,
                                    'name' => 'Meeting Room',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 27,
                                    'asset_id' => 35,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 28,
                                    'asset_id' => 36,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 29,
                                    'asset_id' => 37,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 30,
                                    'asset_id' => 38,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ],
        [
            'fin_ent_id' => 2,
            'country' => 'France',
            'country_code' => 'FR',
            'companies' => [
                [
                    'id' => 3,
                    'asset_id' => 39,
                    'city' => 'Paris',
                    'bounds_sw_lat' => 48.7803549,
                    'bounds_sw_lon' => 2.2772478,
                    'bounds_ne_lat' => 48.9334438,
                    'bounds_ne_lon' => 2.4283515,
                    'venues' => [
                        [
                            'id' => 7,
                            'asset_id' => 40,
                            'rooms' => [
                                [
                                    'id' => 31,
                                    'asset_id' => 41,
                                    'name' => 'Salle de Réunion',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 32,
                                    'asset_id' => 42,
                                    'name' => 'Location Bureaux',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 33,
                                    'asset_id' => 43,
                                    'name' => 'Location Salle des Fêtes',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 34,
                                    'asset_id' => 44,
                                    'name' => 'Privatiser Restaurant',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 35,
                                    'asset_id' => 45,
                                    'name' => 'Mariage',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 8,
                            'asset_id' => 46,
                            'rooms' => [
                                [
                                    'id' => 36,
                                    'asset_id' => 47,
                                    'name' => 'Salle de Réunion',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 37,
                                    'asset_id' => 48,
                                    'name' => 'Location Bureaux',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 38,
                                    'asset_id' => 49,
                                    'name' => 'Location Salle des Fêtes',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 39,
                                    'asset_id' => 50,
                                    'name' => 'Privatiser Restaurant',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 40,
                                    'asset_id' => 51,
                                    'name' => 'Mariage',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 9,
                            'asset_id' => 52,
                            'rooms' => [
                                [
                                    'id' => 41,
                                    'asset_id' => 53,
                                    'name' => 'Salle de Réunion',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 42,
                                    'asset_id' => 54,
                                    'name' => 'Location Bureaux',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 43,
                                    'asset_id' => 55,
                                    'name' => 'Location Salle des Fêtes',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 44,
                                    'asset_id' => 56,
                                    'name' => 'Privatiser Restaurant',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 45,
                                    'asset_id' => 57,
                                    'name' => 'Mariage',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ]
                    ]
                ],
                [
                    'id' => 4,
                    'asset_id' => 58,
                    'city' => 'Lyon',
                    'bounds_sw_lat' => 45.6962152,
                    'bounds_sw_lon' => 4.7512811,
                    'bounds_ne_lat' => 45.8318085,
                    'bounds_ne_lon' => 4.9202422,
                    'venues' => [
                        [
                            'id' => 10,
                            'asset_id' => 59,
                            'rooms' => [
                                [
                                    'id' => 46,
                                    'asset_id' => 60,
                                    'name' => 'Salle de Réunion',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 47,
                                    'asset_id' => 61,
                                    'name' => 'Location Bureaux',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 48,
                                    'asset_id' => 62,
                                    'name' => 'Location Salle des Fêtes',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 49,
                                    'asset_id' => 63,
                                    'name' => 'Privatiser Restaurant',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 50,
                                    'asset_id' => 64,
                                    'name' => 'Mariage',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 11,
                            'asset_id' => 65,
                            'rooms' => [
                                [
                                    'id' => 51,
                                    'asset_id' => 66,
                                    'name' => 'Salle de Réunion',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 52,
                                    'asset_id' => 67,
                                    'name' => 'Location Bureaux',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 53,
                                    'asset_id' => 68,
                                    'name' => 'Location Salle des Fêtes',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 54,
                                    'asset_id' => 69,
                                    'name' => 'Privatiser Restaurant',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 55,
                                    'asset_id' => 70,
                                    'name' => 'Mariage',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 12,
                            'asset_id' => 71,
                            'rooms' => [
                                [
                                    'id' => 56,
                                    'asset_id' => 72,
                                    'name' => 'Salle de Réunion',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 57,
                                    'asset_id' => 73,
                                    'name' => 'Location Bureaux',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 58,
                                    'asset_id' => 74,
                                    'name' => 'Location Salle des Fêtes',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 59,
                                    'asset_id' => 75,
                                    'name' => 'Privatiser Restaurant',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 60,
                                    'asset_id' => 76,
                                    'name' => 'Mariage',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ],
        [
            'fin_ent_id' => 3,
            'country' => 'Deutschland',
            'country_code' => 'DE',
            'companies' => [
                [
                    'id' => 5,
                    'asset_id' => 77,
                    'city' => 'Berlin',
                    'bounds_sw_lat' => 52.4442850,
                    'bounds_sw_lon' => 13.3295549,
                    'bounds_ne_lat' => 52.5982862,
                    'bounds_ne_lon' => 13.4816317,
                    'venues' => [
                        [
                            'id' => 13,
                            'asset_id' => 78,
                            'rooms' => [
                                [
                                    'id' => 61,
                                    'asset_id' => 79,
                                    'name' => 'Meetingraum',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 62,
                                    'asset_id' => 80,
                                    'name' => 'Büro Mieten',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 63,
                                    'asset_id' => 81,
                                    'name' => 'Partyraum Mieten',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 64,
                                    'asset_id' => 82,
                                    'name' => 'Private Dining',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 65,
                                    'asset_id' => 83,
                                    'name' => 'Hochzeit',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 14,
                            'asset_id' => 84,
                            'rooms' => [
                                [
                                    'id' => 66,
                                    'asset_id' => 85,
                                    'name' => 'Meetingraum',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 67,
                                    'asset_id' => 86,
                                    'name' => 'Büro Mieten',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 68,
                                    'asset_id' => 87,
                                    'name' => 'Partyraum Mieten',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 69,
                                    'asset_id' => 88,
                                    'name' => 'Private Dining',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 70,
                                    'asset_id' => 89,
                                    'name' => 'Hochzeit',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 15,
                            'asset_id' => 90,
                            'rooms' => [
                                [
                                    'id' => 71,
                                    'asset_id' => 91,
                                    'name' => 'Meetingraum',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 72,
                                    'asset_id' => 92,
                                    'name' => 'Büro Mieten',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 73,
                                    'asset_id' => 93,
                                    'name' => 'Partyraum Mieten',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 74,
                                    'asset_id' => 94,
                                    'name' => 'Private Dining',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 75,
                                    'asset_id' => 95,
                                    'name' => 'Hochzeit',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ]
                    ]
                ],
                [
                    'id' => 6,
                    'asset_id' => 96,
                    'city' => 'Stuttgart',
                    'bounds_sw_lat' => 48.6920187,
                    'bounds_sw_lon' => 9.0386053,
                    'bounds_ne_lat' => 48.8663994,
                    'bounds_ne_lon' => 9.3158251,
                    'venues' => [
                        [
                            'id' => 16,
                            'asset_id' => 97,
                            'rooms' => [
                                [
                                    'id' => 76,
                                    'asset_id' => 98,
                                    'name' => 'Meetingraum',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 77,
                                    'asset_id' => 99,
                                    'name' => 'Büro Mieten',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 78,
                                    'asset_id' => 100,
                                    'name' => 'Partyraum Mieten',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 79,
                                    'asset_id' => 101,
                                    'name' => 'Private Dining',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 80,
                                    'asset_id' => 102,
                                    'name' => 'Hochzeit',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 17,
                            'asset_id' => 103,
                            'rooms' => [
                                [
                                    'id' => 81,
                                    'asset_id' => 104,
                                    'name' => 'Meetingraum',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 82,
                                    'asset_id' => 105,
                                    'name' => 'Büro Mieten',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 83,
                                    'asset_id' => 106,
                                    'name' => 'Partyraum Mieten',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 84,
                                    'asset_id' => 107,
                                    'name' => 'Private Dining',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 85,
                                    'asset_id' => 108,
                                    'name' => 'Hochzeit',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 18,
                            'asset_id' => 109,
                            'rooms' => [
                                [
                                    'id' => 86,
                                    'asset_id' => 110,
                                    'name' => 'Meetingraum',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 87,
                                    'asset_id' => 111,
                                    'name' => 'Büro Mieten',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 88,
                                    'asset_id' => 112,
                                    'name' => 'Partyraum Mieten',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 89,
                                    'asset_id' => 113,
                                    'name' => 'Private Dining',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 90,
                                    'asset_id' => 114,
                                    'name' => 'Hochzeit',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ],
        [
            'fin_ent_id' => 4,
            'country' => 'Ireland',
            'country_code' => 'IE',
            'companies' => [
                [
                    'id' => 7,
                    'asset_id' => 115,
                    'city' => 'Dublin',
                    'bounds_sw_lat' => 53.3108874,
                    'bounds_sw_lon' => -6.2978247,
                    'bounds_ne_lat' => 53.3886838,
                    'bounds_ne_lon' => -6.2225798,
                    'venues' => [
                        [
                            'id' => 19,
                            'asset_id' => 116,
                            'rooms' => [
                                [
                                    'id' => 91,
                                    'asset_id' => 117,
                                    'name' => 'Meeting Room',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 92,
                                    'asset_id' => 118,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 93,
                                    'asset_id' => 119,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 94,
                                    'asset_id' => 120,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 95,
                                    'asset_id' => 121,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 20,
                            'asset_id' => 122,
                            'rooms' => [
                                [
                                    'id' => 96,
                                    'asset_id' => 123,
                                    'name' => 'Meeting Room',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 97,
                                    'asset_id' => 124,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 98,
                                    'asset_id' => 125,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 99,
                                    'asset_id' => 126,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 100,
                                    'asset_id' => 127,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 21,
                            'asset_id' => 128,
                            'rooms' => [
                                [
                                    'id' => 101,
                                    'asset_id' => 129,
                                    'name' => 'Meeting Room',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 102,
                                    'asset_id' => 130,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 103,
                                    'asset_id' => 131,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 104,
                                    'asset_id' => 132,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 105,
                                    'asset_id' => 133,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ]
                    ]
                ],
                [
                    'id' => 8,
                    'asset_id' => 134,
                    'city' => 'Limerick',
                    'bounds_sw_lat' => 52.6235487,
                    'bounds_sw_lon' => -8.6744275,
                    'bounds_ne_lat' => 52.7124074,
                    'bounds_ne_lon' => -8.5863852,
                    'venues' => [
                        [
                            'id' => 22,
                            'asset_id' => 135,
                            'rooms' => [
                                [
                                    'id' => 106,
                                    'asset_id' => 136,
                                    'name' => 'Meeting Room',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 107,
                                    'asset_id' => 137,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 108,
                                    'asset_id' => 138,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 109,
                                    'asset_id' => 139,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 110,
                                    'asset_id' => 140,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 23,
                            'asset_id' => 141,
                            'rooms' => [
                                [
                                    'id' => 111,
                                    'asset_id' => 142,
                                    'name' => 'Meeting Room',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 112,
                                    'asset_id' => 143,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 113,
                                    'asset_id' => 144,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 114,
                                    'asset_id' => 145,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 115,
                                    'asset_id' => 146,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 24,
                            'asset_id' => 147,
                            'rooms' => [
                                [
                                    'id' => 116,
                                    'asset_id' => 148,
                                    'name' => 'Meeting Room',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 117,
                                    'asset_id' => 149,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 118,
                                    'asset_id' => 150,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 119,
                                    'asset_id' => 151,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 120,
                                    'asset_id' => 152,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ],
        [
            'fin_ent_id' => 5,
            'country' => 'United States',
            'country_code' => 'US',
            'companies' => [
                [
                    'id' => 9,
                    'asset_id' => 153,
                    'city' => 'Washington',
                    'bounds_sw_lat' => 45.5435410,
                    'bounds_sw_lon' => -124.8489739,
                    'bounds_ne_lat' => 49.0024305,
                    'bounds_ne_lon' => -116.9155800,
                    'venues' => [
                        [
                            'id' => 25,
                            'asset_id' => 154,
                            'rooms' => [
                                [
                                    'id' => 121,
                                    'asset_id' => 155,
                                    'name' => 'Meeting Space',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 122,
                                    'asset_id' => 156,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 123,
                                    'asset_id' => 157,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 124,
                                    'asset_id' => 158,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 125,
                                    'asset_id' => 159,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 26,
                            'asset_id' => 160,
                            'rooms' => [
                                [
                                    'id' => 126,
                                    'asset_id' => 161,
                                    'name' => 'Meeting Space',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 127,
                                    'asset_id' => 162,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 128,
                                    'asset_id' => 163,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 129,
                                    'asset_id' => 164,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 130,
                                    'asset_id' => 165,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 27,
                            'asset_id' => 166,
                            'rooms' => [
                                [
                                    'id' => 131,
                                    'asset_id' => 167,
                                    'name' => 'Meeting Space',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 132,
                                    'asset_id' => 168,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 133,
                                    'asset_id' => 169,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 134,
                                    'asset_id' => 170,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 135,
                                    'asset_id' => 171,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ]
                    ]
                ],
                [
                    'id' => 10,
                    'asset_id' => 172,
                    'city' => 'New York',
                    'bounds_sw_lat' => 40.4755419,
                    'bounds_sw_lon' => -74.2407187,
                    'bounds_ne_lat' => 40.9494714,
                    'bounds_ne_lon' => -73.7695524,
                    'venues' => [
                        [
                            'id' => 28,
                            'asset_id' => 173,
                            'rooms' => [
                                [
                                    'id' => 136,
                                    'asset_id' => 174,
                                    'name' => 'Meeting Space',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 137,
                                    'asset_id' => 175,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 138,
                                    'asset_id' => 176,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 139,
                                    'asset_id' => 177,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 140,
                                    'asset_id' => 178,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 29,
                            'asset_id' => 179,
                            'rooms' => [
                                [
                                    'id' => 141,
                                    'asset_id' => 180,
                                    'name' => 'Meeting Space',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 142,
                                    'asset_id' => 181,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 143,
                                    'asset_id' => 182,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 144,
                                    'asset_id' => 183,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 145,
                                    'asset_id' => 184,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ],
                        [
                            'id' => 30,
                            'asset_id' => 185,
                            'rooms' => [
                                [
                                    'id' => 146,
                                    'asset_id' => 186,
                                    'name' => 'Meeting Space',
                                    'vertical_id' => Vertical::MEETING,
                                    'usage_id' => Usage::MEETINGROOM,
                                    'tag_id' => 152
                                ],
                                [
                                    'id' => 147,
                                    'asset_id' => 187,
                                    'name' => 'Office',
                                    'vertical_id' => Vertical::OFFICE,
                                    'usage_id' => Usage::PRIVATEOFFICE,
                                    'tag_id' => 2
                                ],
                                [
                                    'id' => 148,
                                    'asset_id' => 188,
                                    'name' => 'Party Room',
                                    'vertical_id' => Vertical::PARTY,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 3
                                ],
                                [
                                    'id' => 149,
                                    'asset_id' => 189,
                                    'name' => 'Dining Room',
                                    'vertical_id' => Vertical::DINING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 4
                                ],
                                [
                                    'id' => 150,
                                    'asset_id' => 190,
                                    'name' => 'Wedding Room',
                                    'vertical_id' => Vertical::WEDDING,
                                    'usage_id' => Usage::EVENTFUNCTION,
                                    'tag_id' => 5
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ];

    private $_opening_data = [
        [
            [
                'day_id' => 0,
                'start' => 480,
                'end' => 1020
            ],
            [
                'day_id' => 1,
                'start' => 480,
                'end' => 1020
            ],
            [
                'day_id' => 2,
                'start' => 480,
                'end' => 1020
            ],
            [
                'day_id' => 3,
                'start' => 480,
                'end' => 1020
            ],
            [
                'day_id' => 4,
                'start' => 480,
                'end' => 1020
            ],
            [
                'day_id' => 5,
                'start' => 480,
                'end' => 1020
            ],
            [
                'day_id' => 6,
                'start' => 480,
                'end' => 1020
            ]
        ],
        [
            [
                'day_id' => 1,
                'start' => 360,
                'end' => 1080
            ],
            [
                'day_id' => 2,
                'start' => 360,
                'end' => 1080
            ],
            [
                'day_id' => 3,
                'start' => 360,
                'end' => 1080
            ],
            [
                'day_id' => 4,
                'start' => 360,
                'end' => 1080
            ],
            [
                'day_id' => 5,
                'start' => 360,
                'end' => 1080
            ]
        ],
        [
            [
                'day_id' => 0,
                'start' => 660,
                'end' => 900
            ],
            [
                'day_id' => 2,
                'start' => 780,
                'end' => 960
            ],
            [
                'day_id' => 4,
                'start' => 420,
                'end' => 600
            ],
            [
                'day_id' => 6,
                'start' => 0,
                'end' => 1440
            ]
        ]
    ];

    private $_amenity_data = [
        [
            [
                'id' => -139,
                'name' => 'Hostess',
                'type_id' => 7,
                'allows_price' => 1
            ],
            [
                'id' => -115,
                'name' => 'Marquee available',
                'type_id' => 1,
                'allows_price' => 1
            ],
            [
                'id' => -51,
                'name' => 'American',
                'type_id' => 1,
                'allows_price' => 1
            ],
            [
                'id' => -55,
                'name' => 'Brazilian',
                'type_id' => 1,
                'allows_price' => 1
            ],
            [
                'id' => 18,
                'name' => 'Video Conference Phone',
                'type_id' => 2,
                'allows_price' => 1
            ]
        ],
        [
            [
                'id' => 15,
                'name' => 'Wireless Internet Access',
                'type_id' => 1,
                'allows_price' => 0
            ],
            [
                'id' => -6,
                'name' => 'Free parking on premise',
                'type_id' => 1,
                'allows_price' => 0
            ],
            [
                'id' => -15,
                'name' => 'Secure access',
                'type_id' => 1,
                'allows_price' => 1
            ],
            [
                'id' => -100,
                'name' => 'Stately home',
                'type_id' => 1,
                'allows_price' => 1
            ]
        ],
        [
            [
                'id' => 23,
                'name' => 'Accessibility',
                'type_id' => 1,
                'allows_price' => 0
            ],
            [
                'id' => -8,
                'name' => 'Inventory storage',
                'type_id' => 1,
                'allows_price' => 1
            ],
            [
                'id' => -127,
                'name' => 'Helipad',
                'type_id' => 1,
                'allows_price' => 1
            ],
            [
                'id' => -140,
                'name' => 'Cloakroom',
                'type_id' => 6,
                'allows_price' => 1
            ],
            [
                'id' => 27,
                'name' => 'Tea/coffee',
                'type_id' => 3,
                'allows_price' => 1
            ]
        ]
    ];

    public function run()
    {
        $venueAdmin = User::where('userType_id', 1)->first();
        if (!is_null($venueAdmin)) {
            $faker = Faker\Factory::create();
            $financialEntityArr = [];
            $assetArr = [];
            $companyArr = [];
            $venueArr = [];
            $roomArr = [];
            $assetUserPrivilegeArr = [];
            $assetImageArr = [];
            $assetCommissionArr = [];
            $assetAmenityArr = [];
            $assetCancellationArr = [];
            $openingPeriodArr = [];
            $hourRateArr = [];
            $dayRateArr = [];
            $assetTagArr = [];
            $assetAttributeArr = [];
            $assetConfigurationArr = [];
            $assetDDRIncludeArr = [];
            $assetDiscountArr = [];
            $assetMinimumSpendArr = [];
            $assetSetMenuArr = [];
            $assetBookingIncentiveArr = [];
            $reviewArr = [];
            $vatRates = VatRate::getAllDefaults();
            $bookingChannelCountries = BookingChannelCountry::get();
            $currencies = CurrencyLocation::get();
            foreach ($this->_data as $asset_data) {
                $countryCode = $asset_data['country_code'];
                $countryVat = $vatRates->first(function($item) use ($countryCode) {
                    return $item->country_code == $countryCode;
                });
                $bookingChannels = $bookingChannelCountries->filter(function ($item) use ($countryCode) {
                    return $item->country_code == $countryCode;
                });
                $currency = $currencies->first(function($item) use ($countryCode) {
                    return $item->country_code == $countryCode;
                });
                $financialEntityArr[] = $this->_add_to_financial_entity_array($asset_data, $venueAdmin->id);
                foreach ($asset_data['companies'] as $company) {
                    $assetArr[] = $this->_add_to_asset_array($company, Asset::COMPANY);
                    $companyArr[] = $this->_add_to_company_array($company);
                    $assetUserPrivilegeArr[] = $this->_add_to_user_asset_privilege_array($company['asset_id'], $venueAdmin->id);
                    foreach ($company['venues'] as $venue) {
                        $venueReviewCount = 0;
                        $venueReviewScore = 0;
                        $venueReviewAvg = 0;
                        $minimumMinutes = $faker->randomElement([30, 60, 240]);
                        $assetArr[] = $this->_add_to_asset_array($venue, Asset::VENUE, $company['asset_id']);
                        $assetUserPrivilegeArr[] = $this->_add_to_user_asset_privilege_array($venue['asset_id'], $venueAdmin->id);
                        $assetImageArr[] = $this->_add_to_asset_image_array($venue['asset_id']);
                        foreach ($bookingChannels as $bookingChannel) {
                            $assetCommissionArr[] = $this->_add_to_asset_commission_array($venue['asset_id'], $bookingChannel);
                        }
                        $assetCancellationArr[] = $this->_add_to_asset_cancellation_array($venue['asset_id']);
                        $amenityOption = $faker->numberBetween(0, 2);
                        foreach ($this->_amenity_data[$amenityOption] as $amenity) {
                            $assetAmenityArr[] = $this->_add_to_asset_amenity_array($venue['asset_id'], $amenity);
                        }
                        $openingOption = $faker->numberBetween(0, 2);
                        foreach ($this->_opening_data[$openingOption] as $openingHour) {
                            $openingPeriodArr[] = $this->_add_to_opening_hours_array($venue['asset_id'], $openingHour, $minimumMinutes);
                        }
                        foreach ($venue['rooms'] as $room) {
                            $hourlyRate = null;
                            if ($room['vertical_id'] == Vertical::MEETING || $room['vertical_id'] == Vertical::OFFICE || $room['vertical_id'] == Vertical::PARTY) {
                                $hourlyRate = $faker->randomFloat(2, 60, 600);
                                $assetBookingIncentiveArr[] = $this->_add_to_incentive_array($room['asset_id']);
                            }
                            $dailyDelegateRate = null;
                            if ($room['vertical_id'] == Vertical::MEETING || $room['vertical_id'] == Vertical::PARTY) {
                                $dailyDelegateRate = $faker->randomFloat(2, 20, 200);
                                $firstIncludeId = $faker->numberBetween(1, 3);
                                $secondIncludeId = $faker->numberBetween(4, 6);
                                $assetDDRIncludeArr[] = $this->_add_to_ddr_include_array($room['asset_id'], $firstIncludeId);
                                $assetDDRIncludeArr[] = $this->_add_to_ddr_include_array($room['asset_id'], $secondIncludeId);
                                $assetDiscountArr[] = $this->_add_to_discount_array($room['asset_id']);
                            }
                            $minimumSpend = null;
                            if ($room['vertical_id'] == Vertical::DINING || $room['vertical_id'] == Vertical::WEDDING) {
                                $minimumSpend = $faker->randomFloat(2, 500, 5000);
                                $firstAmount = $faker->randomFloat(2, 0, $minimumSpend);
                                $firstDiningPeriodId = $faker->numberBetween(1, 3);
                                $secondAmount = $faker->randomFloat(2, 0, $minimumSpend);
                                $secondDiningPeriodId = $faker->numberBetween(4, 5);
                                $assetMinimumSpendArr[] = $this->_add_to_minimum_spend_array($room['asset_id'], $firstDiningPeriodId, $firstAmount);
                                $assetMinimumSpendArr[] = $this->_add_to_minimum_spend_array($room['asset_id'], $secondDiningPeriodId, $secondAmount);
                                $assetSetMenuArr[] = $this->_add_to_set_menu_array($room['asset_id'], $firstDiningPeriodId);
                                $assetSetMenuArr[] = $this->_add_to_set_menu_array($room['asset_id'], $secondDiningPeriodId);
                            }
                            $assetArr[] = $this->_add_to_asset_array($room, Asset::ROOM, $venue['asset_id']);
                            $roomArr[] = $this->_add_to_room_array($venue, $room, $currency->currency_code, $room['vertical_id'], $room['usage_id'], $hourlyRate);
                            $assetUserPrivilegeArr[] = $this->_add_to_user_asset_privilege_array($room['asset_id'], $venueAdmin->id);
                            $assetImageArr[] = $this->_add_to_asset_image_array($room['asset_id']);
                            $assetCancellationArr[] = $this->_add_to_asset_cancellation_array($room['asset_id']);
                            foreach ($this->_amenity_data[$amenityOption] as $amenity) {
                                $assetAmenityArr[] = $this->_add_to_asset_amenity_array($room['asset_id'], $amenity);
                            }
                            foreach ($this->_opening_data[$openingOption] as $openingHour) {
                                $openingPeriodArr[] = $this->_add_to_opening_hours_array($room['asset_id'], $openingHour, $minimumMinutes);
                            }
                            if ($hourlyRate != null) {
                                foreach ($openingPeriodArr as $openingPeriodArrKey => $openingPeriod) {
                                    if ($openingPeriod['asset_id'] == $room['asset_id']) {
                                        $hourRateArr[] = $this->_add_to_hour_rate_array($openingPeriodArrKey, $hourlyRate);
                                    }
                                }
                            }
                            $dayRateArr[] = $this->_add_to_day_rate_array($room['asset_id'], $room['vertical_id'], $dailyDelegateRate, $minimumSpend);
                            $assetTagArr[] = $this->_add_to_tag_array($room['asset_id'], $room['tag_id']);
                            if ($room['vertical_id'] != Vertical::PARTY) {
                                $assetAttributeArr[] = $this->_add_to_asset_attribute_array($room['asset_id']);
                            }
                            if ($room['vertical_id'] != Vertical::OFFICE) {
                                $firstConfig = $faker->numberBetween(1, 4);
                                $secondConfig = $faker->numberBetween(6, 8);
                                $assetConfigurationArr[] = $this->_add_to_asset_configuration_array($room['asset_id'], $firstConfig);
                                $assetConfigurationArr[] = $this->_add_to_asset_configuration_array($room['asset_id'], $secondConfig);
                            }
                            $numReviews = $faker->numberBetween(0, 3);
                            if ($numReviews > 0) {
                                for ($review = 0; $review < $numReviews; ++$review) {
                                    $cleanliness = $faker->numberBetween(1, 5);
                                    $communication = $faker->numberBetween(1, 5);
                                    $accuracy = $faker->numberBetween(1, 5);
                                    $checkin = $faker->numberBetween(1, 5);
                                    $location = $faker->numberBetween(1, 5);
                                    $value = $faker->numberBetween(1, 5);
                                    $reviewArr[] = $this->_add_to_review_array($room['asset_id'], $cleanliness, $communication, $accuracy, $checkin, $location, $value);
                                    $venueReviewScore += (($cleanliness + $communication + $accuracy + $checkin + $location + $value) / 6);
                                    ++$venueReviewCount;
                                }
                            }
                        }
                        if ($venueReviewCount > 0) {
                            $venueReviewAvg = ($venueReviewScore / $venueReviewCount);
                        }
                        $venueArr[] = $this->_add_to_venue_array($asset_data, $company, $venue, $currency->currency_code, $asset_data['fin_ent_id'], $venueAdmin->id, $countryVat->id, $minimumMinutes, $venueReviewCount, $venueReviewAvg);
                    }
                }
            }
            FinancialEntity::insert($financialEntityArr);
            Asset::insert($assetArr);
            Company::insert($companyArr);
            Venue::insert($venueArr);
            Room::insert($roomArr);
            AssetUserPrivilege::insert($assetUserPrivilegeArr);
            AssetImage::insert($assetImageArr);
            AssetCommission::insert($assetCommissionArr);
            CancellationTerm::insert($assetCancellationArr);
            AssetAmenity::insert($assetAmenityArr);
            OpeningPeriod::insert($openingPeriodArr);
            HourRate::insert($hourRateArr);
            DayRate::insert($dayRateArr);
            AssetTag::insert($assetTagArr);
            AssetAttribute::insert($assetAttributeArr);
            AssetConfiguration::insert($assetConfigurationArr);
            AssetDDRInclude::insert($assetDDRIncludeArr);
            AssetDiscount::insert($assetDiscountArr);
            AssetMinimumSpend::insert($assetMinimumSpendArr);
            AssetSetMenu::insert($assetSetMenuArr);
            AssetBookingIncentive::insert($assetBookingIncentiveArr);
            Review::insert($reviewArr);
            Asset::fixTree();
        }
    }

    private function _add_to_financial_entity_array($asset_data, $userId)
    {
        return [
            'name' => $asset_data['country_code'] . ' Financial Entity',
            'address' => $asset_data['country'],
            'account_user' => $userId
        ];
    }

    private function _add_to_asset_array($asset, $assetTypeId, $parentId = null)
    {
        srand((double)microtime() * 1000000);
        return [
            'id' => $asset['asset_id'],
            'asset_type_id' => $assetTypeId,
            'reference_id' => $asset['id'],
            'parent_id' => $parentId,
            'token' => md5(uniqid(rand(), true)),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_user_asset_privilege_array($assetId, $userId)
    {
        return [
            'user_id' => $userId,
            'asset_id' => $assetId,
            'privileges_mask' => RolesAndPrivilegesHelper::get_top_privilege()
        ];
    }

    private function _add_to_company_array($company)
    {
        return [
            'id' => $company['id'],
            'asset_id' => $company['asset_id'],
            'name' => $company['city'] . ' Company',
            'approved_datetime' => date("Y-m-d H:i:s"),
            'created' => date("Y-m-d H:i:s"),
            'updated' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_venue_array($asset_data, $company, $venue, $currency, $finEntId, $mainContactId, $vatRateId, $minimumMinutes, $reviewCount, $reviewScore)
    {
        $faker = Faker\Factory::create();
        return [
            'id' => $venue['id'],
            'asset_id' => $venue['asset_id'],
            'company_id' => $company['id'],
            'main_contact' => $mainContactId,
            'financial_entity_id' => $finEntId,
            'name' => $faker->company,
            'address' => $faker->address,
            'city' => $company['city'],
            'country' => $asset_data['country'],
            'country_code' => $asset_data['country_code'],
            'street_number' => $faker->buildingNumber,
            'road' => $faker->streetName,
            'town' => $faker->city,
            'county' => $faker->state,
            'post_code' => $faker->postcode,
            'phone' => $faker->e164PhoneNumber,
            'lat' => $faker->latitude($company['bounds_sw_lat'], $company['bounds_ne_lat']),
            'long' => $faker->longitude($company['bounds_sw_lon'], $company['bounds_ne_lon']),
            'currency' => $currency,
            'address_extras' => $faker->word,
            'description' => $faker->paragraphs(3, true),
            'transport' => $faker->words(9, true),
            'review_count' => $reviewCount,
            'review_score' => (($reviewScore == 0)?null:round($reviewScore, 1)),
            'uses_live_bookings' => $faker->boolean,
            'venue_type_id' => $faker->numberBetween(1, 29),
            'minimum_minutes' => $minimumMinutes,
            'website' => $faker->url,
            'agree_to_list' => 1,
            'vat_rate_id' => $vatRateId,
            'approved' => 1,
            'approved_datetime' => date("Y-m-d H:i:s"),
            'created' => date("Y-m-d H:i:s"),
            'updated' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_room_array($venue, $room, $currency, $verticalId, $usageId, $hourlyRate)
    {
        $faker = Faker\Factory::create();
        $office_type = 1;
        $num_of_desks = null;
        $office_size = null;
        $office_size_unit = 'm2';
        $daily_minimum_days = null;
        $monthly_minimum_months = null;
        if ($verticalId == Vertical::OFFICE) {
            $office_type = $faker->numberBetween(1, 3);
            $num_of_desks = $faker->numberBetween(1, 100);
            if ($office_type == OfficeType::PRIVATEOFFICE) {
                $office_size = $faker->randomFloat(2, 100, 5000);
                $office_size_unit = $faker->randomElement(['m2', 'ft2']);
            } else {
                $daily_minimum_days = $faker->numberBetween(1, 30);
            }
            $monthly_minimum_months = $faker->randomElement([1, 3, 6, 12]);
        }
        $strict_time = 0;
        $price_negotiation = 0;
        $additional_charges = 0;
        if ($verticalId == Vertical::PARTY) {
            $strict_time = $faker->boolean;
            $price_negotiation = $faker->boolean;
            $additional_charges = $faker->sentence(9, true);
        }
        return [
            'id' => $room['id'],
            'asset_id' => $room['asset_id'],
            'venue_id' => $venue['id'],
            'primary_vertical_id' => $verticalId,
            'usage_id' => $usageId,
            'title' => $room['name'],
            'desc' => $faker->paragraphs(3, true),
            'listing_hourly_rate' => $hourlyRate,
            'currency' => $currency,
            'office_type_id' => $office_type,
            'num_of_desks' => $num_of_desks,
            'office_size' => $office_size,
            'office_size_unit' => $office_size_unit,
            'page_viewed' => $faker->numberBetween(1, 100),
            'daily_minimum_days' => $daily_minimum_days,
            'monthly_minimum_months' => $monthly_minimum_months,
            'strict_time' => $strict_time,
            'price_negotiation' => $price_negotiation,
            'additional_charges' => $additional_charges,
            'sponsored' => $faker->boolean,
            'flexible_percent' => 15,
            'flexible_enabled' => 1,
            'price_control_percent' => (($verticalId == Vertical::MEETING)?12:NULL),
            'approved' => 1,
            'approved_datetime' => date("Y-m-d H:i:s"),
            'created' => date("Y-m-d H:i:s"),
            'updated' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_asset_image_array($assetId)
    {
        mt_srand();
        return [
            'asset_id' => $assetId,
            'name' => md5(uniqid(mt_rand())) . '.jpg',
            'created' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_asset_commission_array($assetId, $bookingChannel)
    {
        return [
            'asset_id' => $assetId,
            'bookingChannel_id' => $bookingChannel->booking_channel_id,
            'commissionPercentage' => $bookingChannel->self_list_commission
        ];
    }

    private function _add_to_asset_cancellation_array($assetId)
    {
        $faker = Faker\Factory::create();
        return [
            'asset_id' => $assetId,
            'cancel_percent' => $faker->randomElement([0, 20, 50, 75, 100]),
            'cancel_days' => $faker->randomElement([0, 2, 10, 20])
        ];
    }

    private function _add_to_asset_amenity_array($assetId, $amenity)
    {
        $faker = Faker\Factory::create();
        return [
            'asset_id' => $assetId,
            'amenity_id' => $amenity['id'],
            'cost' => (($amenity['allows_price'])?$faker->randomFloat(2, 0, 100):NULL),
            'instructions' => $faker->sentence(9, true),
            'available' => 1,
            'name' => $amenity['name'],
            'amenity_type_id' => $amenity['type_id'],
            'allows_price' => $amenity['allows_price']
        ];
    }

    private function _add_to_opening_hours_array($assetId, $openingPeriod, $minMinutes)
    {
        $faker = Faker\Factory::create();
        return [
            'asset_id' => $assetId,
            'day_id' => $openingPeriod['day_id'],
            'start' => $openingPeriod['start'],
            'end' => $openingPeriod['end'],
            'minimum_minutes' => $minMinutes,
            'slot_length_minutes' => $faker->randomElement([30, 60, 240])
        ];
    }

    private function _add_to_hour_rate_array($openingPeriodArrKey, $hourlyRate)
    {
        return [
            'openingPeriod_id' => ($openingPeriodArrKey + 1),
            'price_per_hour' => $hourlyRate
        ];
    }

    private function _add_to_day_rate_array($assetId, $verticalId, $dailyDelegateRate, $minimumSpend)
    {
        $faker = Faker\Factory::create();
        $halfday_rate_first = null;
        $half_day_time_first_start = 480;
        $half_day_time_first_end = 720;
        $halfday_rate_second = null;
        $half_day_time_second_start = 720;
        $half_day_time_second_end = 1020;
        $evening_price = null;
        $minimum_delegate_number = null;
        if ($verticalId == Vertical::MEETING || $verticalId == Vertical::PARTY) {
            $halfday_rate_first = $faker->randomFloat(2, 40, 400);
            $half_day_time_first_start = $faker->numberBetween(0, 360);
            $half_day_time_first_end = $faker->numberBetween(360, 720);
            $halfday_rate_second = $faker->randomFloat(2, 40, 400);
            $half_day_time_second_start = $faker->numberBetween(720, 1080);
            $half_day_time_second_end = $faker->numberBetween(1080, 1440);
            $evening_price = $faker->randomFloat(2, 40, 400);
            $minimum_delegate_number = $faker->numberBetween(1, 100);
        }
        return [
            'asset_id' => $assetId,
            'standard_day_rate' => (($verticalId == Vertical::MEETING || $verticalId == Vertical::OFFICE || $verticalId == Vertical::PARTY)?$faker->randomFloat(2, 80, 800):null),
            'halfday_rate_first' => $halfday_rate_first,
            'half_day_time_first_start' => $half_day_time_first_start,
            'half_day_time_first_end' => $half_day_time_first_end,
            'halfday_rate_second' => $halfday_rate_second,
            'half_day_time_second_start' => $half_day_time_second_start,
            'half_day_time_second_end' => $half_day_time_second_end,
            'evening_price' => $evening_price,
            'daily_delegate_rate' => $dailyDelegateRate,
            'minimum_delegate_number' => $minimum_delegate_number,
            'minimum_spend' => $minimumSpend,
            'monthly_price' => (($verticalId == Vertical::OFFICE)?$faker->randomFloat(2, 2400, 24000):null)
        ];
    }

    private function _add_to_tag_array($assetId, $tagId)
    {
        return [
            'asset_id' => $assetId,
            'tag_id' => $tagId
        ];
    }

    private function _add_to_asset_attribute_array($assetId)
    {
        $faker = Faker\Factory::create();
        return [
            'asset_id' => $assetId,
            'attribute_id' => $faker->randomElement([1, 3, 6, 7])
        ];
    }

    private function _add_to_asset_configuration_array($assetId, $configId)
    {
        $faker = Faker\Factory::create();
        return [
            'asset_id' => $assetId,
            'configuration_id' => $configId,
            'max_capacity' => $faker->numberBetween(1, 2000)
        ];

    }

    private function _add_to_ddr_include_array($assetId, $includeId)
    {
        $faker = Faker\Factory::create();
        return [
            'asset_id' => $assetId,
            'include_type_id' => $includeId,
            'include_text' => $faker->sentence(9, true)
        ];
    }

    private function _add_to_discount_array($assetId)
    {
        $faker = Faker\Factory::create();
        return [
            'asset_id' => $assetId,
            'discount' => $faker->randomElement([0.5, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95])
        ];
    }

    private function _add_to_minimum_spend_array($assetId, $diningPeriodId, $amount)
    {
        return [
            'asset_id' => $assetId,
            'dining_period_id' => $diningPeriodId,
            'amount' => $amount,
            'amount_exvat' => $amount
        ];
    }

    private function _add_to_set_menu_array($assetId, $diningPeriodId)
    {
        $faker = Faker\Factory::create();
        $amount = $faker->randomFloat(2, 10, 100);
        return [
            'asset_id' => $assetId,
            'dining_period_id' => $diningPeriodId,
            'amount' => $amount,
            'amount_exvat' => $amount
        ];
    }

    private function _add_to_incentive_array($assetId)
    {
        $faker = Faker\Factory::create();
        return [
            'asset_id' => $assetId,
            'discount' => $faker->randomElement([0.5, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95]),
            'bookings_trigger' => $faker->numberBetween(2, 3)
        ];
    }

    private function _add_to_review_array($assetId, $cleanliness, $communication, $accuracy, $checkin, $location, $value)
    {
        $faker = Faker\Factory::create();
        return [
            'userby' => $faker->numberBetween(1, 5),
            'asset_id' => $assetId,
            'review' => $faker->sentence(9, true),
            'feedback' => $faker->sentence(9, true),
            'cleanliness' => $cleanliness,
            'communication' => $communication,
            'accuracy' => $accuracy,
            'checkin' => $checkin,
            'location' => $location,
            'value' => $value,
            'created' => date("Y-m-d H:i:s")
        ];
    }
}