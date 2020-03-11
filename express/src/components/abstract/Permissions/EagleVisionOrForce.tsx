import * as React from 'react';

// Components
import EagleVision from '@src/components/abstract/Permissions/EagleVision';

type Props = {
  children: JSX.Element;
  forced: boolean;
};

const EagleVisionOrForce = ({ children, forced }: Props) => (
  <React.Fragment>
    {forced ? (
      <React.Fragment>
        {children}
      </React.Fragment>
    ) : (
      <EagleVision>
        {children}
      </EagleVision>
    )}
  </React.Fragment>
);

export default EagleVisionOrForce;
