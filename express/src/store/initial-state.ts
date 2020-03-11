import { tokens, user } from '@src/store/modules/auth/initial-state';
import config from '@src/store/modules/config/initial-state';
// import { params, tags, verticals } from '@src/store/modules/search/initial-state';
// import { initialState as orderState } from '@src/store/modules/order/initial-state';

export default () => ({
  auth: {
    tokens: tokens(),
    user: user(),
  },
  config: config(),
  lang: {},
  responsive: {
    desktop: false,
    fakeWidth: null,
    mobile: false,
    phone: false,
    tablet: false,
  },
  // search: {
  //   params: params(),
  //   tags: tags(),
  //   verticals: verticals(),
  // },
  // order: orderState,
});
