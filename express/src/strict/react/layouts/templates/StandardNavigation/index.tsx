import * as React from 'react';
import Footer, { Props as FooterProps } from './Footer';
import Header, { Props as HeaderProps } from './Header';

type Props = HeaderProps & FooterProps & {
  //
};

export default (props: React.PropsWithChildren<Props>) => {
  return (
    <React.Fragment>
      <Header
        withSearch={props.withSearch}
      />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};
