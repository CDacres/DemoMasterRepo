import gql from 'graphql-tag';

export const contextFieldsFragment = gql`
fragment contextFields on ProductContext {
  website
  configurations {
    kind
    maxPax
  }
  amenities {
    note suppressed
    amenity { id }
    price { currency value }
  }
  schedule {
    days {
      day
      spans { start end }
    }
  }
  tags {
    tag {
      id
    }
    suppressed
  }
  menus {
    description
    priceOptions {
      kind description
      price { currency value }
    }
    groups {
      description orderIndex
      items {
        description orderIndex
        priceOptions {
          kind description
          price { currency value }
        }
      }
    }
  }
}
`;
