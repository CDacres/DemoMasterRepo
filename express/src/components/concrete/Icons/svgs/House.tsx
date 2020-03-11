/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

type Props = {
  largeScreen?: boolean;
} & Icon & React.SVGAttributes<{}>;

const House = ({ largeScreen, stylesArray }: Props) => (
  <SvgIcon
    style={{
      display: 'block',
      fill: '#41c6bc',
      height: largeScreen ? '40px' : '32px',
      width: largeScreen ? '40px' : '32px',
    }}
    stylesArray={stylesArray}
  >
    <path d="m13.5 17.6c0-1.2 1.1-2.7 2.6-2.7 1 0 2.6.9 2.6 2.7v4.7h-5.3z" />
    <path
      d="m23.4 8.3c-.2.2-.5.3-.7.1l-1.5-1c-.1-.1-.2-.2-.2-.4v-4.5c0-.2-.3-.5-.5-.5h-2c-.2 0-.5.3-.5.5v2c0 .2-.1.3-.3.4s-.3.1-.5 0l-4.6-2.8c-.1-.1-.2-.1-.3 0l-11.1 6.3c-.1 0-.2.1-.2.1-.2 0-.3-.1-.4-.3s-.1-.5.2-.7l11.1-6.3c.4-.2.9-.2 1.3 0l3.8 2.3v-1.1c0-.8.7-1.5 1.5-1.5h2c.8 0 1.5.7 1.5 1.5v4.2l1.3.9c.2.2.3.5.1.7zm-16.4 2.7c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1zm3 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm12 11.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-12.8c0-.3.2-.5.5-.5s.5.2.5.5zm-9-.5v-6c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v6zm6-6c0-1.9-1.6-3.5-3.5-3.5s-3.5 1.6-3.5 3.5v6h-9v-12.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5v12.5c0 .6.4 1 1 1h9 7c.3 0 .5-.2.5-.5s-.2-.5-.5-.5z"
      fill="#484848"
    />
  </SvgIcon>
);

export default House;
