export type Address = {
  /*
    autocomplete value
    */
  autocomplete?: string;
  /*
  city, locality
   */
  city?: string;
  /*
  native country name
   */
  country?: string;
  /*
  code ISO 3166-1 alpha-2 (cca2)
   */
  countryCode: string;
  /*
  county, state, administrative_level_2
   */
  county?: string;
  /*
  extra, apt, opt
   */
  extra?: string;
  /*
  formattedAddress, full_address, postal_address
   */
  formattedAddress: string;
  /*
  placeId
   */
  placeId?: string;
  /*
  postcode, postal code, zip code
   */
  postcode?: string;
  /*
  street, street_address
   */
  street: string;
  /*
  street_number
   */
  streetNumber?: string;
  /*
  postal_town
   */
  town?: string;
};
