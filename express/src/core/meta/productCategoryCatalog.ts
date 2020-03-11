import { PriceCoverage, ProductCategory, ProductCategoryMeta, TimeUnit } from '@src/core/domain';
import { Catalog } from '@src/core';

const _itemsSource: ProductCategoryMeta[] = [
  {
    allowPackages: true,
    description: 'common.meeting_rooms',
    icon: 'Meeting',
    id: ProductCategory.MEETING,
    imageSubtitle: 'listing.space_image_meeting_subtitle',
    standardModels: [
      TimeUnit.HOUR,
      'HALFDAY',
      TimeUnit.DAY,
    ],
    subtitle: 'listing.space_meeting_desc',
    tip: 'listing.price_tip_meeting',
    userModels: [
      TimeUnit.HOUR,
      TimeUnit.DAY,
    ],
  },
  {
    allowPackages: false,
    description: 'common.office',
    icon: 'Office',
    id: ProductCategory.OFFICE,
    imageSubtitle: 'listing.space_image_office_subtitle',
    standardModels: [TimeUnit.MONTH],
    subtitle: 'listing.space_office_desc',
    tip: 'listing.price_tip_office',
    userModels: [],
  },
  {
    allowPackages: true,
    description: 'common.party',
    icon: 'Party',
    id: ProductCategory.PARTY,
    imageSubtitle: 'listing.space_image_party_subtitle',
    standardModels: [],
    subtitle: 'listing.space_party_desc',
    tip: 'listing.price_tip_party',
    userModels: [
      PriceCoverage.MINIMUMSPEND,
      PriceCoverage.FLATRATE,
    ],
  },
  {
    allowPackages: true,
    description: 'common.dining',
    icon: 'Dining',
    id: ProductCategory.DINING,
    imageSubtitle: 'listing.space_image_dining_subtitle',
    standardModels: [],
    subtitle: 'listing.space_dining_desc',
    tip: 'listing.price_tip_dining',
    userModels: [
      PriceCoverage.MINIMUMSPEND,
      PriceCoverage.FLATRATE,
    ],
  },
  {
    allowPackages: true,
    description: 'common.wedding',
    icon: 'Wedding',
    id: ProductCategory.WEDDING,
    imageSubtitle: 'listing.space_image_wedding_subtitle',
    standardModels: [PriceCoverage.MINIMUMSPEND],
    subtitle: 'listing.space_wedding_desc',
    tip: 'listing.price_tip_wedding',
    userModels: [
      PriceCoverage.MINIMUMSPEND,
      PriceCoverage.FLATRATE,
    ],
  },
];

export const productCategoryCatalog = new Catalog<ProductCategoryMeta>().withItems(_itemsSource);
