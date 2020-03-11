import * as React from 'react';

// Components
import DeviceQuery from '@src/components/Listing/Layout/DeviceQuery';
import Split from '@src/components/Listing/Layout/Split';

type Props = {
  children: React.ReactNode;
  right?: React.ReactNode;
};

const SectionSplit = ({ children, right }: Props) => (
  <Split
    right={
      <DeviceQuery variant="large">
        {right}
      </DeviceQuery>
    }
    variant="s66l"
  >
    <div>
      {children}
    </div>
  </Split>
);

export default SectionSplit;
