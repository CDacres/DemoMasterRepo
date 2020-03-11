/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element | JSX.Element[];
  extras?: JSX.Element;
  innerRef?: React.RefObject<HTMLDivElement>;
  isFirst?: boolean;
  isVertical?: boolean;
  topSection?: boolean;
};

const VenueSection = ({ children, extras, innerRef, isFirst, isVertical, topSection }: Props) => (
  <div
    className={css(styles.sectionWrapper)}
    ref={innerRef}
  >
    {isFirst ? (
      <div className={css(margin.top_8, margin.bottom_4, margin.bottom_5_small)}>
        <section>
          <div className={css(margin.topbottom_0)}>
              <div>
                <div>
                  <section>
                    <div className={css(styles.sectionContainer, isVertical ? styles.sectionContainerVertical : styles.sectionContainerHorizontal)}>
                      {children}
                    </div>
                  </section>
                </div>
              </div>
            </div>
        </section>
      </div>
    ) : (
      <React.Fragment>
        <section>
          {topSection ? (
            <div className={css(margin.topbottom_0)}>
              <div>
                <div>
                  <div className={css(pagestyles.fullColumn)}>
                    <section>
                      <div className={css(styles.topContainer)}>
                        {children}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={css(margin.topbottom_4, margin.topbottom_5_small)}>
              <div>
                <div>
                  <section>
                    <div className={css(styles.sectionContainer, isVertical ? styles.sectionContainerVertical : styles.sectionContainerHorizontal)}>
                      {children}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
        </section>
        {extras}
      </React.Fragment>
    )}
  </div>
);

export default VenueSection;
