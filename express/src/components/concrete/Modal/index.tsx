/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import GenericCard from '@src/components/concrete/GenericCard';
import CloseButton from '@src/components/concrete/Button/CloseButton';
import { FullScreenModal } from '@src/components/abstract/MediaQuery';

// Types
import { ActionLink } from '@src/typings/types';

type Props = {
  children?: JSX.Element;
  hasMobile?: boolean;
  large?: boolean;
} & ActionLink;

const Modal: React.FunctionComponent<Props> = ({ action, children, hasMobile, large }) => (
  <FullScreenModal>
    {matches => {
      if (matches) {
        return (
          <React.Fragment>
            {hasMobile &&
              <div>
                <div>
                  <div dir="ltr">
                    <div>
                      <div>
                        <div className={css(styles.mobileContainer)}>
                          <div className={css(styles.mobileWrapper)}>
                            <div className={css(styles.mobileInner)}>
                              <div className={css(styles.mobileButtonContainer)}>
                                <div className={css(styles.mobileButtonWrapper, pagestyles.tableCellMiddle, pagestyles.leftText)}>
                                  <CloseButton
                                    action={action}
                                    autoFocus={true}
                                    closeStyle={[pagestyles.icon, pagestyles.icon16, pagestyles.iconGrey]}
                                  />
                                </div>
                              </div>
                              <div className={css(styles.mobileDetails)}>
                                {children}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </React.Fragment>
        );
      }
      return (
        <div>
          <div>
            <div dir="ltr">
              <div className={css(styles.menuContainer)}>
                <div className={css(styles.menuTable)}>
                  <div className={css(pagestyles.tableCellMiddle, padding.all_8)}>
                    <div className={css(styles.menuWrapper, large ? styles.menuWrapperLarge : null)}>
                      <GenericCard
                        borderRadius="none"
                        boxShadow="none"
                      >
                        <div className={css(margin.bottom_3)}>
                          <CloseButton
                            action={action}
                            autoFocus={true}
                            closeStyle={[pagestyles.icon, pagestyles.icon16, pagestyles.iconGrey]}
                          />
                        </div>
                        {children}
                      </GenericCard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }}
  </FullScreenModal>
);

Modal.defaultProps = { hasMobile: true };

export default Modal;
