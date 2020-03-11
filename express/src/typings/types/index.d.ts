import { AnyAction, Reducer } from 'redux';

import { ApiResponse } from '@src/typings/interfaces';
import { ConfigurationKind } from '@src/core/domain';
import { ID, Ref } from '@src/core';
import RoomConfig = Store.RoomConfig;

export as namespace Nav;
declare namespace Nav {
  type Dropdown = {
    isVisible: boolean;
    linkGroups: number[];
  };

  type DropdownLink = {
    action?: () => void;
    id: number;
    icon?: object;
    shown: boolean;
    tel?: string;
    subtitle?: { transKey: string };
    title: { transKey: string };
    url?: string;
  };

  type DropdownLinkGroup = { links: DropdownLink[] };
};

export as namespace API;
declare namespace API {
  declare namespace Responses {
    type SingleResource = {
      attributes: { [x: string]: any };
      id: string;
      type: string;
    };

    type MultipleResources = {
      attributes: { [x: string]: any };
      id: string;
      type: string;
    };
  };
}

export as namespace Store;
declare namespace Store {
  type State = {
    admin?: { siteImages: Admin.SiteImages };
    auth: Auth;
    config: Config;
    lang: Lang;
    pages?: {
      browse?: Pages.Browse;
      landing?: Pages.Landing;
      search?: Pages.Search;
      widget?: Pages.Widget;
    };
    responsive: Responsive;
    search?: Search;
  };

  declare namespace Admin {
    type SiteImages = {
      isLoading: boolean;
      uploads: SingleResource[];
    };
  };

  type Auth = {
    tokens: Tokens;
    user: User;
  };

  declare namespace Auth {
    type Tokens = { dataApi: string };

    type User = {
      adminModeId?: number;
      avatar?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      id: string | number;
      isAdmin: boolean;
      isLoggedIn: boolean;
      isSpoofMode: boolean;
      isVenueOwner: boolean;
    };
  };

  type Config = {
    apiUrl: string;
    bounds: Bounds;
    countryCode: string;
    countryName: string;
    datepickerLang: string;
    defaultLocation: Location;
    defaultSlug: string;
    domain: string;
    footer: FooterOptions;
    header: HeaderOptions;
    language: string;
    languageName: string;
    locale: string;
    phone: Phone;
    // redirect: {
    //   lastUrl: string;
    //   wasRedirected: boolean;
    // };
    route: Route;
    trackingCookieId: string;
  };

  type Error = { uid: string };

  type Lang = {
    [propName: string]: { [propName: string]: string };
  };

  type Navigation = {
    adminHelpDropdown: Nav.Dropdown;
    dropdown: Nav.Dropdown;
    helpDropdown: Nav.Dropdown;
    inventDropdown: Nav.Dropdown;
    invoiceDropdown: Nav.Dropdown;
    linkGroups: [
      {
        id: number;
        title: { transKey: string };
        links: Nav.DropdownLink[];
      }
    ];
    mobAdminHelpDropdown: Nav.Dropdown;
    mobDropdown: Nav.Dropdown;
    mobHelpDropdown: Nav.Dropdown;
    mobInventDropdown: Nav.Dropdown;
    mobInvoiceDropdown: Nav.Dropdown;
    mobPerfDropdown: Nav.Dropdown;
    mobVenueDropdown: Nav.Dropdown;
    perfDropdown: Nav.Dropdown;
    venueDropdown: Nav.Dropdown;
  };

  declare namespace Pages {
    type Browse = {
      data: {
        attributes: {
          bannerButton?: string;
          bannerImg?: string;
          bannerText?: string;
          bannerTextColor?: string;
          bannerTitle?: string;
          breadcrumbs: BreadcrumbType;
          canonicalUrl: string;
          cards: BrowseCardType;
          cardSubtitle?: string;
          cardTitle?: string;
          category: string;
          helpSubtitle?: string;
          helpTitle?: string;
          htmlTextBottom?: string;
          htmlTextTop?: string;
          locationDesc: string;
          metaDesc: string;
          metaKeyword: string;
          metaTitle: string;
          nearbyLocations: NearbyType;
          nearbyTitle: string;
          pageSubtitle: string;
          pageTitle: string;
          schemaDesc: string;
          schemaName: string;
          searchUrlFull: string;
          tagLabelId: number;
          verticalId: number;
        };
      };
    };

    type Landing = {
      data: {
        attributes: {
          bannerButton?: string;
          bannerImg?: string;
          bannerText?: string;
          bannerTextColor?: string;
          bannerTitle?: string;
          // boundsNeLat: string;
          // boundsNeLon: string;
          // boundsSwLat: string;
          // boundsSwLon: string;
          breadcrumbs: BreadcrumbType;
          canonicalUrl: string;
          cards: LandingCardType;
          country: string;
          favouriteCardSubtitle: string;
          favouriteCardTitle: string;
          helpSubtitle?: string;
          helpTitle?: string;
          htmlTextBottom?: string;
          htmlTextTop?: string;
          itemCards: LandingItemCardType;
          lat: string;
          locationDesc: string;
          long: string;
          // mapPointers: PointerType;
          // mapTitle: string;
          metaDesc: string;
          metaKeyword: string;
          metaTitle: string;
          nearbyLocations: NearbyType;
          nearbyTitle: string;
          pageSubtitle: string;
          pageTitle: string;
          parentLocationDesc: string;
          popularCardSubtitle: string;
          popularCardTitle: string;
          recentCardSubtitle: string;
          recentCardTitle: string;
          relatedLinks: RelatedType;
          relatedTitle: string;
          reviewCardSubtitle: string;
          reviewCardTitle: string;
          schemaDesc: string;
          schemaName: string;
          searchUrlFull: string;
          searchUrlLocation: string;
          tagLabelId: number;
          verticalId: number;
        };
      };
      meta: [{ redirectUrl: string }];
    };

    declare namespace Search {
      type Map = SearchMap;

      type Results = {
        currentPage: number;
        data: SearchResult[];
        from: number;
        isFetching: boolean;
        lastPage: number;
        nextPageUrl: string;
        path: string;
        perPage: number;
        prevPageUrl: string;
        searchObject: SearchObject;
        subtitle: string;
        title: string;
        to: number;
        total: number;
      };
    };

    type Widget = {
      data: {
        attributes: {
          bannerImg?: string;
          bannerSubtitle?: string;
          bannerTitle?: string;
          cards: WidgetCardType;
        };
      };
    };
  }

  type Phone = {
    phoneNumber: string;
    phoneNumberDisplay: string;
  }

  type Route = {
    domainSpecific?: boolean;
    filePath?: string;
    langKey?: string;
    name?: string;
    pathname?: string;
    regExp?: string;
    [x: string]: any;
  }

  type Responsive = {
    desktop: boolean;
    fakeWidth?: number;
    mobile: boolean;
    phone: boolean;
    tablet: boolean;
  };

  type SearchMap = {
    boundsHaveChanged: boolean;
    isStable: boolean;
    isVisible: boolean;
    requiresRefit: boolean;
    shouldSearchOnMapMove: boolean;
  };

  type SearchMapMarker = {
    currency: string;
    id: string;
    position: {
      lat: number;
      lng: number;
    };
    price: number;
  };

  type SearchObject = {
    lat: number;
    long: number;
  };

  type SearchPage = {
    map: SearchMap;
    results: SearchResults;
  };

  type SearchParams = {
    test?: string[]; // TODO: replace this with correct variable
    allDay?: boolean;
    amenities?: string[];
    amenitiesList?: string[];
    cateringList?: string[];
    configurations?: string[];
    cuisines?: string[];
    date?: moment.Moment;
    DDRSelected?: boolean;
    dietaryList?: string[];
    diningOptions?: string[];
    end?: string;
    entertainmentList?: string[];
    equipmentList?: string[];
    foodOptions?: string[];
    from?: string;
    guests?: number | string;
    instantBookSelected?: boolean;
    lat?: number | string;
    location?: string;
    lon?: number | string;
    officeTypes?: string[];
    otherList?: string[];
    page?: number;
    placeId?: string;
    play?: boolean;
    plusSelected?: boolean;
    priceRange?: number[];
    start?: string;
    selected?: boolean;
    tag?: string;
    to?: string;
    types?: string[];
    venuestaffList?: string[];
  };

  type SearchResult = {
    assetEditUrl: string;
    assetId: number;
    category: string;
    currency: string;
    desc: string;
    id: number;
    image: string;
    images: Image[];
    isFavourite: boolean;
    isOffice: boolean;
    lat: number;
    long: number;
    nearbyLocations?: string[];
    officeTypes?: {
      price: number | null;
      text: string;
      type: string;
    }[];
    price?: {
      daily?: number | null;
      hourly?: number | null;
      monthly?: number | null;
    };
    rating?: number | null;
    reviewsCount?: number | null;
    reviewsCountString?: string;
    searchId: number;
    sponsored?: number;
    tags: any[];
    title: string;
    url: string;
    venueAgreedToList: boolean;
    venueEditUrl: string;
    venueId: number;
    verticalId: number;
  };

  type SearchResults = {
    currentPage: number;
    data: SearchResult[];
    from: number;
    isFetching: boolean;
    lastPage: number;
    nextPageUrl: string;
    path: string;
    perPage: number;
    prevPageUrl: string;
    searchObject: SearchObject;
    to: number;
    total: number;
  };

  type Tokens = { dataApi: string };

  type Url = {
    isSearching: boolean;
    url: string;
  };

  type User = {
    avatar?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    id: string | number;
    isAdmin: boolean;
    isLoggedIn: boolean;
    isSpoofMode: boolean;
    isVenueOwner: boolean;
    adminModeId?: number;
  };

  type UserFavourites = {
    favourites: object[];
    roomAssets: object[];
  };

  type Tag = { [propName: string]: any };

  type Tags = {
    current: Tag;
    defaultTags: Tag[];
    tags: Tag[];
  };

  type Vertical = {
    id: number;
    mapIsVisible: boolean;
    title: string;
    tagId: number;
  };

  type Verticals = {
    defaults: { [verticalName: string]: Vertical };
    selected: Vertical;
  };

  type RoomProps = { [propName: string]: { prop: any } };

  type RoomInfo = {
    description: string;
    owner_first_name: string;
    owner_img_src?: string;
    owner_last_name: string;
    response_rate: string;
    response_time: string;
    venue_city: string;
    venue_name: string;
    vertical_id: number;
  };

  type AdminInfo = {
    agree_to_list: boolean;
    email: string;
    first_name: string;
    last_name: string;
    other_contact?: {
      email: string;
      name: string;
      phone: string;
    }[];
    phone: string;
    website: string;
  };

  type RoomConfig = RoomConfigItem[];

  type Room = {
    admin_info?: AdminInfo;
    amenities?: Amenities;
    capacity_range?: CapacityRange;
    configurations?: RoomConfig;
    exclusive_offer?: RoomExclusiveOffer[];
    images: {
      main: string;
      secondary?: string;
      tertiary?: string;
    };
    info: RoomInfo;
    location: RoomLocation;
    menu?: {
      drinks?: Menu;
      meals?: Menu;
      pictures?: string[];
      setMenu?: {
        menu: string[];
        title: string;
      }[];
    };
    name: string;
    opening: OpenHoursParts[];
    prices: RoomPrice;
    rating?: RoomReviews.ReviewRating;
    reviews?: {
      venue_reviews: RoomReviews.VenueReview[];
      per_page: number;
    };
    siblings?: RoomCardType;
  };

  type Search = {
    params: SearchParams;
    recentSearches: SearchItem[];
    tags: Tags;
    url: Url;
    verticals: Verticals;
  };

  declare namespace Search {
    type Params = SearchParams;
    type Tags = Tags;
    type Url = {
      isSearching: boolean;
      url: string;
    };
    type Verticals = {
      defaults: { [verticalName: string]: Vertical };
      selected: Vertical;
    };
  };

  type UserFavourites = {
    favourites: object[];
    roomAssets: object[];
  };
};

export type ActionCreator = (...args: any[]) => AnyAction;

export type ActionCreatorMap = { [id: string]: ActionCreator };

export type ActionsMap = { [x: string]: ActionCreator };

export type Action = {
  type: string;
  [propName: string]: any;
};

export type ActionsTrigger = () => void;

export type FooterOptions = { squashed: boolean };

export type HeaderOptions = {
  floating: boolean;
  smallLogo: boolean;
  stayAsLink: boolean;
  transparent: boolean;
  withCheckoutSteps: boolean;
  withSearchBar: boolean;
};

export type Image = { url: string };

export type Link = {
  href: string;
  prefetch?: boolean;
  text: string;
};

export type LinkProp = {
  attributes?: { [prop: string]: any }; // this should by no means be permanent
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
  itemProp?: string;
  rel?: string;
  role?: string;
  tabIndex?: number;
  target?: string;
};

export type BrowserLinkProps = {
  external?: boolean;
  forceDomain?: string;
  href: string;
  prefetch?: boolean;
};

export type TelLink = { tel?: string };

export type MailLink = { mail?: string };

export type ActionLink = { action?: (e?: any) => void };

export type LinkComponentProps = {
  children?: JSX.Element | JSX.Element[] | string;
  href?: string;
  prefetch?: boolean;
  rel?: string;
  search?: {
    params: Store.Search.Params;
    tags: Store.Search.Tags;
    verticals: Store.Search.Verticals;
  };
  shallow?: boolean;
  startSearch?: (href: string, query: QueryObject) => void;
  target?: string;
};

export type SelectOption = {
  text: string;
  value: string | number;
};

export type Amenity = {
  amenity_id: Ref;
  image_url: string;
  name: string;
  price?: number;
};

export type CapacityRange = {
  max_capacity: number;
  min_capacity: number;
};

export type Menu = {
  menu: any[];
  notes?: RoomMenuNote[];
  specials?: RoomMenuSpecial[];
};

export type AnyObject = {
  [x: number]: any;
  [x: string]: any;
};

export type SearchQueryObject = {
  fields?: { [x: string]: string[] };
  filters?: AnyObject[];
  includes?: string[];
};

export type QueryStringObject = {
  fields?: { [x: string]: string };
  filters?: AnyObject[];
  includes?: string;
};

export type AttachClearAction = (clearFilter: () => void) => void;

export type Location = {
  lat: string;
  locationDesc: string;
  locationSlug: string;
  lon: string;
};

export type Bounds = {
  neLat?: number | string;
  neLon?: number | string;
  swLat?: number | string;
  swLon?: number | string;
};

export type CarouselOptionProps = {
  badge?: string;
  category?: string;
  color?: string;
  currency?: string;
  currentlyShown?: boolean;
  image?: string;
  imageAdjustments?: object;
  imageId?: string;
  images?: {
    bottom: string;
    main: string;
    top: string;
  };
  imageText?: string;
  imageTextColor?: string;
  isFirst?: boolean;
  isLast?: boolean;
  lazyLoadImages?: boolean;
  link?: string;
  linkComponent?: React.ComponentClass<any, any>;
  linkComponentProps?: LinkComponentProps;
  maxOptions?: {
    large?: number;
    small?: number;
  };
  maxCapacity?: string;
  newTab?: boolean;
  price?: {
    daily?: number;
    hourly?: number;
    monthly?: number;
  };
  rating?: number;
  reviewsCount?: number;
  subtitle?: string;
  text?: string;
  threeImg?: boolean;
  title?: string;
  verticalId?: number;
  with3?: boolean;
};

export type ComponentType = () => JSX.Element;

export type ExpandGroup = {
  classId: number;
  index: number;
};

export type ExpandedGroups = ExpandGroup[];

export type FilterPanelProps = {
  canClear: boolean;
  children: (childProps?: object) => JSX.Element;
  filterStateSelector?: FilterStateSelector;
  onApply: () => void;
  onClear: () => void;
};

export type Filter = {
  buttonStateSelector: FilterStateSelector;
  Component: ComponentType;
  FilterPanel: ComponentType;
  filterStateSelector?: FilterStateSelector;
  mobileStandalone: [];
};

export type FilterButtonChildProps = {
  attachClearAction: AttachClearAction;
  canClear: boolean;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
  onFilterChange: HandleFilterChange;
  setButtonText: (buttonText: string) => void;
  toggleCanClear: () => void;
  values: { [x: string]: any };
};

export type FilterPanelChildProps = {
  attachClearAction: AttachClearAction;
  onFilterChange: HandleFilterChange;
  setButtonText: (buttonText: string) => void;
  toggleCanClear: () => void;
  values: { [x: string]: any };
};

export type FilterStateSelector = (state: Store.State) => ({
  buttonText: string;
  defaultButtonText: string;
  isActive: boolean;
  values: { [x: string]: any };
});

export type HandleFilterChange = (applyFilter: (...args: any[]) => void, args?: any[]) => void;

export type Icon = {
  ariaLabel?: string;
  children?: JSX.Element | JSX.Element[];
  path?: string;
  stylesArray?: object[];
};

export type BreadcrumbType = {
  fullLink?: string;
  href?: string;
  text: string;
  title?: string;
}[];

export type BrowseCardType = {
  image: string;
  link: string;
  text: string;
  title: string;
}[];

export type LandingCardType = {
  category: string;
  currency: string;
  image: string;
  link: string;
  maxCapacity: string;
  price: {
    daily?: number;
    hourly?: number;
    monthly?: number;
  };
  rating: number;
  reviewsCount: number;
  text: string;
  title: string;
  typeId: string;
}[];

export type LandingItemCardType = { fullLink: string }[];

export type WidgetCardType = {
  category: string;
  city: string;
  currency: string;
  image: string;
  link: string;
  maxCapacity: string;
  price: {
    daily?: number;
    hourly?: number;
    monthly?: number;
  };
  rating: number;
  reviewsCount: number;
  title: string;
  verticalId: number;
}[];

export type NearbyType = {
  link: string;
  subtitle: string;
  text: string;
  title: string;
}[];

export type RelatedType = {
  link: string;
  text: string;
  title: string;
}[];

export type PointerType = {
  lat: string;
  long: string;
}[];

export type Phone = {
  phoneNumber: string;
  phoneNumberDisplay: string;
};

export type QueryObject = {
  date?: string;
  guests?: string;
  location?: string;
  tag?: string;
};

export type ReducerMap = { [x: string]: Reducer<any> };

export type ReqInfo = {
  params?: { [propName: string]: string };
  query?: { [propName: string]: string };
};

export type Route = {
  domainSpecific?: boolean;
  filePath?: string;
  langKey?: string;
  name?: string;
  pathname?: string;
  regExp?: string;
  [x: string]: any;
};

export type RouteObject = {
  filePath?: string;
  pathname: string;
  regExp?: string;
  [x: string]: any;
};

export type RouteOptions = { scroll: boolean };

export type SendTriggersToParent = (fireActions: ActionsTrigger, clearAction: ActionsTrigger) => void;

export type Search = SearchItem[];

export type SearchItem = {
  date: moment.Moment;
  text: string;
};

export type SearchMap = {
  boundsHaveChanged: boolean;
  isStable: boolean;
  isVisible: boolean;
  requiresRefit: boolean;
  shouldSearchOnMapMove: boolean;
};

export type SearchMapMarker = {
  currency: string;
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  price: number;
};

export type SearchObject = {
  lat: number;
  long: number;
};

export type SearchParams = {
  test?: string[]; // TODO: replace this with correct variable
  allDay?: boolean;
  amenities?: string[];
  amenitiesList?: string[];
  cateringList?: string[];
  configurations?: string[];
  cuisines?: string[];
  date?: moment.Moment;
  DDRSelected?: boolean;
  dietaryList?: string[];
  diningOptions?: string[];
  end?: string;
  entertainmentList?: string[];
  equipmentList?: string[];
  foodOptions?: string[];
  from?: string;
  guests?: number | string;
  instantBookSelected?: boolean;
  lat?: number | string;
  location?: string;
  lon?: number | string;
  officeTypes?: string[];
  otherList?: string[];
  page?: number;
  placeId?: string;
  play?: boolean;
  plusSelected?: boolean;
  priceRange?: number[];
  selected?: boolean;
  start?: number | string;
  tag?: string;
  to?: string;
  types?: string[];
  venuestaffList?: string[];
};

export type SearchResult = {
  assetEditUrl: string;
  assetId: number;
  category: string;
  currency: string;
  desc: string;
  id: number;
  image: string;
  images: Image[];
  isFavourite: boolean;
  isOffice: boolean;
  lat: number;
  long: number;
  nearbyLocations?: string[];
  officeTypes?: {
    price: number | null;
    text: string;
    type: string;
  }[];
  price?: {
    daily?: number | null;
    hourly?: number | null;
    monthly?: number | null;
  };
  rating?: number | null;
  reviewsCount?: number | null;
  reviewsCountString?: string;
  searchId: number;
  sponsored?: number;
  tags: any[];
  title: string;
  url: string;
  venueAgreedToList: boolean;
  venueEditUrl: string;
  venueId: number;
  verticalId: number;
};

export type Tag = { [propName: string]: any };

export type Tags = {
  current: Tag;
  defaultTags: Tag[];
  tags: Tag[];
};

export type TimePeriod = {
  start: string;
  end: string;
};

export type Vertical = {
  id: number;
  tagId: number;
  title: string;
};

export type DashboardMenu = {
  icon: JSX.Element;
  iconSmall: JSX.Element;
  link: string;
  mobile: boolean;
  mobileOrder?: number;
  subtitle: string;
  title: string;
};

export type RoomConfigItem = {
  config_id: number;
  max_capacity: number;
  name: ConfigurationKind;
};

export type RoomCardType = {
  category: string;
  currency: string;
  image: string;
  link: string;
  maxCapacity?: string | number;
  price: {
    daily?: number;
    hourly?: number;
    monthly?: number;
  };
  rating?: number;
  reviewsCount?: number;
  title: string;
  verticalId: number;
}[];

export type RoomExclusiveOffer = {
  available: string[];
  condition?: {
    condition_key: string;
    value: number;
  };
  date_until?: string;
  type: string;
};

export type RoomMenuNote = {
  id: ID;
  trans_key: string;
  value?: {
    from: string | number;
    to: string | number;
  };
};

export type RoomMenuSpecial = {
  available: boolean;
  desc: string;
  id: ID;
  name: string;
};

export type RoomLocation = {
  around: RoomLocationPlace[];
  nearest: RoomLocationPlace;
  lat: string;
  lon: string;
  pointer?: {
    lat: string;
    lon: string;
  }[];
};

type RoomLocationPlace = {
  distance: string | number;
  name: string;
};

export type OpenHoursSchedule = {
  opening: OpenHoursParts[];
}

type OpenHoursParts = {
  name: string;
  working_hours?: {
    from: string;
    to: string;
  };
};

export type StyledLabelProps = {
  boldLabel?: boolean;
  hiddenLabel?: boolean;
  id: string;
  label?: string;
  required?: boolean;
};

export type StyledCheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  id: string;
  label?: string;
  name: string;
  sublabel?: string;
  value?: string;
};

export type StyledInputProps = {
  children?: JSX.Element;
  defaultOptionText?: string;
  icon?: JSX.Element | string;
  isBig?: boolean;
  name: string;
  noBorder?: boolean;
  noMargin?: boolean;
  onChange?: (e: any) => void;
  placeholder?: string;
  selectOptions?: Array<{
    text: string;
    value: string;
  }>;
  smallText?: boolean;
  type?: string;
  value?: string;
};

export type Currency = {
  code: string;
  currency_symbol_left: string;
  currency_symbol_right: string;
};

export type RoomPrice = {
  currency: Currency;
  daily_rate_formatted?: number;
  hourly_rate_formatted?: number;
  monthly_rate_formatted?: number;
  venue_daily_rate_formatted?: number;
  venue_hourly_rate_formatted?: number;
  venue_monthly_rate_formatted?: number;
};

export type Package = {
  extras?: {
    condensedOptions?: {
      price: string;
      title: string;
    }[];
    configurations?: RoomConfig;
    description?: string;
    listOptions?: string[];
    optionTitle?: string;
    other?: string;
    pictures?: string[];
  }
  offerText?: string;
  price?: string;
  subtitle?: string;
  times?: string[];
  title: string;
}

export type ButtonProps = {
  disabled?: boolean;
  href?: string;
  id?: string;
  type?: 'submit' | 'reset' | 'button';
};

export type ButtonColor = 'primary' | 'success' | 'warning' | 'danger' | 'link' | 'grey' | 'black' | 'white' | 'whiteNoBorder';

export type ButtonColors = {
  buttonColor?: ButtonColor;
};

export type ButtonStyles = {
  buttonStyle?: 'updated';
  // the button design has changed a bit and this is the way to say use the new design (could be replaced when everything is changed over)
};

export type Radio = {
  boldText?: boolean;
  handleClick?: (e: any) => void;
  interiorPadding?: {
    bottom?: string;
    top?: string;
  };
  isLarge?: boolean;
  itemBorder?: boolean;
  learnMoreAction?: () => void;
  noBorder?: boolean;
  radioPosition: 'left' | 'right';
  selectedOption?: boolean;
  subtext?: string;
};

export type RadioInput = {
  id: string;
  name: string;
  text: string;
  value: string;
};

export type RadioExtraText = {
  extraText?: {
    subtext?: string;
    text?: string;
  };
};

export type LocationTableData = {
  autocompleteLocation: string; // TODO: this will probably be removed as it's dynamic
  bounds_distance: string;
  country: string;
  human_desc: string;
  id: number;
  in_sitemap: boolean;
  lat: string;
  locationcategorie_id: string;
  long: string;
  parent_id: string;
  url_desc: string;
}

export type Question = {
  answers: string[];
  text: string;
};

export as namespace RoomReviews;
declare namespace RoomReviews {

  type ReviewReply = {
    created_at: string;
    creator_first_name: string;
    creator_last_name: string;
    text: string;
  };

  type VenueReview = {
    created_at: string;
    id: ID;
    owner_first_name: string;
    owner_last_name: string;
    ranking: number;
    reply?: ReviewReply;
    text: string;
  };

  type ReviewRating = {
    avg: number;
    count: number;
  };
};
