import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  innerRef: React.LegacyRef<HTMLImageElement>;
} & React.ImgHTMLAttributes<HTMLImageElement>;

class Img extends React.Component<Props> {
  render() {
    const { innerRef, ...props } = this.props;
    return (
      <img
        {...props}
        className={css(styles.img)}
        ref={innerRef}
      />
    );
  }
}

export default Img;
