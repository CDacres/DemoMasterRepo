import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

type Props = {
  icon?: string;
  subtext?: string;
  text: string;
};

const SearchText = ({ icon, subtext, text }: Props) => (
  <div>
    <div className={css(margin.top_3)}>
      <div />
    </div>
    <div className={css(margin.bottom_0)}>
      <div>
        <div>
          {icon ? (
            <div className={css(styles.searchIconTextWrapper, padding.all_0)}>
              <div>
                <div className={css(styles.iconWrapper)}>
                  <img
                    alt=""
                    className={css(styles.icon)}
                    height="40"
                    src={icon}
                    width="40"
                  />
                </div>
              </div>
              <div className={css(styles.searchIconTextContainer, margin.left_2)}>
                <div className={css(pagestyles.inline, subtext ? margin.right_1 : null)}>
                  <span className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)}>
                    {text}
                  </span>
                </div>
                {subtext &&
                  <div className={css(pagestyles.inline)}>
                    <span className={css(pagestyles.smallText, margin.all_0)}>
                      {subtext}
                    </span>
                  </div>
                }
              </div>
            </div>
          ) : (
            <div className={css(styles.searchTextWrapper, padding.bottom_3)}>
              <div>
                {text}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default SearchText;
