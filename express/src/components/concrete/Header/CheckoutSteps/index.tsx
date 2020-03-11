/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { Chevron } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Button from '@src/components/concrete/Button';

// Data
import { navItems } from '@src/data/checkout/info';

type Props = {
  currentPage: number;
  handleOnClick: (num: number) => void;
};

const CheckoutSteps = ({ currentPage, handleOnClick }: Props) => (
  <div>
    <div className={css(styles.navContainer)}>
      <div>
        <div className={css(pagestyles.pageContainer, pagestyles.pageContainerAutoWidth, pagestyles.fullColumn, padding.leftright_1_5, padding.leftright_3_small)}>
          <div className={css(margin.all_0)}>
            <div className={css(margin.topbottom_2)}>
              <div>
                <div className={css(margin.left_6)}>
                  <nav className={css(pagestyles.inlineBlock)}>
                    <ol className={css(pagestyles.inlineBlock, margin.all_0, padding.all_0)}>
                      {navItems.map((item, index) => {
                        if (currentPage === navItems.length) {
                          return (
                            <li
                              className={css(pagestyles.inlineBlock)}
                              key={index}
                            >
                              {index !== 0 &&
                                <div className={css(pagestyles.inlineBlock, margin.leftright_2)}>
                                  <Chevron
                                    direction="right"
                                    stylesArray={[pagestyles.icon, pagestyles.icon10, pagestyles.iconGrey]}
                                  />
                                </div>
                              }
                              <Translatable content={{ transKey: item.label }}>
                                <span className={css(pagestyles.smallText, margin.all_0, (item.page === currentPage) ? pagestyles.fontMedium : styles.itemNotSelected)} />
                              </Translatable>
                            </li>
                          );
                        } else if (item.page !== navItems.length) {
                          return (
                            <li
                              className={css(pagestyles.inlineBlock)}
                              key={index}
                            >
                              {index !== 0 &&
                                <div className={css(pagestyles.inlineBlock, margin.leftright_2)}>
                                  <Chevron
                                    direction="right"
                                    stylesArray={[pagestyles.icon, pagestyles.icon10, pagestyles.iconGrey]}
                                  />
                                </div>
                              }
                              {item.page >= currentPage ? (
                                <Translatable content={{ transKey: item.label }}>
                                  <span className={css(pagestyles.smallText, margin.all_0, (item.page === currentPage) ? pagestyles.fontMedium : styles.itemNotSelected)} />
                                </Translatable>
                              ) : (
                                <span className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)}>
                                  <Translatable content={{ transKey: item.label }}>
                                    <Button
                                      action={() => handleOnClick(item.page)}
                                      stylesArray={[styles.stepButton, padding.all_0]}
                                    />
                                  </Translatable>
                                </span>
                              )}
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CheckoutSteps;
