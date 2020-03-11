import * as React from 'react';

// Styles
import styles from './styles';

// Components
import Header from '@src/components/concrete/GenericHeader/Header';
import HeaderWithChildren from '@src/components/concrete/GenericHeader/HeaderWithChildren';

type Props = {
  children?: JSX.Element | JSX.Element[] | string;
  stylesArray?: object[];
  tag?: string;
  text?: string;
};

const GenericHeader: React.FunctionComponent<Props> = ({ children, stylesArray, tag, text }) => {
  const normalButtonStyle = [styles[tag]];
  const finalStyles = normalButtonStyle.concat(stylesArray);
  return (
    <React.Fragment>
      {React.Children.count(children) === 0 ? (
        <Header
          finalStyles={finalStyles}
          tag={tag}
          text={text}
        />
      ) : (
        <HeaderWithChildren
          finalStyles={finalStyles}
          tag={tag}
        >
          {children}
        </HeaderWithChildren>
      )}
    </React.Fragment>
  );
};

GenericHeader.defaultProps = { tag: 'h3' };

export default GenericHeader;
