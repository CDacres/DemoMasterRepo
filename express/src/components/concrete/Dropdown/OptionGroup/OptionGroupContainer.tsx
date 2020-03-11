/* tslint:disable:max-line-length */
import * as React from 'react';
import isMobile from 'ismobilejs';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import OptionGroupComponent from '@src/components/concrete/Dropdown/OptionGroup/OptionGroupComponent';

type Props = {
  chosen: (e: any, isSelected?: boolean) => void;
  options: Array<{
    currency?: string;
    price?: {
      amount: number | string;
      discounted?: number | string;
    };
    selected?: boolean;
    subtitle?: string;
    title: string;
  }>;
};

class OptionGroupContainer extends React.Component<Props> {
  wrapperElement = null;

  componentDidMount = () => {
    this.forceUpdate();
  }

  refCallback = (element) => {
    if (element) {
      this.wrapperElement = element;
    } else {
      this.wrapperElement = null;
    }
  }

  scrollOptions = () => {
    this.forceUpdate();
  }

  calculateTopShadow = (pixelAmount: number) => {
    return `#aaaaaa 0px ${pixelAmount}px ${pixelAmount}px -${pixelAmount}px inset`;
  }

  calculateBottomShadow = (pixelAmount: number) => {
    return `#aaaaaa 0px -${pixelAmount}px ${pixelAmount}px -${pixelAmount}px inset`;
  }

  calculateWrapperStyle = () => {
    if (this.wrapperElement === null) {
      return 'none';
    }
    let topShadow: string;
    let bottomShadow: string;
    const scrollPosition = this.wrapperElement.scrollTop;
    const elementHeight = this.wrapperElement.clientHeight;
    const scrollAmount = (this.wrapperElement.scrollHeight - scrollPosition);
    const scrollRemaining = (scrollAmount - elementHeight);
    if (scrollPosition > 0) {
      if (scrollPosition >= 1 && scrollPosition < 3) {
        topShadow = this.calculateTopShadow(2);
      } else if (scrollPosition >= 3 && scrollPosition < 5) {
        topShadow = this.calculateTopShadow(4);
      } else if (scrollPosition >= 5 && scrollPosition < 7) {
        topShadow = this.calculateTopShadow(6);
      } else if (scrollPosition >= 7 && scrollPosition < 10) {
        topShadow = this.calculateTopShadow(9);
      } else {
        topShadow = this.calculateTopShadow(10);
      }
    } else {
      topShadow = this.calculateTopShadow(0);
    }
    if (scrollRemaining < 10) {
      if (scrollRemaining === 0) {
        bottomShadow = this.calculateBottomShadow(0);
      } else if (scrollRemaining >= 1 && scrollRemaining < 3) {
        bottomShadow = this.calculateBottomShadow(2);
      } else if (scrollRemaining >= 3 && scrollRemaining < 5) {
        bottomShadow = this.calculateBottomShadow(4);
      } else if (scrollRemaining >= 5 && scrollRemaining < 7) {
        bottomShadow = this.calculateBottomShadow(6);
      } else {
        bottomShadow = this.calculateBottomShadow(9);
      }
    } else {
      bottomShadow = this.calculateBottomShadow(10);
    }
    return `${topShadow}, ${bottomShadow}`;
  }

  render() {
    const { chosen, options } = this.props;
    const wrapperStyle = this.calculateWrapperStyle();
    return (
      <div
        className={css(styles.optionsWrapper, isMobile.any ? styles.mobileScrollOptionsContainer : styles.optionsContainer)}
        onScroll={this.scrollOptions}
        ref={this.refCallback}
        style={{ boxShadow: wrapperStyle }}
      >
        <OptionGroupComponent
          chosen={chosen}
          options={options}
        />
      </div>
    );
  }
}

export default OptionGroupContainer;
