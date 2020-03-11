import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  innerRef: React.LegacyRef<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;

class Container extends React.Component<Props> {
  render() {
    const { children, innerRef, ...props } = this.props;
    return (
      <div
        {...props}
        className={css(styles.container)}
        ref={innerRef}
      >
        {children}
      </div>
    );
  }
}

export default Container;
