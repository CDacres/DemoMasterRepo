import gql from 'graphql-tag';
import { contextFieldsFragment } from './contextFields';

export const assetFieldsFragment = gql`
fragment assetFields on ListingsAsset {
  id description name currency
  context { ...contextFields }
  location {
    specialInstructions
    address { formattedAddress streetNumber street extra city county country countryCode postcode town autocomplete }
    coords { lat lng }
    nearbyPlaces {
      name types
      distance { value unit }
    }
  }
  images {
    description orderIndex
    image {
      id type
      tags { id description }
      imageUrls { url imageSize }
      downloadLink
    }
  }
  usages {
    name description category
    context { ...contextFields }
    products {
      id description name unit coverage perPerson
      parameters {
        depositPercent depositAmount { value currency }
        constraints {
          guests { minPax maxPax }
          duration { minDuration maxDuration }
          spend { minSpendAmount { currency value }}
        }
      }
      unitPrice { value currency }
      context { ...contextFields }
      includes { description orderIndex }
    }
  }
  area {
    value
    unit
  }
}
${contextFieldsFragment}
`;
