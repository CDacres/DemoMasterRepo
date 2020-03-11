import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Types
type ScrollPosition = 'none' | 'start' | 'middle' | 'end';

const resolveScrollPosition = (offset: number, contentSize: number, size: number): ScrollPosition => {
  const offsetDomain = (contentSize - size);
  if (offsetDomain <= 0) {
    return 'none';
  }
  if (offset === 0) {
    return 'start';
  }
  if (offset === offsetDomain) {
    return 'end';
  }
  return 'middle';
};

type Props = {
  containerStyle?: React.CSSProperties;
};

type State = {
  position: ScrollPosition;
};

class ScrollX extends React.Component<Props, State> {
  state: State = { position: 'none' };

  container: HTMLDivElement = null;

  onScroll = () => {
    this.updatePosition();
  }

  updatePosition = () => {
    if (this.container) {
      const { scrollLeft, scrollWidth, offsetWidth } = this.container;
      const position = resolveScrollPosition(scrollLeft, scrollWidth, offsetWidth);
      this.setState({ position });
    }
  }

  componentDidMount() {
    this.updatePosition();
  }

  componentWillUnmount() {
    this.unmountDiv();
  }

  mountDiv = (e: HTMLDivElement) => {
    this.unmountDiv();
    if (e) {
      this.container = e;
      this.container.addEventListener('scroll', this.onScroll);
    }
  }

  unmountDiv = () => {
    if (this.container) {
      this.container.removeEventListener('scroll', this.onScroll);
      this.container = null;
    }
  }

  render() {
    const { children, containerStyle } = this.props;
    const { position } = this.state;
    return (
      <div
        className={css(styles.container)}
        style={containerStyle}
      >
        <div
          className={css(styles.scroll)}
          ref={this.mountDiv}
        >
          {children}
        </div>
        <div className={css(styles.overlay, styles[position])} />
      </div>
    );
  }
}

export default ScrollX;
