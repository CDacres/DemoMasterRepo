import * as React from 'react';
import { css } from 'aphrodite/no-important';

type Props = {
  children?: JSX.Element | JSX.Element[] | string;
  finalStyles: object[];
  tag: string;
};

const HeaderWithChildren = ({ children, finalStyles, tag }: Props) => {
  const renderHeader = () => {
    switch (tag) {
      case 'h1': {
        return (
          <h1 className={css(finalStyles)}>
            {children}
          </h1>
        );
      }
      case 'h2': {
        return (
          <h2 className={css(finalStyles)}>
            {children}
          </h2>
        );
      }
      case 'h3': {
        return (
          <h3 className={css(finalStyles)}>
            {children}
          </h3>
        );
      }
      case 'h4': {
        return (
          <h4 className={css(finalStyles)}>
            {children}
          </h4>
        );
      }
      case 'h5': {
        return (
          <h5 className={css(finalStyles)}>
            {children}
          </h5>
        );
      }
      case 'h6': {
        return (
          <h6 className={css(finalStyles)}>
            {children}
          </h6>
        );
      }
    }
  };

  return renderHeader();
};

export default HeaderWithChildren;
