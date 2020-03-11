/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import PopUpTop from '@src/components/concrete/Venue/VenuePopUp/PopUpTop';
import PopUpDatePicker from '@src/components/concrete/Venue/VenuePopUp/PopUpDatePicker';
import { FullScreenModal, ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import ContactInfo from '@src/components/concrete/Venue/VenuePopUp/ContactInfo';
import InfoList from '@src/components/concrete/Venue/VenuePopUp/InfoList';

// Types
import { ActionLink } from '@src/typings/types';

type Props = {
  subtitle: string;
  title: string;
} & ActionLink;

const VenuePopUp = ({ action, subtitle, title }: Props) => (
  <div className={css(styles.wrapper)}>
    <PopUpTop action={action} />
    <div className={css(styles.contentWrapper)}>
      <div className={css(styles.contentContainer)}>
        <div className={css(styles.contentInner, padding.topbottom_0, padding.leftright_0, padding.topbottom_0_small, padding.leftright_6_small)}>
          <div className={css(styles.content)}>
            <div className={css(styles.leftWrapper)}>
              <div className={css(styles.leftContainer)}>
                <PopUpDatePicker />
                <ProductLargeScreen>
                  {matches => {
                    if (matches) {
                      return (
                        <div>
                          <div className={css(styles.largeContact)}>
                            <ContactInfo />
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                </ProductLargeScreen>
              </div>
            </div>
            <div className={css(styles.space)} />
            <div className={css(styles.rightWrapper)}>
              <InfoList
                subtitle={subtitle}
                title={title}
              />
              <FullScreenModal>
                {matches => {
                  if (matches) {
                    return (
                      <div>
                        <div className={css(margin.top_2)}>
                          <ContactInfo />
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              </FullScreenModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default VenuePopUp;
