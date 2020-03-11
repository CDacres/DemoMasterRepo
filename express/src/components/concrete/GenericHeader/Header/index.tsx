import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  finalStyles: object[];
  tag: string;
  text: string;
};

const Header = ({ finalStyles, tag, text }: Props) => {
  const renderHeader = () => {
    switch (tag) {
      case 'h1': {
        return (
          <h1 className={css(finalStyles)} />
        );
      }
      case 'h2': {
        return (
          <h2 className={css(finalStyles)} />
        );
      }
      case 'h3': {
        return (
          <h3 className={css(finalStyles)} />
        );
      }
      case 'h4': {
        return (
          <h4 className={css(finalStyles)} />
        );
      }
      case 'h5': {
        return (
          <h5 className={css(finalStyles)} />
        );
      }
      case 'h6': {
        return (
          <h6 className={css(finalStyles)} />
        );
      }
    }
  };

  return (
    <Translatable content={{ transKey: text }}>
      {renderHeader()}
    </Translatable>
  );
};

export default Header;
