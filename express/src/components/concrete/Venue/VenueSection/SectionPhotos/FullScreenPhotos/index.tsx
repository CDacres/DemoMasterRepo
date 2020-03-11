import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import GenericHeader from '@src/components/concrete/GenericHeader';
import CloseButton from '@src/components/concrete/Button/CloseButton';

// Types
import { ActionLink } from '@src/typings/types';

const FullScreenPhotos = ({ action }: ActionLink) => (
  <div className={css(styles.container)}>
    <div className={css(styles.topBarContainer)}>
      <div className={css(styles.topBarLeft)}>
        <div className={css(styles.topBarWrapper)}>
          <div className={css(pagestyles.tableCellMiddle)}>
            <div>
              <div>
                <CloseButton
                  action={action}
                  customStyle={[styles.closeButton]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={css(styles.contentWrapper)}>
      <div className={css(styles.contentContainer)}>
        <div className={css(styles.contentInner, padding.topbottom_0_small, padding.leftright_6_small)}>
          <div className={css(styles.contentIn)}>
            <div className={css(styles.headerWrapper)}>
              <div className={css(styles.headerContainer)}>
                <section>
                  <GenericHeader stylesArray={[pagestyles.defaultTitle]}>
                    <div className={css(styles.headerContent)}>
                      Text
                      {/* TODO: needs correct title */}
                    </div>
                  </GenericHeader>
                </section>
              </div>
            </div>
            <div className={css(margin.right_3)}>
              <div className={css(styles.infoWrapper)}>
                <div className={css(styles.infoContainer)}>
                  <div className={css(pagestyles.tableCellMiddle)}>
                    <div className={css(styles.imgContainer)}>
                      <div className={css(styles.imgInner)}>
                        <img className={css(styles.imgContent)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FullScreenPhotos;
