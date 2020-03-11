export type AddressInput = {
  autocomplete: string;
  city: string;
  country: string;
  // 2 character country code (per google)
  countryCode: string;
  county: string;
  extra: string;
  formattedAddress: string;
  // google placeId
  placeId: string;
  postcode: string;
  street: string;
  streetNumber: string;
  town: string;
};
