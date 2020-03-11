import * as React from 'react';
// import Logo from '@components/ZipcubeLogo';

export type Props = {
  withSearch: boolean;
};

export default (props: React.PropsWithChildren<Props>) => {
  return (
    <React.Fragment>
      {/* <Logo
        showName={true}
      /> */}
      <div>Logo</div>
      <div>Header - {props.withSearch ? 'Search Enabled' : 'Search Disabled'}</div>
    </React.Fragment>
  );
};
