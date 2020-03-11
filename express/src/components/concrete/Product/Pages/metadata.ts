import { ProductCategory } from '@src/core/domain';

export type ProductImage = {
  main: string;
  secondary?: string;
  tertiary?: string;
};

export enum ProductSection {
  Summary = 'Summary',
  AdminInfo = 'AdminInfo',
  AdminTag = 'AdminTag',
  Highlight = 'Highlight',
  Detail = 'Detail',
  Option = 'Option',
  Exclusive = 'Exclusive',
  Amenity = 'Amenity',
  Menu = 'Menu',
  Location = 'Location',
  Schedule = 'Schedule',
  OtherSpace = 'OtherSpace',
  Review = 'Review',
}

export type ProductPageMeta = {
  bookLabel: string;

  // this give visibility and order of sections based on category
  sections: ProductSection[];

  summary: {
    title: string;
  };
  review: {
    per_page: number;
  };
  options: {
    title: string;
  };
};

export const productPageMeta: Record<ProductCategory, ProductPageMeta> = {
  MEETING: {
    bookLabel: 'room.book',
    summary: {
      title: 'common.meeting',
    },
    review: {
      per_page: 7,
    },
    options: {
      title: 'room.prices_and_packages',
    },
    sections: [
      ProductSection.Summary,
      ProductSection.AdminInfo,
      ProductSection.AdminTag,
      ProductSection.Highlight,
      ProductSection.Detail,
      ProductSection.Option,
      ProductSection.Exclusive,
      ProductSection.Amenity,
      ProductSection.Menu,
      ProductSection.Location,
      ProductSection.Schedule,
      ProductSection.OtherSpace,
      ProductSection.Review,
    ],
  },
  OFFICE: {
    bookLabel: 'room.book_viewing',
    summary: {
      title: 'common.office',
    },
    review: {
      per_page: 7,
    },
    options: {
      title: 'room.pricing',
    },
    sections: [
      ProductSection.Summary,
      ProductSection.AdminInfo,
      ProductSection.AdminTag,
      ProductSection.Highlight,
      ProductSection.Detail,
      ProductSection.Option,
      ProductSection.Location,
      ProductSection.Schedule,
      ProductSection.Review,
    ],
  },
  PARTY: {
    bookLabel: 'room.book',
    summary: {
      title: 'common.party',
    },
    review: {
      per_page: 7,
    },
    options: {
      title: 'room.prices_and_packages',
    },
    sections: [
      ProductSection.Summary,
      ProductSection.AdminInfo,
      ProductSection.AdminTag,
      ProductSection.Highlight,
      ProductSection.Detail,
      ProductSection.Option,
      ProductSection.Exclusive,
      ProductSection.Menu,
      ProductSection.Amenity,
      ProductSection.Location,
      ProductSection.Schedule,
      ProductSection.Review,
    ],
  },
  DINING: {
    bookLabel: 'room.book',
    summary: {
      title: 'common.dining',
    },
    review: {
      per_page: 7,
    },
    options: {
      title: 'room.prices_and_packages',
    },
    sections: [
      ProductSection.Summary,
      ProductSection.AdminInfo,
      ProductSection.AdminTag,
      ProductSection.Highlight,
      ProductSection.Detail,
      ProductSection.Option,
      ProductSection.Exclusive,
      ProductSection.Menu,
      ProductSection.Amenity,
      ProductSection.Location,
      ProductSection.Schedule,
      ProductSection.Review,
    ],
  },
  WEDDING: {
    bookLabel: 'room.book',
    summary: {
      title: 'wedding',
    },
    review: {
      per_page: 7,
    },
    options: {
      title: 'room.prices_and_packages',
    },
    sections: [
      ProductSection.Summary,
      ProductSection.AdminInfo,
      ProductSection.AdminTag,
      ProductSection.Highlight,
      ProductSection.Detail,
      ProductSection.Option,
      ProductSection.Exclusive,
      ProductSection.Menu,
      ProductSection.Amenity,
      ProductSection.Location,
      ProductSection.Schedule,
      ProductSection.Review,
    ],
  },
};
