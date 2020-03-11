/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Slider = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    path="m2.5.25a.75.75 0 00-.75.75v.378a2.25 2.25 0 000 4.244v5.378a.75.75 0 001.5 0v-5.378a2.25 2.25 0 000-4.244v-.378a.75.75 0 00-.75-.75zm0 4a .75.75 0 110-1.5.75.75 0 010 1.5zm3.5-4a .75.75 0 00-.75.75v5.378a2.25 2.25 0 000 4.244v.378a.75.75 0 001.5 0v-.378a2.25 2.25 0 000-4.244v-5.378a.75.75 0 00-.75-.75zm0 9a .75.75 0 110-1.5.75.75 0 010 1.5zm4.25-7.872v-.378a.75.75 0 00-1.5 0v .378a2.25 2.25 0 000 4.244v5.378a.75.75 0 001.5 0v-5.378a2.25 2.25 0 000-4.244zm-.75 2.872a.75.75 0 110-1.5.75.75 0 010 1.5z"
    stylesArray={stylesArray}
    viewBox="0 0 12 12"
  />
);

export default Slider;
