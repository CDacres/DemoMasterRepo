/* tslint:disable:max-line-length */
import * as React from 'react';
import isMobile from 'ismobilejs';
import Collapse from 'react-collapse';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import { Chevron } from '@src/components/concrete/Icons/svgs';
import Button from '@src/components/concrete/Button';

type Props = {
  children: JSX.Element[];
  header?: string;
  isLarge?: boolean;
  isCollapsed: boolean;
  toggleExtraFilters: (e: any) => void;
};

const PanelItemCollapseComponent = ({ children, header, isCollapsed, isLarge, toggleExtraFilters }: Props) => {
  if (isMobile.any) {
    return (
      <React.Fragment>
        <Button
          action={toggleExtraFilters}
          stylesArray={[styles.wrapper, padding.all_0]}
        >
          <div className={css(pagestyles.flexWrapper)}>
            {header &&
              <div className={css(pagestyles.flexContainer)}>
                <Translatable content={{ transKey: header }}>
                  <span className={css(pagestyles.subtitle, margin.all_0)} />
                </Translatable>
              </div>
            }
            <div className={css(pagestyles.inlineBlockMiddle)}>
              <span className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)}>
                <div className={css(pagestyles.inlineBlock)}>
                  <div className={css(pagestyles.inlineBlock)}>
                    <Translatable content={{ transKey: isCollapsed ? 'common.close' : 'common.see_all' }}>
                      <div />
                    </Translatable>
                  </div>
                  <div className={css(pagestyles.inlineBlock)}>
                    <div className={css(margin.left_1)}>
                      <Chevron stylesArray={[styles.chevron, isCollapsed && styles.chevron_collapse]} />
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </Button>
        <div>
          <Collapse isOpened={isCollapsed}>
            <div className={css(isCollapsed ? styles.collapse : styles.checkboxContainerMobile)}>
              <div className={css(margin.top_2)}>
                {children}
                <div className={css(margin.top_2)}>
                  <div className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)}>
                    <Button
                      action={toggleExtraFilters}
                      stylesArray={[styles.smallButton, padding.all_0]}
                    >
                      <div className={css(pagestyles.inlineBlock)}>
                        <div className={css(pagestyles.inlineBlock)}>
                          <Translatable content={{ transKey: 'common.close' }}>
                            <div />
                          </Translatable>
                        </div>
                        <div className={css(pagestyles.inlineBlock)}>
                          <div className={css(margin.left_1)}>
                            <Chevron stylesArray={[styles.chevron, isCollapsed && styles.chevron_collapse]} />
                          </div>
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </React.Fragment>
    );
  } else if (isLarge) {
    return (
      <div className={css(margin.bottom_2)}>
        <div>
          <Collapse isOpened={true}>
            <div className={css(styles.checkboxContainer, isCollapsed ? styles.collapse : null)}>
              {children}
            </div>
          </Collapse>
        </div>
        <div className={css(margin.top_1, padding.left_1)}>
          <div className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)}>
            <Button
              action={toggleExtraFilters}
              stylesArray={[styles.collapsable, pagestyles.link, padding.all_0]}
            >
              <Translatable content={{ transKey: isCollapsed ? 'common.close' : 'common.see_all' }} />
              <Chevron stylesArray={[styles.chevron, margin.left_1, isCollapsed && styles.chevron_collapse]} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default PanelItemCollapseComponent;
