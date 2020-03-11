import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

type Props = {
  onMap?: boolean;
  stroke?: string;
} & Icon & React.SVGAttributes<{}>;

const Fang = ({ onMap, stroke, stylesArray }: Props) => (
  <SvgIcon
    stylesArray={stylesArray}
    viewBox="none"
  >
    <path
      d="M0,10 20,10 10,0z"
      style={{ fill: '#ffffff' }}
    />
    {onMap ? (
      <path
        d="M0,10 10,0 20,10"
        style={{
          fill: 'transparent',
          stroke: '#dbdbdb',
        }}
      />
    ) : (
      <path
        d="M0,10 10,0 20,10"
        style={{
          fill: 'transparent',
          stroke: stroke ? stroke : '#dbdbdb',
        }}
      />
    )}
  </SvgIcon>
);

export default Fang;
