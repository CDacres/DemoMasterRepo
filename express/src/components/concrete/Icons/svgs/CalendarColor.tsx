import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const CalendarColor = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon stylesArray={stylesArray}>
    <path d="m21 7.51v2.73a.51.51 0 0 1 -.5.51h-9.18a1.88 1.88 0 0 1 0-3.75h9.19a.5.5 0 0 1 .5.51zm-7.83 5.74h-7.78a.5.5 0 0 0 -.5.47 22.46 22.46 0 0 1 -.38 2.68.5.5 0 0 0 .48.6h8.18a1.88 1.88 0 0 0 0-3.75z" />
    <path
      d="m23 5v17.5a.5.5 0 0 1 -.5.5h-17a .5.5 0 0 1 -.5-.5v-1a .5.5 0 0 1 1 0v .5h16v-16.5h-.5a.5.5 0 0 1 0-1h1a .5.5 0 0 1 .5.5zm-6.26 15h-13.44a1.66 1.66 0 0 1 -1.36-.67 1.33 1.33 0 0 1 -.18-1.22 27.09 27.09 0 0 0 1.24-8.73v-6.88a.5.5 0 0 1 .5-.5h3.5v-1a .5.5 0 0 1 1 0v1h7v-1a .5.5 0 0 1 1 0v1h3.5a.5.5 0 0 1 .5.5v6.88c0 4.6-.65 8.03-1.87 9.91a1.63 1.63 0 0 1 -1.39.71zm-13.44-1h13.44a.66.66 0 0 0 .55-.25c.78-1.2 1.71-3.8 1.71-9.37v-6.38h-3v1.5a.5.5 0 0 1 -1 0v-1.5h-7v1.5a.5.5 0 0 1 -1 0v-1.5h-3v6.38a27.86 27.86 0 0 1 -1.3 9.06.33.33 0 0 0 .05.31.67.67 0 0 0 .55.25z"
      fill="#484848"
    />
  </SvgIcon>
);

export default CalendarColor;
