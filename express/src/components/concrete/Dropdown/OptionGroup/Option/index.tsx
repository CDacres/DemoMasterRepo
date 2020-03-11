/* tslint:disable:max-line-length */
import * as React from 'react';
import isMobile from 'ismobilejs';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import { SmallSidebarOption } from '@src/components/abstract/MediaQuery';

type Props = {
  chosen?: (e: any, isSelected?: boolean) => void;
  option: {
    currency?: string;
    price?: {
      amount: number | string;
      discounted?: number | string;
    };
    selected?: boolean;
    subtitle?: string;
    title: string;
  };
};

type State = {
  isSelected: boolean;
};

class Option extends React.Component<Props, State> {

  shouldComponentUpdate(nextProps: any) {
    if (this.props.option === nextProps.option) {
      return false;
    }
    return true;
  }

  selectOption = () => {
    this.props.chosen(this.props.option);
  }

  render() {
    const { option } = this.props;
    return (
      <li
        className={css(styles.optionWrapper, margin.topbottom_0, margin.leftright_1_5, isMobile.any ? styles.mobileOption : styles.option, option.selected ? styles.selected : null)}
        onClick={this.selectOption}
      >
        <div className={css(styles.optionFirstLine)}>
          <div className={css(styles.optionFirstLineChild, styles.title, padding.left_1, option.selected ? styles.selectedTitle : null)}>
            {option.title}
          </div>
          {option.price &&
            <div className={css(styles.optionFirstLineChild, styles.price)}>
              {option.price.discounted ? (
                <SmallSidebarOption>
                  {matches => {
                    if (matches) {
                      return (
                        <span className={css(styles.discountPrice)}>
                          {option.currency}{option.price.discounted}
                        </span>
                      );
                    }
                    return (
                      <React.Fragment>
                        <span className={css(styles.originalPrice)}>
                          {option.currency}{option.price.amount}
                        </span>
                        <span className={css(styles.discountPrice)}>
                          {option.currency}{option.price.discounted}
                        </span>
                      </React.Fragment>
                    );
                  }}
                </SmallSidebarOption>
              ) : (
                <span>
                  {option.currency}{option.price.amount}
                </span>
              )}
            </div>
          }
        </div>
        {option.subtitle &&
          <div className={css(styles.optionSecondLine, margin.top_0_5, padding.left_1)}>
            {option.subtitle}
          </div>
        }
      </li>
    );
  }
}

export default Option;
