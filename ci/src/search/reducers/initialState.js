
const initialState = {
    activeFilterGroupIndex: -1,
    activeVerticalIndex: 1,
    domContentLoading: true,
    eventTypes: {
        defaults: [
            'Party',
            'Dining',
            'Meeting',
            'Wedding',
            'Conference'
        ],
        data: [
            'Party', '18th Birthday Party', '21st Birthday Party', '30th Birthday Party', '40th Birthday Party', '50th Birthday Party', '60th Birthday Party', '70th Birthday Party', '80th Birthday Party', 'After Work Drinks', 'AGM', 'Asian Wedding', 'Award Ceremony', 'Anniversary', 'Art Exhibition', 'Away Day', 'Annual General Meeting', 'African Wedding', 'Apartment', 'Art Gallery', 'Arch', 'Art Fair', 'Auditions', 'Airplane', 'Art Class', 'Asylum', 'Afternoon Tea', 'Bar', 'Birthday Party', 'Ballroom', 'Bar Mitzvah', 'Bat Mitzvah', 'Banquet', 'Birthday Dinner', 'Ball', 'Basement', 'Book Launch', 'Bloggers Event', 'Boat', 'Boathouse', 'Bridal Shower', 'Baby Shower', 'Breakout', 'Big Top', 'Barn', 'BBQ', 'Buffet', 'Bus', 'Christmas Party', 'Christmas Dinner', 'Conference', 'Corporate Event', 'Corporate Party', 'Charity Fundraiser', 'Club Night', 'Civil Partnership', 'Cocktail Bar', 'Cinema', 'Children\'s Birthday Party', 'Christmas Package', 'Ceremony', 'Cabaret', 'Civil Ceremony', 'Country House', 'Concert', 'Cheerleading', 'Charity Dinner', 'Christmas Lunch', 'Christening', 'Children\'s Party', 'Creative Workshop', 'Charity Party', 'Circus', 'Cocktail Masterclass', 'Coding Event', 'Church', 'Community Centre', 'Community Hall', 'Cookery', 'Classroom', 'Chapel', 'Changing Room', 'Cafe', 'Dry Hire', 'Drinks Reception', 'Dinner Party', 'Dancefloor', 'Drinks Party', 'Disco', 'Dining Room', 'Dining Hall', 'Dressing Room', 'Dance Studio', 'Dog Training', 'Dance Class', 'Event Venue', 'Engagement Drinks', 'Engagement Party', 'Evening Party', 'Editorial Shoot', 'Exposed Brick', 'Fashion Show', 'Filming', 'Festival', 'Function Hall', 'Function Room', 'Fireplace', 'Fitness Class', 'Farm', 'Garden', 'Garden Party', 'Garden Weddings', 'Gala', 'Gallery', 'Gig', 'Gym', 'Greenhouse', 'Hotel Conference', 'Hall', 'Hen Party', 'Hack Day', 'Hotel Bar', 'IT Training', 'Interview Room', 'Kids\' Birthday', 'Karaoke', 'Kitchen', 'Launch Party', 'Late Night', 'Leaving Party', 'Lecture Theatre', 'Leavers Ball', 'Live Music', 'Live Gig', 'Library', 'Meeting Room', 'Meet-Up', 'Museum', 'Market Research', 'Manor Houses', 'Networking', 'New Year\'s Eve Party', 'Office Party', 'Office Drinks', 'Outdoor', 'Open Air', 'Photography', 'Pop-Up', 'Private Parties', 'Private Dining', 'Private Screening', 'Product Launches', 'Promotional Event', 'Pub', 'Proposal', 'PR Event', 'Press Show', 'Presentation', 'Penthouse', 'Private Party', 'Prom', 'Pop-Up Bar', 'Pop-Up Restaurant', 'Pop-Up Shop', 'Pub Function Room', 'Performance Space', 'Pilates Class', 'Pub Quiz', 'Piano Recital', 'Personal Training', 'Pier', 'Reception Venue', 'Rooftop', 'Restaurant', 'Rooftop Bar', 'Roof Terrace', 'Rehearsal Space', 'Railway Arch', 'Recital', 'Recording Studio', 'Railway Cabin', 'Summer Party', 'Screening', 'Staff Party', 'Speakeasy', 'Supper Club', 'Seminar', 'School Hall', 'Stadium', 'Studio', 'Surprise Birthday', 'Stand-Up Comedy', 'Sports Hall', 'Team Building', 'Training Room', 'Theatre', 'Tasting', 'Tea Party', 'Tube Carriage', 'Therapy', 'Train', 'Taxi', 'Village Hall', 'Wedding', 'Wedding Reception', 'Wedding Ceremony', 'Wedding Dinner', 'Warehouse', 'Wet Hire', 'Warehouse Rooftop', 'Wine Tasting', 'Workshop', 'Wedding Breakfast', 'Wake', 'Wooden Floor', 'Xmas Party', 'Xmas Dinner', 'Xmas Package', 'Xmas Lunch', 'Yoga Classes'
        ]
    },
    fullScreenPanel: {
        activeFilters: 0,
        isVisible: false
    },
    mapState: {
        searchOnMapMove: true,
        mapPanelVisible: false,
        mapBounds: {
            neLat: '',
            neLong: '',
            swLat: '',
            swLong: ''
        }
    },
    navigation: {
        dropdown: {
            isVisible: false,
            linkGroups: [2, 4]
        },
        linkGroups: [
            {
                id: 1,
                title: 'General',
                links: [
                    {
                        id: 1,
                        icon: '',
                        title: 'Home',
                        url: '/'
                    }
                ]
            },
            {
                id: 2,
                title: 'Dashboard',
                links: [
                    {
                        id: 1,
                        icon: 'person',
                        title: 'Profile',
                        url: '/dashboard/profile'
                    },
                    {
                        id: 2,
                        icon: 'suitcase',
                        title: 'Bookings',
                        url: '/dashboard/bookings'
                    },
                    {
                        id: 3,
                        icon: 'speech-bubble',
                        title: 'Inbox',
                        url: '/dashboard/inbox'
                    },
                    {
                        id: 4,
                        icon: 'heart',
                        title: 'Favourites',
                        url: '/dashboard/favourites'
                    }
                ]
            },
            {
                id: 3,
                title: 'Listing',
                links: [
                    {
                        id: 1,
                        icon: '',
                        title: 'List a Space',
                        url: '/get-started'
                    }
                ]
            },
            {
                id: 4,
                title: 'User Actions',
                links: [
                    // {
                    //     id: 1,
                    //     icon: '',
                    //     title: 'Help',
                    //     url: '/help'
                    // },
                    // {
                    //     id: 2,
                    //     icon: '',
                    //     title: 'Invite Friends',
                    //     url: '/invite-friends'
                    // },
                    {
                        id: 3,
                        icon: '',
                        title: 'Log Out',
                        url: '/users/logout'
                    }
                ]
            }
        ]
    },
    verticals: [
        {
            id: 1,
            title: 'For you',
            layoutType: 2
        },
        {
            id: 2,
            title: 'Meeting',
            layoutType: 1,
            filterGroups: [
                {
                    id: 1,
                    title: 'Room type',
                    type: 'small',
                    filters: [
                        {
                            id: 1,
                            title: 'Dapibus Egestas',
                            subtitle: 'Tellus Etiam Venenatis Porta Ligula',
                            icon: true,
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 2,
                            title: 'Adipiscing Fringilla',
                            subtitle: 'Tellus Etiam Venenatis Porta Ligula',
                            icon: true,
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 3,
                            title: 'Parturient Tortor',
                            subtitle: 'Adipiscing Elit Fusce Tellus Cras',
                            icon: true,
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 4,
                            title: 'Lorem Condimentum',
                            subtitle: 'Sollicitudin Nibh Commodo Euismod Dolor',
                            icon: true,
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 5,
                            title: 'Egestas Venenatis',
                            subtitle: 'Nibh Risus Sem Pharetra Parturient',
                            icon: true,
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 6,
                            title: 'Tristique Fusce',
                            subtitle: 'Dolor Aenean Tellus Consectetur Etiam',
                            icon: true,
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 7,
                            title: 'Ornare Lorem',
                            subtitle: 'Consectetur Ipsum Pellentesque Nibh Fusce',
                            icon: true,
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 8,
                            title: 'Risus Nibh',
                            subtitle: 'Euismod Ipsum Nullam Aenean Tortor',
                            icon: true,
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        }
                    ]
                },
                {
                    id: 5,
                    title: 'Price range',
                    type: 'small',
                    filters: [
                        {
                            id: 13,
                            title: 'Slide your price',
                            data: {
                                default: 5,
                                min: 5,
                                max: 500,
                                value: 5
                            },
                            inputType: 'slider',
                            options: {
                                sliderType: 'price'
                                // graphics: {
                                //     type: 'bar',
                                //     buckets: 10,
                                //     data: {
                                //         1: 56,
                                //         2: 67,
                                //         3: 46
                                //     }
                                // }
                            }
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Room layout',
                    type: 'small',
                    filters: [
                        {
                            id: 9,
                            title: 'Banquet',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 10,
                            title: 'Boardroom',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 11,
                            title: 'Cabaret',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 12,
                            title: 'Classroom',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 13,
                            title: 'Reception',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 14,
                            title: 'Theatre',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 15,
                            title: 'U-Shaped',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'Amenities',
                    type: 'large',
                    filters: [
                        {
                            id: 16,
                            title: 'Accessibility',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 17,
                            title: 'Conferencing Phone',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 18,
                            title: 'External catering allowed',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 19,
                            title: 'Flipchart',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 20,
                            title: 'Lunch',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 21,
                            title: 'Parking',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 22,
                            title: 'Pen/Paper',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 23,
                            title: 'Projector/TV/Screen',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 24,
                            title: 'Tea/Coffee',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 25,
                            title: 'Video Conferencing Phone',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 26,
                            title: 'Whiteboards',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 27,
                            title: 'Windows/Natural Light',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 28,
                            title: 'Wireless Internet Access',
                            inputType: 'checkbox',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        }
                    ]
                },
                {
                    id: 4,
                    title: 'Live bookings',
                    type: 'small',
                    filters: [
                        {
                            id: 29,
                            title: 'Instant Book',
                            subtitle: 'Spaces you can book without waiting for host approval',
                            inputType: 'toggle-switch',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        }
                    ]
                },
                {
                    id: 5,
                    title: 'Other',
                    type: 'small',
                    filters: [
                        {
                            id: 30,
                            title: 'Radio',
                            inputType: 'radio',
                            value: 'value',
                            data: {
                                type: 'bool',
                                default: false,
                                value: false
                            }
                        },
                        {
                            id: 31,
                            title: 'Increment',
                            inputType: 'increment',
                            data: {
                                type: 'number',
                                default: 0,
                                max: null,
                                min: 0,
                                value: 0
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            title: 'Office',
            layoutType: 1,
            filterGroups: []
        },
        {
            id: 4,
            title: 'Party',
            layoutType: 1,
            filterGroups: [
                // {
                //     id: 1,
                //     title: 'Event Type',
                //     type: 'autocomplete',
                //     filters: [
                //         {
                //             id: 31,
                //             title: 'Search',
                //             inputType: 'text',
                //             data: {
                //                 type: 'string',
                //                 default: '',
                //                 value: ''
                //             }
                //         }
                //     ]
                // }
            ]
        },
        {
            id: 5,
            title: 'Dining',
            layoutType: 1,
            filterGroups: []
        },
        {
            id: 6,
            title: 'Wedding',
            layoutType: 2,
            filterGroups: []
        }
    ],
    searchParams: {
        eventType: '',
        location: '',
        date: '',
        guests: 1
    },
    searchResults: {
        pageSize: 40,
        params: {
            lat: '51.5073509',
            location: 'London, United Kingdom',
            lon: '-0.12775829999998223',
            max_price: '500',
            min_price: '0',
            ne_lat: '51.6723432',
            ne_lon: '0.1482319000000416',
            page: '1',
            sw_lat: '51.38494009999999',
            sw_lon: '-0.351468299999965',
            usages: '[3]',
            zoom: '12'
        },
        roomCount: 2084,
        rooms: [
            {
                "company_name": "The Academy Room @ Newman House",
                "currency_code": "GBP",
                "daily_delegate_rate": "0.0000",
                "daily_rate": "85.0000",
                "discount_daily_delegate_rate": null,
                "discount_daily_rate": null,
                "discount_hourly_rate": null,
                "discount_monthly_rate": null,
                "distance": "1.312808883683317",
                "favourite_title": "Favourite Meeting Room",
                "hourly_rate": "20.0000",
                "id": "1911",
                "images": ["https://www.zipcube.com/images/1911/639_428_1e71ebac870a2ffdb212fd2ecf36eadd.jpg"],
                "img_flagged": "1",
                "img_id": "6782",
                "last_booked": "2017-07-06 08:20:17",
                "lat": "51.5180179",
                "long": "-0.1358892",
                "max_capacity": "15",
                "monthly_rate": null,
                "num_of_desks": "0",
                "page_viewed": "2491",
                "review_count": "9",
                "review_score": "4.9",
                "room_desc": "A flexible meeting space in the heart of London, The Academy Room comfortably seats six around our meeting table, along with extra sofa &amp; armchair seats.↵↵It is perfect for client meetings, conferences calls, pitches, presentations, castings, auditions or filming.↵↵...",
                "room_favourite": "0",
                "room_sponsored": "0",
                "room_url": "https://www.zipcube.com/uk/meeting-rooms/london/1911",
                "title": "The Academy Room",
                "usage_id": "3",
                "usagesuperset_alias": "meeting-rooms",
                "usagesuperset_itemname": "Meeting Room",
                "user_discount": null,
                "uses_live_bookings": "0",
                "venue_city": "London",
                "venue_country_code": "GB",
                "venue_name": "The Academy Room @ Newman House",
                "venue_postcode": "W1T",
                "venue_road": "Newman Street",
                isFavourite: true
            },
            {
                "company_name": "The Academy Room @ Newman House",
                "currency_code": "GBP",
                "daily_delegate_rate": "0.0000",
                "daily_rate": "85.0000",
                "discount_daily_delegate_rate": null,
                "discount_daily_rate": null,
                "discount_hourly_rate": null,
                "discount_monthly_rate": null,
                "distance": "1.312808883683317",
                "favourite_title": "Favourite Meeting Room",
                "hourly_rate": "20.0000",
                "id": "1912",
                "images": ["https://www.zipcube.com/images/1911/639_428_1e71ebac870a2ffdb212fd2ecf36eadd.jpg"],
                "img_flagged": "1",
                "img_id": "6782",
                "last_booked": "2017-07-06 08:20:17",
                "lat": "51.5180179",
                "long": "-0.1358892",
                "max_capacity": "15",
                "monthly_rate": null,
                "num_of_desks": "0",
                "page_viewed": "2491",
                "review_count": "9",
                "review_score": "4.9",
                "room_desc": "A flexible meeting space in the heart of London, The Academy Room comfortably seats six around our meeting table, along with extra sofa &amp; armchair seats.↵↵It is perfect for client meetings, conferences calls, pitches, presentations, castings, auditions or filming.↵↵...",
                "room_favourite": "0",
                "room_sponsored": "0",
                "room_url": "https://www.zipcube.com/uk/meeting-rooms/london/1911",
                "title": "The Academy Room",
                "usage_id": "3",
                "usagesuperset_alias": "meeting-rooms",
                "usagesuperset_itemname": "Meeting Room",
                "user_discount": null,
                "uses_live_bookings": "0",
                "venue_city": "London",
                "venue_country_code": "GB",
                "venue_name": "The Academy Room @ Newman House",
                "venue_postcode": "W1T",
                "venue_road": "Newman Street",
                isFavourite: false
            },
            {
                "company_name": "The Academy Room @ Newman House",
                "currency_code": "GBP",
                "daily_delegate_rate": "0.0000",
                "daily_rate": "85.0000",
                "discount_daily_delegate_rate": null,
                "discount_daily_rate": null,
                "discount_hourly_rate": null,
                "discount_monthly_rate": null,
                "distance": "1.312808883683317",
                "favourite_title": "Favourite Meeting Room",
                "hourly_rate": "20.0000",
                "id": "1913",
                "images": ["https://www.zipcube.com/images/1911/639_428_1e71ebac870a2ffdb212fd2ecf36eadd.jpg"],
                "img_flagged": "1",
                "img_id": "6782",
                "last_booked": "2017-07-06 08:20:17",
                "lat": "51.5180179",
                "long": "-0.1358892",
                "max_capacity": "15",
                "monthly_rate": null,
                "num_of_desks": "0",
                "page_viewed": "2491",
                "review_count": "9",
                "review_score": "4.9",
                "room_desc": "A flexible meeting space in the heart of London, The Academy Room comfortably seats six around our meeting table, along with extra sofa &amp; armchair seats.↵↵It is perfect for client meetings, conferences calls, pitches, presentations, castings, auditions or filming.↵↵...",
                "room_favourite": "0",
                "room_sponsored": "0",
                "room_url": "https://www.zipcube.com/uk/meeting-rooms/london/1911",
                "title": "The Academy Room",
                "usage_id": "3",
                "usagesuperset_alias": "meeting-rooms",
                "usagesuperset_itemname": "Meeting Room",
                "user_discount": null,
                "uses_live_bookings": "0",
                "venue_city": "London",
                "venue_country_code": "GB",
                "venue_name": "The Academy Room @ Newman House",
                "venue_postcode": "W1T",
                "venue_road": "Newman Street",
                isFavourite: true
            },
            {
                "company_name": "The Academy Room @ Newman House",
                "currency_code": "GBP",
                "daily_delegate_rate": "0.0000",
                "daily_rate": "85.0000",
                "discount_daily_delegate_rate": null,
                "discount_daily_rate": null,
                "discount_hourly_rate": null,
                "discount_monthly_rate": null,
                "distance": "1.312808883683317",
                "favourite_title": "Favourite Meeting Room",
                "hourly_rate": "20.0000",
                "id": "1914",
                "images": ["https://www.zipcube.com/images/1911/639_428_1e71ebac870a2ffdb212fd2ecf36eadd.jpg"],
                "img_flagged": "1",
                "img_id": "6782",
                "last_booked": "2017-07-06 08:20:17",
                "lat": "51.5180179",
                "long": "-0.1358892",
                "max_capacity": "15",
                "monthly_rate": null,
                "num_of_desks": "0",
                "page_viewed": "2491",
                "review_count": "9",
                "review_score": "4.9",
                "room_desc": "A flexible meeting space in the heart of London, The Academy Room comfortably seats six around our meeting table, along with extra sofa &amp; armchair seats.↵↵It is perfect for client meetings, conferences calls, pitches, presentations, castings, auditions or filming.↵↵...",
                "room_favourite": "0",
                "room_sponsored": "0",
                "room_url": "https://www.zipcube.com/uk/meeting-rooms/london/1911",
                "title": "The Academy Room",
                "usage_id": "3",
                "usagesuperset_alias": "meeting-rooms",
                "usagesuperset_itemname": "Meeting Room",
                "user_discount": null,
                "uses_live_bookings": "0",
                "venue_city": "London",
                "venue_country_code": "GB",
                "venue_name": "The Academy Room @ Newman House",
                "venue_postcode": "W1T",
                "venue_road": "Newman Street",
                isFavourite: false
            }
        ]
    },
    user: {
        id: 1,
        first_name: 'Andrew',
        last_name: 'Gower',
        email_address: 'amogower@gmail.com',
        avatar: 'http://localhost/images/users/3214/userpic_profile.jpg',
        favourites: [
            1911,
            1912
        ]
    }
};

export default initialState;
