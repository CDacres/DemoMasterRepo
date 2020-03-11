/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const PinkLine = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    fill="currentColor"
    path="M83.055.448c-10.69.449-21.379.944-32.078 1.206-10.64.261-21.29.33-31.93-.038A360.72 360.72 0 0 1 1.075.563c-1.213-.102-1.22 1.58-.023 1.688 10.645.96 21.335 1.394 32.025 1.505 4.548.047 9.096.033 13.644-.024-2.866.373-5.728.777-8.585 1.216-4.21.648-8.405 1.373-12.583 2.181-.65.126-1.103.79-.923 1.402.195.666.924.931 1.583.825 9.302-1.503 18.884-.864 28.132.712 2.346.4 4.676.882 6.985 1.448 1.424.35 2.116-1.608.651-2.004-5.919-1.597-12.033-2.656-18.185-3.088 8.824-1.246 17.698-2.184 26.59-2.893 4.21-.336 8.424-.623 12.64-.875.635-.038 1.25-.425 1.26-1.087.007-.604-.593-1.148-1.23-1.12"
    preserveAspectRatio="none"
    stylesArray={stylesArray}
    viewBox="0 0 85 12"
  />
);

export default PinkLine;
