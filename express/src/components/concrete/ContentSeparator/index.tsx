import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

type Props = {
  children?: JSX.Element | JSX.Element[];
  marginNum?: 0 | 1 | 2 | 3 | 4;
};

const ContentSeparator: React.FunctionComponent<Props> = ({ children, marginNum }) => {
  const marginStr = `topbottom_${marginNum}`;
  return (
    <div className={css(margin[marginStr])}>
      <div className={css(styles.separator, React.Children.count(children) > 0 && styles.withChild)}>
        {React.Children.count(children) > 0 &&
          <span className={css(styles.span)}>
            <span className={css(styles.text)}>
              {children}
            </span>
          </span>
        }
      </div>
    </div>
  );
};

ContentSeparator.defaultProps = {
  marginNum: 1,
};

export default ContentSeparator;
