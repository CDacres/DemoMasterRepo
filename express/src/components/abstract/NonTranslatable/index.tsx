import * as React from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const NonTranslatable = ({ children }: Props) => (
  <React.Fragment>
    {children}
  </React.Fragment>
);

export default NonTranslatable;
