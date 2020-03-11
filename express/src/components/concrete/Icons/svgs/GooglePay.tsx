/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const GooglePay = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    stylesArray={stylesArray}
    viewBox="0 0 40 24"
  >
    <g>
      <path
        clipRule="evenodd"
        d="m1 2c0-1.1.9-2 2-2h35c1.1 0 2 .9 2 2v19c0 1.1-.9 2-2 2h-35c-1.1 0-2-.9-2-2z"
        style={{
          fill: '#ffffff',
          fillRule: 'evenodd',
        }}
      />
      <path
        clipRule="evenodd"
        d="m37.5 0h-35c-1.4 0-2.5 1.1-2.5 2.5v19c0 1.4 1.1 2.5 2.5 2.5h35c1.4 0 2.5-1.1 2.5-2.5v-19c0-1.4-1.1-2.5-2.5-2.5zm-36.5 2.5c0-.8.7-1.5 1.5-1.5h35c.8 0 1.5.7 1.5 1.5v19c0 .8-.7 1.5-1.5 1.5h-35c-.8 0-1.5-.7-1.5-1.5z"
        style={{
          fill: '#dbdbdb',
          fillRule: 'evenodd',
        }}
      />
      <path
        d="m19.2 12.6v3.7h-1.2v-9.1h3.1c.7 0 1.4.3 1.9.8 1.1 1 1.1 2.6.2 3.7-.1.1-.1.1-.2.1-.5.5-1.1.8-1.9.8zm0-4.3v3.2h1.9c.4 0 .8-.2 1.1-.5.6-.6.6-1.6 0-2.2-.3-.3-.7-.5-1.1-.5z"
        style={{ fill: '#3c4043' }}
      />
      <path
        d="m26.5 9.9c.9 0 1.5.2 2 .7.5.4.7 1.1.7 1.9v3.8h-1v-.9h-.1c-.5.7-1.1 1.1-1.9 1.1-.7 0-1.2-.2-1.7-.6-.4-.4-.7-1-.7-1.5 0-.7.3-1.2.8-1.6.4-.4 1.1-.5 1.9-.5.7 0 1.2.1 1.7.3v-.2c0-.4-.2-.8-.5-1.1-.3-.2-.7-.4-1.1-.4-.7 0-1.2.3-1.5.8l-1-.6c.5-.8 1.3-1.2 2.4-1.2zm-1.5 4.5c0 .3.2.6.4.7.3.2.6.3.9.3.5 0 .9-.2 1.3-.5.4-.4.6-.8.6-1.3-.4-.3-.9-.4-1.5-.4-.5 0-.9.1-1.2.3-.3.3-.5.5-.5.9z"
        style={{ fill: '#3c4043' }}
      />
    </g>
    <g
      clipRule="evenodd"
      fillRule="evenodd"
    >
      <path
        d="m35.5 10.1-3.8 8.9h-1.2l1.5-3.1-2.6-5.8h1.3l1.8 4.4 1.8-4.4z"
        fill="#3c4043"
      />
      <path
        d="m14.5 11.8c0-.3 0-.7 0-1h-4.9v2h2.8c-.1.6-.5 1.2-1 1.5v1.3h1.6c1-.9 1.5-2.2 1.5-3.8z"
        fill="#4285f4"
      />
      <path
        d="m9.6 16.9c1.4 0 2.6-.5 3.4-1.3l-1.6-1.3c-.5.4-1.1.5-1.8.5-1.3 0-2.4-.9-2.8-2.1h-1.8v1.3c.9 1.8 2.7 2.9 4.6 2.9z"
        fill="#34a853"
      />
      <path
        d="m6.8 12.7c-.3-.6-.3-1.3 0-2v-1.3h-1.8c-.7 1.4-.7 3.2 0 4.6z"
        fill="#fbbc04"
      />
      <path
        d="m9.6 8.6c.8-.1 1.5.2 2 .7l1.5-1.4c-1-.9-2.2-1.4-3.5-1.4-1.9 0-3.7 1.1-4.6 2.9l1.8 1.3c.4-1.2 1.5-2.1 2.8-2.1z"
        fill="#ea4335"
      />
    </g>
  </SvgIcon>
);

export default GooglePay;
