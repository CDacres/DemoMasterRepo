import { VenueType } from '@src/core/domain';
import { Catalog } from '@src/core';

const _itemsSource: VenueType[] = [
  {
    description: 'listing.hotel_1_star',
    id: 13,
  },
  {
    description: 'listing.hotel_2_star',
    id: 14,
  },
  {
    description: 'listing.hotel_3_star',
    id: 15,
  },
  {
    description: 'listing.hotel_4_star',
    id: 16,
  },
  {
    description: 'listing.hotel_5_star',
    id: 17,
  },
  {
    description: 'listing.art_theatre',
    id: 1,
  },
  {
    description: 'listing.bar',
    id: 18,
  },
  {
    description: 'listing.boat',
    id: 11,
  },
  {
    description: 'listing.coffee_house',
    id: 2,
  },
  {
    description: 'listing.convention_centre',
    id: 3,
  },
  {
    description: 'listing.coworking_space',
    id: 10,
  },
  {
    description: 'listing.gallery',
    id: 19,
  },
  {
    description: 'listing.golf_club',
    id: 20,
  },
  {
    description: 'listing.government_nonprofit',
    id: 4,
  },
  {
    description: 'listing.hotel',
    id: 5,
  },
  {
    description: 'listing.museum',
    id: 21,
  },
  {
    description: 'listing.music_venue',
    id: 22,
  },
  {
    description: 'listing.office_commercial',
    id: 6,
  },
  {
    description: 'listing.other_event',
    id: 23,
  },
  {
    description: 'listing.penthouse',
    id: 24,
  },
  {
    description: 'listing.photo_studio',
    id: 12,
  },
  {
    description: 'listing.private_club',
    id: 25,
  },
  {
    description: 'listing.pub',
    id: 29,
  },
  {
    description: 'listing.restaurant',
    id: 26,
  },
  {
    description: 'listing.restaurant_bar_club',
    id: 8,
  },
  {
    description: 'listing.school_university_training',
    id: 7,
  },
  {
    description: 'listing.sport_venue',
    id: 27,
  },
  {
    description: 'listing.unique_space',
    id: 9,
  },
  {
    description: 'listing.wedding_venue',
    id: 28,
  },
];

export const venueTypeCatalog = new Catalog<VenueType>().withItems(_itemsSource);
