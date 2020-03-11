/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Screen = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon stylesArray={stylesArray}>
    <path d="m22.5 2h-21c-.8271484 0-1.5.6728516-1.5 1.5v14c0 .8271484.6728516 1.5 1.5 1.5h8.5v3h-5.5c-.2763672 0-.5.2236328-.5.5s.2236328.5.5.5h15c.2763672 0 .5-.2236328.5-.5s-.2236328-.5-.5-.5h-5.5v-3h8.5c.8271484 0 1.5-.6728516 1.5-1.5v-14c0-.8271484-.6728516-1.5-1.5-1.5zm-21 1h21c.2753906 0 .5.2241211.5.5v11.5h-22v-11.5c0-.2758789.2241211-.5.5-.5zm11.5 19h-2v-3h2zm9.5-4h-21c-.2758789 0-.5-.2246094-.5-.5v-1.5h22v1.5c0 .2753906-.2246094.5-.5.5z" />
  </SvgIcon>
);

export default Screen;
