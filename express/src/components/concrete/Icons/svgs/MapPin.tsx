/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

type Props = {
  outline?: boolean;
} & Icon & React.SVGAttributes<{}>;

const MapPin = ({ outline, stylesArray }: Props) => (
  <React.Fragment>
    {outline ? (
      <SvgIcon
        aria-label="Map"
        stylesArray={stylesArray}
        viewBox="0 0 54.757 54.757"
      >
        <g>
          <path
            d="M27.557,12c-3.859,0-7,3.141-7,7s3.141,7,7,7s7-3.141,7-7S31.416,12,27.557,12z M27.557,24c-2.757,0-5-2.243-5-5   s2.243-5,5-5s5,2.243,5,5S30.314,24,27.557,24z"
            fill="#767676"
          />
          <path
            d="M40.94,5.617C37.318,1.995,32.502,0,27.38,0c-5.123,0-9.938,1.995-13.56,5.617c-6.703,6.702-7.536,19.312-1.804,26.952   L27.38,54.757L42.721,32.6C48.476,24.929,47.643,12.319,40.94,5.617z M41.099,31.431L27.38,51.243L13.639,31.4   C8.44,24.468,9.185,13.08,15.235,7.031C18.479,3.787,22.792,2,27.38,2s8.901,1.787,12.146,5.031   C45.576,13.08,46.321,24.468,41.099,31.431z"
            fill="#767676"
          />
        </g>
      </SvgIcon>
    ) : (
      <SvgIcon
        aria-label="Map"
        stylesArray={stylesArray}
        path="m16 .75c-6.77 0-12.25 5.48-12.25 12.25 0 6.37 3.23 11.14 11.78 18.08a.75.75 0 0 0 .95 0c8.54-6.94 11.77-11.71 11.77-18.08 0-6.77-5.48-12.25-12.25-12.25zm0 17a4.75 4.75 0 1 1 0-9.5 4.75 4.75 0 0 1 0 9.5z"
        role="img"
        viewBox="0 0 32 32"
      />
    )}
  </React.Fragment>
);

export default MapPin;
