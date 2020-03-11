import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Cross = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    style={{
      height: '1em',
      width: '1em',
      fill: 'currentColor',
    }}
    stylesArray={stylesArray}
  >
    <path
      d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22"
      fillRule="evenodd"
    />
  </SvgIcon>
);

export default Cross;
