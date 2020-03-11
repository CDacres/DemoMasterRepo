/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

type Props = {
  isSmall?: boolean;
} & Icon & React.SVGAttributes<{}>;

const TravelForWork = ({ isSmall, stylesArray }: Props) => (
  <SvgIcon
    style={{
      height: '32px',
      width: '32px',
      fill: '#ffb400',
      ...(!isSmall && { display: 'block' }),
    }}
    stylesArray={stylesArray}
    viewBox="0 0 32 32"
  >
    <path d="M15.236 4a.558.558 0 0 0-.57.545V28h4.984v-3.37c0-.42.357-.763.797-.763h1.823c.44 0 .797.342.797.764V28h5.696c.315 0 .57-.244.57-.546V4H15.236zm4.414 12.558c0 .422-.357.764-.798.764H17.03c-.44 0-.798-.342-.798-.764v-1.745c0-.422.357-.764.798-.764h1.822c.44 0 .798.342.798.764v1.745zm0-6.545c0 .421-.357.763-.798.763H17.03c-.44 0-.798-.342-.798-.763V8.267c0-.422.357-.763.798-.763h1.822c.44 0 .798.341.798.763v1.746zm6.835 6.545c0 .422-.357.764-.798.764h-1.822c-.44 0-.798-.342-.798-.764v-1.745c0-.422.357-.764.798-.764h1.822c.44 0 .798.342.798.764v1.745zm0-6.545c0 .421-.357.763-.798.763h-1.822c-.44 0-.798-.342-.798-.763V8.267c0-.422.357-.763.798-.763h1.822c.44 0 .798.341.798.763v1.746z" />
    <path
      d="M29.333 3.222v21.11a.555.555 0 1 1-1.111 0V3.778H12.666v6.111a.555.555 0 1 1-1.111 0V3.222c0-.308.248-.556.556-.556h16.666c.307 0 .556.248.556.556zM8.777 17.11H6.555a.555.555 0 1 0 0 1.112h2.222a.555.555 0 1 0 0-1.112zm0 3.334H6.555a.555.555 0 1 0 0 1.11h2.222a.555.555 0 1 0 0-1.11zm20 7.778h-25V13.777h7.778v11.667a.555.555 0 1 0 1.111 0V13.222a.555.555 0 0 0-.556-.556H3.223a.555.555 0 0 0-.556.556v15.555c0 .307.248.556.556.556h25.555a.555.555 0 1 0 0-1.111z"
      fill="#484848"
    />
  </SvgIcon>
);

export default TravelForWork;
