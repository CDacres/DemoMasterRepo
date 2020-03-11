/* tslint:disable:max-line-length */
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, DefaultOptions } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import * as mutations from '@src/sideeffects/data/mutations';
import { persistCache } from 'apollo-cache-persist';
// import { Ref } from '@src/core';
import { Store } from '@src/typings/types';

// import {
//   ListingsV1Space,
//   ListingsV1Venue,
//   ListingsV1UpsertVenueSpaceInput,
//   ListingsV1DeleteVenueSpaceInput,
//   ListingsV1UpdateVenueAmenitiesInput,
//   ListingsV1UpsertVenueInput
// } from '@src/core/domain';
// import { resolveAsset } from '@src/data/seed/resolveAsset';
// import { adminInfo as meetingAdminInfo, assetTags as meetingAssetTags } from '@src/data/product/meeting';

// import * as T from '@src/sideeffects/data/types';

export type GqlClientOpts = {
  uri: string;
  localStorage?: boolean;
  auth: Store.Auth;
};

type Headers = {
  Authorization?: string;
};

export class GqlClient {

  adapter: ApolloClient<any>;

  constructor({ uri, ...opts }: GqlClientOpts) {
    if (!process.browser) {
      throw Error('CSR Only');
    }

    const cache = new InMemoryCache({});
    if (opts.localStorage) {
      persistCache({
        cache,
        storage: localStorage,
        key: 'gql_client',
      });
    }

    const defaultOptions: DefaultOptions = { // TODO: we will definitely want to cache in production
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    };

    const headers: Headers = {};
    if (opts.auth.tokens && opts.auth.tokens.dataApi) {
      headers.Authorization = 'Bearer ' + opts.auth.tokens.dataApi;
    }

    this.adapter = new ApolloClient({
      link: createUploadLink({
        uri,
        headers,
      }),
      cache,
      defaultOptions,
    });
  }

  // uploadImage = (args: { input: T.UploadImageInput }): Promise<boolean> => {
    // return mutations.uploadImage(this.adapter, args).then(x => x.data.uploadImage.success);
  // }

  // deleteVenue = async (args: { input: { venueId: Ref } }) => {
  //   await this.adapter.mutate<GQLResult, { input: { venueId: Ref } }>({
  //     mutation: gql`mutation listingsV1DeleteVenue($input: ListingsV1DeleteVenueInput!) {
  //       listingsV1DeleteVenue(input: $input) {success}
  //   }`,
  //     variables: args,
  //   });
  // }

  // assetIdMapFromHumanRefs = async (args: { refs: [Ref] }) => {
  //   return await this.adapter.query<{ assetIdMapFromHumanRefs: IdMap[] }, { refs: Ref[] }>({
  //     query: gql`query assetIdMapFromHumanRefs($refs: [ Ref ]) {
  //     assetIdMapFromHumanRefs(refs:$refs) {
  //       id
  //       humanRef
  //     }
  //   }`, variables: args,
  //   }).then(x => x.data.assetIdMapFromHumanRefs);
  // }

  // venue = async (args: { id: Ref }) => {
  //   await this.adapter.query<{ venue: ListingsV1Venue }, { id: Ref }>({
  //     query: gql`query venue($id: Ref) {
  //       venue(id:$id) {
  //           id
  //           description
  //           name
  //           currency
  //           website
  //           venueTypeId
  //           location {
  //               address { formattedAddress streetNumber street extra city country countryCode postcode }
  //               coords { lat lng }
  //               nearbyPlaces { name distance { value unit} types}
  //               specialInstructions
  //           }
  //           amenities {
  //               amenity {id description}
  //               price {currency value}
  //               note excludedSpaces
  //               isActive }

  //           images { id description orderIndex imageType image {id tags {id description } urls {largeUrl originalUrl thumbUrl}} }

  //           packages {
  //               id description category
  //               parameters {
  //                   unit unitPrice {currency value }
  //                   # depositAmount
  //               }
  //               includes { description orderIndex}
  //           }
  //           openingHours { day spans {start end} }
  //           menus {
  //               description
  //               priceOptions { kind description price { currency value}}
  //               groups {description orderIndex
  //                   items {description orderIndex
  //                       priceOptions {kind description price {currency value}}}
  //               }
  //           }
  //       }
  //   }`,
  //     variables: args,
  //   }).then(x => x.data.venue);
  // }

  // spaces = async (args: { id?: Ref; venueId?: Ref }) => {
  //   await this.adapter.query<{ spaces: ListingsV1Space[] }, { id?: Ref; venueId?: Ref }>({
  //     query: gql`query spaces($id: Ref, $venueId: Ref) {
  //       spaces(id: $id, venueId: $venueId) {
  //           id venueId
  //           category kind
  //           currency name description
  //           instances
  //           capacity {
  //               area { value unit }
  //               configurations {
  //                   kind
  //                   maxPax
  //               }
  //           }
  //           styles
  //           images {
  //               id
  //               description
  //               orderIndex
  //               image {
  //                   id
  //                   tags { id description }
  //                   urls {
  //                       largeUrl
  //                       originalUrl
  //                       thumbUrl
  //                   }
  //               }
  //           }
  //           prices {
  //             id
  //             name
  //             categories
  //             parameters {
  //                 unitPrice { currency value }
  //                 unit
  //                 coverage
  //                 schedule {days { day spans {start end}}}
  //                 constraints {
  //                     guests { minPax maxPax }
  //                     duration { minDuration maxDuration }
  //                     spend { minSpendAmount {currency value} }
  //                 }
  //                 depositAmount { currency value}
  //                 depositPercent
  //             }
  //           }
  //       }
  //   }`,
  //     variables: args,
  //   }).then(x => x.data.spaces);
  // }

  // upsertSpace = async (args: { input: ListingsV1UpsertVenueSpaceInput }) => {
  //   await this.adapter.mutate<GQLResult, { input: ListingsV1UpsertVenueSpaceInput }>({
  //     mutation: gql`mutation listingsV1UpsertVenueSpace($input:ListingsV1UpsertVenueSpaceInput!){
  //       listingsV1UpsertVenueSpace(input:$input) {success}
  //   }`,
  //     variables: args,
  //   });
  // }

  // deleteSpace = async (args: { input: ListingsV1DeleteVenueSpaceInput }) => {
  //   return await this.adapter.mutate<GQLResult, { input: ListingsV1DeleteVenueSpaceInput }>({
  //     mutation: gql`mutation listingsV1DeleteVenueSpace($input: ListingsV1DeleteVenueSpaceInput!){
  //         listingsV1DeleteVenueSpace(input: $input){success}
  //     }`,
  //     variables: args,
  //   });
  // }

  // updateVenueAmenities = async (args: { input: ListingsV1UpdateVenueAmenitiesInput }) => {
  //   return await this.adapter.mutate<GQLResult, { input: ListingsV1UpdateVenueAmenitiesInput }>({
  //     mutation: gql`mutation listingsV1UpdateVenueAmenities($input: ListingsV1UpdateVenueAmenitiesInput!){
  //         listingsV1UpdateVenueAmenities(input:$input){success}
  //     }`,
  //     variables: args,
  //   });
  // }

  // upsertVenue = async (args: { input: ListingsV1UpsertVenueInput }) => {
  //   return await this.adapter.mutate<GQLResult, { input: ListingsV1UpsertVenueInput }>({
  //     mutation: gql`mutation listingsV1UpsertVenue($input:ListingsV1UpsertVenueInput!){
  //       listingsV1UpsertVenue(input:$input) {success}
  //   }`,
  //     variables: args,
  //   });
  // }

  // updateAssetImages = async () => {
  //   return { success: true };
  // }

  // amenities = async () => {
  //   return [];
  // }
}

export const clientFactory = (auth: Store.Auth): GqlClient => process.browser ? new GqlClient({
  // todo
  uri: 'https://api.zipcube.local/graphql',
  localStorage: true,
  auth,
}) : null;
