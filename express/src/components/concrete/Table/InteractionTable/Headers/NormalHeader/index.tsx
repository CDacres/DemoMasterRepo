/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import headerStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import Filters from '@src/components/concrete/Table/InteractionTable/Headers/NormalHeader/Filters';
import HeaderTitle from '@src/components/concrete/Table/InteractionTable/Headers/NormalHeader/HeaderTitle';

type Props = {
  buttonSection?: JSX.Element;
  filterSection?: JSX.Element;
  sticky: boolean;
  title: string;
  typingOn: boolean;
};

const NormalHeader = ({ buttonSection, filterSection, sticky, title, typingOn }: Props) => (
  <div className={css(padding.leftright_3, sticky ? styles.stickyContent : styles.content)}>
    <div className={css(styles.contentWrapper)}>
      <ProductLargeScreen>
        {matches => {
          if (matches) {
            return (
              <div className={css(styles.contentContainer)}>
                <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                  <div className={css(styles.contentContainer)}>
                    <div className={css(pagestyles.tableCellMiddle)}>
                      {title &&
                        <HeaderTitle title={title} />
                      }
                    </div>
                    <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                      <div className={css(styles.formContainer)}>
                        <div className={css(pagestyles.table)}>
                          <div className={css(styles.formContent, pagestyles.tableCellMiddle)}>
                            <Filters typingOn={typingOn}>
                              {filterSection}
                            </Filters>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {buttonSection}
              </div>
            );
          } else {
            return (
              <React.Fragment>
                <div>
                  <div className={css(margin.bottom_2)}>
                    <div className={css(styles.contentContainer)}>
                      <div className={css(pagestyles.tableCellMiddle, pagestyles.fullColumn)}>
                        {title &&
                          <HeaderTitle title={title} />
                        }
                      </div>
                      {buttonSection}
                    </div>
                  </div>
                </div>
                <div className={css(styles.contentContainer)}>
                  <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                    <div className={css(styles.contentContainer)}>
                      <div className={css(pagestyles.tableCellMiddle)} />
                      <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                        <div className={css(styles.formContainer)}>
                          <div className={css(pagestyles.table)}>
                            <div className={css(styles.formContent, pagestyles.tableCellMiddle)}>
                              <Filters typingOn={typingOn}>
                                {filterSection}
                              </Filters>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          }
        }}
      </ProductLargeScreen>
    </div>
    <div className={css(headerStyles.blankWrapper, headerStyles.blankHidden)}>
      <div className={css(headerStyles.blankContainer)}>
        <div className={css(headerStyles.blankInner)} />
      </div>
      <div className={css(headerStyles.blank)} />
    </div>
  </div>
);

export default NormalHeader;
